import { describe, expect, it } from "vitest";

import { findScheduleEntity } from "./entity-selection";
import type { HomeAssistant } from "./types";

describe("findScheduleEntity", () => {
  it("selects a schedule sensor by its attributes", () => {
    const hass: HomeAssistant = {
      states: {
        "sensor.temperature": {
          state: "20",
          attributes: {},
        },
        "sensor.nearby_departures": {
          state: "2026-10-06T18:30:00+00:00",
          attributes: {
            stops: [],
            departures: [],
          },
        },
      },
    };

    expect(
      findScheduleEntity(hass, [
        "sensor.temperature",
        "sensor.nearby_departures",
      ]),
    ).toBe("sensor.nearby_departures");
  });

  it("falls back to all Home Assistant states", () => {
    const hass: HomeAssistant = {
      states: {
        "sensor.home_transit": {
          state: "unknown",
          attributes: {
            stops: [],
            departures: [],
          },
        },
      },
    };

    expect(findScheduleEntity(hass)).toBe("sensor.home_transit");
  });
});
