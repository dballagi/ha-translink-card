"""Client for TransLink GTFS feeds."""

from __future__ import annotations

from datetime import UTC, date, datetime
from typing import Any

from aiohttp import ClientResponseError, ClientSession
from google.protobuf.message import DecodeError
from google.transit import gtfs_realtime_pb2

from .const import TRIP_LEVEL_STOP_ID
from .models import RealtimeUpdate, ServiceAlert, VehiclePosition


class TransLinkApiError(Exception):
    """Raised when a TransLink feed cannot be retrieved or decoded."""


class TransLinkApi:
    """Fetch TransLink static and realtime data."""

    def __init__(
        self,
        session: ClientSession,
        api_key: str,
        static_url: str,
        realtime_url: str,
        alerts_url: str,
        vehicle_positions_url: str,
    ) -> None:
        self._session = session
        self._api_key = api_key
        self._static_url = static_url
        self._realtime_url = realtime_url
        self._alerts_url = alerts_url
        self._vehicle_positions_url = vehicle_positions_url

    async def _get(self, url: str, *, authenticated: bool = False) -> bytes:
        params = {"apikey": self._api_key} if authenticated else None
        try:
            async with self._session.get(
                url, params=params, timeout=30
            ) as response:
                response.raise_for_status()
                return await response.read()
        except (ClientResponseError, TimeoutError, OSError) as err:
            raise TransLinkApiError(f"Unable to retrieve {url}: {err}") from err

    async def async_static_feed(self) -> bytes:
        """Download the GTFS static ZIP."""
        return await self._get(self._static_url)

    async def async_realtime_updates(
        self,
    ) -> dict[tuple[str, str, date | None], RealtimeUpdate]:
        """Download and index trip updates by trip and stop."""
        payload = await self._get(self._realtime_url, authenticated=True)
        feed = gtfs_realtime_pb2.FeedMessage()
        try:
            feed.ParseFromString(payload)
        except DecodeError as err:
            raise TransLinkApiError("Invalid GTFS-Realtime trip update feed") from err

        updates: dict[tuple[str, str, date | None], RealtimeUpdate] = {}
        for entity in feed.entity:
            if not entity.HasField("trip_update"):
                continue
            trip_update = entity.trip_update
            trip_id = trip_update.trip.trip_id
            service_date = (
                datetime.strptime(trip_update.trip.start_date, "%Y%m%d").date()
                if trip_update.trip.start_date
                else None
            )
            cancelled = (
                trip_update.trip.schedule_relationship
                == gtfs_realtime_pb2.TripDescriptor.CANCELED
            )
            trip_delay = (
                trip_update.delay
                if trip_update.HasField("delay")
                else None
            )
            if cancelled or trip_delay is not None:
                updates[
                    (trip_id, TRIP_LEVEL_STOP_ID, service_date)
                ] = RealtimeUpdate(
                    estimated_time=None,
                    delay_seconds=trip_delay,
                    cancelled=cancelled,
                )
            for stop_update in trip_update.stop_time_update:
                stop_id = stop_update.stop_id
                if not trip_id or not stop_id:
                    continue
                event: Any = (
                    stop_update.departure
                    if stop_update.HasField("departure")
                    else stop_update.arrival
                    if stop_update.HasField("arrival")
                    else None
                )
                estimated_time = (
                    datetime.fromtimestamp(event.time, UTC)
                    if event is not None and event.HasField("time")
                    else None
                )
                delay = (
                    event.delay
                    if event is not None and event.HasField("delay")
                    else None
                )
                stop_cancelled = (
                    stop_update.schedule_relationship
                    == gtfs_realtime_pb2.TripUpdate.StopTimeUpdate.SKIPPED
                )
                updates[(trip_id, stop_id, service_date)] = RealtimeUpdate(
                    estimated_time=estimated_time,
                    delay_seconds=delay,
                    cancelled=cancelled or stop_cancelled,
                )
        return updates

    async def async_service_alerts(self) -> list[ServiceAlert]:
        """Download and normalize service alerts."""
        payload = await self._get(self._alerts_url, authenticated=True)
        feed = gtfs_realtime_pb2.FeedMessage()
        try:
            feed.ParseFromString(payload)
        except DecodeError as err:
            raise TransLinkApiError("Invalid GTFS-Realtime alerts feed") from err

        alerts: list[ServiceAlert] = []
        for entity in feed.entity:
            if not entity.HasField("alert"):
                continue
            alert = entity.alert
            routes = tuple(
                informed.route_id
                for informed in alert.informed_entity
                if informed.route_id
            )
            stops = tuple(
                informed.stop_id
                for informed in alert.informed_entity
                if informed.stop_id
            )
            active_periods = tuple(
                (
                    (
                        datetime.fromtimestamp(period.start, UTC)
                        if period.HasField("start")
                        else None
                    ),
                    (
                        datetime.fromtimestamp(period.end, UTC)
                        if period.HasField("end")
                        else None
                    ),
                )
                for period in alert.active_period
            )
            alerts.append(
                ServiceAlert(
                    header=_translated_text(alert.header_text),
                    description=_translated_text(alert.description_text),
                    url=_translated_text(alert.url) or None,
                    route_ids=routes,
                    stop_ids=stops,
                    active_periods=active_periods,
                )
            )
        return alerts

    async def async_vehicle_positions(self) -> dict[str, VehiclePosition]:
        """Download and index last-reported vehicle positions by trip."""
        payload = await self._get(
            self._vehicle_positions_url, authenticated=True
        )
        feed = gtfs_realtime_pb2.FeedMessage()
        try:
            feed.ParseFromString(payload)
        except DecodeError as err:
            raise TransLinkApiError(
                "Invalid GTFS-Realtime vehicle position feed"
            ) from err

        positions: dict[str, VehiclePosition] = {}
        for entity in feed.entity:
            if not entity.HasField("vehicle"):
                continue
            vehicle = entity.vehicle
            trip_id = vehicle.trip.trip_id
            if not trip_id or not vehicle.HasField("position"):
                continue
            position = vehicle.position
            positions[trip_id] = VehiclePosition(
                trip_id=trip_id,
                route_id=vehicle.trip.route_id or None,
                vehicle_id=vehicle.vehicle.id or None,
                vehicle_label=vehicle.vehicle.label or None,
                latitude=position.latitude,
                longitude=position.longitude,
                bearing=(
                    position.bearing
                    if position.HasField("bearing")
                    else None
                ),
                speed=(
                    position.speed
                    if position.HasField("speed")
                    else None
                ),
                timestamp=(
                    datetime.fromtimestamp(vehicle.timestamp, UTC)
                    if vehicle.HasField("timestamp")
                    else None
                ),
            )
        return positions

    async def async_validate_key(self) -> None:
        """Validate the API key by retrieving realtime data."""
        await self.async_realtime_updates()


def _translated_text(value: Any) -> str:
    """Return the first available translation from a GTFS translated string."""
    return value.translation[0].text if value.translation else ""
