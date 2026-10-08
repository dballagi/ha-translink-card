"""TransLink Schedule integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.components.lovelace.const import DOMAIN as LOVELACE_DOMAIN
from homeassistant.components.lovelace.resources import ResourceStorageCollection
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import CONF_ID, CONF_URL
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import (
    CARD_CHUNKS_FOLDER,
    CARD_CHUNKS_URL,
    CARD_FILENAME,
    CARD_URL,
    DOMAIN,
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
    await _async_register_card_resource(hass)
    return True


async def _async_register_card_resource(hass: HomeAssistant) -> None:
    lovelace_data = hass.data[LOVELACE_DOMAIN]
    resources = (
        lovelace_data["resources"]
        if isinstance(lovelace_data, dict)
        else lovelace_data.resources
    )
    if not isinstance(resources, ResourceStorageCollection):
        return
    if not resources.loaded:
        await resources.async_load()
        resources.loaded = True

    integration = await async_get_integration(hass, DOMAIN)
    if integration.version is None:
        return
    await _async_sync_card_resource(resources, str(integration.version))


async def _async_sync_card_resource(
    resources: ResourceStorageCollection, version: str
) -> None:
    desired_url = f"{CARD_URL}?v={version}"
    matches = [
        item
        for item in resources.async_items()
        if str(item.get(CONF_URL, "")).partition("?")[0] == CARD_URL
    ]
    if not matches:
        await resources.async_create_item(
            {"res_type": "module", CONF_URL: desired_url}
        )
        return

    primary, *duplicates = matches
    if primary[CONF_URL] != desired_url:
        await resources.async_update_item(
            primary[CONF_ID], {CONF_URL: desired_url}
        )
    for duplicate in duplicates:
        await resources.async_delete_item(duplicate[CONF_ID])


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
