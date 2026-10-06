"""Data models for TransLink schedule data."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime


@dataclass(frozen=True, slots=True)
class Stop:
    """A GTFS stop."""

    stop_id: str
    name: str
    code: str | None


@dataclass(frozen=True, slots=True)
class Route:
    """A GTFS route."""

    route_id: str
    short_name: str
    long_name: str
    route_type: int
    color: str | None
    text_color: str | None


@dataclass(frozen=True, slots=True)
class Trip:
    """A GTFS trip."""

    trip_id: str
    route_id: str
    service_id: str
    headsign: str
    direction_id: int | None


@dataclass(frozen=True, slots=True)
class StopTime:
    """A scheduled departure at a stop."""

    trip_id: str
    stop_id: str
    departure_seconds: int
    stop_sequence: int


@dataclass(frozen=True, slots=True)
class Calendar:
    """A GTFS service calendar."""

    service_id: str
    weekdays: tuple[bool, bool, bool, bool, bool, bool, bool]
    start_date: date
    end_date: date


@dataclass(frozen=True, slots=True)
class RealtimeUpdate:
    """Realtime information for a trip at a stop."""

    estimated_time: datetime | None
    delay_seconds: int | None
    cancelled: bool


@dataclass(frozen=True, slots=True)
class ServiceAlert:
    """A normalized GTFS-Realtime service alert."""

    header: str
    description: str
    url: str | None
    route_ids: tuple[str, ...]
    stop_ids: tuple[str, ...]
    active_periods: tuple[
        tuple[datetime | None, datetime | None], ...
    ]

    def is_active(self, now: datetime) -> bool:
        """Return whether any configured active period contains now."""
        return not self.active_periods or any(
            (start is None or start <= now)
            and (end is None or now <= end)
            for start, end in self.active_periods
        )

    def as_dict(self) -> dict[str, object]:
        """Return a JSON-serializable representation."""
        return {
            "header": self.header,
            "description": self.description,
            "url": self.url,
            "route_ids": list(self.route_ids),
            "stop_ids": list(self.stop_ids),
            "active_periods": [
                {
                    "start": start.isoformat() if start else None,
                    "end": end.isoformat() if end else None,
                }
                for start, end in self.active_periods
            ],
        }


@dataclass(frozen=True, slots=True)
class Departure:
    """A normalized departure exposed to Home Assistant."""

    stop_id: str
    stop_name: str
    trip_id: str
    route_id: str
    route_name: str
    route_long_name: str
    route_type: int
    route_color: str | None
    route_text_color: str | None
    destination: str
    direction_id: int | None
    scheduled_time: datetime
    estimated_time: datetime
    delay_seconds: int
    cancelled: bool
    realtime: bool

    def as_dict(self) -> dict[str, object]:
        """Return a JSON-serializable representation."""
        return {
            "stop_id": self.stop_id,
            "stop_name": self.stop_name,
            "trip_id": self.trip_id,
            "route_id": self.route_id,
            "route_name": self.route_name,
            "route_long_name": self.route_long_name,
            "route_type": self.route_type,
            "route_color": self.route_color,
            "route_text_color": self.route_text_color,
            "destination": self.destination,
            "direction_id": self.direction_id,
            "scheduled_time": self.scheduled_time.isoformat(),
            "estimated_time": self.estimated_time.isoformat(),
            "delay_seconds": self.delay_seconds,
            "cancelled": self.cancelled,
            "realtime": self.realtime,
        }
