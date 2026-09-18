---
format: aep.planning-md/1
id: story:principle-transfer-package-contract
kind: story
status: draft
title: Give the principle transfer package a validated contract
summary: Define and validate the sidecar schema that makes a research-to-product handoff checkable.
relations:
- derived_from: epic:research-operating-system
revision: 1
---
# Story: Give the principle transfer package a validated contract

## Outcome

The testable transfer package `docs/VISION.md` requires of a handoff to `harness` or `metaharness`
exists as a project-owned JSON Schema and a validated instance, so a handoff can be checked rather
than asserted, and `specification:research-workflow` has an answer to where the package lives.

## Context

`docs/VISION.md` names six parts of a transfer package and `AGENTS.md` names seven obligations of a
candidate principle plus six of a product handoff. Until now those lived only as prose, so nothing
could tell a complete handoff from a plausible one. The open question in
`specification:research-workflow` — "where does the transfer package live and how is its result
correlated back to the originating research run?" — could not be answered while the package had no
home and no shape.

The answer this story records: one sidecar per principle at `docs/transfer-packages/<id>.json`,
keyed by registry identifier, under
`urn:beyond10x:agentic-principles:schema:transfer-package:1` in `.engineering/schemas/`, with
`additionalProperties: false`.

It is a sidecar and not a second registry. Maturity is not restated in it: it stays sourced from
`docs/principles.json`, which this work leaves byte-unchanged. The claim is carried as a quotation
with the file it is quoted from, so a consumer can check it rather than trust it — `AGENTS.md` holds
that navigation and summaries are projections, not a second research corpus.

The first and only instance is `docs/transfer-packages/AP-011.json`, for the partial-failure study:
ten evidence citations, seven counterevidence citations, three caveats, and two separately graded
confidence axes, because the registry's single maturity label cannot express that the mechanism is
at moderate confidence while generalization to agents is only low-to-moderate.

## Acceptance

- The schema is registered through `.engineering/project.yaml` and validates under
  `ess schema validate --schemas .engineering/schemas` in CI, alongside the existing registry and
  evidence instances.
- Every part `docs/VISION.md` requires of a transfer package and every candidate-principle and
  product-handoff obligation in `AGENTS.md` maps to a required property.
- The claim carries the repository path it is quoted from, so a drifted quotation is detectable.
- `docs/principles.json` and `principle-registry.schema.json` are unchanged.
- A malformed instance is rejected by `ess schema validate`, proved by a planted fixture rather than
  asserted.

## Out of Scope

Changing the registry or its schema, restating maturity in the package, writing packages for
principles below `candidate`, and implementing anything in `harness` or `metaharness`.

## Open Questions

- Whether a second package, for a principle promoted later, needs fields this one did not — the
  schema is versioned in its URN so a second version can be added without rewriting the first.
