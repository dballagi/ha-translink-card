import type { Departure } from "./types";

export interface DepartureTiming {
  delayed: boolean;
  displayTime: string;
  scheduledTime?: string;
  delayMinutes?: number;
}

export function getDepartureTiming(
  departure: Departure,
  delayThresholdMinutes = 1,
): DepartureTiming {
  const delayed =
    !departure.cancelled &&
    departure.delay_seconds >= delayThresholdMinutes * 60;

  return {
    delayed,
    displayTime: departure.cancelled
      ? departure.scheduled_time
      : departure.estimated_time,
    scheduledTime: delayed ? departure.scheduled_time : undefined,
    delayMinutes: delayed
      ? Math.round(departure.delay_seconds / 60)
      : undefined,
  };
}
