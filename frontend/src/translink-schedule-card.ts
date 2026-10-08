import {
  LitElement,
  css,
  html,
  nothing,
  type TemplateResult,
} from "lit";
import { property, state } from "lit/decorators.js";

import {
  filterDeparturesByRoute,
  getRouteOptions,
  isDataStale,
  prepareDepartures,
  type RouteOption,
} from "./departure-list";
import { getDepartureTiming } from "./departure-timing";
import { findScheduleEntity } from "./entity-selection";
import "./trip-map-dialog";
import type { TransLinkTripMapDialog } from "./trip-map-dialog";
import type {
  CardConfig,
  Departure,
  HomeAssistant,
  ServiceAlert,
  StopDepartures,
} from "./types";

const DEFAULT_PER_STOP = 3;
const MAX_PER_STOP = 12;
const DEFAULT_MAX = 12;
const DEFAULT_ROUTE_FILTER_RESET = 5;
const MAX_ROUTE_FILTER_RESET = 60;

interface SelectOption {
  value: string;
  label: string;
}

const VIEW_OPTIONS: SelectOption[] = [
  { value: "grouped", label: "Grouped by stop" },
  { value: "combined", label: "Combined by time" },
];
const ORDER_OPTIONS: SelectOption[] = [
  { value: "chronological", label: "Chronological" },
  { value: "balanced", label: "Balance stops" },
  { value: "route", label: "Group routes" },
  { value: "realtime", label: "Realtime first" },
];
const TIME_OPTIONS: SelectOption[] = [
  { value: "both", label: "Countdown and clock" },
  { value: "countdown", label: "Countdown only" },
  { value: "clock", label: "Clock only" },
];
const DELAY_OPTIONS: SelectOption[] = [
  { value: "compact", label: "+7 min" },
  { value: "text", label: "7 min late" },
];
const CANCELLED_OPTIONS: SelectOption[] = [
  { value: "show", label: "Show in schedule order" },
  { value: "move", label: "Move below active departures" },
  { value: "hide", label: "Hide" },
];
const DENSITY_OPTIONS: SelectOption[] = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact", label: "Compact" },
  { value: "minimal", label: "Minimal" },
];
const ROUTE_COLOR_OPTIONS: SelectOption[] = [
  { value: "official", label: "Official route colors" },
  { value: "theme", label: "Theme primary color" },
  { value: "monochrome", label: "Monochrome" },
];
const ROUTE_FILTER_SELECTION_OPTIONS: SelectOption[] = [
  { value: "multiple", label: "Allow multiple routes" },
  { value: "single", label: "One route at a time" },
];
const EMPTY_STOP_OPTIONS: SelectOption[] = [
  { value: "show", label: "Show in configured order" },
  { value: "move", label: "Move to bottom" },
  { value: "hide", label: "Hide" },
];
const HEADER_STYLE_OPTIONS: SelectOption[] = [
  { value: "primary", label: "Theme primary" },
  { value: "surface", label: "Card surface" },
  { value: "transparent", label: "Transparent" },
];
const HEADER_TIME_MODE_OPTIONS: SelectOption[] = [
  { value: "clock", label: "Current time" },
  { value: "next_departure", label: "Next departure" },
  { value: "hidden", label: "Hidden" },
];
const HEADER_NEXT_DEPARTURE_OPTIONS: SelectOption[] = [
  { value: "countdown", label: "Countdown" },
  { value: "clock", label: "Clock time" },
  { value: "both", label: "Countdown and clock time" },
];
const STOP_HEADING_OPTIONS: SelectOption[] = [
  { value: "accent", label: "Accent" },
  { value: "plain", label: "Plain" },
  { value: "compact", label: "Compact" },
];

export function flattenCardConfig(config: CardConfig): CardConfig {
  return {
    ...config,
    title: config.layout?.title ?? config.title,
    view: config.layout?.view ?? config.view,
    combined_order:
      config.layout?.combined_order ?? config.combined_order,
    departures_per_stop:
      config.layout?.departures_per_stop ?? config.departures_per_stop,
    max_departures:
      config.layout?.max_departures ?? config.max_departures,
    time_display:
      config.timing?.time_display ?? config.time_display,
    show_scheduled_time:
      config.timing?.show_scheduled_time ?? config.show_scheduled_time,
    delay_threshold_minutes:
      config.timing?.delay_threshold_minutes ??
      config.delay_threshold_minutes,
    delay_format:
      config.timing?.delay_format ?? config.delay_format,
    cancelled_behavior:
      config.timing?.cancelled_behavior ?? config.cancelled_behavior,
    show_realtime_status:
      config.timing?.show_realtime_status ??
      config.show_realtime_status,
    show_stale_warning:
      config.timing?.show_stale_warning ?? config.show_stale_warning,
    stale_after_minutes:
      config.timing?.stale_after_minutes ?? config.stale_after_minutes,
    density: config.appearance?.density ?? config.density,
    route_color_mode:
      config.appearance?.route_color_mode ?? config.route_color_mode,
    empty_stop_behavior:
      config.appearance?.empty_stop_behavior ??
      config.empty_stop_behavior,
    stop_heading_style:
      config.appearance?.stop_heading_style ??
      config.stop_heading_style,
    show_stop_codes:
      config.appearance?.show_stop_codes ?? config.show_stop_codes,
    show_route_filter:
      config.route_filter?.show ?? config.show_route_filter,
    route_filter_selection_mode:
      config.route_filter?.selection_mode ??
      config.route_filter_selection_mode,
    route_filter_show_counts:
      config.route_filter?.show_counts ??
      config.route_filter_show_counts,
    route_filter_reset_minutes:
      config.route_filter?.reset_minutes ??
      config.route_filter_reset_minutes,
    show_header: config.header?.show ?? config.show_header,
    show_brand: config.header?.show_brand ?? config.show_brand,
    header_time_mode:
      config.header?.time_mode ?? config.header_time_mode,
    header_next_departure_format:
      config.header?.next_departure_format ??
      config.header_next_departure_format,
    header_style: config.header?.style ?? config.header_style,
    header_icon: config.header?.icon ?? config.header_icon,
    show_alerts: config.header?.show_alerts ?? config.show_alerts,
    layout: undefined,
    timing: undefined,
    appearance: undefined,
    route_filter: undefined,
    header: undefined,
  };
}

