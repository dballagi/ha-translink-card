export interface HomeAssistant {
  states: Record<string, HassEntity>;
  connection?: {
    sendMessagePromise<T>(message: Record<string, unknown>): Promise<T>;
  };
  callApi?<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
  ): Promise<T>;
  locale?: {
    language: string;
    time_format?: "12" | "24" | "language" | "system";
  };
}

export interface HassEntity {
  state: string;
  attributes: Record<string, unknown>;
}

export interface Departure {
  stop_id: string;
  stop_name: string;
  trip_id: string;
  route_id: string;
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

export interface MapPoint {
  latitude: number;
  longitude: number;
}

export interface TripMapData {
  trip_id: string;
  route_id: string;
  route_name: string;
  route_color: string | null;
  destination: string;
  shape: MapPoint[];
  boarding_stop: MapPoint & {
    stop_id: string;
    name: string;
  };
  destination_point: MapPoint;
  vehicle: (MapPoint & {
    vehicle_id: string | null;
    vehicle_label: string | null;
    bearing: number | null;
    speed: number | null;
    timestamp: string | null;
  }) | null;
  vehicle_error: string | null;
}

export interface StopDepartures {
  stop_id: string;
  stop_name: string;
  display_name?: string;
  stop_code: string | null;
  departures_per_stop?: number | null;
  show_stop_code?: boolean;
  collapsed?: boolean;
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
  time_display?: "both" | "countdown" | "clock";
  show_scheduled_time?: boolean;
  delay_threshold_minutes?: number;
  delay_format?: "compact" | "text";
  density?: "comfortable" | "compact" | "minimal";
  hide_empty_stops?: boolean;
  empty_stop_behavior?: "show" | "move" | "hide";
  cancelled_behavior?: "show" | "move" | "hide";
  route_color_mode?: "official" | "theme" | "monochrome";
  show_route_filter?: boolean;
  route_filter_reset_minutes?: number;
  route_filter_selection_mode?: "single" | "multiple";
  route_filter_show_counts?: boolean;
  combined_order?: "chronological" | "balanced" | "route" | "realtime";
  show_header?: boolean;
  show_brand?: boolean;
  header_style?: "primary" | "surface" | "transparent";
  header_icon?: string;
  stop_heading_style?: "accent" | "plain" | "compact";
  show_clock?: boolean;
  show_alerts?: boolean;
  show_stop_codes?: boolean;
  show_realtime_status?: boolean;
  show_stale_warning?: boolean;
  stale_after_minutes?: number;
}
