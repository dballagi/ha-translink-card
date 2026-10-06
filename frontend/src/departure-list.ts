import type { CardConfig, Departure } from "./types";

type CancelledBehavior = NonNullable<CardConfig["cancelled_behavior"]>;
type CombinedOrder = NonNullable<CardConfig["combined_order"]>;

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

export function isDataStale(
  lastUpdated: string | undefined,
  thresholdMinutes: number,
  now = Date.now(),
): boolean {
  if (!lastUpdated) return true;
  return now - new Date(lastUpdated).getTime() > thresholdMinutes * 60_000;
}
