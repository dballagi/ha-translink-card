"""Tests for integration setup."""

from datetime import UTC, datetime
from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock

import custom_components.translink_schedule as integration
from custom_components.translink_schedule.const import CARD_FILENAME, CARD_URL
from custom_components.translink_schedule.models import Departure
from custom_components.translink_schedule.sensor import TransLinkScheduleSensor


async def test_card_static_path_is_registered() -> None:
    register = AsyncMock()
    hass = SimpleNamespace(http=SimpleNamespace(async_register_static_paths=register))

    assert await integration.async_setup(hass, {}) is True

    register.assert_awaited_once()
    config = register.await_args.args[0][0]
    assert config.url_path == CARD_URL
    assert config.path.endswith(CARD_FILENAME)
    assert config.cache_headers is False


async def test_options_update_refreshes_entities_without_reload() -> None:
    coordinator = SimpleNamespace(async_update_listeners=Mock())
    entry = SimpleNamespace(runtime_data=coordinator)

    await integration._async_update_listener(SimpleNamespace(), entry)

    coordinator.async_update_listeners.assert_called_once_with()


def test_sensor_state_skips_cancelled_departures() -> None:
    cancelled = _departure(
        datetime(2026, 10, 6, 10, tzinfo=UTC),
        cancelled=True,
    )
    active = _departure(
        datetime(2026, 10, 6, 10, 5, tzinfo=UTC),
        cancelled=False,
    )
    sensor = SimpleNamespace(_departures=lambda: [cancelled, active])

    value = TransLinkScheduleSensor.native_value.fget(sensor)

    assert value == active.estimated_time


def _departure(estimated_time: datetime, *, cancelled: bool) -> Departure:
    return Departure(
        stop_id="stop",
        stop_name="Stop",
        trip_id="trip",
        route_id="route",
        route_name="1",
        route_long_name="Route",
        route_type=3,
        route_color=None,
        route_text_color=None,
        destination="Downtown",
        direction_id=0,
        scheduled_time=estimated_time,
        estimated_time=estimated_time,
        delay_seconds=0,
        cancelled=cancelled,
        realtime=True,
    )
