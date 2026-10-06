// @vitest-environment happy-dom

import { describe, expect, it } from "vitest";

import { isDataStale, prepareDepartures } from "./departure-list";
import { getDepartureTiming } from "./departure-timing";
import { TransLinkScheduleCardEditor } from "./translink-schedule-card";
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

  it("supports a configurable delay threshold", () => {
    expect(getDepartureTiming(departure, 10).delayed).toBe(false);
  });
});

describe("departure list customization", () => {
  const secondStop = {
    ...departure,
    stop_id: "second",
    route_name: "3",
    estimated_time: "2026-10-06T12:45:00-07:00",
  };

  it("can hide or move cancelled departures", () => {
    const cancelled = { ...departure, cancelled: true };
    expect(
      prepareDepartures(
        [cancelled, secondStop],
        "hide",
        "chronological",
        ["stop", "second"],
      ),
    ).toEqual([secondStop]);
    expect(
      prepareDepartures(
        [cancelled, secondStop],
        "move",
        "chronological",
        ["stop", "second"],
      ),
    ).toEqual([secondStop, cancelled]);
  });

  it("can balance combined departures across stops", () => {
    const laterFirstStop = {
      ...departure,
      estimated_time: "2026-10-06T12:50:00-07:00",
    };
    expect(
      prepareDepartures(
        [departure, laterFirstStop, secondStop],
        "show",
        "balanced",
        ["stop", "second"],
      ).map((item) => item.stop_id),
    ).toEqual(["stop", "second", "stop"]);
  });

  it("detects stale coordinator data", () => {
    const now = new Date("2026-10-06T13:00:00-07:00").getTime();
    expect(
      isDataStale("2026-10-06T12:55:00-07:00", 3, now),
    ).toBe(true);
    expect(
      isDataStale("2026-10-06T12:59:00-07:00", 3, now),
    ).toBe(false);
  });
});

describe("card editor", () => {
  it("binds labeled select options and emits selected values", async () => {
    const editor = new TransLinkScheduleCardEditor();
    editor.setConfig({
      type: "custom:translink-schedule-card",
      entity: "sensor.departures",
      view: "grouped",
    });
    document.body.append(editor);
    await editor.updateComplete;

    const select = editor.shadowRoot?.querySelector(
      'ha-select[data-key="view"]',
    ) as HTMLElement & {
      options: Array<{ value: string; label: string }>;
      value: string;
    };
    expect(select.value).toBe("grouped");
    expect(select.options).toEqual([
      { value: "grouped", label: "Grouped by stop" },
      { value: "combined", label: "Combined by time" },
    ]);

    let changedView: string | undefined;
    editor.addEventListener("config-changed", (event) => {
      changedView = (
        event as CustomEvent<{ config: { view?: string } }>
      ).detail.config.view;
    });
    select.dispatchEvent(
      new CustomEvent("selected", {
        detail: { value: "combined" },
      }),
    );

    expect(changedView).toBe("combined");
    editor.remove();
  });
});
