import { describe, expect, it } from "vitest";

import { getDepartureTiming } from "./departure-timing";
import type { Departure } from "./types";

const departure: Departure = {
  stop_id: "stop",
  stop_name: "Test Stop",
  route_name: "99",
  route_long_name: "Test Route",
  route_type: 3,
  route_color: null,
  route_text_color: null,
  destination: "Downtown",
  scheduled_time: "2026-10-06T12:42:00-07:00",
  estimated_time: "2026-10-06T12:49:00-07:00",
  delay_seconds: 420,
  cancelled: false,
  realtime: true,
};

describe("departure time arithmetic", () => {
  it("uses real date differences across an hour boundary", () => {
    const now = new Date("2026-10-06T10:58:00-07:00").getTime();
    const departure = new Date("2026-10-06T11:03:00-07:00").getTime();
    expect(Math.round((departure - now) / 60_000)).toBe(5);
  });

  it("shows scheduled and predicted times for a delayed departure", () => {
    expect(getDepartureTiming(departure)).toEqual({
      delayed: true,
      displayTime: departure.estimated_time,
      scheduledTime: departure.scheduled_time,
      delayMinutes: 7,
    });
  });

  it("does not duplicate the time for an on-time departure", () => {
    expect(
      getDepartureTiming({
        ...departure,
        estimated_time: departure.scheduled_time,
        delay_seconds: 0,
      }),
    ).toEqual({
      delayed: false,
      displayTime: departure.scheduled_time,
      scheduledTime: undefined,
      delayMinutes: undefined,
    });
  });

  it("uses the scheduled time without a delay treatment when cancelled", () => {
    expect(
      getDepartureTiming({
        ...departure,
        cancelled: true,
      }),
    ).toEqual({
      delayed: false,
      displayTime: departure.scheduled_time,
      scheduledTime: undefined,
      delayMinutes: undefined,
    });
  });
});
