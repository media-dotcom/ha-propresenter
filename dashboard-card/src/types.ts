export type DesignName = "grid";

export interface CardConfig {
  type?: string;
  entity: string;
  media_player_entity?: string | null;
  design?: DesignName;
  columns?: number | "auto";
  browser_height?: number;
  internal_scroll?: boolean;
  thumbnail_quality?: 200 | 400 | 800;
  show_group_labels?: boolean;
  show_slide_labels?: boolean;
  show_slide_numbers?: boolean;
  show_notes?: boolean;
  read_only?: boolean;
  confirm_trigger?: boolean;
  follow_live?: boolean;
}

export interface PresentationSlide {
  index: number;
  group_key: string;
  label: string;
  notes: string | null;
  enabled: boolean;
  color: unknown;
}

export interface PresentationGroup {
  key: string;
  label: string;
  color: unknown;
  slides: PresentationSlide[];
}

export interface PresentationResponse {
  protocol_version: number;
  entity_id: string;
  metadata_revision: string | null;
  presentation_uuid: string | null;
  presentation_name: string | null;
  current_slide_index: number | null;
  current_slide_label: string | null;
  current_group: string | null;
  slide_count: number;
  slide_layer_active: boolean;
  metadata_available: boolean;
  groups: PresentationGroup[];
  is_active_presentation?: boolean;
  active_presentation_uuid?: string | null;
  active_slide_index?: number | null;
  active_metadata_revision?: string | null;
}

export interface PlaylistItem {
  key: string;
  uuid: string;
  presentation_uuid: string;
  name: string;
  index: number;
  path: string | null;
  type: string;
}

export interface PresentationPlaylist {
  uuid: string;
  name: string;
  items: PlaylistItem[];
}

export interface PlaylistResponse {
  protocol_version: number;
  entity_id: string;
  playlist_revision: string | null;
  playlists: PresentationPlaylist[];
}

export interface HassState {
  state?: string;
  attributes?: Record<string, unknown>;
}

export interface HomeAssistantLike {
  states: Record<string, HassState>;
  callWS<T = unknown>(message: Record<string, unknown>): Promise<T>;
  callService(
    domain: string,
    service: string,
    data: Record<string, unknown>,
  ): Promise<unknown>;
  hassUrl(path: string): string;
}

export type ThumbnailState = "idle" | "loading" | "loaded" | "error";
