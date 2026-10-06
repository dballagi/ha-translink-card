"""Tests for shared GTFS and coordinator runtime state."""

from __future__ import annotations

import asyncio
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import AsyncMock

from custom_components.translink_schedule import coordinator as coordinator_module
from custom_components.translink_schedule.api import TransLinkApiError
from custom_components.translink_schedule.coordinator import (
    TransLinkCoordinator,
    async_get_shared_coordinator,
    release_shared_coordinator,
)
from custom_components.translink_schedule.gtfs_cache import (
    async_get_static_feed,
    release_static_feed,
)
from custom_components.translink_schedule.realtime_cache import (
    async_get_realtime_updates,
)
from tests.test_gtfs_static import _feed


class FakeHomeAssistant:
    """Minimal Home Assistant runtime for cache tests."""

    def __init__(self, root: Path) -> None:
        self.data: dict[str, object] = {}
        self.config = SimpleNamespace(
            path=lambda *parts: str(root.joinpath(*parts))
        )

    async def async_add_executor_job(self, target, *args):
        return await asyncio.to_thread(target, *args)

    def async_create_task(self, target, name=None, eager_start=True):
        return asyncio.create_task(target, name=name)


def _entry(entry_id: str = "entry") -> SimpleNamespace:
    return SimpleNamespace(
        entry_id=entry_id,
        data={
            "api_key": "test-key",
            "static_url": "https://example.test/static.zip",
            "realtime_url": "https://example.test/realtime",
            "alerts_url": "https://example.test/alerts",
        }
    )


async def test_concurrent_static_feed_requests_download_once(tmp_path) -> None:
    hass = FakeHomeAssistant(tmp_path)
    api = SimpleNamespace(async_static_feed=AsyncMock(return_value=_feed()))

    first, second = await asyncio.gather(
        async_get_static_feed(hass, _entry().data["static_url"], api),
        async_get_static_feed(hass, _entry().data["static_url"], api),
    )

    assert first is second
    api.async_static_feed.assert_awaited_once_with()


async def test_static_feed_uses_persistent_cache_after_restart(tmp_path) -> None:
    first_hass = FakeHomeAssistant(tmp_path)
    first_api = SimpleNamespace(async_static_feed=AsyncMock(return_value=_feed()))
    await async_get_static_feed(
        first_hass, _entry().data["static_url"], first_api
    )

    restarted_hass = FakeHomeAssistant(tmp_path)
    restarted_api = SimpleNamespace(async_static_feed=AsyncMock())
    feed = await async_get_static_feed(
        restarted_hass, _entry().data["static_url"], restarted_api
    )

    assert "STOP_A" in feed.stops
    restarted_api.async_static_feed.assert_not_awaited()


async def test_equivalent_entries_share_coordinator_initialization(
    tmp_path, monkeypatch
) -> None:
    hass = FakeHomeAssistant(tmp_path)
    coordinator = SimpleNamespace()
    create = AsyncMock(return_value=coordinator)
    monkeypatch.setattr(
        coordinator_module, "_async_create_coordinator", create
    )

    first, second = await asyncio.gather(
        async_get_shared_coordinator(hass, _entry("first")),
        async_get_shared_coordinator(hass, _entry("second")),
    )

    assert first is coordinator
    assert second is coordinator
    create.assert_awaited_once()


async def test_shared_coordinator_is_released_after_last_entry(
    tmp_path, monkeypatch
) -> None:
    hass = FakeHomeAssistant(tmp_path)
    coordinator = SimpleNamespace()
    create = AsyncMock(return_value=coordinator)
    monkeypatch.setattr(
        coordinator_module, "_async_create_coordinator", create
    )
    first = _entry("first")
    second = _entry("second")
    await async_get_shared_coordinator(hass, first)
    await async_get_shared_coordinator(hass, second)

    release_shared_coordinator(hass, first)
    assert hass.data["translink_schedule"]["coordinator_tasks"]
    release_shared_coordinator(hass, second)

    assert hass.data["translink_schedule"]["coordinator_tasks"] == {}


async def test_unowned_static_feed_can_be_released(tmp_path) -> None:
    hass = FakeHomeAssistant(tmp_path)
    api = SimpleNamespace(async_static_feed=AsyncMock(return_value=_feed()))
    url = _entry().data["static_url"]
    await async_get_static_feed(hass, url, api)

    release_static_feed(hass, url)

    assert hass.data["translink_schedule"]["static_feed_caches"] == {}


async def test_alert_failure_is_isolated_from_departures() -> None:
    coordinator = object.__new__(TransLinkCoordinator)
    coordinator.api = SimpleNamespace(
        async_service_alerts=AsyncMock(
            side_effect=TransLinkApiError("alerts unavailable")
        )
    )

    alerts, error = await coordinator._async_service_alerts()

    assert alerts == []
    assert error == "alerts unavailable"


async def test_realtime_validation_and_setup_share_decoded_feed(
    tmp_path,
) -> None:
    hass = FakeHomeAssistant(tmp_path)
    updates = {("trip", "stop", None): SimpleNamespace()}
    api = SimpleNamespace(async_realtime_updates=AsyncMock(return_value=updates))

    first, second = await asyncio.gather(
        async_get_realtime_updates(hass, "configuration", api),
        async_get_realtime_updates(hass, "configuration", api),
    )

    assert first is updates
    assert second is updates
    api.async_realtime_updates.assert_awaited_once_with()
