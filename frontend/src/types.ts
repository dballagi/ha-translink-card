export interface HomeAssistant {
  states: Record<string, HassEntity>;
  locale?: { language: string };
}

export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

export interface Departure {
  stop_id: string;
  stop_name: string;
  route_name: string;
  route_long_name: string;
  route_type: number;
  route_color: string | null;
  route_text_color: string | null;
  destination: string;
  scheduled_time: string;
  estimated_time: string;
  delay_seconds: number;
  cancelled: boolean;
  realtime: boolean;
}

export interface StopDepartures {
  stop_id: string;
  stop_name: string;
  stop_code: string | null;
  departures: Departure[];
}

export interface ServiceAlert {
  header: string;
  description: string;
  url: string | null;
}

export interface CardConfig {
  type: string;
  entity: string;
  title?: string;
  view?: "grouped" | "combined";
  departures_per_stop?: number;
  max_departures?: number;
  show_clock?: boolean;
  show_alerts?: boolean;
  show_attribution?: boolean;
}
