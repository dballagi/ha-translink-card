"""Tests for integration setup."""

from datetime import UTC, datetime, timedelta
from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock

import custom_components.translink_schedule as integration
from custom_components.translink_schedule.const import (
    CARD_CHUNKS_FOLDER,
    CARD_CHUNKS_URL,
    CARD_FILENAME,
    CARD_URL,
)
from custom_components.translink_schedule.models import Departure
from custom_components.translink_schedule.sensor import (
    ATTRIBUTE_SIZE_BUDGET,
    MAX_EXPOSED_DEPARTURES_PER_STOP,
    TransLinkScheduleSensor,
    _attribute_size,
    _departure_limit,
    _fit_attributes_to_budget,
)


async def test_card_static_path_is_registered() -> None:
    register = AsyncMock()
    register_view = Mock()
    hass = SimpleNamespace(
        http=SimpleNamespace(
            async_register_static_paths=register,
            register_view=register_view,
        )
    )

    assert await integration.async_setup(hass, {}) is True

    register.assert_awaited_once()
    configs = register.await_args.args[0]
    config = configs[0]
    assert config.url_path == CARD_URL
    assert config.path.endswith(CARD_FILENAME)
    assert config.cache_headers is False
    assert configs[1].url_path == CARD_CHUNKS_URL
    assert configs[1].path.endswith(CARD_CHUNKS_FOLDER)
    register_view.assert_called_once()


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


def test_departures_are_cached_for_coordinator_snapshot() -> None:
    departures = [_departure(datetime(2026, 10, 6, 10, tzinfo=UTC))]
    feed = SimpleNamespace(departures=Mock(return_value=departures))
    coordinator = SimpleNamespace(
        static_feed=feed,
        data={"realtime": {}},
    )
    sensor = SimpleNamespace(
        coordinator=coordinator,
        _stop_ids=["stop"],
        _stop_filters={},
        _departure_window=timedelta(hours=3),
        _cancelled_retention=timedelta(minutes=1),
        _departure_cache_key=None,
        _departure_cache=[],
    )

    first = TransLinkScheduleSensor._departures(sensor)
    second = TransLinkScheduleSensor._departures(sensor)

    assert first is second
    feed.departures.assert_called_once()


def test_departure_limit_respects_supported_card_maximum() -> None:
    assert _departure_limit(None) == MAX_EXPOSED_DEPARTURES_PER_STOP
    assert _departure_limit(3) == 3
    assert _departure_limit(50) == MAX_EXPOSED_DEPARTURES_PER_STOP


def test_sensor_attributes_are_trimmed_to_size_budget() -> None:
    departures = [
        {
            "estimated_time": f"2026-10-06T10:{minute:02}:00+00:00",
            "destination": "D" * 600,
        }
        for minute in range(30)
    ]
    first_departure = departures[0]
    attributes = {
        "stops": [{"departures": departures}],
        "alerts": [],
        "departure_count": len(departures),
        "attributes_truncated": False,
    }

    _fit_attributes_to_budget(attributes)

    assert _attribute_size(attributes) <= ATTRIBUTE_SIZE_BUDGET
    assert attributes["attributes_truncated"] is True
    assert attributes["departure_count"] == len(
        attributes["stops"][0]["departures"]
    )
    assert attributes["stops"][0]["departures"][0] == first_departure


def _departure(
    estimated_time: datetime, *, cancelled: bool = False
) -> Departure:
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
