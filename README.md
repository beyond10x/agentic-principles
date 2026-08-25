# Agentic Principles

Evidence-backed principles for running agentic work safely and efficiently.

The project studies software factories, automatic SRE agents, customer operations, and other
consequential automation through web research, live tests, transcript analysis, and evaluations. Its
output is a reviewable body of evidence and principles that can inform agent harnesses and
metaharnesses without turning a single anecdote into policy.

**Read the published research:**
[beyond10x.github.io/agentic-principles](https://beyond10x.github.io/agentic-principles/)

## What is here

| Path | Purpose |
|---|---|
| `docs/VISION.md` | Research mission, scientific method, and intended product feedback loop |
| `docs/research/` | Timestamped questions, methods, evidence, analyses, and limitations |
| `docs/principles.json` | Machine-readable principle registry |
| `.engineering/schemas/` | Project-owned JSON Schema contracts |
| `.engineering/planning/` | Governed planning artifacts, mutated only through `protocol artifact` |
| `website/` | Docusaurus source for the public research site |

Principles move through an explicit lifecycle:

```text
seed → hypothesis → candidate principle → supported principle
                         ↘ challenged → revised or retired
```

The maturity label is a claim about evidence strength, not editorial polish. Read
[`docs/VISION.md`](docs/VISION.md) for the method and [`AGENTS.md`](AGENTS.md) for the operating rules.

## Verify the research contracts

The shared `protocol` CLI comes from
[`beyond10x/engineering-protocols`](https://github.com/beyond10x/engineering-protocols). From the
repository root:

```bash
protocol schema validate \
  docs/principles.json \
  docs/research/evidence/scoped-progress-partial-failure/*.json

cd website
npm ci --ignore-scripts
npm run schema:check
npm run typecheck
npm run build
```

The authored JSON Schemas are the source of truth. TypeScript types under `website/src/generated/`
are deterministic projections and must pass the drift check.

## Publication

Pushes to `main` that affect the research, schemas, or website run the GitHub Pages pipeline. It
validates schema instances and generated types, audits dependencies, type-checks, builds, and deploys
the static artifact with least-privilege Pages permissions.

`node_modules`, `build`, `dist`, coverage output, and Docusaurus caches are ignored and are never
release inputs. See [`CHANGELOG.md`](CHANGELOG.md) for released milestones.
