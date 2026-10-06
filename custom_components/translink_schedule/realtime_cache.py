"""Short-lived shared cache for decoded GTFS-Realtime trip updates."""

from __future__ import annotations

import asyncio
import hashlib
import time
from dataclasses import dataclass, field
from datetime import date

from homeassistant.core import HomeAssistant

from .api import TransLinkApi
from .const import DOMAIN, UPDATE_INTERVAL
from .models import RealtimeUpdate

_CACHE_REGISTRY = "realtime_update_caches"


class RealtimeUpdateCache:
    """Cache one decoded realtime update feed."""

    def __init__(self) -> None:
        self._updates: dict[tuple[str, str, date | None], RealtimeUpdate] | None = (
            None
        )
        self._updated_at = 0.0
        self._lock = asyncio.Lock()

    async def async_get(
        self, api: TransLinkApi
    ) -> dict[tuple[str, str, date | None], RealtimeUpdate]:
        """Return fresh updates, fetching at most once concurrently."""
        async with self._lock:
            now = time.monotonic()
            if (
                self._updates is not None
                and now - self._updated_at < UPDATE_INTERVAL.total_seconds()
            ):
                return self._updates
            self._updates = await api.async_realtime_updates()
            self._updated_at = now
            return self._updates


@dataclass
class RealtimeUpdateCacheRecord:
    """Track owners of one decoded realtime feed."""

    cache: RealtimeUpdateCache
    owners: set[str] = field(default_factory=set)


def realtime_cache_key(api_key: str, realtime_url: str) -> str:
    """Return a non-secret key for equivalent realtime configurations."""
    return hashlib.sha256(f"{api_key}\0{realtime_url}".encode()).hexdigest()


async def async_get_realtime_updates(
    hass: HomeAssistant,
    key: str,
    api: TransLinkApi,
    owner: str | None = None,
) -> dict[tuple[str, str, date | None], RealtimeUpdate]:
    """Return shared decoded trip updates."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    registry: dict[str, RealtimeUpdateCacheRecord] = domain_data.setdefault(
        _CACHE_REGISTRY, {}
    )
    record = registry.get(key)
    if record is None:
        record = registry[key] = RealtimeUpdateCacheRecord(
            RealtimeUpdateCache()
        )
    if owner is not None:
        record.owners.add(owner)
    return await record.cache.async_get(api)


def release_realtime_updates(
    hass: HomeAssistant, key: str, owner: str | None = None
) -> None:
    """Release one owner and evict unused realtime updates."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    registry: dict[str, RealtimeUpdateCacheRecord] = domain_data.setdefault(
        _CACHE_REGISTRY, {}
    )
    record = registry.get(key)
    if record is None:
        return
    if owner is not None:
        record.owners.discard(owner)
    if not record.owners:
        registry.pop(key, None)
