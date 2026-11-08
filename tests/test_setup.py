"""Tests for integration-wide setup resources."""

from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace
from unittest import IsolatedAsyncioTestCase
from unittest.mock import AsyncMock, patch

from custom_components.propresenter import async_setup


class IntegrationSetupTest(IsolatedAsyncioTestCase):
    async def test_registers_bundled_dashboard_card(self) -> None:
        http = SimpleNamespace(async_register_static_paths=AsyncMock())
        hass = SimpleNamespace(http=http)

        with patch("custom_components.propresenter.async_setup_web_api"):
            self.assertTrue(await async_setup(hass, {}))

        http.async_register_static_paths.assert_awaited_once()
        (paths,), _ = http.async_register_static_paths.await_args
        self.assertEqual(len(paths), 1)
        self.assertEqual(
            paths[0].url_path,
            "/propresenter/propresenter-presentation.js",
        )
        self.assertFalse(paths[0].cache_headers)
        self.assertTrue(Path(paths[0].path).is_file())
