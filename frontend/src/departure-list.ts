import type { CardConfig, Departure } from "./types";

type CancelledBehavior = NonNullable<CardConfig["cancelled_behavior"]>;
type CombinedOrder = NonNullable<CardConfig["combined_order"]>;

export interface RouteOption {
  name: string;
  count: number;
  color: string | null;
  textColor: string | null;
}

function chronological(left: Departure, right: Departure): number {
  return (
    new Date(left.estimated_time).getTime() -
    new Date(right.estimated_time).getTime()
  );
}

function balanced(
  departures: Departure[],
  stopOrder: string[],
): Departure[] {
  const queues = new Map<string, Departure[]>();
  for (const stopId of stopOrder) queues.set(stopId, []);
  for (const departure of departures) {
    const queue = queues.get(departure.stop_id) ?? [];
    queue.push(departure);
    queues.set(departure.stop_id, queue);
  }

  const output: Departure[] = [];
  while ([...queues.values()].some((queue) => queue.length > 0)) {
    for (const queue of queues.values()) {
      const departure = queue.shift();
      if (departure) output.push(departure);
    }
  }
  return output;
}

export function prepareDepartures(
  departures: Departure[],
  cancelledBehavior: CancelledBehavior,
  order: CombinedOrder,
  stopOrder: string[],
): Departure[] {
  let output =
    cancelledBehavior === "hide"
      ? departures.filter((departure) => !departure.cancelled)
      : [...departures];

  if (order === "balanced") {
    output = balanced(output, stopOrder);
  } else if (order === "route") {
    output.sort(
      (left, right) =>
        left.route_name.localeCompare(right.route_name, undefined, {
          numeric: true,
        }) || chronological(left, right),
    );
  } else if (order === "realtime") {
    output.sort(
      (left, right) =>
        Number(right.realtime) - Number(left.realtime) ||
        chronological(left, right),
    );
  } else {
    output.sort(chronological);
  }

  if (cancelledBehavior === "move") {
    output.sort(
      (left, right) => Number(left.cancelled) - Number(right.cancelled),
    );
  }
  return output;
}

export function getRouteOptions(
  departures: Departure[],
): RouteOption[] {
  const routes = new Map<string, RouteOption>();
  for (const departure of departures) {
    const name = departure.route_name.trim();
    if (!name) continue;
    const existing = routes.get(name);
    if (existing) {
      existing.count += 1;
    } else {
      routes.set(name, {
        name,
        count: 1,
        color: departure.route_color,
        textColor: departure.route_text_color,
      });
    }
  }
  return [...routes.values()].sort((left, right) =>
    left.name.localeCompare(right.name, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );
}

export function filterDeparturesByRoute(
  departures: Departure[],
  selectedRoutes: ReadonlySet<string>,
): Departure[] {
  if (selectedRoutes.size === 0) return departures;
  return departures.filter((departure) =>
    selectedRoutes.has(departure.route_name.trim()),
  );
}

export function isDataStale(
  lastUpdated: string | undefined,
  thresholdMinutes: number,
  now = Date.now(),
): boolean {
  if (!lastUpdated) return true;
  return now - new Date(lastUpdated).getTime() > thresholdMinutes * 60_000;
}