function compact<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  ) as Partial<T>;
}

export function groupCardConfig(config: CardConfig): CardConfig {
  const flat = flattenCardConfig(config);
  const layout = compact({
    title: flat.title,
    view: flat.view,
    combined_order: flat.combined_order,
    departures_per_stop: flat.departures_per_stop,
    max_departures: flat.max_departures,
  });
  const timing = compact({
    time_display: flat.time_display,
    show_scheduled_time: flat.show_scheduled_time,
    delay_threshold_minutes: flat.delay_threshold_minutes,
    delay_format: flat.delay_format,
    cancelled_behavior: flat.cancelled_behavior,
    show_realtime_status: flat.show_realtime_status,
    show_stale_warning: flat.show_stale_warning,
    stale_after_minutes: flat.stale_after_minutes,
  });
  const appearance = compact({
    density: flat.density,
    route_color_mode: flat.route_color_mode,
    empty_stop_behavior:
      flat.empty_stop_behavior ??
      (flat.hide_empty_stops ? "hide" : undefined),
    stop_heading_style: flat.stop_heading_style,
    show_stop_codes: flat.show_stop_codes,
  });
  const routeFilter = compact({
    show: flat.show_route_filter,
    selection_mode: flat.route_filter_selection_mode,
    show_counts: flat.route_filter_show_counts,
    reset_minutes: flat.route_filter_reset_minutes,
  });
  const header = compact({
    show: flat.show_header,
    show_brand: flat.show_brand,
    time_mode:
      flat.header_time_mode ??
      (flat.show_clock === undefined
        ? undefined
        : flat.show_clock
          ? "clock"
          : "hidden"),
    next_departure_format: flat.header_next_departure_format,
    style: flat.header_style,
    icon: flat.header_icon,
    show_alerts: flat.show_alerts,
  });
  return {
    type: flat.type,
    entity: flat.entity,
    ...(Object.keys(layout).length > 0 ? { layout } : {}),
    ...(Object.keys(timing).length > 0 ? { timing } : {}),
    ...(Object.keys(appearance).length > 0 ? { appearance } : {}),
    ...(Object.keys(routeFilter).length > 0
      ? { route_filter: routeFilter }
      : {}),
    ...(Object.keys(header).length > 0 ? { header } : {}),
  };
}

function minutesUntil(value: string, now = Date.now()): number {
  return Math.max(0, Math.round((new Date(value).getTime() - now) / 60_000));
}

export function countdownLabel(
  value: string,
  now = Date.now(),
): string {
  const minutes = minutesUntil(value, now);
  return minutes === 0 ? "Now" : `${minutes} min`;
}

export function getNextDeparture(
  departures: Departure[],
  selectedRoutes: ReadonlySet<string>,
): Departure | undefined {
  return filterDeparturesByRoute(departures, selectedRoutes)
    .filter((departure) => !departure.cancelled)
    .sort(
      (left, right) =>
        new Date(left.estimated_time).getTime() -
        new Date(right.estimated_time).getTime(),
    )[0];
}

function timeLabel(
  value: string,
  locale?: HomeAssistant["locale"],
): string {
  const hour12 =
    locale?.time_format === "12"
      ? true
      : locale?.time_format === "24"
        ? false
        : undefined;
  return new Intl.DateTimeFormat(locale?.language, {
    hour: "numeric",
    hour12,
    minute: "2-digit",
  }).format(new Date(value));
}

