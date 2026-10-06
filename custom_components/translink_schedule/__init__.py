"""TransLink Schedule integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import CARD_FILENAME, CARD_URL, PLATFORMS
from .coordinator import TransLinkCoordinator

type TransLinkConfigEntry = ConfigEntry[TransLinkCoordinator]


async def async_setup(hass: HomeAssistant, config: dict) -> bool:
    """Register the bundled Lovelace card."""
    frontend_path = Path(__file__).parent / "frontend"
    await hass.http.async_register_static_paths(
        [StaticPathConfig(CARD_URL, str(frontend_path / CARD_FILENAME), False)]
    )
    return True


async def async_setup_entry(
    hass: HomeAssistant, entry: TransLinkConfigEntry
) -> bool:
    """Set up TransLink Schedule from a config entry."""
    coordinator = TransLinkCoordinator(hass, entry)
    await coordinator.async_config_entry_first_refresh()
    entry.runtime_data = coordinator
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(
    hass: HomeAssistant, entry: TransLinkConfigEntry
) -> bool:
    """Unload a config entry."""
    return await hass.config_entries.async_unload_platforms(entry, PLATFORMS)


async def _async_update_listener(
    hass: HomeAssistant, entry: TransLinkConfigEntry
) -> None:
    """Reload an entry after board options change."""
    await hass.config_entries.async_reload(entry.entry_id)
