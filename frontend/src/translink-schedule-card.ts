import { LitElement, css, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";

import { getDepartureTiming } from "./departure-timing";
import { findScheduleEntity } from "./entity-selection";
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

function minutesUntil(value: string, now = Date.now()): number {
  return Math.max(0, Math.round((new Date(value).getTime() - now) / 60_000));
}

function timeLabel(value: string, language?: string): string {
  return new Intl.DateTimeFormat(language, {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export class TransLinkScheduleCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: CardConfig;
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
      view: "grouped",
      departures_per_stop: DEFAULT_PER_STOP,
    };
  }

  public setConfig(config: CardConfig): void {
    if (!config.entity) {
      throw new Error("A TransLink Schedule entity is required");
    }
    this.config = {
      view: "grouped",
      departures_per_stop: DEFAULT_PER_STOP,
      max_departures: DEFAULT_MAX,
      show_clock: true,
      show_alerts: true,
      show_attribution: true,
      ...config,
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.ticker = window.setInterval(() => this.requestUpdate(), 30_000);
  }

  public disconnectedCallback(): void {
    if (this.ticker !== undefined) window.clearInterval(this.ticker);
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
    const departures = (entity.attributes.departures ?? []) as Departure[];
    const alerts = (entity.attributes.alerts ?? []) as ServiceAlert[];
    const title =
      this.config.title ??
      (entity.attributes.board_name as string | undefined) ??
      "TransLink departures";

    return html`
      <ha-card>
        <header>
          <div>
            <div class="eyebrow">TransLink</div>
            <h1>${title}</h1>
          </div>
          ${this.config.show_clock
            ? html`<div class="clock">${timeLabel(new Date().toISOString(), this.hass.locale?.language)}</div>`
            : nothing}
        </header>
        ${this.config.show_alerts && alerts.length
          ? html`<div class="alerts">
              ${alerts.map(
                (alert) => html`<div>
                  <ha-icon icon="mdi:alert"></ha-icon>
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
        <main>
          ${departures.length === 0
            ? html`<div class="message">No upcoming departures.</div>`
            : this.config.view === "combined"
              ? this.renderCombined(departures)
              : this.renderGrouped(stops)}
        </main>
        ${this.config.show_attribution
          ? html`<footer>Route and arrival data provided by permission of TransLink.</footer>`
          : nothing}
      </ha-card>
    `;
  }

  private renderGrouped(stops: StopDepartures[]) {
    return stops.map((stop) => html`
      <section>
        <div class="stop-heading">
          <span>${stop.stop_name}</span>
          ${stop.stop_code ? html`<span class="stop-code">#${stop.stop_code}</span>` : nothing}
        </div>
        ${stop.departures.length
          ? stop.departures
              .slice(0, this.config?.departures_per_stop ?? DEFAULT_PER_STOP)
              .map((departure) => this.renderDeparture(departure, false))
          : html`<div class="empty-stop">No upcoming departures</div>`}
      </section>
    `);
  }

  private renderCombined(departures: Departure[]) {
    return html`
      <section>
        ${departures
          .slice(0, this.config?.max_departures ?? DEFAULT_MAX)
          .map((departure) => this.renderDeparture(departure, true))}
      </section>
    `;
  }

  private renderDeparture(departure: Departure, showStop: boolean) {
    const routeStyle = [
      departure.route_color ? `background:#${departure.route_color}` : "",
      departure.route_text_color ? `color:#${departure.route_text_color}` : "",
    ].filter(Boolean).join(";");
    const timing = getDepartureTiming(departure);
    return html`
      <div class="departure ${departure.cancelled ? "cancelled" : ""}">
        <span class="route" style=${routeStyle}>${departure.route_name}</span>
        <div class="destination">
          <strong>${departure.destination || departure.route_long_name}</strong>
          ${showStop ? html`<small>${departure.stop_name}</small>` : nothing}
        </div>
        <div class="timing">
          <strong>${departure.cancelled ? "Cancelled" : `${minutesUntil(departure.estimated_time)} min`}</strong>
          <small class="time-details">
            ${timing.scheduledTime
              ? html`<s>${timeLabel(timing.scheduledTime, this.hass?.locale?.language)}</s>`
              : nothing}
            <span class=${timing.delayed ? "predicted-time" : ""}>
              ${timeLabel(timing.displayTime, this.hass?.locale?.language)}
            </span>
            ${timing.delayMinutes !== undefined
              ? html`<span class="delay">+${timing.delayMinutes} min</span>`
              : nothing}
          </small>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    ha-card { overflow: hidden; }
    header {
      align-items: center;
      background: var(--primary-color);
      color: var(--text-primary-color);
      display: flex;
      justify-content: space-between;
      padding: 16px 20px;
    }
    .eyebrow { font-size: 11px; font-weight: 700; letter-spacing: .12em; opacity: .8; text-transform: uppercase; }
    h1 { font-size: 20px; line-height: 1.2; margin: 2px 0 0; }
    .clock { font-size: 18px; font-variant-numeric: tabular-nums; font-weight: 600; }
    .alerts { background: var(--warning-color, #ff9800); color: #111; padding: 8px 16px; }
    .alerts > div { align-items: flex-start; display: flex; gap: 8px; }
    .alerts > div + div { margin-top: 8px; }
    .alerts span { display: flex; flex-direction: column; }
    .alerts small { color: inherit; }
    main { padding: 4px 0; }
    section + section { border-top: 1px solid var(--divider-color); }
    .stop-heading {
      align-items: baseline;
      background: color-mix(in srgb, var(--card-background-color), var(--primary-color) 7%);
      display: flex;
      font-size: 14px;
      font-weight: 700;
      justify-content: space-between;
      padding: 9px 16px;
    }
    .stop-code { color: var(--secondary-text-color); font-size: 12px; font-weight: 500; }
    .departure {
      align-items: center;
      display: grid;
      gap: 12px;
      grid-template-columns: minmax(42px, auto) 1fr auto;
      min-height: 48px;
      padding: 6px 16px;
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
    .destination, .timing { display: flex; flex-direction: column; min-width: 0; }
    .destination strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    small { color: var(--secondary-text-color); font-size: 11px; }
    .timing { align-items: flex-end; font-variant-numeric: tabular-nums; white-space: nowrap; }
    .time-details { align-items: baseline; display: flex; gap: 5px; }
    .predicted-time, .delay { color: var(--error-color); }
    .cancelled .destination strong { text-decoration: line-through; }
    .empty-stop, .message { color: var(--secondary-text-color); padding: 16px; }
    .error { color: var(--error-color); }
    footer { color: var(--secondary-text-color); font-size: 10px; padding: 8px 16px 12px; }
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
    this.config = config;
  }

  protected render() {
    if (!this.config) return nothing;
    return html`
      <div class="form">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this.config.entity}
          .includeDomains=${["sensor"]}
          label="Entity"
          data-key="entity"
          @value-changed=${this.valueChanged}
        ></ha-entity-picker>
        <ha-textfield
          .value=${this.config.title ?? ""}
          label="Title"
          data-key="title"
          @input=${this.valueChanged}
        ></ha-textfield>
        <ha-select
          .value=${this.config.view ?? "grouped"}
          label="Layout"
          data-key="view"
          @selected=${this.valueChanged}
          @closed=${(event: Event) => event.stopPropagation()}
        >
          <mwc-list-item value="grouped">Grouped by stop</mwc-list-item>
          <mwc-list-item value="combined">Combined by time</mwc-list-item>
        </ha-select>
        <ha-textfield
          type="number"
          min="1"
          max=${MAX_PER_STOP}
          .value=${String(
            this.config.departures_per_stop ?? DEFAULT_PER_STOP,
          )}
          label="Departures per stop"
          data-key="departures_per_stop"
          @input=${this.numberChanged}
        ></ha-textfield>
        <ha-formfield label="Show service notices">
          <ha-switch
            .checked=${this.config.show_alerts !== false}
            data-key="show_alerts"
            @change=${this.booleanChanged}
          ></ha-switch>
        </ha-formfield>
      </div>
    `;
  }

  private valueChanged(event: Event): void {
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement & { value: string };
    const key = target.dataset.key as keyof CardConfig;
    const detail = (event as CustomEvent<{ value?: string }>).detail;
    const value = detail?.value ?? target.value;
    this.config = { ...this.config, [key]: value };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private booleanChanged(event: Event): void {
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement & { checked: boolean };
    const key = target.dataset.key as keyof CardConfig;
    this.config = { ...this.config, [key]: target.checked };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private numberChanged(event: Event): void {
    if (!this.config) return;
    const target = event.currentTarget as HTMLElement & { value: string };
    const value = Number.parseInt(target.value, 10);
    if (!Number.isFinite(value)) return;
    const key = target.dataset.key as keyof CardConfig;
    this.config = {
      ...this.config,
      [key]: Math.min(MAX_PER_STOP, Math.max(1, value)),
    };
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this.config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static styles = css`
    .form { display: grid; gap: 16px; padding: 8px 0; }
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
