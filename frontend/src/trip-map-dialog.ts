import type * as Leaflet from "leaflet";
import leafletStyles from "leaflet/dist/leaflet.css";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";

import type {
  Departure,
  HomeAssistant,
  MapPoint,
  TripMapData,
} from "./types";

export function homeAssistantRasterTileUrl(token: string): string {
  return `/api/map_tiles/raster/{z}/{x}/{y}.png?token=${encodeURIComponent(
    token,
  )}`;
}

const MAP_ROUTE = "#0698E4";
const MAP_ROUTE_EDGE = "#0479B5";
const MAP_DESTINATION = "#757575";
const MAP_CASING = "#FFFFFF";
const BUS_MARKER_HTML = `
  <div class="translink-map-bus-marker" aria-hidden="true">
    <ha-icon icon="mdi:bus"></ha-icon>
  </div>
`;

export class TransLinkTripMapDialog extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property() public entryId = "";
  @property({ attribute: false }) public departure?: Departure;
  @state() private data?: TripMapData;
  @state() private error?: string;
  @state() private tilesUnavailable = false;
  @state() private expanded = false;
  private map?: Leaflet.Map;
  private leaflet?: typeof Leaflet;
  private mapTilesToken?: string;
  private readonly handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") this.close();
  };

  public connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener("keydown", this.handleKeydown);
  }

  public disconnectedCallback(): void {
    document.removeEventListener("keydown", this.handleKeydown);
    this.map?.remove();
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    void this.load();
  }

  protected updated(): void {
    if (this.data && !this.map && !this.error) {
      requestAnimationFrame(() => void this.createMap());
    }
  }

  protected render() {
    const destination =
      this.departure?.destination || this.departure?.route_long_name || "";
    return html`
      <div class="backdrop" @click=${this.backdropClicked}>
        <section
          class="dialog ${this.expanded ? "expanded" : ""}"
          role="dialog"
          aria-modal="true"
          aria-labelledby="trip-map-title"
        >
          <header
            role="button"
            tabindex="0"
            aria-label=${this.expanded
              ? "Restore map dialog size"
              : "Expand map dialog"}
            aria-expanded=${String(this.expanded)}
            @click=${this.toggleExpanded}
            @keydown=${this.headerKeydown}
          >
            <div>
              <div class="eyebrow">Route ${this.departure?.route_name}</div>
              <h2 id="trip-map-title">${destination}</h2>
            </div>
            <button
              type="button"
              aria-label="Close route map"
              @click=${this.closeClicked}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </header>
          ${this.error
            ? html`<div class="state error" role="alert">
                <ha-icon icon="mdi:map-marker-alert"></ha-icon>
                <div>
                  <strong>Route map unavailable</strong>
                  <span>${this.error}</span>
                </div>
              </div>`
            : !this.data
              ? html`<div class="state" role="status">
                  <ha-circular-progress active></ha-circular-progress>
                  Loading planned route and vehicle position...
                </div>`
              : html`
                  <div class="map" aria-label="Planned route map"></div>
                  <footer>
                    <div class=${this.data.vehicle ? "live" : "unavailable"}>
                      <ha-icon
                        icon=${this.data.vehicle
                          ? "mdi:bus-marker"
                          : "mdi:bus-alert"}
                      ></ha-icon>
                      <span>
                        <strong>
                          ${this.data.vehicle
                            ? this.vehicleLabel(this.data)
                            : "Live vehicle position unavailable"}
                        </strong>
                        ${this.data.vehicle?.timestamp
                          ? html`<small>
                              Last reported
                              ${this.positionAge(
                                this.data.vehicle.timestamp,
                              )}
                            </small>`
                          : this.data.vehicle_error
                            ? html`<small>${this.data.vehicle_error}</small>`
                            : nothing}
                      </span>
                    </div>
                    ${this.tilesUnavailable
                      ? html`<small class="tile-warning">
                          Basemap tiles could not be loaded. Route geometry is
                          still shown.
                        </small>`
                      : nothing}
                  </footer>
                `}
        </section>
      </div>
    `;
  }

  private async load(): Promise<void> {
    if (
      !this.hass?.callApi ||
      !this.departure ||
      !this.entryId
    ) {
      this.error = "This departure is missing map identity data.";
      return;
    }
    const query = new URLSearchParams({
      entry_id: this.entryId,
      trip_id: this.departure.trip_id,
      stop_id: this.departure.stop_id,
    });
    try {
      const [data, token] = await Promise.all([
        this.hass.callApi<TripMapData>(
          "GET",
          `translink_schedule/trip-map?${query}`,
        ),
        this.loadMapTilesToken(),
      ]);
      this.mapTilesToken = token;
      this.data = data;
    } catch (error) {
      this.error =
        error instanceof Error ? error.message : "Unable to load map data.";
    }
  }

  private async loadMapTilesToken(): Promise<string | undefined> {
    if (!this.hass?.connection) return undefined;
    try {
      const result =
        await this.hass.connection.sendMessagePromise<{ token: string }>({
          type: "map_tiles/access_token",
        });
      return result.token;
    } catch {
      return undefined;
    }
  }

  private async createMap(): Promise<void> {
    const container = this.renderRoot.querySelector<HTMLElement>(".map");
    if (!container || !this.data || this.map) return;
    try {
      const loaded = await import("leaflet");
      const L = loaded.default;
      if (!this.isConnected || this.map) return;
      this.leaflet = L;
      const points = this.data.shape.map(
        (point) =>
          [point.latitude, point.longitude] as Leaflet.LatLngTuple,
      );
      this.map = L.map(container, {
        attributionControl: true,
        zoomControl: true,
      });
      if (this.mapTilesToken) {
        L.tileLayer(
          homeAssistantRasterTileUrl(this.mapTilesToken),
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">' +
              "OpenStreetMap</a> contributors",
            maxNativeZoom: 19,
            maxZoom: 20,
          },
        )
          .on("tileerror", () => {
            this.tilesUnavailable = true;
          })
          .addTo(this.map);
      } else {
        this.tilesUnavailable = true;
      }

      L.polyline(points, {
        color: MAP_ROUTE_EDGE,
        opacity: 1,
        weight: 8,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(this.map);
      L.polyline(points, {
        color: MAP_ROUTE,
        opacity: 1,
        weight: 6,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(this.map);

      this.addPoint(this.data.shape[0], "Route start", {
        color: MAP_ROUTE,
        fillColor: MAP_CASING,
        radius: 6,
        weight: 3,
      });
      this.addPoint(
        this.data.boarding_stop,
        `Board at ${this.data.boarding_stop.name}`,
        {
          color: MAP_CASING,
          fillColor: MAP_ROUTE,
          radius: 7,
          weight: 3,
        },
      );
      this.addPoint(
        this.data.destination_point,
        this.data.destination,
        {
          color: MAP_DESTINATION,
          fillColor: MAP_CASING,
          radius: 8,
          weight: 3,
        },
      );
      if (this.data.vehicle) {
        L.marker(
          [this.data.vehicle.latitude, this.data.vehicle.longitude],
          {
            icon: L.divIcon({
              className: "translink-map-bus-icon",
              html: BUS_MARKER_HTML,
              iconAnchor: [20, 20],
              iconSize: [40, 40],
              tooltipAnchor: [0, -20],
            }),
            keyboard: true,
            title: this.vehicleLabel(this.data),
          },
        )
          .bindTooltip(this.vehicleLabel(this.data))
          .addTo(this.map);
      }
      this.map.fitBounds(L.latLngBounds(points), { padding: [24, 24] });
    } catch (error) {
      this.error =
        error instanceof Error
          ? `Unable to initialize route map: ${error.message}`
          : "Unable to initialize route map.";
    }
  }

  private addPoint(
    point: MapPoint,
    label: string,
    style: {
      color: string;
      fillColor: string;
      radius: number;
      weight: number;
    },
  ): void {
    const L = this.leaflet;
    if (!L) return;
    L.circleMarker([point.latitude, point.longitude], {
      className: "translink-map-node",
      color: style.color,
      fillColor: style.fillColor,
      fillOpacity: 1,
      radius: style.radius,
      weight: style.weight,
    })
      .bindTooltip(label)
      .addTo(this.map!);
  }

  private vehicleLabel(data: TripMapData): string {
    const label = data.vehicle?.vehicle_label ?? data.vehicle?.vehicle_id;
    return label ? `Bus ${label}` : "Last reported bus position";
  }

  private positionAge(timestamp: string): string {
    const seconds = Math.max(
      0,
      Math.round((Date.now() - new Date(timestamp).getTime()) / 1_000),
    );
    if (seconds < 60) return `${seconds} sec ago`;
    return `${Math.round(seconds / 60)} min ago`;
  }

  private backdropClicked(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }

  private toggleExpanded(): void {
    this.expanded = !this.expanded;
    void this.updateComplete.then(() => this.refitMap());
  }

  private headerKeydown(event: KeyboardEvent): void {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    this.toggleExpanded();
  }

  private refitMap(): void {
    if (!this.map || !this.leaflet || !this.data) return;
    const bounds = this.leaflet.latLngBounds(
      this.data.shape.map(
        (point) =>
          [point.latitude, point.longitude] as Leaflet.LatLngTuple,
      ),
    );
    this.map.invalidateSize();
    this.map.fitBounds(bounds, { padding: [24, 24] });
  }

  private closeClicked(event: MouseEvent): void {
    event.stopPropagation();
    this.close();
  }

  private close(): void {
    this.remove();
  }

  static styles = [
    unsafeCSS(leafletStyles),
    css`
    :host {
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .backdrop {
      align-items: center;
      background: rgb(0 0 0 / 45%);
      display: flex;
      inset: 0;
      justify-content: center;
      padding: 16px;
      position: fixed;
      z-index: 10000;
    }
    .dialog {
      background: var(--card-background-color, #fff);
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, 0 12px 36px rgb(0 0 0 / 35%));
      max-height: calc(100vh - 32px);
      max-width: 760px;
      overflow: hidden;
      width: 100%;
    }
    .dialog.expanded {
      display: flex;
      flex-direction: column;
      height: calc(100vh - 32px);
      max-width: none;
      width: calc(100vw - 32px);
    }
    header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: 16px 20px 14px;
    }
    header { cursor: pointer; }
    header:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: -2px;
    }
    .eyebrow {
      color: var(--primary-color);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .06em;
      text-transform: uppercase;
    }
    h2 { font-size: 20px; margin: 3px 0 0; }
    button {
      background: transparent;
      border: 0;
      border-radius: 50%;
      color: var(--primary-text-color);
      cursor: pointer;
      height: 40px;
      width: 40px;
    }
    button:hover { background: var(--secondary-background-color); }
    button:focus-visible { outline: 2px solid var(--primary-color); }
    .map { height: min(58vh, 520px); min-height: 320px; }
    .expanded .map {
      flex: 1 1 auto;
      height: auto;
      min-height: 0;
    }
    .state {
      align-items: center;
      display: flex;
      gap: 14px;
      justify-content: center;
      min-height: 320px;
      padding: 24px;
    }
    .state ha-icon { --mdc-icon-size: 30px; }
    .state div, footer span { display: flex; flex-direction: column; }
    .state span, footer small { color: var(--secondary-text-color); }
    .error ha-icon { color: var(--error-color); }
    footer { padding: 12px 18px 14px; }
    footer > div {
      align-items: center;
      display: flex;
      gap: 10px;
    }
    footer ha-icon { color: var(--primary-color); }
    .unavailable ha-icon, .tile-warning { color: var(--warning-color, #f59e0b); }
    .tile-warning { display: block; margin-top: 8px; }
    .leaflet-container { font-family: inherit; }
    .leaflet-control-container { font-size: 11px; }
    .translink-map-node {
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 45%));
    }
    .translink-map-bus-icon {
      background: transparent;
      border: 0;
    }
    .translink-map-bus-marker {
      align-items: center;
      background: #fff;
      border: 2px solid #dadce0;
      border-radius: 50%;
      box-shadow:
        0 1px 2px rgb(60 64 67 / 30%),
        0 2px 6px rgb(60 64 67 / 18%);
      display: flex;
      height: 36px;
      justify-content: center;
      width: 36px;
    }
    .translink-map-bus-marker ha-icon {
      --mdc-icon-size: 24px;
      color: #3c4043;
    }
    @media (max-width: 600px) {
      .backdrop { align-items: flex-end; padding: 0; }
      .dialog { border-radius: 16px 16px 0 0; max-height: 92vh; }
      .dialog.expanded {
        border-radius: 0;
        height: 100vh;
        max-height: 100vh;
        width: 100vw;
      }
      .map { height: 56vh; min-height: 280px; }
      .expanded .map { height: auto; min-height: 0; }
    }
    `,
  ];
}

if (!customElements.get("translink-trip-map-dialog")) {
  customElements.define(
    "translink-trip-map-dialog",
    TransLinkTripMapDialog,
  );
}
