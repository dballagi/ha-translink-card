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
- chronological, balanced, route-grouped, and realtime-first combined views;
- scheduled and GTFS-Realtime departure times;
- delay and cancellation indicators;
- compact, comfortable, and minimal responsive layouts;
- Home Assistant theme colors and configurable route badges;
- per-stop names, departure counts, stop numbers, and collapsed defaults;
- configurable headers, timing formats, stale-data warnings, and realtime
  labels; and
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
5. Open **Settings → Dashboards → ⋮ → Resources**, add
   `/translink_schedule/translink-schedule-card.js` as a **JavaScript module**,
   then refresh the browser.

API keys are available from the
[TransLink Developer Portal](https://developer.translink.ca/).

## Integration configuration

Open the integration's **Configure** dialog to edit the board and configure
each selected stop. Every stop supports:

- **Included routes** — a multi-select containing only routes that serve that
  stop. Leave it empty to include every route.
- **Destination contains** — one or more case-insensitive phrases matched
  against the trip destination. Leave it empty to include every destination.
- **Custom stop name** — replaces the official stop name on the card.
- **Departures for this stop** — overrides the card-wide departure count. Use
  `0` to inherit the card setting.
- **Show stop number** — controls the public stop number for this stop.
- **Collapsed by default** — starts the stop section collapsed while still
  allowing users to expand it.

When both filters are set, a departure must match a selected route and one of
the destination phrases. Filters are applied before the grouped and combined
departure lists are exposed to the card.

The first Configure screen also controls:

- the order of stops, using the order of the entered stop IDs;
- the future schedule window, from 15 to 360 minutes; and
- how long cancelled departures remain available after their scheduled time.

## Data cache and performance

The first setup downloads the TransLink static GTFS feed and builds a local
SQLite stop-time index. This one-time operation can take several seconds,
especially on lower-powered Home Assistant hardware.

The integration keeps the source ZIP and index under Home Assistant's
`.storage` directory. Together they currently use approximately 100 MB. On
later restarts, the index avoids reparsing roughly 1.8 million stop-time rows.
The static feed is refreshed daily.

All boards using the same API configuration share one static feed, one decoded
realtime feed, and one polling coordinator. Adding more boards therefore does
not duplicate downloads, parsing, or minute-by-minute API requests.

Only recently used stops are retained in memory, and shared feeds are released
when their last board is unloaded. Config-flow validation also releases its
temporary feed immediately. A daily refresh compares the downloaded digest
before parsing so unchanged feeds do not create a second in-memory copy.

Trip updates and schedules remain available when the optional service-alert
endpoint is temporarily unavailable. The sensor exposes `alerts_error` while
the next polling cycle retries alerts.

## Card configuration

The integration bundles and serves the card. Registering the dashboard
resource is a one-time step because dashboard resources belong to the user's
Lovelace configuration.

In Sections dashboards, the card defaults to the full 12-column width and can
be resized down to 6 columns. Its height remains automatic so expanded stops,
notices, and departure rows are never clipped by a fixed grid size.

```yaml
type: custom:translink-schedule-card
entity: sensor.nearby_departures
title: Nearby Departures
view: grouped
departures_per_stop: 3
max_departures: 12
time_display: both
show_scheduled_time: true
delay_threshold_minutes: 1
delay_format: compact
density: comfortable
empty_stop_behavior: show
cancelled_behavior: show
route_color_mode: official
combined_order: chronological
show_header: true
show_brand: true
header_style: primary
header_icon: mdi:bus-clock
show_clock: true
show_alerts: true
show_stop_codes: true
stop_heading_style: accent
show_realtime_status: false
show_stale_warning: false
stale_after_minutes: 3
```

Set `show_alerts: false` or disable **Show service notices** in the visual
editor to hide the alert banner.

Use `departures_per_stop` or the **Departures per stop** visual-editor field
to show between 1 and 12 departures in each grouped stop section.

Timing can show `both`, `countdown`, or `clock`. The card follows Home
Assistant's 12/24-hour preference. `delay_format` accepts `compact` (`+7 min`)
or `text` (`7 min late`).

`cancelled_behavior` and `empty_stop_behavior` accept `show`, `move`, or
`hide`. The `move` value places those rows or sections after active content.

`density` accepts `comfortable`, `compact`, or `minimal`.
`route_color_mode` accepts `official`, `theme`, or `monochrome`.
`header_style` accepts `primary`, `surface`, or `transparent`, while
`stop_heading_style` accepts `accent`, `plain`, or `compact`.

Use `view: combined` and `max_departures` to display a single list.
`combined_order` accepts `chronological`, `balanced`, `route`, or `realtime`:

```yaml
type: custom:translink-schedule-card
entity: sensor.nearby_departures
title: Next Departures
view: combined
max_departures: 12
combined_order: balanced
```

Enable `show_realtime_status` to label departures as **Live** or
**Scheduled**. Enable `show_stale_warning` to show a warning when the
coordinator has not updated within `stale_after_minutes`.

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

## Releases

HACS uses published GitHub Releases for semantic versions. To prepare a
release:

1. Update the version in `pyproject.toml` and
   `custom_components/translink_schedule/manifest.json`.
2. From `frontend`, run
   `npm version <version> --no-git-tag-version` to update `package.json` and
   `package-lock.json`.
3. Run the backend and frontend validation commands above.
4. Commit and push the version bump and rebuilt card bundle.
5. In GitHub Actions, run the **Release** workflow and enter the exact version
   without a `v` prefix.

The workflow verifies that all version files match, reruns the test suites,
checks that the committed frontend bundle is current, and publishes a
`v<version>` GitHub Release. HACS will then display that release instead of a
commit hash.

## Data attribution

Route and arrival data used in this product or service is provided by
permission of TransLink. TransLink assumes no responsibility for the accuracy
or currency of the Data used in this product or service.

This project is not affiliated with or endorsed by TransLink.