export class TransLinkScheduleCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: CardConfig;
  @state() private collapsedStops = new Set<string>();
  @state() private selectedRoutes = new Set<string>();
  private initializedStops = new Set<string>();
  private routeFilterResetTimer?: number;
  private ticker?: number;

  public static async getConfigElement(): Promise<HTMLElement> {
    return document.createElement("translink-schedule-card-editor");
  }

  public static getStubConfig(
    hass: HomeAssistant,
    entities: string[] = [],
  ): Partial<CardConfig> {
    return {
      entity: findScheduleEntity(hass, entities) ?? "",
      layout: {
        view: "grouped",
        departures_per_stop: DEFAULT_PER_STOP,
      },
    };
  }

  public getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
    };
  }

  public setConfig(config: CardConfig): void {
    if (!config.entity) {
      throw new Error("A TransLink Schedule entity is required");
    }
    const flatConfig = flattenCardConfig(config);
    const nextSelectionMode =
      flatConfig.route_filter_selection_mode ?? "multiple";
    const headerTimeMode =
      flatConfig.header_time_mode ??
      (flatConfig.show_clock === false ? "hidden" : "clock");
    if (this.config?.entity !== flatConfig.entity) {
      this.collapsedStops = new Set();
      this.initializedStops.clear();
      this.resetRouteFilter();
    } else if (
      (this.config?.show_route_filter &&
        flatConfig.show_route_filter !== true) ||
      this.config?.route_filter_selection_mode !==
        nextSelectionMode
    ) {
      this.resetRouteFilter();
    }
    this.config = {
      view: "grouped",
      departures_per_stop: DEFAULT_PER_STOP,
      max_departures: DEFAULT_MAX,
      time_display: "both",
      show_scheduled_time: true,
      delay_threshold_minutes: 1,
      delay_format: "compact",
      density: "comfortable",
      empty_stop_behavior: "show",
      cancelled_behavior: "show",
      route_color_mode: "official",
      show_route_filter: false,
      route_filter_reset_minutes: DEFAULT_ROUTE_FILTER_RESET,
      route_filter_selection_mode: "multiple",
      route_filter_show_counts: false,
      combined_order: "chronological",
      show_header: true,
      show_brand: true,
      header_style: "primary",
      stop_heading_style: "accent",
      header_next_departure_format: "countdown",
      show_clock: true,
      show_alerts: true,
      show_stop_codes: true,
      show_realtime_status: false,
      show_stale_warning: false,
      stale_after_minutes: 3,
      ...compact(flatConfig),
      type: flatConfig.type,
      entity: flatConfig.entity,
      header_time_mode: headerTimeMode,
    };
    if (this.selectedRoutes.size > 0) this.scheduleRouteFilterReset();
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.ticker = window.setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    if (this.ticker !== undefined) window.clearInterval(this.ticker);
    this.clearRouteFilterResetTimer();
    super.disconnectedCallback();
  }

  protected render() {
    if (!this.config || !this.hass) return nothing;
    const entity = this.hass.states[this.config.entity];
    if (!entity) {
      return html`<ha-card><div class="message error">
        Entity ${this.config.entity} was not found.
      </div></ha-card>`;
    }
    const stops = (entity.attributes.stops ?? []) as StopDepartures[];
    const routeSource = stops.flatMap((stop) => stop.departures);
    const routeOptions = getRouteOptions(routeSource);
    const selectedRoutes = this.activeSelectedRoutes(routeOptions);
    const nextDeparture = getNextDeparture(routeSource, selectedRoutes);
    const alerts = (entity.attributes.alerts ?? []) as ServiceAlert[];
    const title =
      this.config.title ??
      (entity.attributes.board_name as string | undefined) ??
      "TransLink departures";
    const lastUpdated = entity.attributes.last_updated as string | undefined;
    const stale =
      this.config.show_stale_warning &&
      isDataStale(
        lastUpdated,
        this.config.stale_after_minutes ?? 3,
      );
    const cardClasses = [
      `density-${this.config.density}`,
      `header-${this.config.header_style}`,
      `routes-${this.config.route_color_mode}`,
      `stops-${this.config.stop_heading_style}`,
    ].join(" ");

    return html`
      <ha-card class=${cardClasses}>
        ${this.config.show_header
          ? html`<header>
              <div class="header-title">
                ${this.config.header_icon
                  ? html`<ha-icon
                      .icon=${this.config.header_icon}
                      aria-hidden="true"
                    ></ha-icon>`
                  : nothing}
                <div>
                  ${this.config.show_brand
                    ? html`<div class="eyebrow">TransLink</div>`
                    : nothing}
                  <h1>${title}</h1>
                </div>
              </div>
              ${this.renderHeaderTime(nextDeparture)}
            </header>`
          : nothing}
        ${this.config.show_alerts && alerts.length
          ? html`<div class="alerts">
              ${alerts.map(
                (alert) => html`<div>
                  <ha-icon icon="mdi:alert" aria-hidden="true"></ha-icon>
                  <span>
                    <strong>${alert.header}</strong>
                    ${alert.description
                      ? html`<small>${alert.description}</small>`
                      : nothing}
                  </span>
                </div>`,
              )}
            </div>`
          : nothing}
        ${stale
          ? html`<div class="stale" role="status">
              <ha-icon icon="mdi:cloud-alert" aria-hidden="true"></ha-icon>
              Realtime data has not updated recently.
            </div>`
          : nothing}
        ${this.config.show_route_filter && routeOptions.length > 0
          ? this.renderRouteFilter(routeOptions, selectedRoutes)
          : nothing}
        <main>
          ${this.config.view === "combined"
            ? this.renderCombined(routeSource, stops, selectedRoutes)
            : this.renderGrouped(stops, selectedRoutes)}
        </main>
      </ha-card>
    `;
  }

  private renderHeaderTime(departure?: Departure) {
    const mode = this.config?.header_time_mode ?? "clock";
    if (mode === "hidden") return nothing;
    if (mode === "clock") {
      return html`<div class="clock">
        ${timeLabel(new Date().toISOString(), this.hass?.locale)}
      </div>`;
    }

    if (!departure) {
      return html`<div
        class="header-time next-departure"
        aria-label="No upcoming departures"
      >
        <small>Next</small>
        <strong>—</strong>
      </div>`;
    }

    const countdown = countdownLabel(departure.estimated_time);
    const clock = timeLabel(departure.estimated_time, this.hass?.locale);
    const format =
      this.config?.header_next_departure_format ?? "countdown";
    const label =
      `Next departure route ${departure.route_name} to ` +
      `${departure.destination || departure.route_long_name}, ` +
      `${countdown}, at ${clock}`;
    return html`<div
      class="header-time next-departure"
      aria-label=${label}
    >
      <small>Next</small>
      ${format === "clock"
        ? html`<strong>${clock}</strong>`
        : html`
            <strong>${countdown}</strong>
            ${format === "both" ? html`<span>${clock}</span>` : nothing}
          `}
    </div>`;
  }

  private renderRouteFilter(
    routes: RouteOption[],
    selectedRoutes: ReadonlySet<string>,
  ) {
    const showCounts = this.config?.route_filter_show_counts === true;
    const total = routes.reduce((count, route) => count + route.count, 0);
    return html`
      <nav class="route-filter" aria-label="Filter departures by route">
        <button
          type="button"
          class="route-filter-chip all"
          aria-pressed=${String(selectedRoutes.size === 0)}
          @click=${() => this.selectAllRoutes()}
        >
          All${showCounts ? html` <span>${total}</span>` : nothing}
        </button>
        ${routes.map((route) => {
          const selected = selectedRoutes.has(route.name);
          const routeStyle =
            this.config?.route_color_mode === "official" && selected
              ? [
                  route.color ? `background:#${route.color}` : "",
                  route.textColor ? `color:#${route.textColor}` : "",
                ]
                  .filter(Boolean)
                  .join(";")
              : "";
          return html`
            <button
              type="button"
              class="route-filter-chip"
              style=${routeStyle}
              aria-label="Filter route ${route.name}"
              aria-pressed=${String(selected)}
              @click=${() => this.toggleRoute(route.name)}
            >
              ${route.name}${showCounts
                ? html` <span>${route.count}</span>`
                : nothing}
            </button>
          `;
        })}
      </nav>
    `;
  }

  private renderGrouped(
    stops: StopDepartures[],
    selectedRoutes: ReadonlySet<string>,
  ) {
    const emptyBehavior =
      this.config?.empty_stop_behavior ??
      (this.config?.hide_empty_stops ? "hide" : "show");
    let entries = stops.map((stop) => ({
      stop,
      departures: prepareDepartures(
        filterDeparturesByRoute(stop.departures, selectedRoutes),
        this.config?.cancelled_behavior ?? "show",
        "chronological",
        [stop.stop_id],
      ),
    }));
    if (emptyBehavior === "hide") {
      entries = entries.filter(({ departures }) => departures.length > 0);
    } else if (emptyBehavior === "move") {
      entries.sort(
        (left, right) =>
          Number(left.departures.length === 0) -
          Number(right.departures.length === 0),
      );
    }

    const sections = entries.map(({ stop, departures }) => {
      const collapsed = this.isStopCollapsed(stop);
      const limit =
        stop.departures_per_stop ??
        this.config?.departures_per_stop ??
        DEFAULT_PER_STOP;
      return html`
        <section class=${collapsed ? "collapsed" : ""}>
          <button
            class="stop-heading"
            type="button"
            aria-expanded=${String(!collapsed)}
            @click=${() => this.toggleStop(stop.stop_id)}
          >
            <span class="stop-title">
              <ha-icon
                icon=${collapsed ? "mdi:chevron-right" : "mdi:chevron-down"}
                aria-hidden="true"
              ></ha-icon>
              ${stop.display_name || stop.stop_name}
            </span>
            ${this.config?.show_stop_codes !== false &&
            stop.show_stop_code !== false &&
            stop.stop_code
              ? html`<span class="stop-code">#${stop.stop_code}</span>`
              : nothing}
          </button>
          ${collapsed
            ? nothing
            : departures.length
              ? departures
                  .slice(0, limit)
                  .map((departure) =>
                    this.renderDeparture(departure, false),
                  )
              : html`<div class="empty-stop">No upcoming departures</div>`}
        </section>
      `;
    });
    return sections.length
      ? sections
      : html`<div class="message">No upcoming departures.</div>`;
  }

  private renderCombined(
    departures: Departure[],
    stops: StopDepartures[],
    selectedRoutes: ReadonlySet<string>,
  ) {
    const prepared = prepareDepartures(
      filterDeparturesByRoute(departures, selectedRoutes),
      this.config?.cancelled_behavior ?? "show",
      this.config?.combined_order ?? "chronological",
      stops.map((stop) => stop.stop_id),
    );
    if (prepared.length === 0) {
      return html`<div class="message">No upcoming departures.</div>`;
    }
    return html`
      <section>
        ${prepared
          .slice(0, this.config?.max_departures ?? DEFAULT_MAX)
          .map((departure) => this.renderDeparture(departure, true))}
      </section>
    `;
  }

  private renderDeparture(departure: Departure, showStop: boolean) {
    const routeStyle =
      this.config?.route_color_mode === "official"
        ? [
            departure.route_color
              ? `background:#${departure.route_color}`
              : "",
            departure.route_text_color
              ? `color:#${departure.route_text_color}`
              : "",
          ]
            .filter(Boolean)
            .join(";")
        : "";
    const timing = getDepartureTiming(
      departure,
      this.config?.delay_threshold_minutes,
    );
    const showCountdown = this.config?.time_display !== "clock";
    const showClock = this.config?.time_display !== "countdown";
    const destination =
      departure.destination || departure.route_long_name;
    const status = departure.cancelled
      ? "cancelled"
      : timing.delayed
        ? `${timing.delayMinutes} minutes late`
        : departure.realtime
          ? "live prediction"
          : "scheduled";
    const delayLabel =
      this.config?.delay_format === "text"
        ? `${timing.delayMinutes} min late`
        : `+${timing.delayMinutes} min`;
    return html`
      <div
        class="departure ${departure.cancelled ? "cancelled" : ""}"
        role="button"
        tabindex="0"
        aria-label="Route ${departure.route_name} to ${destination}, ${status}. Open route map."
        @click=${() => this.openTripMap(departure)}
        @keydown=${(event: KeyboardEvent) =>
          this.departureKeydown(event, departure)}
      >
        <span class="route" style=${routeStyle}>${departure.route_name}</span>
        <div class="destination">
          <strong>${destination}</strong>
          ${showStop ? html`<small>${departure.stop_name}</small>` : nothing}
        </div>
        <div class="timing">
          ${departure.cancelled
            ? html`<strong>Cancelled</strong>`
            : showCountdown
              ? html`<strong>${countdownLabel(departure.estimated_time)}</strong>`
              : nothing}
          ${showClock
            ? html`<small class="time-details ${showCountdown ? "" : "clock-only"}">
                ${timing.scheduledTime &&
                this.config?.show_scheduled_time !== false
                  ? html`<s>${timeLabel(timing.scheduledTime, this.hass?.locale)}</s>`
                  : nothing}
                <span class=${timing.delayed ? "predicted-time" : ""}>
                  ${timeLabel(timing.displayTime, this.hass?.locale)}
                </span>
              </small>`
            : nothing}
          <small class="status-details">
            ${timing.delayMinutes !== undefined
              ? html`<span class="delay">${delayLabel}</span>`
              : nothing}
            ${this.config?.show_realtime_status
              ? html`<span class="realtime ${departure.realtime ? "live" : ""}">
                  ${departure.realtime ? "Live" : "Scheduled"}
                </span>`
              : nothing}
          </small>
        </div>
      </div>
    `;
  }

  private openTripMap(departure: Departure): void {
    if (!this.hass || !this.config) return;
    document.querySelector("translink-trip-map-dialog")?.remove();
    const entity = this.hass.states[this.config.entity];
    const entryId = entity?.attributes.config_entry_id;
    const dialog = document.createElement(
      "translink-trip-map-dialog",
    ) as TransLinkTripMapDialog;
    dialog.hass = this.hass;
    dialog.entryId = typeof entryId === "string" ? entryId : "";
    dialog.departure = departure;
    document.body.append(dialog);
  }

  private departureKeydown(
    event: KeyboardEvent,
    departure: Departure,
  ): void {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    this.openTripMap(departure);
  }

  private isStopCollapsed(stop: StopDepartures): boolean {
    if (!this.initializedStops.has(stop.stop_id)) {
      this.initializedStops.add(stop.stop_id);
      if (stop.collapsed) this.collapsedStops.add(stop.stop_id);
    }
    return this.collapsedStops.has(stop.stop_id);
  }

  private toggleStop(stopId: string): void {
    const collapsed = new Set(this.collapsedStops);
    if (collapsed.has(stopId)) collapsed.delete(stopId);
    else collapsed.add(stopId);
    this.collapsedStops = collapsed;
  }

  private activeSelectedRoutes(
    routes: RouteOption[],
  ): ReadonlySet<string> {
    const available = new Set(routes.map((route) => route.name));
    const active = new Set(
      [...this.selectedRoutes].filter((route) => available.has(route)),
    );
    if (active.size !== this.selectedRoutes.size) {
      this.selectedRoutes.clear();
      for (const route of active) this.selectedRoutes.add(route);
      if (active.size === 0) this.clearRouteFilterResetTimer();
    }
    return active;
  }

  private selectAllRoutes(): void {
    this.resetRouteFilter();
  }

  private toggleRoute(route: string): void {
    const selected = new Set(this.selectedRoutes);
    if (this.config?.route_filter_selection_mode === "single") {
      if (selected.size === 1 && selected.has(route)) selected.clear();
      else {
        selected.clear();
        selected.add(route);
      }
    } else if (selected.has(route)) {
      selected.delete(route);
    } else {
      selected.add(route);
    }
    this.selectedRoutes = selected;
    if (selected.size > 0) this.scheduleRouteFilterReset();
    else this.clearRouteFilterResetTimer();
  }

  private resetRouteFilter(): void {
    this.clearRouteFilterResetTimer();
    if (this.selectedRoutes.size > 0) this.selectedRoutes = new Set();
  }

  private scheduleRouteFilterReset(): void {
    this.clearRouteFilterResetTimer();
    const minutes =
      this.config?.route_filter_reset_minutes ??
      DEFAULT_ROUTE_FILTER_RESET;
    if (minutes <= 0) return;
    this.routeFilterResetTimer = window.setTimeout(
      () => this.resetRouteFilter(),
      minutes * 60_000,
    );
  }

  private clearRouteFilterResetTimer(): void {
    if (this.routeFilterResetTimer === undefined) return;
    window.clearTimeout(this.routeFilterResetTimer);
    this.routeFilterResetTimer = undefined;
  }

  static styles = css`
    :host {
      display: block;
      height: 100%;
      min-height: 0;
      width: 100%;
    }
    ha-card {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }
    header {
      align-items: center;
      background: var(--primary-color);
      color: var(--text-primary-color);
      display: flex;
      flex: 0 0 auto;
      justify-content: space-between;
      padding: 16px 20px;
    }
    .header-title, .stop-title {
      align-items: center;
      display: flex;
      gap: 8px;
    }
    .header-surface header {
      background: var(--ha-card-background, var(--card-background-color));
      color: var(--primary-text-color);
    }
    .header-transparent header {
      background: transparent;
      color: var(--primary-text-color);
    }
    .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; opacity: .8; text-transform: uppercase; }
    h1 { font-size: 20px; line-height: 1.2; margin: 2px 0 0; }
    .clock { font-size: 18px; font-variant-numeric: tabular-nums; font-weight: 600; }
    .header-time {
      align-items: flex-end;
      display: flex;
      flex-direction: column;
      font-variant-numeric: tabular-nums;
      line-height: 1.1;
      white-space: nowrap;
    }
    .header-time small {
      color: inherit;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .1em;
      opacity: .78;
      text-transform: uppercase;
    }
    .header-time strong { font-size: 18px; }
    .header-time span { font-size: 11px; margin-top: 2px; opacity: .82; }
    .alerts { background: var(--warning-color, #ff9800); color: #111; flex: 0 0 auto; padding: 8px 16px; }
    .alerts > div { align-items: flex-start; display: flex; gap: 8px; }
    .alerts > div + div { margin-top: 8px; }
    .alerts span { display: flex; flex-direction: column; }
    .alerts small { color: inherit; }
    .stale {
      align-items: center;
      background: var(--warning-color, #ff9800);
      color: #111;
      display: flex;
      flex: 0 0 auto;
      font-size: 12px;
      gap: 8px;
      padding: 7px 16px;
    }
    .route-filter {
      background: color-mix(in srgb, var(--card-background-color), var(--primary-color) 4%);
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      flex: 0 0 auto;
      gap: 7px;
      overflow-x: auto;
      padding: 9px 12px;
      scrollbar-width: thin;
    }
    .route-filter-chip {
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      border-radius: 999px;
      color: var(--primary-text-color);
      cursor: pointer;
      flex: 0 0 auto;
      font-family: inherit;
      font-size: 12px;
      font-weight: 700;
      min-width: 38px;
      padding: 6px 11px;
    }
    .route-filter-chip[aria-pressed="true"] {
      background: var(--primary-color);
      color: var(--text-primary-color);
    }
    .route-filter-chip:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    .route-filter-chip span {
      color: inherit;
      font-size: 10px;
      margin-left: 3px;
      opacity: .78;
    }
    .routes-theme .route-filter-chip[aria-pressed="true"] {
      background: var(--primary-color) !important;
      color: var(--text-primary-color) !important;
    }
    .routes-monochrome .route-filter-chip[aria-pressed="true"] {
      background: var(--primary-text-color) !important;
      color: var(--card-background-color) !important;
    }
    main {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      padding: 4px 0;
    }
    section + section { border-top: 1px solid var(--divider-color); }
    .stop-heading {
      align-items: center;
      background: color-mix(in srgb, var(--card-background-color), var(--primary-color) 7%);
      border: 0;
      color: var(--primary-text-color);
      cursor: pointer;
      display: flex;
      font-family: inherit;
      font-size: 14px;
      font-weight: 700;
      justify-content: space-between;
      padding: 9px 16px;
      text-align: left;
      width: 100%;
    }
    .stop-heading:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
    .stop-title ha-icon { --mdc-icon-size: 17px; }
    .stops-plain .stop-heading { background: transparent; }
    .stops-compact .stop-heading {
      background: transparent;
      font-size: 12px;
      padding-block: 5px;
    }
    .stop-code {
      color: var(--secondary-text-color);
      font-size: 12px;
      font-weight: 500;
      line-height: 1;
    }
    .departure {
      align-items: center;
      cursor: pointer;
      display: grid;
      gap: 12px;
      grid-template-columns: minmax(42px, auto) 1fr auto;
      min-height: 48px;
      padding: 6px 16px;
    }
    .departure:hover {
      background: color-mix(
        in srgb,
        var(--card-background-color),
        var(--primary-color) 6%
      );
    }
    .departure:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .departure + .departure { border-top: 1px solid var(--divider-color); }
    .route {
      background: var(--primary-color);
      border-radius: 5px;
      color: var(--text-primary-color);
      font-size: 13px;
      font-weight: 800;
      min-width: 30px;
      padding: 5px 7px;
      text-align: center;
    }
    .routes-theme .route {
      background: var(--primary-color) !important;
      color: var(--text-primary-color) !important;
    }
    .routes-monochrome .route {
      background: var(--secondary-background-color) !important;
      color: var(--primary-text-color) !important;
    }
    .destination, .timing { display: flex; flex-direction: column; min-width: 0; }
    .destination strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    small { color: var(--secondary-text-color); font-size: 11px; }
    .timing { align-items: flex-end; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .time-details { align-items: baseline; display: flex; gap: 5px; }
    .clock-only { font-size: 14px; font-weight: 700; }
    .status-details { align-items: baseline; display: flex; gap: 5px; }
    .predicted-time, .delay { color: var(--error-color); }
    .realtime {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      padding: 0 4px;
    }
    .realtime.live { color: var(--success-color, var(--primary-color)); }
    .cancelled .destination strong { text-decoration: line-through; }
    .empty-stop, .message { color: var(--secondary-text-color); padding: 16px; }
    .error { color: var(--error-color); }
    .density-compact .departure { min-height: 40px; padding-block: 3px; }
    .density-compact .stop-heading { padding-block: 6px; }
    .density-minimal .departure {
      gap: 8px;
      min-height: 34px;
      padding-block: 2px;
    }
    .density-minimal .route { padding-block: 3px; }
    .density-minimal .destination small { display: none; }
    @media (max-width: 450px) {
      .departure { gap: 8px; padding-inline: 12px; }
      header { padding-inline: 16px; }
    }
  `;
}

