import type {
  CardConfig,
  HassState,
  PresentationGroup,
  PresentationSlide,
} from "./types";

const GENERIC_HASS_ERROR = "Home Assistant could not complete the request";

export const DEFAULT_CONFIG: Required<
  Omit<CardConfig, "type" | "entity" | "columns">
> & { columns: number | "auto" } = {
  media_player_entity: null,
  design: "grid",
  columns: "auto",
  browser_height: 560,
  internal_scroll: true,
  thumbnail_quality: 400,
  show_group_labels: true,
  show_slide_labels: true,
  show_slide_numbers: true,
  show_notes: false,
  read_only: false,
  confirm_trigger: false,
  follow_live: true,
};

export function normalizeConfig(config: CardConfig): CardConfig {
  if (!config || typeof config.entity !== "string" || !config.entity) {
    throw new Error("You must select a ProPresenter active-presentation sensor");
  }
  const browserHeight = typeof config.browser_height === "number" && Number.isFinite(config.browser_height)
    ? Math.min(1200, Math.max(240, Math.round(config.browser_height)))
    : DEFAULT_CONFIG.browser_height;
  return {
    ...DEFAULT_CONFIG,
    ...config,
    design: config.design && config.design in { grid: true } ? config.design : "grid",
    browser_height: browserHeight,
    internal_scroll: config.internal_scroll !== false,
    media_player_entity:
      typeof config.media_player_entity === "string" && config.media_player_entity.trim()
        ? config.media_player_entity.trim()
        : null,
  };
}

export function mediaPlayerTransportState(
  state: HassState | undefined,
): "playing" | "paused" | null {
  const value = state?.state?.toLowerCase();
  return value === "playing" || value === "paused" ? value : null;
}

export function isVideoMediaPlayerActive(state: HassState | undefined): boolean {
  if (!mediaPlayerTransportState(state)) return false;
  const contentType = state?.attributes?.media_content_type;
  if (typeof contentType === "string" && contentType.trim()) {
    return contentType.toLowerCase() === "video";
  }
  const title = state?.attributes?.media_title;
  return typeof title === "string" && Boolean(title.trim());
}

export function formatMediaTime(value: unknown): string | null {
  const seconds = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(seconds) || seconds < 0) return null;
  const wholeSeconds = Math.floor(seconds);
  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor((wholeSeconds % 3600) / 60);
  const remainingSeconds = wholeSeconds % 60;
  if (hours) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }
  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function flattenSlides(groups: PresentationGroup[]): PresentationSlide[] {
  return groups.flatMap((group) => group.slides);
}

export function metadataPointer(state: HassState | undefined): string {
  const attributes = state?.attributes ?? {};
  return [
    attributes.presentation_uuid ?? "",
    attributes.metadata_revision ?? "",
    attributes.metadata_available ?? false,
  ].join("|");
}

export function thumbnailPath(
  entityId: string,
  presentationUuid: string,
  slideIndex: number,
  quality: number,
  revision: string,
): string {
  return `/api/propresenter/thumbnail/${encodeURIComponent(entityId)}/${encodeURIComponent(
    presentationUuid,
  )}/${slideIndex}?quality=${encodeURIComponent(quality)}&revision=${encodeURIComponent(revision)}`;
}

export function guardedTriggerData(
  entityId: string,
  slideIndex: number,
  presentationUuid: string | null,
  metadataRevision: string | null,
): Record<string, unknown> {
  if (!presentationUuid || !metadataRevision) {
    throw new Error("A current presentation UUID and metadata revision are required");
  }
  return {
    entity_id: entityId,
    slide_index: slideIndex,
    expected_presentation_uuid: presentationUuid,
    expected_metadata_revision: metadataRevision,
  };
}

export function guardedPlaylistTriggerData(
  entityId: string,
  playlistUuid: string | null,
  itemKey: string | null,
  itemIndex: number | null,
  presentationUuid: string | null,
  playlistRevision: string | null,
): Record<string, unknown> {
  if (
    !playlistUuid ||
    !itemKey ||
    itemIndex === null ||
    itemIndex < 0 ||
    !presentationUuid ||
    !playlistRevision
  ) {
    throw new Error(
      "A current playlist UUID, item key, item index, presentation UUID, and playlist revision are required",
    );
  }
  return {
    entity_id: entityId,
    playlist_uuid: playlistUuid,
    item_key: itemKey,
    item_index: itemIndex,
    presentation_uuid: presentationUuid,
    expected_playlist_revision: playlistRevision,
  };
}

export function formatHassError(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  if (!error || typeof error !== "object") return GENERIC_HASS_ERROR;

  const record = error as Record<string, unknown>;
  if (record.error && record.error !== error) {
    const nested = formatHassError(record.error);
    if (nested !== GENERIC_HASS_ERROR) return nested;
  }

  const message = [record.message, record.detail, record.reason].find(
    (value): value is string => typeof value === "string" && value.trim().length > 0,
  );
  const code = [record.code, record.error_code].find(
    (value): value is string => typeof value === "string" && value.trim().length > 0,
  );
  if (message && code && !message.toLowerCase().startsWith(code.toLowerCase())) {
    return `${code}: ${message}`;
  }
  return message || code || GENERIC_HASS_ERROR;
}
