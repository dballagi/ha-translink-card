"""Shared data coordinator for TransLink schedules."""

from __future__ import annotations

import asyncio
import csv
import hashlib
import logging
import sqlite3
from dataclasses import dataclass, field
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
from .gtfs_cache import (
    async_get_static_feed,
    get_cached_static_feed,
    release_static_feed,
)
from .gtfs_static import StaticFeed
from .realtime_cache import (
    async_get_realtime_updates,
    realtime_cache_key,
    release_realtime_updates,
)

_LOGGER = logging.getLogger(__name__)
_COORDINATOR_TASKS = "coordinator_tasks"


class TransLinkCoordinator(DataUpdateCoordinator[dict[str, object]]):
    """Fetch and normalize TransLink departures."""

    def __init__(
        self, hass: HomeAssistant, entry: ConfigEntry, owner: str
    ) -> None:
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
        self.owner = owner
    @property
    def static_feed(self) -> StaticFeed | None:
        """Return the single cached static feed instance."""
        return get_cached_static_feed(self.hass, self.static_url)

    async def _async_update_data(self) -> dict[str, object]:
        try:
            now = datetime.now(UTC)
            _, realtime, alert_result = await asyncio.gather(
                async_get_static_feed(
                    self.hass,
                    self.static_url,
                    self.api,
                    self.owner,
                ),
                async_get_realtime_updates(
                    self.hass,
                    self.realtime_key,
                    self.api,
                    self.owner,
                ),
                self._async_service_alerts(),
            )
        except (
            BadZipFile,
            csv.Error,
            KeyError,
            OSError,
            sqlite3.Error,
            TransLinkApiError,
            UnicodeError,
            ValueError,
        ) as err:
            raise UpdateFailed(str(err)) from err

        return {
            "realtime": realtime,
            "alerts": alert_result[0],
            "alerts_error": alert_result[1],
            "updated_at": now,
        }

    async def _async_service_alerts(self) -> tuple[list, str | None]:
        """Fetch optional service alerts without blocking departures."""
        try:
            return await self.api.async_service_alerts(), None
        except (OSError, TransLinkApiError, ValueError) as err:
            _LOGGER.warning("Unable to update TransLink service alerts: %s", err)
            return [], str(err)


def _coordinator_key(entry: ConfigEntry) -> str:
    values = (
        entry.data[CONF_API_KEY],
        entry.data.get(CONF_STATIC_URL, DEFAULT_STATIC_URL),
        entry.data.get(CONF_REALTIME_URL, DEFAULT_REALTIME_URL),
        entry.data.get(CONF_ALERTS_URL, DEFAULT_ALERTS_URL),
    )
    return hashlib.sha256("\0".join(values).encode()).hexdigest()


@dataclass
class SharedCoordinator:
    """Track entries using one coordinator."""

    task: asyncio.Task[TransLinkCoordinator]
    entries: set[str] = field(default_factory=set)


async def _async_create_coordinator(
    hass: HomeAssistant, entry: ConfigEntry, owner: str
) -> TransLinkCoordinator:
    coordinator = TransLinkCoordinator(hass, entry, owner)
    await coordinator.async_config_entry_first_refresh()
    return coordinator


async def async_get_shared_coordinator(
    hass: HomeAssistant, entry: ConfigEntry
) -> TransLinkCoordinator:
    """Return a coordinator shared by equivalent config entries."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    records: dict[str, SharedCoordinator] = domain_data.setdefault(
        _COORDINATOR_TASKS, {}
    )
    key = _coordinator_key(entry)
    record = records.get(key)
    if record is None:
        task = hass.async_create_task(
            _async_create_coordinator(hass, entry, key),
            f"{DOMAIN}_coordinator_{key[:8]}",
        )
        record = records[key] = SharedCoordinator(task)
    record.entries.add(entry.entry_id)
    try:
        return await record.task
    except Exception:
        if records.get(key) is record:
            records.pop(key)
        release_static_feed(
            hass,
            entry.data.get(CONF_STATIC_URL, DEFAULT_STATIC_URL),
            key,
        )
        release_realtime_updates(
            hass,
            realtime_cache_key(
                entry.data[CONF_API_KEY],
                entry.data.get(CONF_REALTIME_URL, DEFAULT_REALTIME_URL),
            ),
            key,
        )
        raise


def release_shared_coordinator(
    hass: HomeAssistant, entry: ConfigEntry
) -> None:
    """Release a config entry's shared coordinator."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    records: dict[str, SharedCoordinator] = domain_data.setdefault(
        _COORDINATOR_TASKS, {}
    )
    key = _coordinator_key(entry)
    record = records.get(key)
    if record is None:
        return
    record.entries.discard(entry.entry_id)
    if record.entries:
        return

    records.pop(key, None)
    release_static_feed(
        hass,
        entry.data.get(CONF_STATIC_URL, DEFAULT_STATIC_URL),
        key,
    )
    release_realtime_updates(
        hass,
        realtime_cache_key(
            entry.data[CONF_API_KEY],
            entry.data.get(CONF_REALTIME_URL, DEFAULT_REALTIME_URL),
        ),
        key,
    )