export class TransLinkScheduleCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: CardConfig;

  public setConfig(config: CardConfig): void {
    this.config = flattenCardConfig(config);
  }

  protected render() {
    if (!this.config) return nothing;
    return html`
      <div class="card-config">
        <ha-entity-picker
          class="entity-picker"
          .hass=${this.hass}
          .value=${this.config.entity}
          .includeDomains=${["sensor"]}
          label="Entity"
          data-key="entity"
          @value-changed=${this.valueChanged}
        ></ha-entity-picker>
        ${this.editorPanel(
          "Card & layout",
          "Title, layout, ordering, and departure limits",
          "mdi:view-dashboard-outline",
          html`
            <ha-textfield
              .value=${this.config.title ?? ""}
              label="Title"
              data-key="title"
              @input=${this.valueChanged}
            ></ha-textfield>
            ${this.selectField(
              "view",
              "Layout",
              this.config.view ?? "grouped",
              VIEW_OPTIONS,
            )}
            ${this.selectField(
              "combined_order",
              "Combined ordering",
              this.config.combined_order ?? "chronological",
              ORDER_OPTIONS,
            )}
            <ha-textfield
              type="number"
              min="1"
              max=${MAX_PER_STOP}
              .value=${String(
                this.config.departures_per_stop ?? DEFAULT_PER_STOP,
              )}
              label="Departures per stop"
              data-key="departures_per_stop"
              data-min="1"
              data-max=${MAX_PER_STOP}
              @input=${this.numberChanged}
            ></ha-textfield>
            <ha-textfield
              type="number"
              min="1"
              max="50"
              .value=${String(
                this.config.max_departures ?? DEFAULT_MAX,
              )}
              label="Maximum combined departures"
              data-key="max_departures"
              data-min="1"
              data-max="50"
              @input=${this.numberChanged}
            ></ha-textfield>
          `,
        )}
        ${this.editorPanel(
          "Timing & status",
          "Departure times, delays, cancellations, and realtime state",
          "mdi:clock-outline",
          html`
            ${this.selectField(
              "time_display",
              "Time display",
              this.config.time_display ?? "both",
              TIME_OPTIONS,
            )}
            <ha-textfield
              type="number"
              min="1"
              max="30"
              .value=${String(
                this.config.delay_threshold_minutes ?? 1,
              )}
              label="Delay threshold (minutes)"
              data-key="delay_threshold_minutes"
              data-min="1"
              data-max="30"
              @input=${this.numberChanged}
            ></ha-textfield>
            ${this.selectField(
              "delay_format",
              "Delay label",
              this.config.delay_format ?? "compact",
              DELAY_OPTIONS,
            )}
            ${this.selectField(
              "cancelled_behavior",
              "Cancelled departures",
              this.config.cancelled_behavior ?? "show",
              CANCELLED_OPTIONS,
            )}
            ${this.booleanField(
              "show_scheduled_time",
              "Show struck-through scheduled time",
              this.config.show_scheduled_time !== false,
            )}
            ${this.booleanField(
              "show_realtime_status",
              "Show Live/Scheduled labels",
              this.config.show_realtime_status === true,
            )}
            ${this.booleanField(
              "show_stale_warning",
              "Warn when realtime data is stale",
              this.config.show_stale_warning === true,
            )}
            <ha-textfield
              type="number"
              min="2"
              max="30"
              .value=${String(this.config.stale_after_minutes ?? 3)}
              label="Stale warning after (minutes)"
              data-key="stale_after_minutes"
              data-min="2"
              data-max="30"
              @input=${this.numberChanged}
            ></ha-textfield>
          `,
        )}
        ${this.editorPanel(
          "Appearance",
          "Density, route colors, stops, and section headings",
          "mdi:palette-outline",
          html`
            ${this.selectField(
              "density",
              "Row density",
              this.config.density ?? "comfortable",
              DENSITY_OPTIONS,
            )}
            ${this.selectField(
              "route_color_mode",
              "Route badge colors",
              this.config.route_color_mode ?? "official",
              ROUTE_COLOR_OPTIONS,
            )}
            ${this.selectField(
              "empty_stop_behavior",
              "Stops without departures",
              this.config.empty_stop_behavior ??
                (this.config.hide_empty_stops ? "hide" : "show"),
              EMPTY_STOP_OPTIONS,
            )}
            ${this.selectField(
              "stop_heading_style",
              "Stop heading style",
              this.config.stop_heading_style ?? "accent",
              STOP_HEADING_OPTIONS,
            )}
            ${this.booleanField(
              "show_stop_codes",
              "Show stop numbers",
              this.config.show_stop_codes !== false,
            )}
          `,
        )}
        ${this.editorPanel(
          "Route filter",
          "Interactive route selection and automatic reset",
          "mdi:filter-variant",
          html`
            ${this.booleanField(
              "show_route_filter",
              "Show route filter",
              this.config.show_route_filter === true,
            )}
            ${this.config.show_route_filter
              ? html`
                  ${this.selectField(
                    "route_filter_selection_mode",
                    "Route selection",
                    this.config.route_filter_selection_mode ??
                      "multiple",
                    ROUTE_FILTER_SELECTION_OPTIONS,
                  )}
                  ${this.booleanField(
                    "route_filter_show_counts",
                    "Show departure counts",
                    this.config.route_filter_show_counts === true,
                  )}
                  <ha-textfield
                    type="number"
                    min="0"
                    max=${MAX_ROUTE_FILTER_RESET}
                    .value=${String(
                      this.config.route_filter_reset_minutes ??
                        DEFAULT_ROUTE_FILTER_RESET,
                    )}
                    label="Reset to All after (minutes, 0 = never)"
                    data-key="route_filter_reset_minutes"
                    data-min="0"
                    data-max=${MAX_ROUTE_FILTER_RESET}
                    @input=${this.numberChanged}
                  ></ha-textfield>
                `
              : nothing}
          `,
        )}
        ${this.editorPanel(
          "Header & notices",
          "Title, right-side display, colors, icon, and service notices",
          "mdi:card-text-outline",
          html`
            ${this.booleanField(
              "show_header",
              "Show header",
              this.config.show_header !== false,
            )}
            ${this.booleanField(
              "show_brand",
              "Show TransLink label",
              this.config.show_brand !== false,
            )}
            ${this.selectField(
              "header_time_mode",
              "Header right-side display",
              this.config.header_time_mode ??
                (this.config.show_clock === false ? "hidden" : "clock"),
              HEADER_TIME_MODE_OPTIONS,
            )}
            ${(this.config.header_time_mode ??
              (this.config.show_clock === false ? "hidden" : "clock")) ===
            "next_departure"
              ? this.selectField(
                  "header_next_departure_format",
                  "Next departure display",
                  this.config.header_next_departure_format ?? "countdown",
                  HEADER_NEXT_DEPARTURE_OPTIONS,
                )
              : nothing}
            ${this.selectField(
              "header_style",
              "Header colors",
              this.config.header_style ?? "primary",
              HEADER_STYLE_OPTIONS,
            )}
            <ha-textfield
              .value=${this.config.header_icon ?? ""}
              label="Header icon (for example mdi:bus)"
              data-key="header_icon"
              @input=${this.valueChanged}
            ></ha-textfield>
            <ha-formfield label="Show service notices">
              <ha-switch
                .checked=${this.config.show_alerts !== false}
                data-key="show_alerts"
                @change=${this.booleanChanged}
              ></ha-switch>
            </ha-formfield>
          `,
        )}
      </div>
    `;
  }

  private editorPanel(
    header: string,
    secondary: string,
    icon: string,
    content: TemplateResult,
  ) {
    return html`
      <ha-expansion-panel
        outlined
        .header=${header}
        .secondary=${secondary}
        .leftChevron=${false}
      >
        <ha-icon slot="leading-icon" .icon=${icon}></ha-icon>
        <div class="panel-body">${content}</div>
      </ha-expansion-panel>
    `;
  }

  private selectField(
    key: keyof CardConfig,
    label: string,
    value: string,
    options: SelectOption[],
  ) {
    return html`
      <ha-select
        .label=${label}
        .value=${value}
        .options=${options}
        data-key=${key}
        @selected=${this.valueChanged}
      ></ha-select>
    `;
  }

  private booleanField(
    key: keyof CardConfig,
    label: string,
    checked: boolean,
  ) {
    return html`
      <ha-formfield label=${label}>
        <ha-switch
          .checked=${checked}
          data-key=${key}
          @change=${this.booleanChanged}
        ></ha-switch>
      </ha-formfield>
    `;
  }

  private valueChanged(event: Event): void {
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement & { value: string };
    const key = target.dataset.key as keyof CardConfig;
    const detail = (event as CustomEvent<{ value?: string }>).detail;
    const value = detail?.value ?? target.value;
    this.config = { ...this.config, [key]: value };
    this.emitConfigChanged();
  }

  private booleanChanged(event: Event): void {
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement & { checked: boolean };
    const key = target.dataset.key as keyof CardConfig;
    this.config = { ...this.config, [key]: target.checked };
    this.emitConfigChanged();
  }

  private numberChanged(event: Event): void {
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement & { value: string };
    const value = Number.parseInt(target.value, 10);
    if (!Number.isFinite(value)) return;
    const key = target.dataset.key as keyof CardConfig;
    const minimum = Number.parseInt(target.dataset.min ?? "1", 10);
    const maximum = Number.parseInt(target.dataset.max ?? "12", 10);
    this.config = {
      ...this.config,
      [key]: Math.min(maximum, Math.max(minimum, value)),
    };
    this.emitConfigChanged();
  }

  private emitConfigChanged(): void {
    if (!this.config) return;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: groupCardConfig(this.config) },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static styles = css`
    .card-config {
      display: flex;
      flex-direction: column;
      padding: 4px 0;
    }
    .entity-picker { margin: 8px 0; }
    ha-expansion-panel { margin: 8px 0; }
    .panel-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 8px 0 4px;
    }
  `;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}

if (!customElements.get("translink-schedule-card")) {
  customElements.define("translink-schedule-card", TransLinkScheduleCard);
}
if (!customElements.get("translink-schedule-card-editor")) {
  customElements.define(
    "translink-schedule-card-editor",
    TransLinkScheduleCardEditor,
  );
}

window.customCards = window.customCards ?? [];
if (
  !window.customCards.some(
    (card) => card.type === "translink-schedule-card",
  )
) {
  window.customCards.push({
    type: "translink-schedule-card",
    name: "TransLink Schedule Card",
    description: "Upcoming departures from multiple TransLink stops.",
    preview: true,
  });
}
