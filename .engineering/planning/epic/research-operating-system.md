---
format: aep.planning-md/1
id: epic:research-operating-system
kind: epic
status: draft
title: Establish the agentic-principles research operating system
summary: Make research planning, evidence, workflow, and product handoff governed and inspectable.
relations:
- derived_from: initiative:agentic-principles-research
revision: 1
---
# Epic: Establish the agentic-principles research operating system

## Outcome

Researchers and agents can plan, conduct, challenge, synthesize, and hand off research through a
repository-local system whose project state, evidence expectations, and workflow are inspectable.

## Why Now

The repository has a vision and two seeds but no governed backlog or executable workflow model.
Without those, research can accumulate without a durable account of decisions, status, gaps, or the
conditions under which a finding becomes a principle.

## Scope

- Install the repository-local Engineering Protocols planning skill.
- Operate a validated planning store for initiatives, epics, stories, specifications, and decisions.
- Specify a bounded research workflow derived from `docs/VISION.md`.
- Identify the protocol, evidence, profile, and driver gaps between a valid specification and an
  enforced research run.
- Define how findings transfer to `harness` and `metaharness` without moving product ownership here.

## Out of Scope

Building a research driver, changing `harness` or `metaharness`, claiming the draft workflow is
enforced, or defining the final catalogue of agentic principles.

## Risks

- Treating structural validation as evidence that a workflow is scientifically sound.
- Importing development-specific evidence vocabulary into research where its semantics do not fit.
- Duplicating upstream protocol documents without a pinned identity and update discipline.
- Turning the research loop into endless motion with no bounded terminal outcome.

## Done When

The planning store validates; upstream protocol provenance is pinned; the research workflow exists as
a structurally valid, explicitly maturity-labelled specification; its executable gaps are recorded;
and a product handoff contract is testable without claiming runtime enforcement that does not exist.
