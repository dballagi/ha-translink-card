"""Constants for the TransLink Schedule integration."""

from datetime import timedelta

DOMAIN = "translink_schedule"
PLATFORMS = ["sensor"]

CONF_API_KEY = "api_key"
CONF_BOARD_NAME = "board_name"
CONF_STOP_IDS = "stop_ids"
CONF_STOP_FILTERS = "stop_filters"
CONF_INCLUDE_ROUTE_IDS = "include_route_ids"
CONF_DESTINATION_CONTAINS = "destination_contains"
CONF_DEPARTURE_WINDOW_MINUTES = "departure_window_minutes"
CONF_CANCELLED_RETENTION_MINUTES = "cancelled_retention_minutes"
CONF_STOP_DISPLAY_NAME = "display_name"
CONF_STOP_DEPARTURES = "departures_per_stop"
CONF_STOP_SHOW_CODE = "show_stop_code"
CONF_STOP_COLLAPSED = "collapsed"
CONF_STATIC_URL = "static_url"
CONF_REALTIME_URL = "realtime_url"
CONF_ALERTS_URL = "alerts_url"
CONF_VEHICLE_POSITIONS_URL = "vehicle_positions_url"

DEFAULT_STATIC_URL = "https://gtfs-static.translink.ca/gtfs/google_transit.zip"
DEFAULT_REALTIME_URL = "https://gtfsapi.translink.ca/v3/gtfsrealtime"
DEFAULT_ALERTS_URL = "https://gtfsapi.translink.ca/v3/gtfsalerts"
DEFAULT_VEHICLE_POSITIONS_URL = "https://gtfsapi.translink.ca/v3/gtfsposition"

UPDATE_INTERVAL = timedelta(seconds=60)
STATIC_REFRESH_INTERVAL = timedelta(hours=24)
DEPARTURE_WINDOW = timedelta(hours=3)
DEFAULT_DEPARTURE_WINDOW_MINUTES = 180
DEFAULT_CANCELLED_RETENTION_MINUTES = 1
MAX_DEPARTURES_PER_STOP = 50
TRIP_LEVEL_STOP_ID = ""

CARD_URL = "/translink_schedule/translink-schedule-card.js"
CARD_FILENAME = "translink-schedule-card.js"
CARD_CHUNKS_URL = "/translink_schedule/chunks"
CARD_CHUNKS_FOLDER = "chunks"
