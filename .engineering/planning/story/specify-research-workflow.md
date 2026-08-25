---
format: aep.planning-md/1
id: story:specify-research-workflow
kind: story
status: draft
title: Specify the research workflow
summary: Map the scientific loop in VISION.md onto the executable workflow model and identify adoption gaps.
relations:
- derived_from: epic:research-operating-system
revision: 1
---
# Story: Specify the research workflow

## Outcome

A researcher can inspect a typed state-machine specification for one bounded research question and
can see exactly which parts are structurally valid, semantically proposed, and not yet enforced.

## Context

`docs/VISION.md` defines a program-level scientific loop. Engineering Protocols defines workflows as
states, phases, guarded transitions, requirements, capabilities, and failure policy. The fit must be
tested without collapsing an ongoing research program into one never-ending run.

## Acceptance

The VISION loop is mapped to bounded states and terminal outcomes; the workflow document passes
`protocol validate`; a research note records what is reusable, what is missing, and what would be
required for executable adoption; and no document claims the workflow is driven before a profile,
evidence ontology, representative task, and step map exist.

## Out of Scope

Implementing a research protocol or driver, minting research evidence records, changing the upstream
closed evidence-kind vocabulary, or running live research automatically.

## Open Questions

- Research owner: which research observations deserve first-class evidence kinds rather than generic
  artifact or verification records.
- Product owners: what minimum handoff artifact can be consumed consistently by both `harness` and
  `metaharness`.
