---
format: aep.planning-md/1
id: story:scoped-progress-under-partial-failure
kind: story
status: draft
title: Research scoped progress under partial failure
summary: Test whether agents should continue safe dependency-independent work when one capability is unavailable.
relations:
- derived_from: epic:research-operating-system
revision: 1
---
# Story: Research scoped progress under partial failure

## Outcome

Operators and product teams have an evidence-calibrated, falsifiable rule for how an agent should
continue—or stop—when one execution capability becomes unavailable.

## Context

During repository initialization, loss of Internet connectivity blocked remote authentication and
pushes but did not block local validation, documentation, or staging. The agent initially treated the
partial capability loss as a reason to yield the whole task; operator correction exposed a possible
resilience principle. One incident can motivate a question but cannot establish the principle.

The research follows [`docs/VISION.md`](../../../docs/VISION.md) and the
[`research/default`](../../research-tree/workflows/research/default.yaml) workflow.

## Acceptance

- The question, competing hypotheses, measures, safety boundary, and stopping conditions are recorded
  before the experiment is interpreted.
- Primary resilience and workflow sources are cited directly and meaningful counter-pressure is
  represented.
- A deterministic experiment compares global halt with dependency-scoped continuation across normal,
  beneficial, and unsafe-to-continue boundary cases; inputs, code, and raw results are retained.
- Transcript observations, source findings, experiment results, inference, and normative synthesis
  remain visibly distinct.
- Any resulting principle states maturity, scope, mechanism, counterevidence, falsifier, and a testable
  `harness`/`metaharness` handoff.

## Out of Scope

Implementing scheduling or checkpoint behavior in `harness` or `metaharness`, claiming a reliability
rate from one incident, and testing against production outages are excluded.

## Open Questions

- Whether the evidence supports a candidate principle or only a narrower hypothesis is decided by the
  synthesis against the predeclared criteria.
- Product adoption remains with the owning product repositories and their operators.
