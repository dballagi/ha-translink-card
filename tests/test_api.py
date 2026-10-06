"""Tests for GTFS-Realtime normalization."""

from __future__ import annotations

from datetime import UTC, date, datetime

from google.transit import gtfs_realtime_pb2

from custom_components.translink_schedule.api import TransLinkApi
from custom_components.translink_schedule.const import TRIP_LEVEL_STOP_ID


class FakeResponse:
    """Minimal aiohttp response context manager."""

    def __init__(self, payload: bytes) -> None:
        self._payload = payload

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, traceback) -> None:
        return None

    def raise_for_status(self) -> None:
        """Accept the fake response."""

    async def read(self) -> bytes:
        """Return the configured protobuf."""
        return self._payload


class FakeSession:
    """Return one protobuf response for every request."""

    def __init__(self, payload: bytes) -> None:
        self._payload = payload

    def get(self, url, params=None, timeout=None):
        return FakeResponse(self._payload)


def _api(feed: gtfs_realtime_pb2.FeedMessage) -> TransLinkApi:
    return TransLinkApi(
        FakeSession(feed.SerializeToString()),
        "key",
        "static",
        "realtime",
        "alerts",
    )


def _feed() -> gtfs_realtime_pb2.FeedMessage:
    feed = gtfs_realtime_pb2.FeedMessage()
    feed.header.gtfs_realtime_version = "2.0"
    return feed


async def test_trip_level_cancellation_without_stop_updates() -> None:
    feed = _feed()
    entity = feed.entity.add()
    entity.id = "cancelled"
    trip = entity.trip_update.trip
    trip.trip_id = "cancelled-trip"
    trip.start_date = "20261006"
    trip.schedule_relationship = (
        gtfs_realtime_pb2.TripDescriptor.CANCELED
    )

    updates = await _api(feed).async_realtime_updates()

    update = updates[
        ("cancelled-trip", TRIP_LEVEL_STOP_ID, date(2026, 10, 6))
    ]
    assert update.cancelled is True


async def test_all_alert_active_periods_are_retained() -> None:
    feed = _feed()
    entity = feed.entity.add()
    entity.id = "alert"
    alert = entity.alert
    alert.header_text.translation.add().text = "Service notice"
    first = alert.active_period.add()
    first.start = int(datetime(2026, 10, 6, 8, tzinfo=UTC).timestamp())
    first.end = int(datetime(2026, 10, 6, 9, tzinfo=UTC).timestamp())
    second = alert.active_period.add()
    second.start = int(datetime(2026, 10, 6, 12, tzinfo=UTC).timestamp())
    second.end = int(datetime(2026, 10, 6, 13, tzinfo=UTC).timestamp())

    alerts = await _api(feed).async_service_alerts()

    assert len(alerts[0].active_periods) == 2
    assert alerts[0].is_active(
        datetime(2026, 10, 6, 12, 30, tzinfo=UTC)
    )
