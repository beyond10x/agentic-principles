# Scoped progress under partial failure

- **Status:** in progress
- **Created:** 2026-08-25T02:30:00+02:00
- **Method:** targeted primary-source review, formal task model, deterministic experiment, and bounded
  transcript analysis
- **Decision target:** failure handling and resumability in agent harnesses and metaharnesses

## Receive

During initialization of this repository, Internet loss made GitHub authentication and remote pushes
unavailable while local files, the planning CLI, validation tools, and Git remained usable. The agent
initially yielded the whole task. The operator's correction—independent local work was still
possible—motivates the question. It is an observation to investigate, not evidence sufficient to
establish a general rule.

## Research question

When one capability needed by a multi-step agent run becomes unavailable, under what conditions should
the agent continue other work rather than halt the whole run?

The answer could change whether `harness` and `metaharness` represent failure at run level or at the
level of actions, dependencies, and capabilities; what state they checkpoint; and which recovery
behaviors they evaluate.

## Registered hypotheses

### H1 — dependency-scoped continuation

If task prerequisites, required capabilities, authority, and freshness constraints are explicit, a
policy that defers only blocked tasks and continues the safe ready frontier will complete more useful
work before recovery than a global-halt policy without increasing invalid effects.

Proposed mechanism: the failed capability removes only the graph nodes that require it and their
dependants. Halting nodes outside that cut wastes available capacity and increases recovery latency.

### H2 — global halt protects consistency

A global halt will produce fewer invalid or stale-state actions because apparently independent tasks
often share hidden state, assumptions, or transaction boundaries. Continuing work can accumulate
rework and make the eventual state harder to reconcile.

This is the principal competing explanation, not a straw man. It predicts that the benefit of H1 will
disappear or reverse when dependencies and freshness constraints are incomplete.

### H3 — the effect is conditional

Scoped continuation will dominate only when a non-empty safe frontier remains. It will equal global
halt when every remaining task is blocked and must yield to a safety stop when the missing capability
also removes authorization, observability, rollback, required evidence, or the ability to determine
whether state is fresh.

## Operational model

Represent a run as a directed acyclic graph of tasks. Each task declares:

- prerequisite tasks;
- required capabilities;
- whether it changes external state;
- whether it needs state refreshed after capability restoration;
- its useful-work weight.

During an outage, a task is in the **safe ready frontier** only when every prerequisite succeeded, all
required capabilities are available, its authority remains valid, and no freshness or transaction
barrier applies. The policies under comparison are:

1. **Global halt:** after the first unavailable capability is observed, execute no task until it is
   restored.
2. **Scoped continuation:** defer tasks cut by the failed capability, checkpoint their blockers, and
   execute tasks in the safe ready frontier. Re-evaluate deferred tasks after restoration.
3. **Naive continuation:** ignore declared capability and freshness constraints. This intentionally
   unsafe control tests whether the evaluator can detect invalid progress.

## Measures

Primary measures:

- useful-work weight completed during the outage;
- invalid executions during the outage;
- tasks requiring rework after restoration;
- total tasks completed after restoration;
- scheduling decisions from restoration to completion.

Secondary measures:

- number of tasks with a localized blocker rather than a run-wide blocker;
- whether the policy preserves a resumable checkpoint;
- cases where scoped continuation correctly makes no progress.

The candidate principle is supported only if scoped continuation produces strictly more useful outage
work in at least one predeclared beneficial case, never executes a task whose declared safety
conditions are false, and correctly halts in all predeclared safety-boundary cases. A single violation
of the last two conditions challenges H1 as operationalized.

## Experiment design

A deterministic local simulator will execute predeclared task graphs from four domains:

- software factory: remote forge or package registry unavailable;
- SRE: telemetry or change-control capability unavailable;
- customer support: CRM or outbound-message capability unavailable;
- research operations: web access or remote Git unavailable.

The corpus must include at least:

- four cases with independent safe work;
- four cases where all remaining work is genuinely blocked;
- four cases with hidden-state risk made explicit as a freshness, authority, observability, rollback,
  or transaction barrier;
- one planted evaluator control where naive continuation must be caught.

Inputs, simulator source, raw JSON results, and a human-readable result table will be retained under
`docs/research/evidence/scoped-progress-partial-failure/`. The simulator must be deterministic and
must fail its own verification command if the planted unsafe control is not detected.

## Source-review method

Search primary standards, official reliability guidance, and original research for:

- graceful degradation and preservation of essential functions;
- fault containment, bulkheads, and failure-domain isolation;
- static stability and dependency removal during impairment;
- durable or fault-tolerant workflow scheduling;
- counterexamples involving stale state, split-brain behavior, unsafe fallback, or lost observability.

Include a source only for claims it directly supports. Record version or publication date and access
date. The review stops after at least four relevant primary or authoritative sources from at least
three independent organizations, including at least one source that materially constrains
continuation rather than merely endorsing availability.

## Transcript-analysis method

Use only the current authorized session. Preserve ordering and code each pending action at the first
global yield as:

- blocked by the unavailable capability;
- safe and independent;
- unsafe or indeterminate without the capability;
- already complete.

Compare that coding with actions actually completed after the operator correction and before Internet
restoration. This is a single purposive incident, so it can test the task classification and expose a
mechanism; it cannot estimate a general success rate.

## Safety envelope

The experiment is local, deterministic, and produces repository files only. Source collection is
read-only. No production outage, customer data, credential exercise, external message, or mutation of
`harness` or `metaharness` is authorized. Stop immediately if a method would require any such effect.

## Challenge plan

Before synthesis:

1. run the planted unsafe policy to verify the evaluator catches violations;
2. run cases where no safe frontier exists to disprove an unconditional “always continue” rule;
3. search specifically for reliability guidance against fallback and work on stale state;
4. distinguish progress that is merely busy from progress that remains useful after recovery;
5. record any scenario where global halt has lower rework or safer outcomes.

## Stopping conditions

Stop with a candidate principle only when the source threshold, experimental corpus, evaluator control,
transcript coding, counterexample search, and reproducibility checks are complete. Stop as
**inconclusive** if source claims conflict without a defensible scope, the evaluator cannot distinguish
unsafe work, or results depend on unrecorded task annotations. Do not promote beyond candidate based on
this study: the operational incident is singular and the experiment is a model, not a production
reliability trial.
