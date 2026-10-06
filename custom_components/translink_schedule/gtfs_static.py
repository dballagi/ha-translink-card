"""Parse and query the TransLink static GTFS feed."""

from __future__ import annotations

import csv
import hashlib
import io
import sqlite3
from collections import defaultdict
from collections.abc import Iterator, Mapping
from datetime import date, datetime, time, timedelta
from pathlib import Path
from zipfile import ZipFile
from zoneinfo import ZoneInfo

from .const import DEPARTURE_WINDOW, MAX_DEPARTURES_PER_STOP
from .models import Calendar, Departure, RealtimeUpdate, Route, Stop, StopTime, Trip

VANCOUVER_TZ = ZoneInfo("America/Vancouver")


def _rows(archive: ZipFile, filename: str) -> Iterator[dict[str, str]]:
    with archive.open(filename) as source:
        text = io.TextIOWrapper(source, encoding="utf-8-sig", newline="")
        yield from csv.DictReader(text)


def _gtfs_date(value: str) -> date:
    return datetime.strptime(value, "%Y%m%d").date()


def _seconds(value: str) -> int:
    hours, minutes, seconds = (int(part) for part in value.split(":"))
    return hours * 3600 + minutes * 60 + seconds


class StaticFeed:
    """An indexed subset of a static GTFS feed."""

    def __init__(
        self, payload: bytes, stop_times_database: Path | None = None
    ) -> None:
        """Parse and index a GTFS ZIP payload."""
        self._stop_times_database = stop_times_database
        self.stop_times: dict[str, list[StopTime]] = defaultdict(list)
        with ZipFile(io.BytesIO(payload)) as archive:
            self.stops = {
                row["stop_id"]: Stop(
                    stop_id=row["stop_id"],
                    name=row["stop_name"],
                    code=row.get("stop_code") or None,
                )
                for row in _rows(archive, "stops.txt")
            }
            self.routes = {
                row["route_id"]: Route(
                    route_id=row["route_id"],
                    short_name=row.get("route_short_name", ""),
                    long_name=row.get("route_long_name", ""),
                    route_type=int(row["route_type"]),
                    color=row.get("route_color") or None,
                    text_color=row.get("route_text_color") or None,
                )
                for row in _rows(archive, "routes.txt")
            }
            self.trips = {
                row["trip_id"]: Trip(
                    trip_id=row["trip_id"],
                    route_id=row["route_id"],
                    service_id=row["service_id"],
                    headsign=row.get("trip_headsign", ""),
                    direction_id=(
                        int(row["direction_id"]) if row.get("direction_id") else None
                    ),
                )
                for row in _rows(archive, "trips.txt")
            }
            self.calendars = {
                row["service_id"]: Calendar(
                    service_id=row["service_id"],
                    weekdays=tuple(
                        row[weekday] == "1"
                        for weekday in (
                            "monday",
                            "tuesday",
                            "wednesday",
                            "thursday",
                            "friday",
                            "saturday",
                            "sunday",
                        )
                    ),
                    start_date=_gtfs_date(row["start_date"]),
                    end_date=_gtfs_date(row["end_date"]),
                )
                for row in _rows(archive, "calendar.txt")
            }
            self.calendar_dates: dict[date, dict[str, int]] = defaultdict(dict)
            if "calendar_dates.txt" in archive.namelist():
                for row in _rows(archive, "calendar_dates.txt"):
                    self.calendar_dates[_gtfs_date(row["date"])][row["service_id"]] = (
                        int(row["exception_type"])
                    )

            if stop_times_database is None:
                self._load_stop_times(archive)
            else:
                self._ensure_stop_times_database(
                    archive,
                    hashlib.sha256(payload).hexdigest(),
                    stop_times_database,
                )

    def _load_stop_times(self, archive: ZipFile) -> None:
        for row in _rows(archive, "stop_times.txt"):
            stop_time = _stop_time_from_row(row)
            if stop_time is not None:
                self.stop_times[stop_time.stop_id].append(stop_time)
        for values in self.stop_times.values():
            values.sort(key=lambda item: item.departure_seconds)

    def _ensure_stop_times_database(
        self, archive: ZipFile, digest: str, database: Path
    ) -> None:
        if _database_matches(database, digest):
            return

        database.parent.mkdir(parents=True, exist_ok=True)
        temporary = database.with_suffix(".tmp")
        temporary.unlink(missing_ok=True)
        connection = sqlite3.connect(temporary)
        try:
            connection.executescript(
                """
                PRAGMA journal_mode = OFF;
                PRAGMA synchronous = OFF;
                PRAGMA temp_store = FILE;
                PRAGMA cache_size = -4096;
                CREATE TABLE metadata (
                    key TEXT PRIMARY KEY,
                    value TEXT NOT NULL
                );
                CREATE TABLE stop_times (
                    stop_id TEXT NOT NULL,
                    trip_id TEXT NOT NULL,
                    departure_seconds INTEGER NOT NULL,
                    stop_sequence INTEGER NOT NULL
                );
                CREATE INDEX stop_times_stop_id
                ON stop_times (stop_id, departure_seconds);
                """
            )
            # Maintain the index during inserts instead of sorting all rows at once.
            connection.execute(
                "INSERT INTO metadata (key, value) VALUES ('digest', ?)",
                (digest,),
            )
            batch: list[tuple[str, str, int, int]] = []
            for row in _rows(archive, "stop_times.txt"):
                stop_time = _stop_time_from_row(row)
                if stop_time is None:
                    continue
                batch.append(
                    (
                        stop_time.stop_id,
                        stop_time.trip_id,
                        stop_time.departure_seconds,
                        stop_time.stop_sequence,
                    )
                )
                if len(batch) >= 1_000:
                    _insert_stop_times(connection, batch)
                    batch.clear()
            if batch:
                _insert_stop_times(connection, batch)
            connection.commit()
        finally:
            connection.close()
        temporary.replace(database)

    def _stop_times_for_stop(self, stop_id: str) -> list[StopTime]:
        cached = self.stop_times.get(stop_id)
        if cached is not None:
            return cached
        if self._stop_times_database is None:
            return []

        connection = sqlite3.connect(self._stop_times_database)
        try:
            rows = connection.execute(
                """
                SELECT trip_id, departure_seconds, stop_sequence
                FROM stop_times
                WHERE stop_id = ?
                ORDER BY departure_seconds
                """,
                (stop_id,),
            )
            values = [
                StopTime(
                    trip_id=trip_id,
                    stop_id=stop_id,
                    departure_seconds=departure_seconds,
                    stop_sequence=stop_sequence,
                )
                for trip_id, departure_seconds, stop_sequence in rows
            ]
        finally:
            connection.close()
        self.stop_times[stop_id] = values
        return values

    def validate_stops(self, stop_ids: list[str]) -> list[str]:
        """Return stop IDs absent from the static feed."""
        return [stop_id for stop_id in stop_ids if stop_id not in self.stops]

    def resolve_stop_ids(self, identifiers: list[str]) -> tuple[list[str], list[str]]:
        """Resolve GTFS IDs or public stop codes to canonical GTFS IDs."""
        codes = {
            stop.code: stop.stop_id
            for stop in self.stops.values()
            if stop.code is not None
        }
        resolved: list[str] = []
        missing: list[str] = []
        for identifier in identifiers:
            stop_id = identifier if identifier in self.stops else codes.get(identifier)
            if stop_id is None:
                missing.append(identifier)
            elif stop_id not in resolved:
                resolved.append(stop_id)
        return resolved, missing

    def search_stops(self, query: str, limit: int = 25) -> list[Stop]:
        """Search stops by ID, public code, or name."""
        normalized = query.casefold().strip()
        matches = [
            stop
            for stop in self.stops.values()
            if normalized in stop.stop_id.casefold()
            or normalized in stop.name.casefold()
            or (stop.code and normalized in stop.code.casefold())
        ]
        return sorted(matches, key=lambda stop: (stop.name, stop.stop_id))[:limit]

    def routes_for_stop(self, stop_id: str) -> list[Route]:
        """Return routes serving a stop."""
        route_ids = {
            trip.route_id
            for stop_time in self._stop_times_for_stop(stop_id)
            if (trip := self.trips.get(stop_time.trip_id)) is not None
        }
        return sorted(
            (self.routes[route_id] for route_id in route_ids),
            key=lambda route: (
                route.short_name.casefold(),
                route.long_name.casefold(),
                route.route_id,
            ),
        )

    def _service_active(self, service_id: str, service_date: date) -> bool:
        exception = self.calendar_dates.get(service_date, {}).get(service_id)
        if exception is not None:
            return exception == 1
        calendar = self.calendars.get(service_id)
        return bool(
            calendar
            and calendar.start_date <= service_date <= calendar.end_date
            and calendar.weekdays[service_date.weekday()]
        )

    def departures(
        self,
        stop_ids: list[str],
        now: datetime,
        realtime: dict[tuple[str, str, date | None], RealtimeUpdate],
        stop_filters: Mapping[str, object] | None = None,
    ) -> list[Departure]:
        """Build upcoming departures for several stops."""
        local_now = now.astimezone(VANCOUVER_TZ)
        output: list[Departure] = []
        for stop_id in stop_ids:
            stop = self.stops.get(stop_id)
            if stop is None:
                continue
            stop_departures: list[Departure] = []
            service_dates = (
                local_now.date() - timedelta(days=1),
                local_now.date(),
            )
            for service_date in service_dates:
                midnight = datetime.combine(
                    service_date, time.min, tzinfo=VANCOUVER_TZ
                )
                for stop_time in self._stop_times_for_stop(stop_id):
                    trip = self.trips.get(stop_time.trip_id)
                    if trip is None or not self._service_active(
                        trip.service_id, service_date
                    ):
                        continue
                    if not _trip_matches_filter(
                        trip.route_id,
                        trip.headsign,
                        stop_filters.get(stop_id) if stop_filters else None,
                    ):
                        continue
                    scheduled = midnight + timedelta(
                        seconds=stop_time.departure_seconds
                    )
                    update = realtime.get((trip.trip_id, stop_id, service_date))
                    if update is None and service_date == local_now.date():
                        update = realtime.get((trip.trip_id, stop_id, None))
                    estimated = (
                        update.estimated_time
                        if update and update.estimated_time
                        else scheduled
                        + timedelta(seconds=update.delay_seconds or 0)
                        if update
                        else scheduled
                    )
                    if not (
                        local_now - timedelta(minutes=1)
                        <= estimated
                        <= local_now + DEPARTURE_WINDOW
                    ):
                        continue
                    route = self.routes[trip.route_id]
                    stop_departures.append(
                        Departure(
                            stop_id=stop_id,
                            stop_name=stop.name,
                            trip_id=trip.trip_id,
                            route_id=route.route_id,
                            route_name=route.short_name or route.long_name,
                            route_long_name=route.long_name,
                            route_type=route.route_type,
                            route_color=route.color,
                            route_text_color=route.text_color,
                            destination=trip.headsign,
                            direction_id=trip.direction_id,
                            scheduled_time=scheduled,
                            estimated_time=estimated,
                            delay_seconds=int(
                                (estimated - scheduled).total_seconds()
                            ),
                            cancelled=update.cancelled if update else False,
                            realtime=update is not None,
                        )
                    )
            output.extend(
                sorted(stop_departures, key=lambda item: item.estimated_time)[
                    :MAX_DEPARTURES_PER_STOP
                ]
            )
        return sorted(output, key=lambda item: item.estimated_time)


