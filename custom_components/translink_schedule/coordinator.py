"""Shared data coordinator for TransLink schedules."""

from __future__ import annotations

import asyncio
import csv
import logging
from datetime import UTC, datetime
from zipfile import BadZipFile

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.update_coordinator import (
    DataUpdateCoordinator,
    UpdateFailed,
)

from .api import TransLinkApi, TransLinkApiError
from .const import (
    CONF_ALERTS_URL,
    CONF_API_KEY,
    CONF_REALTIME_URL,
    CONF_STATIC_URL,
    DEFAULT_ALERTS_URL,
    DEFAULT_REALTIME_URL,
    DEFAULT_STATIC_URL,
    DOMAIN,
    STATIC_REFRESH_INTERVAL,
    UPDATE_INTERVAL,
)
from .gtfs_static import StaticFeed

_LOGGER = logging.getLogger(__name__)


class TransLinkCoordinator(DataUpdateCoordinator[dict[str, object]]):
    """Fetch and normalize TransLink departures."""

    def __init__(self, hass: HomeAssistant, entry: ConfigEntry) -> None:
        super().__init__(
            hass,
            logger=_LOGGER,
            name=DOMAIN,
            update_interval=UPDATE_INTERVAL,
        )
        self.api = TransLinkApi(
            async_get_clientsession(hass),
            entry.data[CONF_API_KEY],
            entry.data.get(CONF_STATIC_URL, DEFAULT_STATIC_URL),
            entry.data.get(CONF_REALTIME_URL, DEFAULT_REALTIME_URL),
            entry.data.get(CONF_ALERTS_URL, DEFAULT_ALERTS_URL),
        )
        self.static_feed: StaticFeed | None = None
        self._static_updated_at: datetime | None = None

    async def _async_update_data(self) -> dict[str, object]:
        try:
            now = datetime.now(UTC)
            if (
                self.static_feed is None
                or self._static_updated_at is None
                or now - self._static_updated_at >= STATIC_REFRESH_INTERVAL
            ):
                payload = await self.api.async_static_feed()
                self.static_feed = await self.hass.async_add_executor_job(
                    StaticFeed, payload
                )
                self._static_updated_at = now
            realtime, alerts = await asyncio.gather(
                self.api.async_realtime_updates(),
                self.api.async_service_alerts(),
            )
        except (
            BadZipFile,
            csv.Error,
            KeyError,
            TransLinkApiError,
            UnicodeError,
            ValueError,
        ) as err:
            raise UpdateFailed(str(err)) from err

        return {
            "realtime": realtime,
            "alerts": alerts,
            "updated_at": now,
        }
