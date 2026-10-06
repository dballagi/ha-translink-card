"""Tests for integration setup."""

from types import SimpleNamespace
from unittest.mock import AsyncMock

import custom_components.translink_schedule as integration
from custom_components.translink_schedule.const import CARD_FILENAME, CARD_URL


async def test_card_static_path_is_registered() -> None:
    register = AsyncMock()
    hass = SimpleNamespace(http=SimpleNamespace(async_register_static_paths=register))

    assert await integration.async_setup(hass, {}) is True

    register.assert_awaited_once()
    config = register.await_args.args[0][0]
    assert config.url_path == CARD_URL
    assert config.path.endswith(CARD_FILENAME)
    assert config.cache_headers is False
