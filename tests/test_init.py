"""Tests for integration setup."""

from types import SimpleNamespace
from unittest.mock import AsyncMock, Mock

import custom_components.translink_schedule as integration
from custom_components.translink_schedule.const import CARD_URL


async def test_card_resource_uses_integration_version(monkeypatch) -> None:
    hass = SimpleNamespace(
        http=SimpleNamespace(async_register_static_paths=AsyncMock())
    )
    add_extra_js_url = Mock()
    monkeypatch.setattr(integration, "add_extra_js_url", add_extra_js_url)
    monkeypatch.setattr(
        integration,
        "async_get_integration",
        AsyncMock(return_value=SimpleNamespace(version="0.1.0")),
    )

    assert await integration.async_setup(hass, {}) is True

    add_extra_js_url.assert_called_once_with(
        hass, f"{CARD_URL}?v=0.1.0"
    )
