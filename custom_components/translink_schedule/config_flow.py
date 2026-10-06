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

from .api import TransLinkApi, TransLinkApiError
from .const import (
    CONF_ALERTS_URL,
    CONF_API_KEY,
    CONF_BOARD_NAME,
    CONF_REALTIME_URL,
    CONF_STATIC_URL,
    CONF_STOP_IDS,
    DEFAULT_ALERTS_URL,
    DEFAULT_REALTIME_URL,
    DEFAULT_STATIC_URL,
    DOMAIN,
)
from .gtfs_static import StaticFeed


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
                    static_payload, _ = await asyncio.gather(
                        api.async_static_feed(), api.async_realtime_updates()
                    )
                    feed = await self.hass.async_add_executor_job(
                        StaticFeed, static_payload
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
                    return self.async_create_entry(
                        data={
                            CONF_BOARD_NAME: user_input[CONF_BOARD_NAME],
                            CONF_STOP_IDS: stop_ids,
                        }
                    )

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
