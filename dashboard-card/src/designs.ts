import type { DesignName } from "./types";

export interface DesignDefinition {
  label: string;
  tokens: Record<string, string>;
}

/** A small registry keeps future card designs independent of the backend. */
export const DESIGN_REGISTRY: Record<DesignName, DesignDefinition> = {
  grid: {
    label: "Grid",
    tokens: {
      "--pp-card-radius": "18px",
      "--pp-card-padding": "14px",
      "--pp-gap": "10px",
      "--pp-tile-radius": "12px",
      "--pp-accent": "var(--primary-color, #03a9f4)",
      "--pp-muted": "var(--secondary-text-color, #727272)",
      "--pp-surface": "var(--card-background-color, var(--ha-card-background, #fff))",
      "--pp-tile-surface": "color-mix(in srgb, var(--pp-surface) 92%, var(--pp-accent))",
    },
  },
};

export function designTokens(design: DesignName | undefined): string {
  const definition = DESIGN_REGISTRY[design ?? "grid"] ?? DESIGN_REGISTRY.grid;
  return Object.entries(definition.tokens)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");
}
