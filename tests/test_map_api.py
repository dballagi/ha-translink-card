"""Tests for the authenticated trip map response."""

from __future__ import annotations

import json
from datetime import UTC, datetime
from types import SimpleNamespace
from unittest.mock import AsyncMock

from custom_components.translink_schedule.const import CONF_STOP_IDS, DOMAIN
from custom_components.translink_schedule.map_api import TransLinkTripMapView
from custom_components.translink_schedule.models import (
    Route,
    Stop,
    Trip,
    VehiclePosition,
)


async def test_trip_map_returns_shape_and_matching_vehicle() -> None:
    feed = SimpleNamespace(
        trips={
            "trip": Trip(
                "trip",
                "route",
                "service",
                "Downtown",
                0,
                "shape",
            )
        },
        routes={
            "route": Route(
                "route", "3", "Main/Downtown", 3, "005DAA", "FFFFFF"
            )
        },
        stops={
            "stop": Stop(
                "stop",
                "Main Street",
                "50001",
                49.28,
                -123.12,
            )
        },
        shape_for_trip=lambda trip_id: [
            (49.27, -123.11),
            (49.28, -123.12),
        ],
    )
    vehicle = VehiclePosition(
        trip_id="trip",
        route_id="route",
        vehicle_id="vehicle",
        vehicle_label="2101",
        latitude=49.275,
        longitude=-123.115,
        bearing=90,
        speed=None,
        timestamp=datetime(2026, 10, 6, 19, 30, tzinfo=UTC),
    )
    coordinator = SimpleNamespace(
        static_feed=feed,
        async_vehicle_positions=AsyncMock(return_value={"trip": vehicle}),
    )
    entry = SimpleNamespace(
        domain=DOMAIN,
        data={CONF_STOP_IDS: ["stop"]},
        options={},
        runtime_data=coordinator,
    )
    hass = SimpleNamespace(
        config_entries=SimpleNamespace(
            async_get_entry=lambda entry_id: entry if entry_id == "entry" else None
        )
    )
    request = SimpleNamespace(
        app={"hass": hass},
        query={"entry_id": "entry", "trip_id": "trip", "stop_id": "stop"},
    )

    response = await TransLinkTripMapView().get(request)
    payload = json.loads(response.text)

    assert payload["shape"][-1] == {
        "latitude": 49.28,
        "longitude": -123.12,
    }
    assert payload["boarding_stop"]["name"] == "Main Street"
    assert payload["vehicle"]["vehicle_label"] == "2101"
