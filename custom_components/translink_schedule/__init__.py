"""TransLink Schedule integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import (
    CARD_CHUNKS_FOLDER,
    CARD_CHUNKS_URL,
    CARD_FILENAME,
    CARD_URL,
    PLATFORMS,
)
from .coordinator import (
    TransLinkCoordinator,
    async_get_shared_coordinator,
    release_shared_coordinator,
)
from .map_api import TransLinkTripMapView

type TransLinkConfigEntry = ConfigEntry[TransLinkCoordinator]


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Register the bundled Lovelace card."""
    frontend_path = Path(__file__).parent / "frontend"
    await hass.http.async_register_static_paths(
        [
            StaticPathConfig(
                CARD_URL, str(frontend_path / CARD_FILENAME), False
            ),
            StaticPathConfig(
                CARD_CHUNKS_URL,
                str(frontend_path / CARD_CHUNKS_FOLDER),
                False,
            ),
        ]
    )
    hass.http.register_view(TransLinkTripMapView())
    return True


async def async_setup_entry(
    hass: HomeAssistant, entry: TransLinkConfigEntry
) -> bool:
    """Set up TransLink Schedule from a config entry."""
    coordinator = await async_get_shared_coordinator(hass, entry)
    entry.runtime_data = coordinator
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(
    hass: HomeAssistant, entry: TransLinkConfigEntry
) -> bool:
    """Unload a config entry."""
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        release_shared_coordinator(hass, entry)
        entry.runtime_data = None
    return unloaded


async def _async_update_listener(
    _: HomeAssistant, entry: TransLinkConfigEntry
) -> None:
    """Refresh entities after board options change."""
    entry.runtime_data.async_update_listeners()