def _trip_matches_filter(
    route_id: str, headsign: str, stop_filter: object
) -> bool:
    """Return whether a trip matches a persisted per-stop filter."""
    if not isinstance(stop_filter, Mapping):
        return True

    route_ids = stop_filter.get("include_route_ids")
    if (
        isinstance(route_ids, list)
        and route_ids
        and route_id not in route_ids
    ):
        return False

    destinations = stop_filter.get("destination_contains")
    if isinstance(destinations, list):
        normalized = [
            value.casefold().strip()
            for value in destinations
            if isinstance(value, str) and value.strip()
        ]
        if normalized and not any(value in headsign.casefold() for value in normalized):
            return False

    return True


def _stop_time_from_row(row: dict[str, str]) -> StopTime | None:
    departure = row.get("departure_time") or row.get("arrival_time")
    if not departure:
        return None
    return StopTime(
        trip_id=row["trip_id"],
        stop_id=row["stop_id"],
        departure_seconds=_seconds(departure),
        stop_sequence=int(row["stop_sequence"]),
    )


def _insert_stop_times(
    connection: sqlite3.Connection, batch: list[tuple[str, str, int, int]]
) -> None:
    connection.executemany(
        """
        INSERT INTO stop_times (
            stop_id, trip_id, departure_seconds, stop_sequence
        ) VALUES (?, ?, ?, ?)
        """,
        batch,
    )


def _database_matches(database: Path, digest: str) -> bool:
    if not database.is_file():
        return False
    try:
        connection = sqlite3.connect(database)
        try:
            row = connection.execute(
                "SELECT value FROM metadata WHERE key = 'digest'"
            ).fetchone()
            return row is not None and row[0] == digest
        finally:
            connection.close()
    except sqlite3.DatabaseError:
        return False
