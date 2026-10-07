// @vitest-environment happy-dom

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  filterDeparturesByRoute,
  getRouteOptions,
  isDataStale,
  prepareDepartures,
} from "./departure-list";
import { getDepartureTiming } from "./departure-timing";
import {
  countdownLabel,
  getNextDeparture,
  TransLinkScheduleCard,
  TransLinkScheduleCardEditor,
} from "./translink-schedule-card";
import {
  homeAssistantRasterTileUrl,
  TransLinkTripMapDialog,
} from "./trip-map-dialog";
import type {
  Departure,
  HomeAssistant,
  StopDepartures,
} from "./types";

const departure: Departure = {
  stop_id: "stop",
  stop_name: "Test Stop",
  trip_id: "trip",
  route_id: "route",
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

afterEach(() => {
  document.body.replaceChildren();
  vi.useRealTimers();
});

describe("departure time arithmetic", () => {
  it("uses real date differences across an hour boundary", () => {
    const now = new Date("2026-10-06T10:58:00-07:00").getTime();
    const departure = new Date("2026-10-06T11:03:00-07:00").getTime();
    expect(Math.round((departure - now) / 60_000)).toBe(5);
  });

  describe("header next departure", () => {
    it("uses the earliest active departure after route filtering", () => {
      const route3 = {
        ...departure,
        route_name: "3",
        estimated_time: "2026-10-06T12:45:00-07:00",
      };
      const cancelled = {
        ...departure,
        route_name: "10",
        estimated_time: "2026-10-06T12:43:00-07:00",
        cancelled: true,
      };
      const route10 = {
        ...departure,
        route_name: "10",
        estimated_time: "2026-10-06T12:50:00-07:00",
      };

      expect(
        getNextDeparture(
          [cancelled, route3, route10],
          new Set(["10"]),
        ),
      ).toBe(route10);
      expect(
        getNextDeparture([route10, route3], new Set()),
      ).toBe(route3);
    });

    it("renders the configured next-departure format", async () => {
      const card = await createCard({
        header_time_mode: "next_departure",
        header_next_departure_format: "both",
        show_header: true,
        show_route_filter: false,
      });
      const headerTime = card.shadowRoot!.querySelector(".header-time")!;

      expect(headerTime.textContent).toContain("Next");
      expect(headerTime.querySelector("strong")?.textContent).toBeTruthy();
      expect(headerTime.querySelector("span")?.textContent).toBeTruthy();
    });

    it("follows the active card-level route filter", async () => {
      const card = await createCard({
        header_time_mode: "next_departure",
        show_header: true,
        show_route_filter: true,
        route_filter_reset_minutes: 0,
      });
      expect(
        card.shadowRoot!
          .querySelector(".header-time")
          ?.getAttribute("aria-label"),
      ).toContain("route 3");

      const routes = Array.from(
        card.shadowRoot!.querySelectorAll<HTMLButtonElement>(
          ".route-filter-chip",
        ),
      );
      routes[2].click();
      await card.updateComplete;

      expect(
        card.shadowRoot!
          .querySelector(".header-time")
          ?.getAttribute("aria-label"),
      ).toContain("route 10");
    });
  });

  it("shows Now instead of a zero-minute countdown", () => {
    const now = new Date("2026-10-06T10:00:00-07:00").getTime();
    expect(countdownLabel("2026-10-06T10:00:20-07:00", now)).toBe(
      "Now",
    );
    expect(countdownLabel("2026-10-06T10:01:00-07:00", now)).toBe(
      "1 min",
    );
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

  it("builds naturally sorted route options with departure counts", () => {
    expect(
      getRouteOptions([
        { ...departure, route_name: "100", route_color: "005DAA" },
        { ...departure, route_name: "3", route_color: "D22630" },
        { ...departure, route_name: "10", route_color: "00843D" },
        { ...departure, route_name: "3", route_color: "D22630" },
        { ...departure, route_name: "N15", route_color: "5C2D91" },
      ]),
    ).toEqual([
      { name: "3", count: 2, color: "D22630", textColor: null },
      { name: "10", count: 1, color: "00843D", textColor: null },
      { name: "100", count: 1, color: "005DAA", textColor: null },
      { name: "N15", count: 1, color: "5C2D91", textColor: null },
    ]);
  });

  it("filters exact route names and treats an empty selection as All", () => {
    const route3 = { ...departure, route_name: "3" };
    const route10 = { ...departure, route_name: "10" };
    expect(
      filterDeparturesByRoute(
        [route3, route10],
        new Set(["10"]),
      ),
    ).toEqual([route10]);
    expect(
      filterDeparturesByRoute([route3, route10], new Set()),
    ).toEqual([route3, route10]);
  });
});

function cardData() {
  const route3 = {
    ...departure,
    route_name: "3",
    route_color: "D22630",
  };
  const route10 = {
    ...departure,
    route_name: "10",
    route_color: "00843D",
    estimated_time: "2026-10-06T12:50:00-07:00",
  };
  const stop: StopDepartures = {
    stop_id: "stop",
    stop_name: "Test Stop",
    stop_code: "50001",
    departures: [route3, route10],
  };
  const hass: HomeAssistant = {
    states: {
      "sensor.departures": {
        state: route3.estimated_time,
        attributes: {
          config_entry_id: "entry-1",
          stops: [stop],
          departures: stop.departures,
          alerts: [],
        },
      },
    },
  };
  return { hass, route3, route10 };
}

async function createCard(
  config: Partial<Parameters<TransLinkScheduleCard["setConfig"]>[0]> = {},
) {
  const { hass } = cardData();
  const card = new TransLinkScheduleCard();
  card.setConfig({
    type: "custom:translink-schedule-card",
    entity: "sensor.departures",
    show_route_filter: true,
    show_header: false,
    ...config,
  });
  card.hass = hass;
  document.body.append(card);
  await card.updateComplete;
  return card;
}

describe("card route filter", () => {
  it("supports multiple selections, counts, and All", async () => {
    const card = await createCard({
      route_filter_show_counts: true,
      route_filter_reset_minutes: 0,
    });

    const buttons = Array.from(
      card.shadowRoot!.querySelectorAll<HTMLButtonElement>(
        ".route-filter-chip",
      ),
    );
    expect(buttons.map((button) => button.textContent?.trim())).toEqual([
      "All 2",
      "3 1",
      "10 1",
    ]);
    expect(buttons[0].getAttribute("aria-pressed")).toBe("true");

    buttons[1].click();
    await card.updateComplete;
    expect(
      Array.from(card.shadowRoot!.querySelectorAll(".departure .route")).map(
        (route) => route.textContent,
      ),
    ).toEqual(["3"]);

    buttons[2].click();
    await card.updateComplete;
    expect(
      Array.from(card.shadowRoot!.querySelectorAll(".departure .route")).map(
        (route) => route.textContent,
      ),
    ).toEqual(["3", "10"]);

    buttons[0].click();
    await card.updateComplete;
    expect(buttons[0].getAttribute("aria-pressed")).toBe("true");
  });

  it("replaces the selected route in single-selection mode", async () => {
    const card = await createCard({
      route_filter_selection_mode: "single",
      route_filter_reset_minutes: 0,
    });
    const buttons = Array.from(
      card.shadowRoot!.querySelectorAll<HTMLButtonElement>(
        ".route-filter-chip",
      ),
    );
    buttons[1].click();
    buttons[2].click();
    await card.updateComplete;

    expect(buttons[1].getAttribute("aria-pressed")).toBe("false");
    expect(buttons[2].getAttribute("aria-pressed")).toBe("true");
    expect(
      Array.from(card.shadowRoot!.querySelectorAll(".departure .route")).map(
        (route) => route.textContent,
      ),
    ).toEqual(["10"]);
  });

  it("filters routes before applying the per-stop departure limit", async () => {
    const card = await createCard({
      departures_per_stop: 1,
      route_filter_reset_minutes: 0,
    });
    const buttons = Array.from(
      card.shadowRoot!.querySelectorAll<HTMLButtonElement>(
        ".route-filter-chip",
      ),
    );
    buttons[2].click();
    await card.updateComplete;

    expect(
      Array.from(card.shadowRoot!.querySelectorAll(".departure .route")).map(
        (route) => route.textContent,
      ),
    ).toEqual(["10"]);
  });

  it("resets to All after the configured inactivity timeout", async () => {
    vi.useFakeTimers();
    const card = await createCard({
      route_filter_reset_minutes: 1,
    });
    const buttons = Array.from(
      card.shadowRoot!.querySelectorAll<HTMLButtonElement>(
        ".route-filter-chip",
      ),
    );
    buttons[1].click();
    await card.updateComplete;
    expect(buttons[1].getAttribute("aria-pressed")).toBe("true");

    vi.advanceTimersByTime(30_000);
    buttons[2].click();
    await card.updateComplete;
    vi.advanceTimersByTime(31_000);
    await card.updateComplete;
    expect(buttons[0].getAttribute("aria-pressed")).toBe("false");

    vi.advanceTimersByTime(29_000);
    await card.updateComplete;
    expect(buttons[0].getAttribute("aria-pressed")).toBe("true");
    expect(
      card.shadowRoot!.querySelectorAll(".departure"),
    ).toHaveLength(2);
  });
});

describe("departure route map", () => {
  it("uses Home Assistant's authenticated raster tile proxy", () => {
    expect(homeAssistantRasterTileUrl("token value")).toBe(
      "/api/map_tiles/raster/{z}/{x}/{y}.png?token=token%20value",
    );
  });

  it("opens from pointer and keyboard activation", async () => {
    const card = await createCard({ show_route_filter: false });
    const row = card.shadowRoot!.querySelector<HTMLElement>(".departure")!;

    expect(row.getAttribute("role")).toBe("button");
    expect(row.tabIndex).toBe(0);
    row.click();
    expect(
      document.body.querySelectorAll("translink-trip-map-dialog"),
    ).toHaveLength(1);

    document.body.querySelector("translink-trip-map-dialog")!.remove();
    row.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        bubbles: true,
      }),
    );
    expect(
      document.body.querySelectorAll("translink-trip-map-dialog"),
    ).toHaveLength(1);
  });

  it("keeps the planned route available without a vehicle match", async () => {
    const callApi = vi.fn().mockResolvedValue({
      trip_id: "trip",
      route_id: "route",
      route_name: "99",
      route_color: "005DAA",
      destination: "Downtown",
      shape: [
        { latitude: 49.27, longitude: -123.11 },
        { latitude: 49.28, longitude: -123.12 },
      ],
      boarding_stop: {
        stop_id: "stop",
        name: "Test Stop",
        latitude: 49.27,
        longitude: -123.11,
      },
      destination_point: {
        latitude: 49.28,
        longitude: -123.12,
      },
      vehicle: null,
      vehicle_error: null,
    });
    const sendMessagePromise = vi.fn().mockResolvedValue({
      token: "map-token",
    });
    const dialog = new TransLinkTripMapDialog();
    dialog.hass = {
      states: {},
      callApi,
      connection: { sendMessagePromise },
    };
    dialog.entryId = "entry-1";
    dialog.departure = departure;
    document.body.append(dialog);

    await vi.waitFor(() => {
      expect(dialog.shadowRoot?.textContent).toContain(
        "Live vehicle position unavailable",
      );
    });
    expect(callApi).toHaveBeenCalledWith(
      "GET",
      expect.stringContaining("trip_id=trip"),
    );
    expect(sendMessagePromise).toHaveBeenCalledWith({
      type: "map_tiles/access_token",
    });

    const header = dialog.shadowRoot!.querySelector<HTMLElement>("header")!;
    header.click();
    await dialog.updateComplete;
    expect(header.getAttribute("aria-expanded")).toBe("true");
    expect(
      dialog.shadowRoot!.querySelector(".dialog")!.classList,
    ).toContain("expanded");
  });
});

