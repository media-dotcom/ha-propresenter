"""Tests for guarded active and browsed slide triggers."""

from __future__ import annotations

from types import SimpleNamespace
from unittest import IsolatedAsyncioTestCase
from unittest.mock import AsyncMock, patch

from homeassistant.exceptions import ServiceValidationError

from custom_components.propresenter.services import async_setup_services


class _Services:
    def __init__(self) -> None:
        self.handlers = {}

    def async_register(self, _domain, service, handler, **_kwargs) -> None:
        self.handlers[service] = handler

    def async_remove(self, _domain, service) -> None:
        self.handlers.pop(service, None)


class _Coordinator:
    active_presentation_uuid = "live-presentation"
    metadata_available = True

    def __init__(self) -> None:
        self.api = SimpleNamespace(
            trigger_active_presentation_slide=AsyncMock(),
            trigger_slide=AsyncMock(),
        )
        self.browsed_metadata = {
            "slide_count": 2,
            "groups": [
                {"slides": [{"index": 0}, {"index": 1}]},
            ],
        }
        self.active_metadata = {
            "slide_count": 1,
            "groups": [{"slides": [{"index": 0}]}],
        }

    def is_known_presentation_uuid(self, presentation_uuid: str) -> bool:
        return presentation_uuid == "browsed-presentation"

    async def async_ensure_presentation_details(self, presentation_uuid: str):
        if not self.is_known_presentation_uuid(presentation_uuid):
            raise LookupError(presentation_uuid)
        return self.browsed_metadata

    def get_presentation_revision(self, presentation_uuid: str) -> str | None:
        if presentation_uuid == "browsed-presentation":
            return "browsed-revision"
        if presentation_uuid == self.active_presentation_uuid:
            return "live-revision"
        return None

    async def async_ensure_active_presentation_details(self):
        return self.active_metadata

    def get_active_snapshot(self) -> dict:
        return {
            "presentation_uuid": self.active_presentation_uuid,
            "metadata_revision": "live-revision",
            "slide_count": 1,
        }


class SlideTriggerServiceTest(IsolatedAsyncioTestCase):
    def setUp(self) -> None:
        self.coordinator = _Coordinator()
        self.hass = SimpleNamespace(services=_Services())
        async_setup_services(self.hass)
        self.handler = self.hass.services.handlers["trigger_slide"]

    def _call(
        self,
        slide_index: int,
        presentation_uuid: str,
        metadata_revision: str,
    ) -> SimpleNamespace:
        return SimpleNamespace(
            data={
                "entity_id": ["sensor.propresenter_active_presentation"],
                "slide_index": slide_index,
                "expected_presentation_uuid": presentation_uuid,
                "expected_metadata_revision": metadata_revision,
            },
            context=SimpleNamespace(user_id=None),
        )

    async def _invoke(self, call: SimpleNamespace) -> None:
        with (
            patch(
                "custom_components.propresenter.services._check_control_permission",
                new=AsyncMock(),
            ),
            patch(
                "custom_components.propresenter.services._resolve_trigger_coordinator",
                return_value=self.coordinator,
            ),
        ):
            await self.handler(call)

    async def test_triggers_a_guarded_slide_in_a_known_browsed_presentation(
        self,
    ) -> None:
        await self._invoke(self._call(1, "browsed-presentation", "browsed-revision"))

        self.coordinator.api.trigger_slide.assert_awaited_once_with(
            "browsed-presentation", 1
        )
        self.coordinator.api.trigger_active_presentation_slide.assert_not_awaited()

    async def test_rejects_a_stale_browsed_presentation_revision(self) -> None:
        call = self._call(1, "browsed-presentation", "old-revision")

        with self.assertRaises(ServiceValidationError):
            await self._invoke(call)

        self.coordinator.api.trigger_slide.assert_not_awaited()

    async def test_rejects_a_presentation_outside_configured_playlists(self) -> None:
        call = self._call(0, "unknown-presentation", "some-revision")

        with self.assertRaises(ServiceValidationError):
            await self._invoke(call)

        self.coordinator.api.trigger_slide.assert_not_awaited()

    async def test_rejects_an_out_of_range_browsed_slide(self) -> None:
        call = self._call(2, "browsed-presentation", "browsed-revision")

        with self.assertRaises(ServiceValidationError):
            await self._invoke(call)

        self.coordinator.api.trigger_slide.assert_not_awaited()

    async def test_keeps_guarded_active_slide_triggers_on_the_active_endpoint(
        self,
    ) -> None:
        await self._invoke(self._call(0, "live-presentation", "live-revision"))

        self.coordinator.api.trigger_active_presentation_slide.assert_awaited_once_with(
            0
        )
        self.coordinator.api.trigger_slide.assert_not_awaited()


if __name__ == "__main__":
    import unittest

    unittest.main()
