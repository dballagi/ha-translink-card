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
CONF_STATIC_URL = "static_url"
CONF_REALTIME_URL = "realtime_url"
CONF_ALERTS_URL = "alerts_url"

DEFAULT_STATIC_URL = "https://gtfs-static.translink.ca/gtfs/google_transit.zip"
DEFAULT_REALTIME_URL = "https://gtfsapi.translink.ca/v3/gtfsrealtime"
DEFAULT_ALERTS_URL = "https://gtfsapi.translink.ca/v3/gtfsalerts"

UPDATE_INTERVAL = timedelta(seconds=60)
STATIC_REFRESH_INTERVAL = timedelta(hours=24)
DEPARTURE_WINDOW = timedelta(hours=3)
MAX_DEPARTURES_PER_STOP = 12

CARD_URL = "/translink_schedule/translink-schedule-card.js"
CARD_FILENAME = "translink-schedule-card.js"
