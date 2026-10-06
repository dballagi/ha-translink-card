"""Shared data coordinator for TransLink schedules."""

from __future__ import annotations

import asyncio
import csv
import hashlib
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
    UPDATE_INTERVAL,
)
from .gtfs_cache import async_get_static_feed
from .gtfs_static import StaticFeed
from .realtime_cache import (
    async_get_realtime_updates,
    realtime_cache_key,
)

_LOGGER = logging.getLogger(__name__)
_COORDINATOR_TASKS = "coordinator_tasks"


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
        self.static_url = entry.data.get(CONF_STATIC_URL, DEFAULT_STATIC_URL)
        self.realtime_key = realtime_cache_key(
            entry.data[CONF_API_KEY],
            entry.data.get(CONF_REALTIME_URL, DEFAULT_REALTIME_URL),
        )
        self.static_feed: StaticFeed | None = None

    async def _async_update_data(self) -> dict[str, object]:
        try:
            now = datetime.now(UTC)
            self.static_feed, realtime, alerts = await asyncio.gather(
                async_get_static_feed(self.hass, self.static_url, self.api),
                async_get_realtime_updates(
                    self.hass, self.realtime_key, self.api
                ),
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


def _coordinator_key(entry: ConfigEntry) -> str:
    values = (
        entry.data[CONF_API_KEY],
        entry.data.get(CONF_STATIC_URL, DEFAULT_STATIC_URL),
        entry.data.get(CONF_REALTIME_URL, DEFAULT_REALTIME_URL),
        entry.data.get(CONF_ALERTS_URL, DEFAULT_ALERTS_URL),
    )
    return hashlib.sha256("\0".join(values).encode()).hexdigest()


async def _async_create_coordinator(
    hass: HomeAssistant, entry: ConfigEntry
) -> TransLinkCoordinator:
    coordinator = TransLinkCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()
    return coordinator


async def async_get_shared_coordinator(
    hass: HomeAssistant, entry: ConfigEntry
) -> TransLinkCoordinator:
    """Return a coordinator shared by equivalent config entries."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    tasks: dict[str, asyncio.Task[TransLinkCoordinator]] = domain_data.setdefault(
        _COORDINATOR_TASKS, {}
    )
    key = _coordinator_key(entry)
    task = tasks.get(key)
    if task is None:
        task = hass.async_create_task(
            _async_create_coordinator(hass, entry),
            f"{DOMAIN}_coordinator_{key[:8]}",
        )
        tasks[key] = task
    try:
        return await task
    except Exception:
        if tasks.get(key) is task:
            tasks.pop(key)
        raise
