# Releasing

The integration and dashboard card are released together from
`media-dotcom/ha-propresenter-suite`.

1. Update `custom_components/propresenter/manifest.json` with the integration
   version for the release.
2. From `dashboard-card/`, run `npm ci`, `npm run typecheck`, `npm test`, and
   `npm run build`. Commit the generated
   `custom_components/propresenter/www/propresenter-presentation.js` and its
   bundled `LICENSE` with the source changes.
3. Run the Python lint, format, backend tests, hassfest, and HACS validation
   checks. Confirm the installed integration serves the dashboard card at
   `/propresenter/propresenter-presentation.js`.
4. Publish the integration release and its matching card asset together. Keep
   the `propresenter` domain unchanged so existing config entries remain
   attached.
5. Once the release and migration instructions are available, change the
   consolidation notices in the former integration and card repositories from
   planned to complete and link to the release.
