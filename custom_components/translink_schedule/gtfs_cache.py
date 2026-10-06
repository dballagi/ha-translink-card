"""Shared in-memory and persistent cache for static GTFS data."""

from __future__ import annotations

import asyncio
import csv
import hashlib
import logging
from dataclasses import dataclass, field
from datetime import UTC, datetime
from pathlib import Path
from zipfile import BadZipFile

from homeassistant.core import HomeAssistant

from .api import TransLinkApi
from .const import DOMAIN, STATIC_REFRESH_INTERVAL
from .gtfs_static import StaticFeed

_LOGGER = logging.getLogger(__name__)
_CACHE_REGISTRY = "static_feed_caches"
_PARSE_ERRORS = (BadZipFile, csv.Error, KeyError, UnicodeError, ValueError)


class StaticFeedCache:
    """Cache one static GTFS feed in memory and on disk."""

    def __init__(self, hass: HomeAssistant, url: str) -> None:
        self._hass = hass
        self._url = url
        digest = hashlib.sha256(url.encode()).hexdigest()[:16]
        self._path = Path(
            hass.config.path(".storage", f"{DOMAIN}_gtfs_{digest}.zip")
        )
        self._index_path = self._path.with_suffix(".sqlite")
        self._feed: StaticFeed | None = None
        self._digest: str | None = None
        self._loaded_at: datetime | None = None
        self._lock = asyncio.Lock()

    @property
    def feed(self) -> StaticFeed | None:
        """Return the currently parsed feed."""
        return self._feed

    async def async_get(self, api: TransLinkApi) -> StaticFeed:
        """Return a fresh parsed feed, loading it at most once concurrently."""
        async with self._lock:
            now = datetime.now(UTC)
            if (
                self._feed is not None
                and self._loaded_at is not None
                and now - self._loaded_at < STATIC_REFRESH_INTERVAL
            ):
                return self._feed

            payload = None
            if self._feed is None:
                payload = await self._hass.async_add_executor_job(
                    self._read_fresh_payload, now
                )
                if payload is not None:
                    try:
                        self._feed = await self._parse(payload)
                        self._digest = hashlib.sha256(payload).hexdigest()
                    except _PARSE_ERRORS as err:
                        _LOGGER.warning(
                            "Ignoring invalid cached GTFS feed at %s: %s",
                            self._path,
                            err,
                        )
                        await self._hass.async_add_executor_job(
                            self._remove_cached_payload
                        )

            if self._feed is None or payload is None:
                payload = await api.async_static_feed()
                digest = hashlib.sha256(payload).hexdigest()
                if self._feed is not None and digest == self._digest:
                    await self._hass.async_add_executor_job(
                        self._write_payload, payload
                    )
                    self._loaded_at = now
                    return self._feed

                self._feed = None
                feed = await self._parse(payload)
                await self._hass.async_add_executor_job(
                    self._write_payload, payload
                )
                self._feed = feed
                self._digest = digest

            self._loaded_at = now
            return self._feed

    async def _parse(self, payload: bytes) -> StaticFeed:
        return await self._hass.async_add_executor_job(
            StaticFeed, payload, self._index_path
        )

    def _read_fresh_payload(self, now: datetime) -> bytes | None:
        if not self._path.is_file():
            return None
        modified = datetime.fromtimestamp(self._path.stat().st_mtime, UTC)
        if now - modified >= STATIC_REFRESH_INTERVAL:
            return None
        return self._path.read_bytes()

    def _write_payload(self, payload: bytes) -> None:
        self._path.parent.mkdir(parents=True, exist_ok=True)
        temporary = self._path.with_suffix(".tmp")
        temporary.write_bytes(payload)
        temporary.replace(self._path)

    def _remove_cached_payload(self) -> None:
        self._path.unlink(missing_ok=True)

    def release(self) -> None:
        """Release parsed in-memory data."""
        self._feed = None
        self._digest = None


@dataclass
class StaticFeedCacheRecord:
    """Track owners of one shared static feed."""

    cache: StaticFeedCache
    owners: set[str] = field(default_factory=set)


def _registry(hass: HomeAssistant) -> dict[str, StaticFeedCacheRecord]:
    domain_data = hass.data.setdefault(DOMAIN, {})
    return domain_data.setdefault(_CACHE_REGISTRY, {})


async def async_get_static_feed(
    hass: HomeAssistant,
    url: str,
    api: TransLinkApi,
    owner: str | None = None,
) -> StaticFeed:
    """Return the shared feed for a static GTFS URL."""
    registry = _registry(hass)
    record = registry.get(url)
    if record is None:
        record = registry[url] = StaticFeedCacheRecord(
            StaticFeedCache(hass, url)
        )
    if owner is not None:
        record.owners.add(owner)
    return await record.cache.async_get(api)


def release_static_feed(
    hass: HomeAssistant, url: str, owner: str | None = None
) -> None:
    """Release one owner and evict an unused static feed."""
    registry = _registry(hass)
    record = registry.get(url)
    if record is None:
        return
    if owner is not None:
        record.owners.discard(owner)
    if not record.owners:
        record.cache.release()
        registry.pop(url, None)


def get_cached_static_feed(
    hass: HomeAssistant, url: str
) -> StaticFeed | None:
    """Return a parsed feed without acquiring or loading it."""
    record = _registry(hass).get(url)
    return record.cache.feed if record is not None else None
