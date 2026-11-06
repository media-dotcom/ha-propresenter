import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

const cardLicense = readFileSync(new URL("./LICENSE", import.meta.url), "utf8");

export default defineConfig({
  plugins: [
    {
      name: "bundle-card-license",
      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "LICENSE",
          source: cardLicense,
        });
      },
    },
  ],
  build: {
    outDir: "../custom_components/propresenter/www",
    emptyOutDir: true,
    lib: {
      entry: "src/propresenter-presentation.ts",
      formats: ["iife"],
      name: "ProPresenterPresentationCard",
      fileName: () => "propresenter-presentation.js",
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    sourcemap: false,
  },
});
