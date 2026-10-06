"""Short-lived shared cache for decoded GTFS-Realtime trip updates."""

from __future__ import annotations

import asyncio
import hashlib
import time
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


def realtime_cache_key(api_key: str, realtime_url: str) -> str:
    """Return a non-secret key for equivalent realtime configurations."""
    return hashlib.sha256(f"{api_key}\0{realtime_url}".encode()).hexdigest()


async def async_get_realtime_updates(
    hass: HomeAssistant, key: str, api: TransLinkApi
) -> dict[tuple[str, str, date | None], RealtimeUpdate]:
    """Return shared decoded trip updates."""
    domain_data = hass.data.setdefault(DOMAIN, {})
    registry: dict[str, RealtimeUpdateCache] = domain_data.setdefault(
        _CACHE_REGISTRY, {}
    )
    cache = registry.get(key)
    if cache is None:
        cache = registry[key] = RealtimeUpdateCache()
    return await cache.async_get(api)
