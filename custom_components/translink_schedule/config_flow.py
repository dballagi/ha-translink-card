"""Config flow for TransLink Schedule."""

from __future__ import annotations

import asyncio
import csv
from typing import Any
from zipfile import BadZipFile

import voluptuous as vol
from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.selector import (
    SelectOptionDict,
    SelectSelector,
    SelectSelectorConfig,
    SelectSelectorMode,
    TextSelector,
    TextSelectorConfig,
)

from .api import TransLinkApi, TransLinkApiError
from .const import (
    CONF_ALERTS_URL,
    CONF_API_KEY,
    CONF_BOARD_NAME,
    CONF_DESTINATION_CONTAINS,
    CONF_INCLUDE_ROUTE_IDS,
    CONF_REALTIME_URL,
    CONF_STATIC_URL,
    CONF_STOP_FILTERS,
    CONF_STOP_IDS,
    DEFAULT_ALERTS_URL,
    DEFAULT_REALTIME_URL,
    DEFAULT_STATIC_URL,
    DOMAIN,
)
from .gtfs_cache import async_get_static_feed
from .realtime_cache import (
    async_get_realtime_updates,
    realtime_cache_key,
)


def _parse_stop_ids(value: str) -> list[str]:
    return list(
        dict.fromkeys(part.strip() for part in value.split(",") if part.strip())
    )


class TransLinkScheduleConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    """Configure a multi-stop TransLink departure board."""

    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(
        config_entry: config_entries.ConfigEntry,
    ) -> TransLinkScheduleOptionsFlow:
        """Return the board options flow."""
        return TransLinkScheduleOptionsFlow()

    async def async_step_user(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Collect credentials and selected stop IDs."""
        errors: dict[str, str] = {}
        if user_input is not None:
            stop_ids = _parse_stop_ids(user_input[CONF_STOP_IDS])
            if not stop_ids:
                errors[CONF_STOP_IDS] = "no_stops"
            else:
                api = TransLinkApi(
                    async_get_clientsession(self.hass),
                    user_input[CONF_API_KEY],
                    user_input[CONF_STATIC_URL],
                    user_input[CONF_REALTIME_URL],
                    user_input[CONF_ALERTS_URL],
                )
                try:
                    realtime_key = realtime_cache_key(
                        user_input[CONF_API_KEY],
                        user_input[CONF_REALTIME_URL],
                    )
                    feed, _ = await asyncio.gather(
                        async_get_static_feed(
                            self.hass, user_input[CONF_STATIC_URL], api
                        ),
                        async_get_realtime_updates(
                            self.hass, realtime_key, api
                        ),
                    )
                    stop_ids, missing = feed.resolve_stop_ids(stop_ids)
                    if missing:
                        errors[CONF_STOP_IDS] = "unknown_stops"
                except TransLinkApiError:
                    errors["base"] = "cannot_connect"
                except (BadZipFile, csv.Error, KeyError, UnicodeError, ValueError):
                    errors["base"] = "invalid_feed"

            if not errors:
                await self.async_set_unique_id(
                    f"{user_input[CONF_BOARD_NAME].casefold()}-"
                    f"{'-'.join(stop_ids)}"
                )
                self._abort_if_unique_id_configured()
                data = dict(user_input)
                data[CONF_STOP_IDS] = stop_ids
                return self.async_create_entry(
                    title=user_input[CONF_BOARD_NAME], data=data
                )

        schema = vol.Schema(
            {
                vol.Required(CONF_API_KEY): str,
                vol.Required(CONF_BOARD_NAME, default="Nearby departures"): str,
                vol.Required(CONF_STOP_IDS): str,
                vol.Required(CONF_STATIC_URL, default=DEFAULT_STATIC_URL): str,
                vol.Required(CONF_REALTIME_URL, default=DEFAULT_REALTIME_URL): str,
                vol.Required(CONF_ALERTS_URL, default=DEFAULT_ALERTS_URL): str,
            }
        )
        return self.async_show_form(
            step_id="user", data_schema=schema, errors=errors
        )


class TransLinkScheduleOptionsFlow(config_entries.OptionsFlow):
    """Edit a TransLink departure board."""

    def __init__(self) -> None:
        """Initialize the options flow."""
        self._board_name = ""
        self._stop_ids: list[str] = []
        self._stop_filters: dict[str, dict[str, list[str]]] = {}
        self._stop_index = 0

    async def async_step_init(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Edit the board name and selected stops."""
        errors: dict[str, str] = {}
        if user_input is not None:
            identifiers = _parse_stop_ids(user_input[CONF_STOP_IDS])
            feed = self.config_entry.runtime_data.static_feed
            if not identifiers:
                errors[CONF_STOP_IDS] = "no_stops"
            elif feed is None:
                errors["base"] = "cannot_connect"
            else:
                stop_ids, missing = feed.resolve_stop_ids(identifiers)
                if missing:
                    errors[CONF_STOP_IDS] = "unknown_stops"
                else:
                    self._board_name = user_input[CONF_BOARD_NAME]
                    self._stop_ids = stop_ids
                    existing_filters = self.config_entry.options.get(
                        CONF_STOP_FILTERS, {}
                    )
                    if isinstance(existing_filters, dict):
                        self._stop_filters = {
                            stop_id: value
                            for stop_id in stop_ids
                            if isinstance(
                                (value := existing_filters.get(stop_id)), dict
                            )
                        }
                    return await self.async_step_stop_filter()

        board_name = self.config_entry.options.get(
            CONF_BOARD_NAME, self.config_entry.data[CONF_BOARD_NAME]
        )
        stop_ids = self.config_entry.options.get(
            CONF_STOP_IDS, self.config_entry.data[CONF_STOP_IDS]
        )
        schema = vol.Schema(
            {
                vol.Required(CONF_BOARD_NAME, default=board_name): str,
                vol.Required(CONF_STOP_IDS, default=", ".join(stop_ids)): str,
            }
        )
        return self.async_show_form(
            step_id="init", data_schema=schema, errors=errors
        )

    async def async_step_stop_filter(
        self, user_input: dict[str, Any] | None = None
    ) -> config_entries.ConfigFlowResult:
        """Configure route and destination filters for one stop."""
        stop_id = self._stop_ids[self._stop_index]
        feed = self.config_entry.runtime_data.static_feed
        if feed is None:
            return self.async_abort(reason="cannot_connect")

        routes = feed.routes_for_stop(stop_id)
        valid_route_ids = {route.route_id for route in routes}
        if user_input is not None:
            route_ids = [
                route_id
                for route_id in user_input.get(CONF_INCLUDE_ROUTE_IDS, [])
                if route_id in valid_route_ids
            ]
            destinations: list[str] = []
            seen_destinations: set[str] = set()
            for value in user_input.get(CONF_DESTINATION_CONTAINS, []):
                if not isinstance(value, str) or not (value := value.strip()):
                    continue
                normalized = value.casefold()
                if normalized not in seen_destinations:
                    destinations.append(value)
                    seen_destinations.add(normalized)
            if route_ids or destinations:
                self._stop_filters[stop_id] = {
                    CONF_INCLUDE_ROUTE_IDS: route_ids,
                    CONF_DESTINATION_CONTAINS: destinations,
                }
            else:
                self._stop_filters.pop(stop_id, None)

            self._stop_index += 1
            if self._stop_index < len(self._stop_ids):
                return await self.async_step_stop_filter()
            return self.async_create_entry(
                data={
                    CONF_BOARD_NAME: self._board_name,
                    CONF_STOP_IDS: self._stop_ids,
                    CONF_STOP_FILTERS: self._stop_filters,
                }
            )

        existing = self._stop_filters.get(stop_id, {})
        route_options = [
            SelectOptionDict(
                value=route.route_id,
                label=(
                    f"{route.short_name} - {route.long_name}"
                    if route.short_name and route.long_name
                    else route.short_name or route.long_name or route.route_id
                ),
            )
            for route in routes
        ]
        schema = vol.Schema(
            {
                vol.Optional(
                    CONF_INCLUDE_ROUTE_IDS,
                    default=existing.get(CONF_INCLUDE_ROUTE_IDS, []),
                ): SelectSelector(
                    SelectSelectorConfig(
                        options=route_options,
                        multiple=True,
                        mode=SelectSelectorMode.DROPDOWN,
                    )
                ),
                vol.Optional(
                    CONF_DESTINATION_CONTAINS,
                    default=existing.get(CONF_DESTINATION_CONTAINS, []),
                ): TextSelector(TextSelectorConfig(multiple=True)),
            }
        )
        stop = feed.stops[stop_id]
        return self.async_show_form(
            step_id="stop_filter",
            data_schema=schema,
            description_placeholders={
                "stop_name": stop.name,
                "stop_code": stop.code or stop.stop_id,
            },
        )
