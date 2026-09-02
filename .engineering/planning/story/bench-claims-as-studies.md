---
format: aep.planning-md/1
id: story:bench-claims-as-studies
kind: story
status: draft
title: Every published bench claim is a dated study with evidence JSON
summary: One timestamped study per bench claim, evidence validated by ess schema validate, run ids and bench commit named.
owner: research
tags:
- bench
relations:
- decomposes: epic:research-operating-system
revision: 1
---
# Story: Every published bench claim is a dated study with evidence JSON

## Outcome

A number the bench publishes — a cost, a pass count, a waste ratio — can be traced from the site to a timestamped study here, to an evidence file that `ess schema validate` accepts, to the run manifests in `beyond10x/bench` that produced it.

## Context

`beyond10x/bench` (created 2026-09-02) holds corpora, arms, runs and facts; this repository holds claims with evidence labels (`README.md` § Current evidence posture: 1 candidate, 10 seeds, 0 supported). A bench result that changes a principle's label is a study here; the bench keeps the data. The first study is the re-run of `bdfinst/agentic-dev-team`'s experiment 05 on the same model and corpus.

## Acceptance

- `docs/research/` gains one timestamped study per published bench claim, in the shape of the partial-failure study, with `evidence/<slug>/*.json` validating against `.engineering/schemas/`.
- Each evidence file names the bench run ids and the commit of `beyond10x/bench` they came from.
- A principle whose label moves because of a bench study cites the study in `docs/principles.json`.

## Out of Scope

Hosting run data here. It stays in the bench; this repository references it.

## Ambiguities

- `inferable` — the study shape: `docs/research/2026-08-25T023000+0200_scoped-progress-under-partial-failure.md` and its evidence directory.

## Open Questions

None.