describe("card editor", () => {
  it("organizes settings into outlined icon-led panels", async () => {
    const editor = new TransLinkScheduleCardEditor();
    editor.setConfig({
      type: "custom:translink-schedule-card",
      entity: "sensor.departures",
    });
    document.body.append(editor);
    await editor.updateComplete;

    const panels = Array.from(
      editor.shadowRoot!.querySelectorAll("ha-expansion-panel"),
    ) as Array<HTMLElement & { header: string; leftChevron: boolean }>;
    expect(panels.map((panel) => panel.header)).toEqual([
      "Card & layout",
      "Timing & status",
      "Appearance",
      "Route filter",
      "Header & notices",
    ]);
    expect(
      panels.every(
        (panel) =>
          panel.hasAttribute("outlined") &&
          panel.leftChevron === false &&
          panel.querySelector('ha-icon[slot="leading-icon"]'),
      ),
    ).toBe(true);
  });

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

  it("shows route filter settings only when the filter is enabled", async () => {
    const editor = new TransLinkScheduleCardEditor();
    editor.setConfig({
      type: "custom:translink-schedule-card",
      entity: "sensor.departures",
      show_route_filter: false,
    });
    document.body.append(editor);
    await editor.updateComplete;
    expect(
      editor.shadowRoot?.querySelector(
        '[data-key="route_filter_reset_minutes"]',
      ),
    ).toBeNull();

    editor.setConfig({
      type: "custom:translink-schedule-card",
      entity: "sensor.departures",
      show_route_filter: true,
      route_filter_selection_mode: "multiple",
    });
    await editor.updateComplete;
    expect(
      editor.shadowRoot?.querySelector(
        '[data-key="route_filter_reset_minutes"]',
      ),
    ).not.toBeNull();
    const selection = editor.shadowRoot?.querySelector(
      'ha-select[data-key="route_filter_selection_mode"]',
    ) as HTMLElement & {
      options: Array<{ value: string; label: string }>;
    };
    expect(selection.options).toEqual([
      { value: "multiple", label: "Allow multiple routes" },
      { value: "single", label: "One route at a time" },
    ]);
  });
});
