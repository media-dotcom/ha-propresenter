import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { DESIGN_REGISTRY, designTokens } from "./designs";
import {
  DEFAULT_CONFIG,
  canTriggerSlide,
  flattenSlides,
  formatMediaTime,
  guardedPlaylistTriggerData,
  guardedTriggerData,
  formatHassError,
  isVideoMediaPlayerActive,
  isSlideLiveForSelection,
  metadataPointer,
  mediaPlayerTransportState,
  normalizeConfig,
  thumbnailPath,
} from "./model";
import type {
  CardConfig,
  HassState,
  HomeAssistantLike,
  PresentationResponse,
  PlaylistResponse,
  PresentationPlaylist,
  PresentationSlide,
  ThumbnailState,
} from "./types";

interface SignPathResponse {
  path?: string;
  signed_path?: string;
}

type CardError = { message: string; stale?: boolean } | null;
type MediaTransportState = "playing" | "paused";

export class ProPresenterPresentationCard extends LitElement {
  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
    }

    .card {
      box-sizing: border-box;
      padding: var(--pp-card-padding);
      border-radius: var(--pp-card-radius);
      background: var(--pp-surface);
      overflow: hidden;
    }

    .toolbar,
    .status-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toolbar {
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .heading {
      min-width: 0;
    }

    h2,
    p {
      margin: 0;
    }

    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 1.05rem;
    }

    .subtitle,
    .muted,
    .notes {
      color: var(--pp-muted);
      font-size: 0.78rem;
    }

    .toolbar-actions {
      display: flex;
      flex: 0 0 auto;
      gap: 6px;
    }

    .playlist-picker {
      display: grid;
      grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
      gap: 8px;
      margin-bottom: 12px;
    }

    .playlist-actions {
      display: flex;
      gap: 8px;
      margin: -4px 0 12px;
    }

    .media-header {
      display: grid;
      gap: 12px;
      margin: 0 0 12px;
      padding: 10px 12px;
      border: 1px solid color-mix(in srgb, var(--pp-accent) 25%, transparent);
      border-radius: 12px;
      background: color-mix(in srgb, var(--pp-accent) 10%, var(--pp-surface));
    }

    .media-header-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .media-heading {
      display: grid;
      min-width: 0;
      gap: 2px;
    }

    .media-kicker {
      color: var(--pp-accent);
      font-size: 0.68rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .media-title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.88rem;
    }

    .media-meta {
      color: var(--pp-muted);
      font-size: 0.75rem;
    }

    .media-actions {
      display: flex;
      flex: 0 0 auto;
      gap: 6px;
    }

    .media-actions button {
      min-width: 40px;
    }

    .media-icon-button {
      display: grid;
      place-items: center;
      width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 50%;
      color: var(--text-primary-color, white);
      background: var(--pp-accent);
    }

    .media-icon-button ha-icon {
      --mdc-icon-size: 22px;
    }

    .media-progress {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) auto;
      align-items: center;
      gap: 8px;
    }

    .media-progress input {
      width: 100%;
      margin: 0;
      accent-color: var(--pp-accent);
      cursor: pointer;
    }

    .media-progress input:disabled {
      cursor: wait;
      opacity: 0.62;
    }

    .media-time {
      min-width: 34px;
      color: var(--pp-muted);
      font-size: 0.7rem;
      font-variant-numeric: tabular-nums;
      text-align: center;
    }

    select {
      min-width: 0;
      border: 1px solid color-mix(in srgb, var(--primary-text-color) 18%, transparent);
      border-radius: 10px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      font: inherit;
      padding: 8px 10px;
    }

    .browse-note {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin: 0 0 10px;
    }

    button {
      border: 0;
      border-radius: 999px;
      color: var(--primary-text-color);
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.14));
      cursor: pointer;
      font: inherit;
      padding: 7px 10px;
    }

    button:hover {
      background: color-mix(in srgb, var(--pp-accent) 18%, transparent);
    }

    button:disabled {
      cursor: wait;
      opacity: 0.62;
    }

    .banner {
      border-radius: 10px;
      margin: 0 0 10px;
      padding: 8px 10px;
      font-size: 0.8rem;
    }

    .banner.warning {
      background: color-mix(in srgb, #ffb300 22%, transparent);
    }

    .banner.error {
      background: color-mix(in srgb, #f44336 18%, transparent);
    }

    .groups {
      display: grid;
      gap: 14px;
    }

    .slide-browser {
      max-height: var(--pp-browser-height);
      overflow-x: hidden;
      overflow-y: auto;
      padding-right: 4px;
      overscroll-behavior: contain;
      scrollbar-gutter: stable;
      -webkit-overflow-scrolling: touch;
    }

    .slide-browser.no-scroll {
      max-height: none;
      overflow: visible;
      padding-right: 0;
    }

    .group-title {
      margin: 0 0 7px;
      color: var(--pp-muted);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(var(--pp-columns), minmax(0, 1fr));
      gap: var(--pp-gap);
    }

    .tile {
      position: relative;
      min-width: 0;
      padding: 0;
      border: 2px solid transparent;
      border-radius: var(--pp-tile-radius);
      overflow: hidden;
      text-align: left;
      background: var(--pp-tile-surface);
    }

    .tile.active {
      border-color: var(--pp-accent);
      box-shadow: 0 0 0 1px color-mix(in srgb, var(--pp-accent) 35%, transparent);
    }

    .tile.disabled {
      cursor: not-allowed;
      filter: grayscale(0.5);
      opacity: 0.52;
    }

    .thumbnail {
      aspect-ratio: 16 / 9;
      display: grid;
      place-items: center;
      background: var(--secondary-background-color, #e8e8e8);
      color: var(--pp-muted);
      font-size: 0.75rem;
    }

    .thumbnail img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .tile-content {
      display: grid;
      gap: 2px;
      padding: 8px;
    }

    .tile-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.82rem;
      font-weight: 600;
    }

    .tile-index {
      color: var(--pp-muted);
      font-size: 0.7rem;
    }

    .pending {
      position: absolute;
      top: 7px;
      right: 7px;
      border-radius: 999px;
      padding: 3px 6px;
      background: var(--pp-accent);
      color: var(--text-primary-color, white);
      font-size: 0.68rem;
    }

    @media (max-width: 520px) {
      .playlist-picker {
        grid-template-columns: 1fr;
      }

      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `;

  private _config: CardConfig = { entity: "", ...DEFAULT_CONFIG };
  private _hass?: HomeAssistantLike;
  private _metadata: PresentationResponse | null = null;
  private _metadataPromise: Promise<void> | null = null;
  private _metadataRequestKey = "";
  private _metadataRequestSequence = 0;
  private _playlists: PresentationPlaylist[] = [];
  private _playlistPromise: Promise<void> | null = null;
  private _playlistRequestKey = "__initial__";
  private _playlistRequestSequence = 0;
  private _playlistRevision: string | null = null;
  private _lastPlaylistStatePointer = "__initial__";
  private _selectedPlaylistUuid: string | null = null;
  private _selectedItemKey: string | null = null;
  private _selectedPresentationUuid: string | null = null;
  private _thumbnailUrls = new Map<number, string>();
  private _thumbnailStates = new Map<number, ThumbnailState>();
  private _thumbnailQueue: number[] = [];
  private _thumbnailActive = 0;
  private _thumbnailControllers = new Set<AbortController>();
  private _intersectionObserver?: IntersectionObserver;
  private _followingLive = true;
  private _pendingIndex: number | null = null;
  private _pendingTimer?: number;
  private _pendingPlaylistPresentationUuid: string | null = null;
  private _playlistPendingTimer?: number;
  private _mediaPendingCommand: "media_play" | "media_pause" | null = null;
  private _mediaCommandTimer?: number;
  private _mediaPendingSeek = false;
  private _mediaSeekTarget: number | null = null;
  private _mediaSeekValue: number | null = null;
  private _mediaSeekTimer?: number;
  private _mediaTransportOverride: MediaTransportState | null = null;
  private _mediaSnapshot: HassState | null = null;
  private _error: CardError = null;
  private _statusMessage = "";
  private _lastStatePointer = "";
  private _lastCurrentIndex: number | null = null;

  set hass(value: HomeAssistantLike) {
    const oldState = this._state();
    const oldMediaState = this._mediaPlayerState();
    this._hass = value;
    const newState = this._state();
    const newMediaState = this._mediaPlayerState();
    this._reconcileMediaTransport(newMediaState);
    this._reconcileMediaSeek(this._mediaViewState());
    const playlistPointer = this._playlistPointer(newState);
    if (playlistPointer !== this._lastPlaylistStatePointer) {
      this._lastPlaylistStatePointer = playlistPointer;
      if (
        (playlistPointer !== this._playlistRequestKey || !this._playlists.length) &&
        !this._playlistPromise
      ) {
        void this._loadPlaylists(false);
      }
    }
    const pointer = metadataPointer(newState);
    if (pointer !== this._lastStatePointer) {
      this._lastStatePointer = pointer;
      if (!this._selectedPresentationUuid) {
        this._metadata = null;
        this._clearThumbnailUrls();
        void this._loadMetadata(false);
      } else {
        this.requestUpdate();
      }
    }
    const currentIndex = this._currentIndex(newState);
    const currentPresentationUuid = this._stringAttribute(
      newState?.attributes?.presentation_uuid,
    );
    if (
      this._pendingPlaylistPresentationUuid &&
      currentPresentationUuid === this._pendingPlaylistPresentationUuid
    ) {
      this._confirmPlaylistSwitch();
    }
    if (currentIndex !== this._lastCurrentIndex) {
      this._lastCurrentIndex = currentIndex;
      if (this._pendingIndex === currentIndex) {
        this._clearPending("Live cue confirmed");
      }
      if (this._followingLive) {
        this._scrollToActive();
      }
    }
    if (oldState !== newState || oldMediaState !== newMediaState) {
      this.requestUpdate();
    }
  }

  get hass(): HomeAssistantLike | undefined {
    return this._hass;
  }

  setConfig(config: CardConfig): void {
    this._config = normalizeConfig(config);
    this._followingLive = this._config.follow_live ?? true;
    this._metadataRequestSequence += 1;
    this._playlistRequestSequence += 1;
    this._metadataRequestKey = "";
    this._playlistRequestKey = "__initial__";
    this._playlistRevision = null;
    this._lastPlaylistStatePointer = "__initial__";
    this._playlists = [];
    this._selectedPlaylistUuid = null;
    this._selectedItemKey = null;
    this._selectedPresentationUuid = null;
    this._pendingPlaylistPresentationUuid = null;
    if (this._playlistPendingTimer !== undefined) {
      window.clearTimeout(this._playlistPendingTimer);
      this._playlistPendingTimer = undefined;
    }
    this._clearMediaCommandTimer();
    this._mediaPendingCommand = null;
    this._clearMediaSeekTimer();
    this._mediaPendingSeek = false;
    this._mediaSeekTarget = null;
    this._mediaSeekValue = null;
    this._mediaTransportOverride = null;
    this._mediaSnapshot = null;
    this._clearThumbnailUrls();
    this._error = null;
    this.requestUpdate();
  }

  getCardSize(): number {
    return 5;
  }

  static getConfigForm() {
    return {
      schema: [
        {
          name: "entity",
          required: true,
          selector: { entity: { domain: "sensor", integration: "propresenter" } },
        },
        {
          name: "media_player_entity",
          selector: { entity: { domain: "media_player", integration: "propresenter" } },
        },
        {
          name: "design",
          selector: {
            select: {
              options: Object.entries(DESIGN_REGISTRY).map(([value, item]) => ({
                value,
                label: item.label,
              })),
            },
          },
        },
        {
          name: "columns",
          selector: {
            select: {
              options: [
                { value: "auto", label: "Responsive" },
                { value: 2, label: "2 columns" },
                { value: 3, label: "3 columns" },
                { value: 4, label: "4 columns" },
                { value: 5, label: "5 columns" },
              ],
            },
          },
        },
        {
          name: "browser_height",
          selector: {
            number: {
              min: 240,
              max: 1200,
              step: 20,
              mode: "box",
            },
          },
        },
        { name: "internal_scroll", selector: { boolean: {} } },
        {
          name: "thumbnail_quality",
          selector: {
            select: {
              options: [
                { value: 200, label: "Fast (200)" },
                { value: 400, label: "Balanced (400)" },
                { value: 800, label: "Detailed (800)" },
              ],
            },
          },
        },
        { name: "show_group_labels", selector: { boolean: {} } },
        { name: "show_slide_labels", selector: { boolean: {} } },
        { name: "show_slide_numbers", selector: { boolean: {} } },
        { name: "show_notes", selector: { boolean: {} } },
        { name: "read_only", selector: { boolean: {} } },
        { name: "confirm_trigger", selector: { boolean: {} } },
        { name: "follow_live", selector: { boolean: {} } },
      ],
    };
  }

  static getStubConfig(): CardConfig {
    return { type: "custom:propresenter-presentation", entity: "" };
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._intersectionObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const index = Number((entry.target as HTMLElement).dataset.slideIndex);
          if (Number.isInteger(index)) {
            this._queueThumbnail(index);
          }
        }
      }
    });
  }

  disconnectedCallback(): void {
    this._intersectionObserver?.disconnect();
    this._clearThumbnailUrls();
    if (this._pendingTimer !== undefined) {
      window.clearTimeout(this._pendingTimer);
    }
    if (this._playlistPendingTimer !== undefined) {
      window.clearTimeout(this._playlistPendingTimer);
    }
    this._clearMediaCommandTimer();
    this._mediaPendingCommand = null;
    this._clearMediaSeekTimer();
    this._mediaPendingSeek = false;
    this._mediaSeekTarget = null;
    this._mediaSeekValue = null;
    this._mediaTransportOverride = null;
    this._mediaSnapshot = null;
    super.disconnectedCallback();
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (!this._intersectionObserver) return;
    this.renderRoot.querySelectorAll<HTMLElement>("[data-slide-index]").forEach((item) => {
      this._intersectionObserver?.observe(item);
    });
    if (this._followingLive) {
      this._scrollToActive();
    }
  }

  render() {
    const state = this._state();
    const attributes = state?.attributes ?? {};
    const slideLayerActive = typeof attributes.slide_layer_active === "boolean"
      ? attributes.slide_layer_active
      : this._metadata?.slide_layer_active ?? true;
    const presentationName = this._metadata?.presentation_name ??
      (state?.state && !["unknown", "unavailable"].includes(state.state)
        ? state.state
        : this._stringAttribute(attributes.presentation_name) ??
          this._stringAttribute(attributes.friendly_name) ??
          "ProPresenter");
    const groups = this._metadata?.groups ?? [];
    const columns = this._config.columns === "auto" || this._config.columns === undefined
      ? "auto-fit"
      : String(this._config.columns);
    const browserHeight = this._config.browser_height ?? DEFAULT_CONFIG.browser_height;
    const tokens = `${designTokens(this._config.design)} --pp-columns: ${columns}; --pp-browser-height: ${browserHeight}px;`;

    return html`
      <article class="card" style=${tokens}>
        <div class="toolbar">
          <div class="heading">
            <h2>${presentationName}</h2>
            <p class="subtitle">${this._subtitle(attributes)}</p>
          </div>
          <div class="toolbar-actions">
            <button @click=${this._toggleFollow} title="Follow the live cue">
              ${this._followingLive ? "Following" : "Browse"}
            </button>
            <button @click=${this._refresh} title="Refresh presentation metadata">↻</button>
          </div>
        </div>
        ${this._renderMediaHeader()}
        ${!slideLayerActive ? html`<div class="banner warning">Output cleared · the active cue is still shown below</div>` : nothing}
        ${this._error ? html`<div class="banner error">${this._error.message}</div>` : nothing}
        ${this._statusMessage ? html`<div class="banner">${this._statusMessage}</div>` : nothing}
        ${this._renderPlaylistPicker()}
        ${this._selectedPresentationUuid
          ? html`<div class="banner browse-note">
              <span>Browsing playlist item · live output is unchanged</span>
              <button @click=${this._returnToLive}>Live</button>
            </div>`
          : nothing}
        ${this._metadata?.protocol_version !== undefined && this._metadata.protocol_version !== 1
          ? html`<div class="banner error">This card needs a newer integration protocol.</div>`
          : nothing}
        ${groups.length
          ? html`<div
              class=${this._config.internal_scroll === false ? "slide-browser no-scroll" : "slide-browser"}
              role="region"
              aria-label="Presentation slides"
            ><div class="groups">${groups.map((group) => html`
              <section>
                ${this._config.show_group_labels ? html`<h3 class="group-title">${group.label}</h3>` : nothing}
                <div class="grid">
                  ${group.slides.map((slide) => this._renderSlide(slide))}
                </div>
              </section>
            `)}</div></div>`
          : html`<p class="muted">${this._metadata?.metadata_available === false || !this._metadata ? "Loading presentation slides…" : "No active presentation"}</p>`}
      </article>
    `;
  }

  private _renderMediaHeader() {
    const mediaState = this._mediaViewState();
    if (!isVideoMediaPlayerActive(mediaState)) return nothing;
    const transportState = mediaPlayerTransportState(mediaState);
    const attributes = mediaState?.attributes ?? {};
    const title = this._stringAttribute(attributes.media_title) ?? "Video";
    const position = this._numberAttribute(attributes.media_position);
    const duration = this._numberAttribute(attributes.media_duration);
    const progress = duration !== null && duration > 0
      ? Math.min(duration, Math.max(0, this._mediaSeekValue ?? position ?? 0))
      : null;
    const pending = this._mediaPendingCommand;
    const controlsEnabled = !this._config.read_only && !this._isEditorPreview();
    const busy = Boolean(pending) || this._mediaPendingSeek;
    const status = pending
      ? pending === "media_play" ? "Sending play…" : "Sending pause…"
      : this._mediaPendingSeek
        ? "Sending seek…"
        : transportState === "playing" ? "Playing" : "Paused";
    const toggleService = transportState === "playing" ? "media_pause" : "media_play";
    const toggleLabel = transportState === "playing" ? "Pause video" : "Play video";
    return html`
      <section class="media-header" aria-label="ProPresenter video playback">
        <div class="media-header-top">
          <div class="media-heading">
            <p class="media-kicker">Video playback</p>
            <strong class="media-title">${title}</strong>
            <p class="media-meta">${status}</p>
          </div>
          ${controlsEnabled
            ? html`<div class="media-actions">
                <button
                  class="media-icon-button"
                  @click=${() => this._mediaPlayerCommand(toggleService)}
                  ?disabled=${busy}
                  aria-label=${toggleLabel}
                  title=${toggleLabel}
                ><ha-icon icon=${transportState === "playing" ? "mdi:pause" : "mdi:play"}></ha-icon></button>
              </div>`
            : nothing}
        </div>
        ${progress !== null
          ? html`<div class="media-progress">
              <span class="media-time">${formatMediaTime(progress)}</span>
              <input
                type="range"
                min="0"
                max=${duration}
                step="1"
                .value=${String(progress)}
                @input=${this._handleMediaSeekInput}
                @change=${this._handleMediaSeekChange}
                ?disabled=${!controlsEnabled || busy}
                aria-label="Video position"
              />
              <span class="media-time">${formatMediaTime(duration)}</span>
            </div>`
          : nothing}
      </section>
    `;
  }

  private _renderSlide(slide: PresentationSlide) {
    const liveUuid = this._stringAttribute(this._state()?.attributes?.presentation_uuid);
    const active = isSlideLiveForSelection(
      slide.index,
      this._currentIndex(this._state()),
      this._selectedPresentationUuid,
      liveUuid,
    );
    const disabled = slide.enabled === false;
    const triggerable = canTriggerSlide(
      this._config.read_only ?? false,
      !disabled,
      this._isEditorPreview(),
    );
    const classes = `tile ${active ? "active" : ""} ${disabled ? "disabled" : ""}`;
    const content = html`
      <div class="thumbnail" data-slide-index=${slide.index}>
        ${this._thumbnailUrls.has(slide.index)
          ? html`<img src=${this._thumbnailUrls.get(slide.index)!} alt=${slide.label} />`
          : html`<span>${this._thumbnailPlaceholder(slide.index)}</span>`}
      </div>
      <div class="tile-content">
        ${this._config.show_slide_labels ? html`<span class="tile-label">${slide.label}</span>` : nothing}
        ${this._config.show_slide_numbers ? html`<span class="tile-index">Slide ${slide.index + 1}${disabled ? " · disabled" : ""}</span>` : nothing}
        ${this._config.show_notes && slide.notes ? html`<span class="notes">${slide.notes}</span>` : nothing}
      </div>
      ${this._pendingIndex === slide.index ? html`<span class="pending">Pending</span>` : nothing}
    `;
    return triggerable
      ? html`<button id=${this._slideId(slide.index)} class=${classes} @click=${() => this._trigger(slide)}>${content}</button>`
      : html`<div id=${this._slideId(slide.index)} class=${classes} aria-disabled="true">${content}</div>`;
  }

  private async _loadMetadata(refresh: boolean): Promise<void> {
    if (!this._hass || !this._config.entity) return;
    const state = this._state();
    const requestedUuid = this._selectedPresentationUuid;
    const pointer = requestedUuid ? `selected|${requestedUuid}` : metadataPointer(state);
    if (pointer === this._metadataRequestKey && this._metadataPromise) {
      return this._metadataPromise;
    }
    if (!refresh && pointer === this._metadataRequestKey) return;
    this._metadataRequestKey = pointer;
    const sequence = ++this._metadataRequestSequence;
    const promise = (async () => {
      try {
        const request: Record<string, unknown> = {
          type: requestedUuid
            ? "propresenter/get_presentation"
            : "propresenter/get_active_presentation",
          entity_id: this._config.entity,
          refresh,
        };
        if (requestedUuid) request.presentation_uuid = requestedUuid;
        const result = await this._hass!.callWS<PresentationResponse>(request);
        if (sequence !== this._metadataRequestSequence) return;
        if (result.protocol_version !== 1) {
          this._error = { message: "The integration and card protocol versions do not match" };
          return;
        }
        this._clearThumbnailUrls();
        this._metadata = result;
        this._error = null;
        this._statusMessage = "";
        this.requestUpdate();
      } catch (error) {
        if (sequence !== this._metadataRequestSequence) return;
        this._error = { message: this._errorMessage(error) };
        this.requestUpdate();
      }
    })();
    this._metadataPromise = promise;
    try {
      await promise;
    } finally {
      if (this._metadataPromise === promise) this._metadataPromise = null;
    }
  }

  private _queueThumbnail(index: number): void {
    if (
      !this._metadata?.metadata_available ||
      this._thumbnailUrls.has(index) ||
      this._thumbnailStates.get(index) === "loading" ||
      this._thumbnailStates.get(index) === "loaded"
    ) {
      return;
    }
    this._thumbnailStates.set(index, "loading");
    this._thumbnailQueue.push(index);
    this._drainThumbnailQueue();
  }

  private _drainThumbnailQueue(): void {
    while (this._thumbnailActive < 4 && this._thumbnailQueue.length) {
      const index = this._thumbnailQueue.shift()!;
      this._thumbnailActive += 1;
      void this._fetchThumbnail(index).finally(() => {
        this._thumbnailActive -= 1;
        this._drainThumbnailQueue();
      });
    }
  }

  private async _fetchThumbnail(index: number): Promise<void> {
    const metadata = this._metadata;
    if (!metadata?.metadata_available || !metadata.presentation_uuid || !metadata.metadata_revision) {
      this._thumbnailStates.set(index, "error");
      return;
    }
    const path = thumbnailPath(
      this._config.entity,
      metadata.presentation_uuid,
      index,
      this._config.thumbnail_quality ?? 400,
      metadata.metadata_revision,
    );
    const identity = `${metadata.presentation_uuid}|${metadata.metadata_revision}`;
    const controller = new AbortController();
    this._thumbnailControllers.add(controller);
    try {
      const signed = await this._hass!.callWS<SignPathResponse>({
        type: "auth/sign_path",
        path,
        expires: 60,
      });
      const signedPath = signed.path ?? signed.signed_path;
      if (!signedPath) throw new Error("Home Assistant did not return a signed thumbnail path");
      const response = await fetch(this._hass!.hassUrl(signedPath), {
        credentials: "same-origin",
        signal: controller.signal,
      });
      if ((response.status === 401 || response.status === 403)) {
        const retry = await this._hass!.callWS<SignPathResponse>({
          type: "auth/sign_path",
          path,
          expires: 60,
        });
        const retryPath = retry.path ?? retry.signed_path;
        if (!retryPath) throw new Error("Thumbnail authorization expired");
        const retryResponse = await fetch(this._hass!.hassUrl(retryPath), {
          credentials: "same-origin",
          signal: controller.signal,
        });
        if (!retryResponse.ok) throw new Error(`Thumbnail request failed (${retryResponse.status})`);
        this._setThumbnailUrl(
          index,
          URL.createObjectURL(await retryResponse.blob()),
          identity,
        );
        return;
      }
      if (!response.ok) {
        if (response.status === 409) {
          await this._loadMetadata(true);
        }
        throw new Error(`Thumbnail request failed (${response.status})`);
      }
      this._setThumbnailUrl(
        index,
        URL.createObjectURL(await response.blob()),
        identity,
      );
    } catch (error) {
      if (controller.signal.aborted) return;
      this._thumbnailStates.set(index, "error");
      this._error = { message: this._errorMessage(error) };
      this.requestUpdate();
    } finally {
      this._thumbnailControllers.delete(controller);
    }
  }

  private _setThumbnailUrl(index: number, url: string, identity: string): void {
    const currentIdentity = this._metadata
      ? `${this._metadata.presentation_uuid}|${this._metadata.metadata_revision}`
      : "";
    if (!this.isConnected || currentIdentity !== identity) {
      URL.revokeObjectURL(url);
      return;
    }
    const old = this._thumbnailUrls.get(index);
    if (old) URL.revokeObjectURL(old);
    this._thumbnailUrls.set(index, url);
    this._thumbnailStates.set(index, "loaded");
    this.requestUpdate();
  }

  private async _trigger(slide: PresentationSlide): Promise<void> {
    if (this._config.read_only || slide.enabled === false || this._isEditorPreview() || !this._hass) return;
    if (this._config.confirm_trigger && !window.confirm(`Trigger “${slide.label}”?`)) return;
    const metadata = this._metadata;
    if (!metadata?.presentation_uuid || !metadata.metadata_revision) {
      this._error = { message: "Refresh the presentation before triggering a slide" };
      this.requestUpdate();
      return;
    }
    this._pendingIndex = slide.index;
    this._statusMessage = "Command pending · waiting for live confirmation";
    this._error = null;
    this.requestUpdate();
    try {
      await this._hass.callService(
        "propresenter",
        "trigger_slide",
        guardedTriggerData(
          this._config.entity,
          slide.index,
          metadata.presentation_uuid,
          metadata.metadata_revision,
        ),
      );
      this._pendingTimer = window.setTimeout(() => {
        if (this._pendingIndex === slide.index) {
          this._pendingIndex = null;
          this._statusMessage = "Trigger sent, but live confirmation is unavailable";
          this.requestUpdate();
        }
      }, 5000);
    } catch (error) {
      this._pendingIndex = null;
      this._statusMessage = "";
      const message = this._errorMessage(error);
      const stale = /stale|changed|revision|uuid/i.test(message);
      this._error = { message: stale ? "The presentation changed; refreshing slides" : `Trigger failed: ${message}`, stale };
      this.requestUpdate();
      if (stale) await this._loadMetadata(true);
    }
  }

  private _refresh = (): void => {
    void Promise.all([this._loadPlaylists(true), this._loadMetadata(true)]);
  };

  private async _mediaPlayerCommand(
    service: "media_play" | "media_pause",
  ): Promise<void> {
    const entityId = this._config.media_player_entity;
    if (
      !entityId ||
      this._config.read_only ||
      this._isEditorPreview() ||
      !this._hass ||
      this._mediaPendingSeek ||
      !isVideoMediaPlayerActive(this._mediaViewState())
    ) {
      return;
    }
    this._clearMediaCommandTimer();
    this._mediaPendingCommand = service;
    this._error = null;
    this._statusMessage = service === "media_play"
      ? "Video play command pending"
      : "Video pause command pending";
    this.requestUpdate();
    try {
      await this._hass.callService("media_player", service, { entity_id: entityId });
      this._mediaTransportOverride = service === "media_play" ? "playing" : "paused";
      this._captureMediaSnapshot(this._mediaPlayerState());
      const message = service === "media_play" ? "Video play command sent" : "Video pause command sent";
      this._statusMessage = message;
      this._mediaCommandTimer = window.setTimeout(() => {
        if (this._statusMessage === message) {
          this._statusMessage = "";
          this.requestUpdate();
        }
        this._mediaCommandTimer = undefined;
      }, 2500);
    } catch (error) {
      this._statusMessage = "";
      this._error = { message: `Video command failed: ${this._errorMessage(error)}` };
    } finally {
      this._mediaPendingCommand = null;
      this.requestUpdate();
    }
  }

  private _handleMediaSeekInput = (event: Event): void => {
    const value = this._numberAttribute((event.target as HTMLInputElement).value);
    if (value === null) return;
    this._mediaSeekValue = value;
    this.requestUpdate();
  };

  private _handleMediaSeekChange = (event: Event): void => {
    const value = this._numberAttribute((event.target as HTMLInputElement).value);
    if (value === null) return;
    void this._seekMedia(value);
  };

  private async _seekMedia(position: number): Promise<void> {
    const entityId = this._config.media_player_entity;
    const mediaState = this._mediaViewState();
    const duration = this._numberAttribute(mediaState?.attributes?.media_duration);
    if (
      !entityId ||
      this._config.read_only ||
      this._isEditorPreview() ||
      !this._hass ||
      this._mediaPendingSeek ||
      !isVideoMediaPlayerActive(mediaState) ||
      duration === null ||
      duration <= 0
    ) {
      return;
    }
    const target = Math.min(duration, Math.max(0, position));
    this._clearMediaSeekTimer();
    this._mediaPendingSeek = true;
    this._mediaSeekTarget = target;
    this._mediaSeekValue = target;
    this._error = null;
    this._statusMessage = "Video seek command pending";
    this.requestUpdate();
    try {
      await this._hass.callService(
        "media_player",
        "media_seek",
        { entity_id: entityId, seek_position: target },
      );
      const message = "Video seek command sent";
      this._statusMessage = message;
      this._mediaSeekTimer = window.setTimeout(() => {
        this._mediaSeekTarget = null;
        this._mediaSeekValue = null;
        this._statusMessage = "";
        this._mediaSeekTimer = undefined;
        this.requestUpdate();
      }, 5000);
    } catch (error) {
      this._clearMediaSeekTimer();
      this._mediaSeekTarget = null;
      this._mediaSeekValue = null;
      this._statusMessage = "";
      this._error = { message: `Video seek failed: ${this._errorMessage(error)}` };
    } finally {
      this._mediaPendingSeek = false;
      this.requestUpdate();
    }
  }

  private _renderPlaylistPicker() {
    if (!this._playlists.length) return nothing;
    const selectedPlaylist = this._playlists.find(
      (playlist) => playlist.uuid === this._selectedPlaylistUuid,
    );
    const items = selectedPlaylist?.items ?? [];
    const selectedItem = items.find(
      (item) => item.key === this._selectedItemKey,
    );
    const liveUuid = this._stringAttribute(
      this._state()?.attributes?.presentation_uuid,
    );
    const canSwitchLive = Boolean(
      selectedItem &&
        selectedItem.presentation_uuid !== liveUuid &&
        !this._config.read_only &&
        !this._isEditorPreview(),
    );
    return html`
      <div class="playlist-picker">
        <select
          aria-label="ProPresenter playlist"
          .value=${this._selectedPlaylistUuid ?? ""}
          @change=${this._handlePlaylistChange}
        >
          <option value="">Choose playlist…</option>
          ${this._playlists.map(
            (playlist) => html`<option value=${playlist.uuid}>${playlist.name}</option>`,
          )}
        </select>
        <select
          aria-label="ProPresenter playlist item"
          .value=${this._selectedItemKey ?? ""}
          ?disabled=${!selectedPlaylist}
          @change=${this._handleItemChange}
        >
          <option value="">Choose presentation…</option>
          ${items.map(
            (item) => html`<option value=${item.key}>
              ${item.path ? `${item.path} · ` : ""}${item.name}${
                item.presentation_uuid === liveUuid ? " · LIVE" : ""
              }
            </option>`,
          )}
        </select>
      </div>
      ${canSwitchLive
        ? html`<div class="playlist-actions">
            <button
              @click=${this._makeSelectedPlaylistItemLive}
              ?disabled=${Boolean(this._pendingPlaylistPresentationUuid)}
              title="Enter this playlist item in ProPresenter"
            >
              ${this._pendingPlaylistPresentationUuid ? "Entering…" : "Enter"}
            </button>
          </div>`
        : nothing}
    `;
  }

  private async _makeSelectedPlaylistItemLive(): Promise<void> {
    if (
      this._config.read_only ||
      this._isEditorPreview() ||
      !this._hass ||
      !this._selectedPlaylistUuid ||
      !this._selectedItemKey
    ) {
      return;
    }
    const playlist = this._playlists.find(
      (candidate) => candidate.uuid === this._selectedPlaylistUuid,
    );
    const item = playlist?.items.find(
      (candidate) => candidate.key === this._selectedItemKey,
    );
    if (!item) return;
    const liveUuid = this._stringAttribute(
      this._state()?.attributes?.presentation_uuid,
    );
    if (item.presentation_uuid === liveUuid) return;
    if (!this._playlistRevision) {
      this._error = { message: "Refresh the playlist before switching live items" };
      this.requestUpdate();
      return;
    }
    if (
      this._config.confirm_trigger &&
      !window.confirm(`Make “${item.name}” live in ProPresenter?`)
    ) {
      return;
    }

    const targetUuid = item.presentation_uuid;
    this._pendingPlaylistPresentationUuid = targetUuid;
    this._statusMessage = "Playlist switch pending · waiting for live confirmation";
    this._error = null;
    this.requestUpdate();
    try {
      await this._hass.callService(
        "propresenter",
        "trigger_playlist_item",
        guardedPlaylistTriggerData(
          this._config.entity,
          this._selectedPlaylistUuid,
          item.key,
          item.index,
          targetUuid,
          this._playlistRevision,
        ),
      );
      if (this._pendingPlaylistPresentationUuid !== targetUuid) return;
      this._returnToLive();
      this._statusMessage = "Playlist switch sent · waiting for live confirmation";
      this._playlistPendingTimer = window.setTimeout(() => {
        if (this._pendingPlaylistPresentationUuid === targetUuid) {
          this._pendingPlaylistPresentationUuid = null;
          this._playlistPendingTimer = undefined;
          this._statusMessage = "Playlist switch sent, but live confirmation is unavailable";
          this.requestUpdate();
        }
      }, 5000);
      this.requestUpdate();
    } catch (error) {
      this._pendingPlaylistPresentationUuid = null;
      if (this._playlistPendingTimer !== undefined) {
        window.clearTimeout(this._playlistPendingTimer);
        this._playlistPendingTimer = undefined;
      }
      this._statusMessage = "";
      const message = this._errorMessage(error);
      const stale = /stale|changed|revision|playlist|item/i.test(message);
      this._error = {
        message: stale
          ? "The playlist changed; refreshing playlist items"
          : `Playlist switch failed: ${message}`,
        stale,
      };
      this.requestUpdate();
      if (stale) await this._loadPlaylists(true);
    }
  }

  private _handlePlaylistChange = (event: Event): void => {
    const value = (event.target as HTMLSelectElement).value;
    this._selectedPlaylistUuid = value || null;
    this._selectedItemKey = null;
    if (this._selectedPresentationUuid) {
      this._selectedPresentationUuid = null;
      this._metadataRequestSequence += 1;
      this._metadata = null;
      this._metadataRequestKey = "";
      this._clearThumbnailUrls();
      this._followingLive = true;
      void this._loadMetadata(false);
    }
    this._error = null;
    this._statusMessage = "";
    this.requestUpdate();
  };

  private _handleItemChange = (event: Event): void => {
    const key = (event.target as HTMLSelectElement).value;
    const playlist = this._playlists.find(
      (candidate) => candidate.uuid === this._selectedPlaylistUuid,
    );
    const item = playlist?.items.find((candidate) => candidate.key === key);
    if (!item) return;
    this._selectedItemKey = item.key;
    this._selectedPresentationUuid = item.presentation_uuid;
    this._followingLive = false;
    this._metadataRequestSequence += 1;
    this._metadata = null;
    this._metadataRequestKey = "";
    this._clearThumbnailUrls();
    this._error = null;
    this._statusMessage = "";
    void this._loadMetadata(false);
    this.requestUpdate();
  };

  private _returnToLive = (): void => {
    this._selectedPlaylistUuid = null;
    this._selectedItemKey = null;
    this._selectedPresentationUuid = null;
    this._followingLive = true;
    this._metadataRequestSequence += 1;
    this._metadata = null;
    this._metadataRequestKey = "";
    this._clearThumbnailUrls();
    void this._loadMetadata(false);
    this.requestUpdate();
  };

  private async _loadPlaylists(refresh: boolean): Promise<void> {
    if (!this._hass || !this._config.entity) return;
    if (this._playlistPromise) return this._playlistPromise;
    const pointer = this._playlistPointer(this._state());
    if (!refresh && this._playlists.length && pointer === this._playlistRequestKey) return;
    const sequence = ++this._playlistRequestSequence;
    const promise = (async () => {
      try {
        const result = await this._hass!.callWS<PlaylistResponse>({
          type: "propresenter/get_presentation_playlists",
          entity_id: this._config.entity,
          refresh,
        });
        if (sequence !== this._playlistRequestSequence) return;
        if (!result || result.protocol_version !== 1) {
          this._error = { message: "The integration and card protocol versions do not match" };
          return;
        }
        this._playlists = Array.isArray(result.playlists)
          ? result.playlists.filter(
              (playlist) =>
                Boolean(playlist?.uuid) && Array.isArray(playlist.items),
            )
          : [];
        this._playlistRevision = result.playlist_revision;
        this._playlistRequestKey = result.playlist_revision ?? pointer;
        if (
          this._selectedPresentationUuid &&
          !this._playlists.some((playlist) =>
            playlist.items.some(
              (item) => item.presentation_uuid === this._selectedPresentationUuid,
            ),
          )
        ) {
          this._returnToLive();
        }
        this.requestUpdate();
      } catch (error) {
        if (sequence !== this._playlistRequestSequence) return;
        this._error = { message: this._errorMessage(error) };
        this._playlistRequestKey = "";
        this._playlistRevision = null;
        this.requestUpdate();
      }
    })();
    this._playlistPromise = promise;
    try {
      await promise;
    } finally {
      if (this._playlistPromise === promise) this._playlistPromise = null;
    }
  }

  private _toggleFollow = (): void => {
    this._followingLive = !this._followingLive;
    if (this._followingLive) this._scrollToActive();
    this.requestUpdate();
  };

  private _scrollToActive(): void {
    const index = this._currentIndex(this._state());
    if (index === null) return;
    queueMicrotask(() => {
      const target = this.renderRoot.querySelector<HTMLElement>(`#${this._slideId(index)}`);
      if (!target) return;
      const browser = this.renderRoot.querySelector<HTMLElement>(".slide-browser");
      if (!browser || this._config.internal_scroll === false) {
        target.scrollIntoView({ behavior: "smooth", block: "nearest" });
        return;
      }
      const browserRect = browser.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetTop = targetRect.top - browserRect.top + browser.scrollTop;
      const targetBottom = targetTop + targetRect.height;
      const visibleTop = browser.scrollTop;
      const visibleBottom = visibleTop + browser.clientHeight;
      const margin = 12;
      if (targetTop < visibleTop) {
        browser.scrollTo({ top: Math.max(0, targetTop - margin), behavior: "smooth" });
      } else if (targetBottom > visibleBottom) {
        browser.scrollTo({
          top: Math.min(browser.scrollHeight - browser.clientHeight, targetBottom - browser.clientHeight + margin),
          behavior: "smooth",
        });
      }
    });
  }

  private _clearPending(message: string): void {
    this._pendingIndex = null;
    this._statusMessage = message;
    if (this._pendingTimer !== undefined) window.clearTimeout(this._pendingTimer);
    this._pendingTimer = undefined;
    this.requestUpdate();
  }

  private _confirmPlaylistSwitch(): void {
    if (!this._pendingPlaylistPresentationUuid) return;
    this._pendingPlaylistPresentationUuid = null;
    if (this._playlistPendingTimer !== undefined) {
      window.clearTimeout(this._playlistPendingTimer);
      this._playlistPendingTimer = undefined;
    }
    this._returnToLive();
    this._statusMessage = "Live playlist item confirmed";
    this.requestUpdate();
  }

  private _clearThumbnailUrls(): void {
    for (const controller of this._thumbnailControllers) controller.abort();
    this._thumbnailControllers.clear();
    for (const url of this._thumbnailUrls.values()) URL.revokeObjectURL(url);
    this._thumbnailUrls.clear();
    this._thumbnailStates.clear();
    this._thumbnailQueue = [];
  }

  private _clearMediaCommandTimer(): void {
    if (this._mediaCommandTimer !== undefined) {
      window.clearTimeout(this._mediaCommandTimer);
      this._mediaCommandTimer = undefined;
    }
  }

  private _clearMediaSeekTimer(): void {
    if (this._mediaSeekTimer !== undefined) {
      window.clearTimeout(this._mediaSeekTimer);
      this._mediaSeekTimer = undefined;
    }
  }

  private _reconcileMediaTransport(state: HassState | undefined): void {
    const contentType = this._stringAttribute(state?.attributes?.media_content_type);
    if (contentType?.toLowerCase() === "image") {
      this._mediaTransportOverride = null;
      this._mediaSnapshot = null;
      return;
    }
    const currentTitle = this._stringAttribute(state?.attributes?.media_title);
    const snapshotTitle = this._stringAttribute(this._mediaSnapshot?.attributes?.media_title);
    if (
      this._mediaTransportOverride &&
      currentTitle &&
      snapshotTitle &&
      currentTitle !== snapshotTitle
    ) {
      this._mediaTransportOverride = null;
    }
    if (isVideoMediaPlayerActive(state)) {
      this._captureMediaSnapshot(state);
      if (mediaPlayerTransportState(state) === this._mediaTransportOverride) {
        this._mediaTransportOverride = null;
      }
    } else if (!this._mediaTransportOverride) {
      this._mediaSnapshot = null;
    }
  }

  private _captureMediaSnapshot(state: HassState | undefined): void {
    if (!state || !isVideoMediaPlayerActive(state)) return;
    this._mediaSnapshot = {
      state: state.state,
      attributes: { ...(state.attributes ?? {}) },
    };
  }

  private _mediaViewState(): HassState | undefined {
    const current = this._mediaPlayerState();
    if (!this._mediaTransportOverride) return current;
    const source = isVideoMediaPlayerActive(current) ? current : this._mediaSnapshot;
    if (!source) return current;
    return {
      state: this._mediaTransportOverride,
      attributes: {
        ...(this._mediaSnapshot?.attributes ?? {}),
        ...(current?.attributes ?? {}),
        media_content_type: "video",
      },
    };
  }

  private _reconcileMediaSeek(state: HassState | undefined): void {
    if (this._mediaSeekTarget === null) return;
    if (!isVideoMediaPlayerActive(state)) {
      this._clearMediaSeekTimer();
      this._mediaPendingSeek = false;
      this._mediaSeekTarget = null;
      this._mediaSeekValue = null;
      return;
    }
    const position = this._numberAttribute(state?.attributes?.media_position);
    if (position === null || Math.abs(position - this._mediaSeekTarget) > 1.5) return;
    this._clearMediaSeekTimer();
    this._mediaPendingSeek = false;
    this._mediaSeekTarget = null;
    this._mediaSeekValue = null;
    if (this._statusMessage.startsWith("Video seek")) this._statusMessage = "";
  }

  private _mediaPlayerState(): HassState | undefined {
    const entityId = this._config.media_player_entity;
    return entityId ? this._hass?.states?.[entityId] : undefined;
  }

  private _state(): HassState | undefined {
    return this._hass?.states?.[this._config.entity];
  }

  private _currentIndex(state: HassState | undefined): number | null {
    const value = state?.attributes?.current_index;
    return typeof value === "number" ? value : Number.isInteger(Number(value)) ? Number(value) : null;
  }

  private _stringAttribute(value: unknown): string | null {
    return typeof value === "string" && value ? value : null;
  }

  private _numberAttribute(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const number = typeof value === "number" ? value : Number(value);
    return Number.isFinite(number) ? number : null;
  }

  private _subtitle(attributes: Record<string, unknown>): string {
    if (this._selectedPresentationUuid) {
      const liveName = this._stringAttribute(this._state()?.state);
      const slideCount = this._metadata?.slide_count;
      return [
        "Browsing playlist item",
        slideCount ? `${slideCount} slides` : "",
        liveName ? `Live: ${liveName}` : "",
      ].filter(Boolean).join(" · ");
    }
    const index = this._currentIndex(this._state());
    const count = typeof this._metadata?.slide_count === "number"
      ? this._metadata.slide_count
      : typeof attributes.slide_count === "number" ? attributes.slide_count : null;
    const label = this._stringAttribute(attributes.current_label) ?? this._metadata?.current_slide_label;
    const position = index !== null && count !== null ? `${index + 1} / ${count}` : "";
    return [position, label].filter(Boolean).join(" · ") || "Waiting for ProPresenter";
  }

  private _thumbnailPlaceholder(index: number): string {
    const state = this._thumbnailStates.get(index);
    return state === "error" ? "Thumbnail unavailable" : "Loading thumbnail…";
  }

  private _playlistPointer(state: HassState | undefined): string {
    return this._stringAttribute(state?.attributes?.playlist_revision) ?? "";
  }

  private _slideId(index: number): string {
    return `propresenter-slide-${index}`;
  }

  private _isEditorPreview(): boolean {
    let node: Node | null = this;
    while (node) {
      if (node instanceof Element) {
        const name = node.localName;
        if (name.includes("preview") || name.includes("editor")) return true;
      }
      if (node instanceof ShadowRoot) {
        node = node.host;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }

  private _errorMessage(error: unknown): string {
    return formatHassError(error);
  }
}

if (!customElements.get("propresenter-presentation")) {
  customElements.define("propresenter-presentation", ProPresenterPresentationCard);
}

const customCards = ((window as Window & { customCards?: unknown[] }).customCards ??= []) as Array<Record<string, unknown>>;
if (!customCards.some((item) => item.type === "propresenter-presentation")) {
  customCards.push({
    type: "propresenter-presentation",
    name: "ProPresenter Presentation",
    description: "A dynamic, guarded ProPresenter slide browser",
    preview: true,
    documentationURL: "https://github.com/media-dotcom/ha-propresenter",
  });
}
