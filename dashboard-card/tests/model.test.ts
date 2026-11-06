import { describe, expect, it } from "vitest";
import {
  flattenSlides,
  formatHassError,
  formatMediaTime,
  guardedPlaylistTriggerData,
  guardedTriggerData,
  isVideoMediaPlayerActive,
  metadataPointer,
  mediaPlayerTransportState,
  normalizeConfig,
  thumbnailPath,
} from "../src/model";

describe("presentation card model", () => {
  it("keeps repeated groups and original disabled-slide indexes", () => {
    const groups = [
      {
        key: "song#0",
        label: "Chorus",
        color: "blue",
        slides: [
          { index: 0, group_key: "song#0", label: "One", notes: null, enabled: true, color: null },
        ],
      },
      {
        key: "song#1",
        label: "Chorus",
        color: "green",
        slides: [
          { index: 1, group_key: "song#1", label: "Disabled", notes: null, enabled: false, color: null },
          { index: 2, group_key: "song#1", label: "Three", notes: "note", enabled: true, color: null },
        ],
      },
    ];
    expect(flattenSlides(groups).map((slide) => slide.index)).toEqual([0, 1, 2]);
    expect(groups[0].key).not.toBe(groups[1].key);
  });

  it("creates stable pointer and signed thumbnail path values", () => {
    expect(metadataPointer({ attributes: { presentation_uuid: "u", metadata_revision: "r", metadata_available: true } })).toBe("u|r|true");
    expect(thumbnailPath("sensor.pp", "uuid", 5, 400, "opaque revision")).toContain("/uuid/5?quality=400&revision=opaque%20revision");
  });

  it("defaults to one safe grid configuration", () => {
    expect(normalizeConfig({ entity: "sensor.pp" })).toMatchObject({
      entity: "sensor.pp",
      design: "grid",
      browser_height: 560,
      internal_scroll: true,
      thumbnail_quality: 400,
      read_only: false,
      follow_live: true,
      media_player_entity: null,
    });
  });

  it("recognizes active ProPresenter video transport states", () => {
    expect(isVideoMediaPlayerActive({ state: "playing", attributes: { media_content_type: "video" } })).toBe(true);
    expect(isVideoMediaPlayerActive({ state: "paused", attributes: { media_content_type: "video" } })).toBe(true);
    expect(isVideoMediaPlayerActive({ state: "idle", attributes: { media_content_type: "video" } })).toBe(false);
    expect(isVideoMediaPlayerActive({ state: "playing", attributes: { media_content_type: "image" } })).toBe(false);
    expect(isVideoMediaPlayerActive({ state: "playing", attributes: { media_title: "fallback.mp4" } })).toBe(true);
    expect(mediaPlayerTransportState({ state: "PLAYING" })).toBe("playing");
  });

  it("formats media positions for the playback header", () => {
    expect(formatMediaTime(0)).toBe("0:00");
    expect(formatMediaTime(65.8)).toBe("1:05");
    expect(formatMediaTime(3661)).toBe("1:01:01");
    expect(formatMediaTime("not a time")).toBeNull();
  });

  it("keeps the browser height within tablet-friendly limits", () => {
    expect(normalizeConfig({ entity: "sensor.pp", browser_height: 100 })).toMatchObject({
      browser_height: 240,
    });
    expect(normalizeConfig({ entity: "sensor.pp", browser_height: 1400 })).toMatchObject({
      browser_height: 1200,
    });
    expect(normalizeConfig({ entity: "sensor.pp", browser_height: Number.NaN })).toMatchObject({
      browser_height: 560,
    });
  });

  it("always includes both stale-click guards in a trigger payload", () => {
    expect(guardedTriggerData("sensor.pp", 5, "uuid", "revision")).toEqual({
      entity_id: "sensor.pp",
      slide_index: 5,
      expected_presentation_uuid: "uuid",
      expected_metadata_revision: "revision",
    });
    expect(() => guardedTriggerData("sensor.pp", 5, "uuid", null)).toThrow();
  });

  it("includes playlist identity and revision guards in a live switch payload", () => {
    expect(
      guardedPlaylistTriggerData(
        "sensor.pp",
        "playlist",
        "playlist:2:pres",
        2,
        "pres",
        "playlist-revision",
      ),
    ).toEqual({
      entity_id: "sensor.pp",
      playlist_uuid: "playlist",
      item_key: "playlist:2:pres",
      item_index: 2,
      presentation_uuid: "pres",
      expected_playlist_revision: "playlist-revision",
    });
    expect(
      () => guardedPlaylistTriggerData("sensor.pp", "playlist", "item", 0, "pres", null),
    ).toThrow();
  });

  it("preserves structured Home Assistant WebSocket errors", () => {
    expect(formatHassError({ code: "unknown_command", message: "Unknown command" })).toBe(
      "unknown_command: Unknown command",
    );
    expect(formatHassError({ error: { code: "not_found", message: "Entity missing" } })).toBe(
      "not_found: Entity missing",
    );
  });
});
