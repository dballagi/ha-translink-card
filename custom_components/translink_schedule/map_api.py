"""Authenticated trip map API for the TransLink card."""

from __future__ import annotations

import math

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant

from .api import TransLinkApiError
from .const import CONF_STOP_IDS, DOMAIN
from .coordinator import TransLinkCoordinator

TRIP_MAP_URL = "/api/translink_schedule/trip-map"


class TransLinkTripMapView(HomeAssistantView):
    """Return one departure's planned shape and last vehicle position."""

    url = TRIP_MAP_URL
    name = "api:translink_schedule:trip_map"
    requires_auth = True

    async def get(self, request: web.Request) -> web.Response:
        """Return map data scoped to a configured departure board."""
        hass: HomeAssistant = request.app["hass"]
        entry_id = request.query.get("entry_id", "")
        trip_id = request.query.get("trip_id", "")
        stop_id = request.query.get("stop_id", "")
        if not entry_id or not trip_id or not stop_id:
            raise web.HTTPBadRequest(
                text="entry_id, trip_id, and stop_id are required"
            )

        entry = hass.config_entries.async_get_entry(entry_id)
        if entry is None or entry.domain != DOMAIN:
            raise web.HTTPNotFound(text="TransLink board not found")
        stop_ids = entry.options.get(
            CONF_STOP_IDS, entry.data.get(CONF_STOP_IDS, [])
        )
        if stop_id not in stop_ids:
            raise web.HTTPNotFound(text="Stop is not configured for this board")

        coordinator: TransLinkCoordinator | None = entry.runtime_data
        feed = coordinator.static_feed if coordinator is not None else None
        if feed is None:
            raise web.HTTPServiceUnavailable(text="Static GTFS data unavailable")
        trip = feed.trips.get(trip_id)
        stop = feed.stops.get(stop_id)
        if trip is None or stop is None:
            raise web.HTTPNotFound(text="Trip or stop not found")
        route = feed.routes.get(trip.route_id)
        points = _bounded_shape(feed.shape_for_trip(trip_id))
        if route is None or not points:
            raise web.HTTPNotFound(text="Planned trip shape unavailable")
        stop_latitude = (
            stop.latitude if stop.latitude is not None else points[0][0]
        )
        stop_longitude = (
            stop.longitude if stop.longitude is not None else points[0][1]
        )

        vehicle_error = None
        vehicle = None
        try:
            vehicle = (await coordinator.async_vehicle_positions()).get(
                trip_id
            )
        except (OSError, TransLinkApiError, ValueError) as err:
            vehicle_error = str(err)

        return web.json_response(
            {
                "trip_id": trip.trip_id,
                "route_id": route.route_id,
                "route_name": route.short_name or route.long_name,
                "route_color": route.color,
                "destination": trip.headsign,
                "shape": [
                    {"latitude": latitude, "longitude": longitude}
                    for latitude, longitude in points
                ],
                "boarding_stop": {
                    "stop_id": stop.stop_id,
                    "name": stop.name,
                    "latitude": stop_latitude,
                    "longitude": stop_longitude,
                },
                "destination_point": {
                    "latitude": points[-1][0],
                    "longitude": points[-1][1],
                },
                "vehicle": (
                    {
                        "vehicle_id": vehicle.vehicle_id,
                        "vehicle_label": vehicle.vehicle_label,
                        "latitude": vehicle.latitude,
                        "longitude": vehicle.longitude,
                        "bearing": vehicle.bearing,
                        "speed": vehicle.speed,
                        "timestamp": (
                            vehicle.timestamp.isoformat()
                            if vehicle.timestamp
                            else None
                        ),
                    }
                    if vehicle is not None
                    else None
                ),
                "vehicle_error": vehicle_error,
            }
        )


def _bounded_shape(
    points: list[tuple[float, float]], limit: int = 1_000
) -> list[tuple[float, float]]:
    """Bound payload size while preserving the route endpoints."""
    if len(points) <= limit:
        return points
    step = math.ceil((len(points) - 1) / (limit - 1))
    output = points[::step]
    if output[-1] != points[-1]:
        output.append(points[-1])
    return output
