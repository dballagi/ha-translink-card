<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="custom_components/translink_schedule/brand/dark_logo.png">
    <source media="(prefers-color-scheme: light)" srcset="custom_components/translink_schedule/brand/logo.png">
    <img alt="TransLink Schedule" src="custom_components/translink_schedule/brand/logo.png" width="512">
  </picture>
</p>

# TransLink Schedule for Home Assistant

A Home Assistant custom integration and Lovelace card that displays upcoming
departures from multiple Metro Vancouver TransLink stops in one board.

The card supports:

- grouped departures with one section per stop;
- a combined chronological view across all selected stops;
- scheduled and GTFS-Realtime departure times;
- delay and cancellation indicators;
- Home Assistant themes and responsive layouts; and
- a visual card editor.

## Status

This project is under active development and is not ready for general use yet.

## Installation

1. In HACS, add `https://github.com/dballagi/ha-translink-card` as a custom
   **Integration** repository.
2. Install **TransLink Schedule** and restart Home Assistant.
3. Add the integration from **Settings → Devices & services**.
4. Enter a TransLink developer API key and one or more comma-separated GTFS
   stop IDs or public five-digit stop numbers.

API keys are available from the
[TransLink Developer Portal](https://developer.translink.ca/).

## Card configuration

The integration bundles and registers the card automatically.

```yaml
type: custom:translink-schedule-card
entity: sensor.nearby_departures
title: Nearby Departures
view: grouped
departures_per_stop: 3
show_clock: true
show_attribution: true
```

Use `view: combined` and `max_departures` to display a single chronological
list:

```yaml
type: custom:translink-schedule-card
entity: sensor.nearby_departures
title: Next Departures
view: combined
max_departures: 12
```

## Development

Backend:

```powershell
python -m pip install -e ".[dev]"
ruff check .
pytest
```

Frontend:

```powershell
Set-Location frontend
npm install
npm run check
npm test
npm run build
```

## Data attribution

Route and arrival data used in this product or service is provided by
permission of TransLink. TransLink assumes no responsibility for the accuracy
or currency of the Data used in this product or service.

This project is not affiliated with or endorsed by TransLink.
