"""Tests for GTFS schedule processing."""

from __future__ import annotations

import io
from datetime import date, datetime, timedelta
from zipfile import ZIP_DEFLATED, ZipFile
from zoneinfo import ZoneInfo

from custom_components.translink_schedule.gtfs_static import StaticFeed
from custom_components.translink_schedule.models import RealtimeUpdate


def _feed() -> bytes:
    files = {
        "stops.txt": (
            "stop_id,stop_code,stop_name\n"
            "STOP_A,50001,Main Street Northbound\n"
            "STOP_B,50002,Main Street Southbound\n"
        ),
        "routes.txt": (
            "route_id,route_short_name,route_long_name,route_type,"
            "route_color,route_text_color\n"
            "R3,3,Main/Downtown,3,005DAA,FFFFFF\n"
            "R10,10,Granville/UBC,3,00843D,FFFFFF\n"
        ),
        "trips.txt": (
            "route_id,service_id,trip_id,trip_headsign,direction_id\n"
            "R3,WEEKDAY,T1,Downtown,0\n"
            "R3,WEEKDAY,T2,Marine Drive,1\n"
            "R10,WEEKDAY,T3,UBC Exchange,0\n"
        ),
        "stop_times.txt": (
            "trip_id,arrival_time,departure_time,stop_id,stop_sequence\n"
            "T1,10:05:00,10:05:00,STOP_A,1\n"
            "T2,10:08:00,10:08:00,STOP_B,1\n"
            "T3,10:10:00,10:10:00,STOP_A,1\n"
        ),
        "calendar.txt": (
            "service_id,monday,tuesday,wednesday,thursday,friday,saturday,"
            "sunday,start_date,end_date\n"
            "WEEKDAY,1,1,1,1,1,0,0,20260101,20261231\n"
        ),
        "calendar_dates.txt": "service_id,date,exception_type\n",
    }
    output = io.BytesIO()
    with ZipFile(output, "w", ZIP_DEFLATED) as archive:
        for name, content in files.items():
            archive.writestr(name, content)
    return output.getvalue()


def test_multi_stop_departures_are_merged_and_sorted() -> None:
    feed = StaticFeed(_feed())
    timezone = ZoneInfo("America/Vancouver")
    realtime = {
        ("T1", "STOP_A", date(2026, 10, 6)): RealtimeUpdate(
            estimated_time=datetime(2026, 10, 6, 10, 7, tzinfo=timezone),
            delay_seconds=120,
            cancelled=False,
        )
    }

    departures = feed.departures(
        ["STOP_A", "STOP_B"],
        datetime(2026, 10, 6, 10, 0, tzinfo=timezone),
        realtime,
    )

    assert [departure.stop_id for departure in departures] == [
        "STOP_A",
        "STOP_B",
        "STOP_A",
    ]
    assert departures[0].delay_seconds == 120
    assert departures[0].realtime is True
    assert departures[1].destination == "Marine Drive"


def test_unknown_stop_validation() -> None:
    feed = StaticFeed(_feed())
    assert feed.validate_stops(["STOP_A", "MISSING"]) == ["MISSING"]
    assert feed.resolve_stop_ids(["50001", "STOP_B"]) == (
        ["STOP_A", "STOP_B"],
        [],
    )


def test_routes_for_stop_are_sorted() -> None:
    feed = StaticFeed(_feed())
    assert [route.route_id for route in feed.routes_for_stop("STOP_A")] == [
        "R10",
        "R3",
    ]


def test_route_filter_applies_only_to_its_stop() -> None:
    feed = StaticFeed(_feed())
    timezone = ZoneInfo("America/Vancouver")

    departures = feed.departures(
        ["STOP_A", "STOP_B"],
        datetime(2026, 10, 6, 10, 0, tzinfo=timezone),
        {},
        {"STOP_A": {"include_route_ids": ["R10"]}},
    )

    assert [(item.stop_id, item.route_id) for item in departures] == [
        ("STOP_B", "R3"),
        ("STOP_A", "R10"),
    ]


def test_destination_filter_is_case_insensitive() -> None:
    feed = StaticFeed(_feed())
    timezone = ZoneInfo("America/Vancouver")

    departures = feed.departures(
        ["STOP_A"],
        datetime(2026, 10, 6, 10, 0, tzinfo=timezone),
        {},
        {"STOP_A": {"destination_contains": ["downTOWN"]}},
    )

    assert [item.destination for item in departures] == ["Downtown"]


def test_route_and_destination_filters_both_must_match() -> None:
    feed = StaticFeed(_feed())
    timezone = ZoneInfo("America/Vancouver")

    departures = feed.departures(
        ["STOP_A"],
        datetime(2026, 10, 6, 10, 0, tzinfo=timezone),
        {},
        {
            "STOP_A": {
                "include_route_ids": ["R3"],
                "destination_contains": ["UBC"],
            }
        },
    )

    assert departures == []


def test_departure_window_is_configurable() -> None:
    feed = StaticFeed(_feed())
    timezone = ZoneInfo("America/Vancouver")

    departures = feed.departures(
        ["STOP_A", "STOP_B"],
        datetime(2026, 10, 6, 10, 0, tzinfo=timezone),
        {},
        departure_window=timedelta(minutes=6),
    )

    assert [item.trip_id for item in departures] == ["T1"]


def test_cancelled_departure_uses_configured_retention() -> None:
    feed = StaticFeed(_feed())
    timezone = ZoneInfo("America/Vancouver")
    realtime = {
        ("T1", "STOP_A", date(2026, 10, 6)): RealtimeUpdate(
            estimated_time=None,
            delay_seconds=None,
            cancelled=True,
        )
    }

    departures = feed.departures(
        ["STOP_A"],
        datetime(2026, 10, 6, 10, 6, tzinfo=timezone),
        realtime,
        cancelled_retention=timedelta(minutes=2),
    )

    assert departures[0].trip_id == "T1"
    assert departures[0].cancelled is True
