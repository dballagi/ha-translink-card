"""TransLink multi-stop departure board sensor."""

from __future__ import annotations

from collections import defaultdict
from datetime import UTC, datetime, timedelta
from typing import Any

from homeassistant.components.sensor import SensorDeviceClass, SensorEntity
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import (
    CONF_BOARD_NAME,
    CONF_CANCELLED_RETENTION_MINUTES,
    CONF_DEPARTURE_WINDOW_MINUTES,
    CONF_STOP_COLLAPSED,
    CONF_STOP_DEPARTURES,
    CONF_STOP_DISPLAY_NAME,
    CONF_STOP_FILTERS,
    CONF_STOP_IDS,
    CONF_STOP_SHOW_CODE,
    DEFAULT_CANCELLED_RETENTION_MINUTES,
    DEFAULT_DEPARTURE_WINDOW_MINUTES,
)
from .coordinator import TransLinkCoordinator


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback,
) -> None:
    """Set up a board sensor."""
    coordinator: TransLinkCoordinator = entry.runtime_data
    async_add_entities([TransLinkScheduleSensor(coordinator, entry)])


class TransLinkScheduleSensor(
    CoordinatorEntity[TransLinkCoordinator], SensorEntity
):
    """A board containing departures from multiple stops."""

    _attr_device_class = SensorDeviceClass.TIMESTAMP
    _attr_icon = "mdi:bus-clock"

    def __init__(
        self, coordinator: TransLinkCoordinator, entry: ConfigEntry
    ) -> None:
        super().__init__(coordinator)
        self._entry = entry
        self._attr_unique_id = entry.entry_id

    @property
    def name(self) -> str:
        """Return the configured board name."""
        return self._board_name

    @property
    def _board_name(self) -> str:
        return self._entry.options.get(
            CONF_BOARD_NAME, self._entry.data[CONF_BOARD_NAME]
        )

    @property
    def _stop_ids(self) -> list[str]:
        return self._entry.options.get(CONF_STOP_IDS, self._entry.data[CONF_STOP_IDS])

    @property
    def _stop_filters(self) -> dict[str, object]:
        filters = self._entry.options.get(CONF_STOP_FILTERS, {})
        return filters if isinstance(filters, dict) else {}

    @property
    def _departure_window(self) -> timedelta:
        minutes = self._entry.options.get(
            CONF_DEPARTURE_WINDOW_MINUTES,
            DEFAULT_DEPARTURE_WINDOW_MINUTES,
        )
        return timedelta(minutes=int(minutes))

    @property
    def _cancelled_retention(self) -> timedelta:
        minutes = self._entry.options.get(
            CONF_CANCELLED_RETENTION_MINUTES,
            DEFAULT_CANCELLED_RETENTION_MINUTES,
        )
        return timedelta(minutes=int(minutes))

    @property
    def native_value(self) -> datetime | None:
        """Return the next departure time."""
        departure = next(
            (
                item
                for item in self._departures()
                if not item.cancelled
            ),
            None,
        )
        return (
            departure.estimated_time.astimezone(UTC)
            if departure
            else None
        )

    def _departures(self):
        feed = self.coordinator.static_feed
        if feed is None or not self.coordinator.data:
            return []
        return feed.departures(
            self._stop_ids,
            datetime.now(UTC),
            self.coordinator.data["realtime"],
            self._stop_filters,
            self._departure_window,
            self._cancelled_retention,
        )

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return grouped and flattened departure data."""
        feed = self.coordinator.static_feed
        departures = self._departures()
        now = datetime.now(UTC)
        selected_stop_ids = set(self._stop_ids)
        selected_route_ids: set[str] = set()
        for stop_id in self._stop_ids:
            settings = self._stop_filters.get(stop_id, {})
            included = (
                settings.get("include_route_ids")
                if isinstance(settings, dict)
                else None
            )
            if isinstance(included, list) and included:
                selected_route_ids.update(
                    value for value in included if isinstance(value, str)
                )
            elif feed is not None:
                selected_route_ids.update(
                    route.route_id for route in feed.routes_for_stop(stop_id)
                )
        alerts = [
            alert.as_dict()
            for alert in self.coordinator.data.get("alerts", [])
            if (
                alert.is_active(now)
                and (
                    (not alert.stop_ids and not alert.route_ids)
                    or selected_stop_ids.intersection(alert.stop_ids)
                    or selected_route_ids.intersection(alert.route_ids)
                )
            )
        ]
        grouped = defaultdict(list)
        for departure in departures:
            grouped[departure.stop_id].append(departure.as_dict())

        stops = []
        for stop_id in self._stop_ids:
            stop = feed.stops.get(stop_id) if feed else None
            settings = self._stop_filters.get(stop_id, {})
            if not isinstance(settings, dict):
                settings = {}
            stops.append(
                {
                    "stop_id": stop_id,
                    "stop_name": stop.name if stop else stop_id,
                    "display_name": (
                        settings.get(CONF_STOP_DISPLAY_NAME)
                        or (stop.name if stop else stop_id)
                    ),
                    "stop_code": stop.code if stop else None,
                    "departures_per_stop": settings.get(CONF_STOP_DEPARTURES),
                    "show_stop_code": settings.get(CONF_STOP_SHOW_CODE, True),
                    "collapsed": settings.get(CONF_STOP_COLLAPSED, False),
                    "departures": grouped[stop_id],
                }
            )

        return {
            "board_name": self._board_name,
            "stops": stops,
            "departures": [departure.as_dict() for departure in departures],
            "stop_count": len(stops),
            "departure_count": len(departures),
            "departure_window_minutes": int(
                self._departure_window.total_seconds() / 60
            ),
            "cancelled_retention_minutes": int(
                self._cancelled_retention.total_seconds() / 60
            ),
            "alerts": alerts,
            "alerts_error": self.coordinator.data.get("alerts_error"),
            "last_updated": (
                self.coordinator.data["updated_at"].isoformat()
                if self.coordinator.data
                else None
            ),
            "attribution": (
                "Route and arrival data used in this product or service is "
                "provided by permission of TransLink. TransLink assumes no "
                "responsibility for the accuracy or currency of the Data used "
                "in this product or service."
            ),
        }
