---
format: aep.planning-md/1
id: specification:research-workflow
kind: specification
status: draft
title: Agentic-principles research workflow
summary: Define a bounded, evidence-gated workflow for one research question and its product handoff.
relations:
- specifies: epic:research-operating-system
- specifies: story:specify-research-workflow
revision: 2
---
# Specification: Agentic-principles research workflow

One research run turns one answerable question into a reviewable result, an explicit inconclusive
outcome, or a recorded decline. Product application and feedback are linked work, not an endless
state inside the same run.

## Context

The program-level loop in `docs/VISION.md` is iterative: observe, question, hypothesize,
operationalize, test, falsify, synthesize, apply, and observe again. A governed workflow needs a
bounded execution unit and terminal states, while preserving that larger feedback loop across runs.
This specification serves `story:specify-research-workflow` under `epic:research-operating-system`.

## Requirements

1. A run addresses one named research question and records why the answer could change a decision.
2. Prior hypotheses and at least one plausible competing explanation are recorded before evidence is
   interpreted as supporting either one.
3. The method, scope, environment, success and failure criteria, stopping conditions, and safety
   envelope are recorded before costly or state-changing collection begins.
4. Evidence retains source or run provenance and remains distinguishable from interpretation.
5. The workflow includes an explicit challenge phase before synthesis and requires independent
   verification evidence to leave it.
6. A failed or incomplete challenge returns to research design without erasing the failed attempt.
7. Synthesis records limitations, counterevidence, confidence, and the most informative next test.
8. Review can approve a handoff, request more research, or close the run as inconclusive.
9. An already-answered, duplicate, unsafe, or irrelevant question ends as a recorded decline rather
   than an abandoned run.
10. A product handoff identifies the target behavior, expected effect, evaluation, risk, and rollback.
11. Product application occurs in the owning repo. Its observed outcome links back as evidence for a
    new run or revision rather than keeping the original run permanently open.
12. The workflow supports qualitative and quantitative methods without pretending they produce the
    same evidence.

## Constraints

- The first version is a structurally validated workflow specification, not a driven workflow.
- Existing AEP evidence kinds may represent generic artifacts, reviews, and verifications, but they do
  not distinguish literature sources, transcript codes, experiments, replications, or product trials.
- Research-specific phases require a protocol/profile pairing before resolution can enforce principles
  against them.
- Live tests remain bounded by `AGENTS.md`; the workflow grants no authority by existing.
- The current Codex integration supplies planning instructions, not hooks, a transcript adapter, or a
  research step executor.

## Out of Scope

Automatic source-quality scoring, universal statistical thresholds, product implementation, automatic
principle promotion, and production experimentation without explicit authorization.

## Invariants

- Unknown is not false, and missing evidence cannot permit a transition.
- The researching agent cannot mint the independent evidence that releases its own challenge gate.
- Negative, null, blocked, and inconclusive outcomes remain in the record.
- No terminal state claims product impact before that impact has been observed in the product context.
- Structural validation, scientific validity, and runtime enforcement remain separately labelled.

## Acceptance Criteria

- `.engineering/research-tree/workflows/research/default.yaml` loads as the repository-owned research
  specification and `protocol validate --root .engineering/research-tree` reports no structural or
  semantic document errors.
- Every non-terminal state is reachable and has an outgoing transition; every terminal outcome is
  named.
- A mapping identifies how VISION's program-level loop corresponds to the bounded run and the
  cross-repository feedback cycle.
- A gap analysis names the additional protocol phases, evidence semantics, profile, representative
  task, driver map, and transcript evaluation needed before describing the workflow as enforced.

## Open Questions

- Research owner: should the first executable version extend `aep/1` with an Agentic Research
  Protocol, or express research through generic artifact and verification evidence?
- Research owner: which research methods need distinct evidence types and verifiers?
- `harness` and `metaharness` owners: where does the transfer package live and how is its result
  correlated back to the originating research run?
