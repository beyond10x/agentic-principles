# Agentic Principles website

The Docusaurus site publishes the research notebook and the principle registry. JSON Schema under
`.engineering/schemas` is the authored contract for registry data; the TypeScript module under
`src/generated` is a committed projection, not a second source.

Reader-facing navigation starts at `../docs/index.mdx`. Published notes keep timestamped source
filenames for provenance but provide human-readable frontmatter and curated labels in `sidebars.ts`.
Landing-page summaries may orient a reader; they must not become a competing source for principle
claims or maturity.

## Develop

```bash
npm ci
npm run start
```

## Contract workflow

```bash
protocol schema validate ../docs/principles.json ../docs/research/evidence
npm run schema:generate
npm run schema:check
```

Run `schema:generate` only after changing the registry JSON Schema. Ordinary changes should leave the
generated module untouched and prove that with `schema:check`.

## Gate

```bash
npm run schema:check
npm run typecheck
npm run build
```
