# AGENTS.md — agentic-principles

## Purpose

This is the research and synthesis repository for the principles of safe and efficient agentic work
automation. Read [`docs/VISION.md`](docs/VISION.md) before starting substantive work.

This repo owns research questions, evidence, experiments, analyses, competing explanations, and
principle synthesis. It does not own implementation in `harness`, `metaharness`, or other component
repos. Product changes belong in those repos after an explicit handoff.

## Serves

The objectives of the collection this repository moves, by id from `atlas/ROADMAP.md` — the only
cross-repository roadmap, and the page that says what each id means and which evidence closes it:

- **O2 — decisions as data, with evidence.** A rule earns belief before it is executable: every claim labelled by the strength of its evidence, promoted to *supported* only on independent evidence.
- **O6 — self-improvement, built into all of it.** Promotion, revision and retirement of principles is self-improvement applied to the rules themselves.

A change here that moves none of these is a question for the operator, not a task.
`atlas/scripts/check-map.sh` fails a repository whose `AGENTS.md` names no objective.

## Operating priorities

In descending order:

1. protect people, credentials, private data, and production systems;
2. preserve the integrity and provenance of evidence;
3. make methods and conclusions inspectable and reproducible;
4. produce knowledge that can change a real engineering decision;
5. minimize time, attention, compute, and cost.

Efficiency never excuses unsafe testing or stronger claims than the evidence supports.

## The default research workflow

Before gathering more material:

1. Read the relevant existing research and search for prior treatment of the question.
2. State the question and why answering it could change agent or product behavior.
3. Record current hypotheses, including at least one plausible competing explanation.
4. Choose a method capable of distinguishing among them. Define success, failure, and stopping
   conditions before a costly or state-changing test.

While researching:

1. Preserve source and run provenance as evidence is collected.
2. Separate observations from interpretations.
3. Look actively for disconfirming cases and boundary conditions.
4. Record failed methods, null results, anomalies, and abandoned directions when they affect the
   conclusion or prevent duplicated work.
5. Keep the scope proportional to the decision. Exploratory work may remain exploratory; do not dress
   it as a controlled experiment.

At synthesis:

1. Answer the research question at the strength the evidence permits.
2. Explain limitations, confounders, counterevidence, and unresolved disagreements.
3. Extract hypotheses or candidate principles only when they are more general than the observed case.
4. Propose the next observation that would most efficiently increase or decrease confidence.
5. If the result should affect a product, specify a testable handoff rather than silently editing the
   product from this repo.

## Evidence vocabulary

Keep these categories distinct in prose:

- **Observed** — directly present in an inspected artifact or produced by a recorded measurement.
- **Reported** — asserted by a source but not independently reproduced here.
- **Inferred** — a conclusion drawn from observations, with the reasoning stated.
- **Hypothesized** — a testable explanation or prediction not yet adequately supported.
- **Proposed** — a design, policy, experiment, or principle offered for consideration.

“Verified” must say what was verified, how, against which version or environment, and when. Absence of
evidence is not evidence of absence unless the method had a demonstrated ability to detect the thing.

## Source and provenance rules

Every factual claim that matters to a conclusion needs an inline source or a pointer to an evidence
artifact.

- For repository evidence, cite `repo@commit:path:line` when the commit exists. Use `path:line` plus
  working-tree status when it does not.
- For commands and live tests, record the command or procedure, timestamp, relevant environment, exit
  status, and material output. Store large raw artifacts outside prose and link them.
- For model or agent runs, record the model, harness and configuration versions, instructions or prompt
  identity, available tools, budgets, sampling settings where exposed, and run identifier.
- For web research, link the direct source, record the publication or version date and access date, and
  prefer primary sources. Remove analytics parameters from links.
- For standards, cite the issuing body, exact identifier, edition or date, and the section supporting
  the claim.
- For interviews or private communications, identify the source only to the degree consent and privacy
  allow. State when a claim is anecdotal or cannot be independently checked.

Do not use citation count as a proxy for evidence quality. A source may establish what its author says;
it does not automatically establish that the claim is true or general.

## Research methods

Use the method appropriate to the question and describe it honestly.

### Web and literature research

- Search for original specifications, papers, incident reports, source code, and official documentation
  before relying on summaries.
- Check dates, versions, retractions, corrections, and whether the source describes measured results or
  opinion.
- Represent meaningful disagreement. Do not average incompatible claims into false consensus.
- Do not turn vendor capability claims into facts without independent evidence.

### Live tests and experiments

- Use a sandbox, fixture, disposable account, or local environment by default.
- Do not contact real customers, publish content, spend money, change production, weaken controls, or
  exercise credentials against an external system without explicit authorization for that effect.
- Minimize privileges and data. Set time, iteration, request, and monetary budgets before the run.
- Define an abort mechanism and observe the run when consequences could escape the fixture.
- Prefer reversible or compensatable operations. Verify cleanup and record residual state.
- Use unique test data so test effects cannot be mistaken for real work.
- Validate the evaluator with a known-good and, where feasible, a planted known-bad case.
- Repeat stochastic trials enough to support the stated conclusion; report the run count and variation.

An exploratory demo may reveal a hypothesis. It does not establish a reliability rate.

### Transcript and trace analysis

- Analyze only data the user is authorized to provide or the project is authorized to access.
- Minimize collection. Never commit secrets, access tokens, private keys, raw customer PII, or sensitive
  production payloads.
- Redact or pseudonymize before storing evidence in the repo. Keep any re-identification mapping out of
  the repo.
- Preserve turn and event ordering, tool boundaries, interventions, omissions, and termination state.
- Define the sampling and coding method. Separate quotations or coded observations from interpretation.
- When multiple reviewers label data, record the agreement method or explain why one reviewer was
  sufficient.

### Evaluations

- Evaluate complete work outcomes, not only answer style or model preference.
- Include normal tasks, edge cases, adversarial cases, partial failures, and recovery paths.
- Measure unauthorized actions, missed necessary actions, correctness, completion, escalation quality,
  recovery, latency, cost, and human attention where relevant.
- Keep evaluation cases out of the context of the system being evaluated unless exposure is part of the
  test. Record suspected contamination.
- Use deterministic checks where the property is deterministic. Calibrate model graders against human
  judgments and known counterexamples before relying on them.
- Compare against a relevant baseline. Report uncertainty and practical effect, not only aggregate
  scores.
- Retain failures needed to reproduce or diagnose the result.

## Research notes

New time-stamped research notes live under `docs/research/` and use:

```text
YYYY-MM-DDTHHMMSS+ZZZZ_<short-slug>.md
```

Use the local offset in the filename, omit colons, and record the full ISO 8601 creation time inside the
document. Do not overwrite a prior note to make later understanding look original; add a dated
correction or a new synthesis and link both.

A substantive note should contain, when applicable:

- status and creation time;
- research question and decision relevance;
- prior hypotheses and competing explanations;
- scope, method, environment, and stopping conditions;
- evidence and provenance;
- findings separated from interpretation;
- limitations, confounders, failures, and counterevidence;
- resulting hypotheses or candidate principles;
- the next useful falsification or replication step;
- product implications, if any.

Exploratory seeds may be incomplete, but they must not imply a stronger method than was used.

## Principle lifecycle

Use these maturity labels:

```text
seed → hypothesis → candidate principle → supported principle
                         ↘ challenged → revised or retired
```

- A **seed** is material worth investigating.
- A **hypothesis** is a falsifiable claim with a proposed mechanism.
- A **candidate principle** has defined scope, supporting evidence, counter-pressure, and an operational
  consequence.
- A **supported principle** has survived serious attempts at falsification and is supported by more than
  one independent source of evidence, including empirical evidence relevant to its intended domain.
- A **challenged** principle has material counterevidence that changes confidence or scope.
- A **retired** principle remains in history with the reason it was rejected or superseded.

No principle is promoted solely from one source, one transcript, one benchmark, one model's output, or
one successful run. Promotion is a reviewable synthesis decision, not an automatic score threshold.

Every candidate or supported principle must state:

1. the normative claim in one sentence;
2. the causal or operational mechanism;
3. scope and boundary conditions;
4. supporting evidence and confidence;
5. counterevidence and trade-offs;
6. a falsifier or discriminating test;
7. implications for system design, operation, or evaluation.

## Product handoff

A recommendation for `harness` or `metaharness` should identify:

- the target behavior or interface;
- the principle and evidence motivating it;
- the expected safety and efficiency effects;
- a minimal experiment or implementation slice;
- acceptance and regression measures;
- risks, compatibility constraints, rollout conditions, and rollback.

Do not make product changes unless the user explicitly requests them. Cross-repo contracts and
coordinated migrations follow the rules in `atlas`; this repo supplies research evidence, not an
exception to those rules.

## Corrections and uncertainty

- Correct factual errors promptly and visibly.
- Preserve the original record when it explains later decisions; add a correction rather than silently
  rewriting history.
- Update active syntheses when evidence changes, linking the superseded claim and the new evidence.
- Use calibrated language. “Observed in 18 runs” is preferable to “always”; “not observed” is preferable
  to “impossible.”
- State unresolved uncertainty when another test would be more expensive than the decision warrants.

## Definition of done

A research task is done when the question has an evidence-calibrated answer or a clearly recorded
blocker; sources and artifacts are navigable; observations, inference, and hypotheses are distinct;
limitations and counterevidence are visible; and the next decision or experiment is clear.

A document existing is not evidence that the research is complete.

## Publication and releases

The public repository and website are evidence surfaces. Publishing them must not weaken the privacy,
provenance, or reproducibility rules above.

Before a public release:

1. Scan the complete Git history and the built static artifact for secrets. Confirm that no private
   data, machine-local paths, unpublished credentials, or re-identification material is present.
2. Confirm that `node_modules`, `build`, `dist`, coverage output, Docusaurus caches, and other generated
   dependency trees have never entered the release history.
3. Run `ess schema validate … --schemas .engineering/schemas` over every published schema
   instance, then run the website's
   `schema:check`, `typecheck`, and production `build` scripts from a locked npm install.
4. Review dependency-audit findings in context. Do not hide a residual advisory; record why its attack
   surface is or is not reachable, gate unacceptable severity, and keep automated updates enabled.
5. Update `CHANGELOG.md` and any release-facing claims in `README.md`. The changelog version, Git tag,
   and GitHub release must agree exactly; this repository starts with `v0.1.0`.
6. Push commits and tags using the bot identity wrapper supplied by
   `https://github.com/beyond10x/atlas`. Do not encode a machine-specific cross-repository path in
   repository files.
7. Wait for the real GitHub Pages workflow, verify its conclusion and deployed URL, and make an HTTP
   request to the public site. A local build alone is not publication evidence.

The Pages workflow is the publication boundary. Keep repository contents read-only by default, grant
`pages: write` and `id-token: write` only to the deploy job, pin actions to immutable revisions, do not
persist checkout credentials, and do not run privileged deployment workflows on untrusted pull
requests.

### Public-surface editorial rules

The repository filename is not the reader’s title. Every Markdown document published through the site
must provide a concise human-readable title and description; timestamped research notes must also have
a sidebar label that states the question or subject without requiring the reader to decode the slug.

Entry pages assume no knowledge of Atlas, harness internals, workflow vocabulary, or maturity labels.
Define a project-specific term on first use, state the current evidence posture in plain language, and
offer a short path to the catalog, method, strongest result, and underlying evidence. Surface challenged
claims before positive claims and otherwise make the most developed relevant evidence easy to find.

Navigation and summaries are projections, not a second research corpus. Principle claims and maturity
remain sourced from `docs/principles.json`; research findings remain in `docs/research/`; public cards
and landing pages link to those sources instead of silently restating or strengthening them.

## Planning artifacts

Plan items are markdown files under `.engineering/planning/<kind>/<slug>.md`: YAML frontmatter the
`aep` CLI owns, and a body the agent and operator own. The repository-local planning skill at
`.agents/skills/planning/SKILL.md` carries the full model and store conventions.

### Ask the CLI; do not recite the vocabulary

Kinds, relations, statuses, and legal moves come from validated lifecycle documents. Discover them
when needed instead of copying them into prose:

| Question | Command |
|---|---|
| What kinds can I create? | `aep artifact kinds` |
| What edges exist between artifacts? | `aep artifact relations` |
| What statuses and moves does a kind have? | `aep artifact lifecycle <kind>` |
| What is already in the store? | `aep artifact list [--kind k] [--status s] [--format json]` |
| What does it look like as a board? | `aep artifact board [--kind k]` |
| How is it wired together? | `aep artifact graph` |

Before the first planning-store write of a session, run `aep artifact list` and
`aep artifact kinds`.

### Planning guardrails

1. **A status changes only through `aep artifact move`.** Never edit `status:` directly. The
   CLI validates the move against the kind's lifecycle.
2. **Never edit a planning-store file directly.** Use `aep artifact new` for creation,
   `relate` for relations, `move` for status, and `body <id> --from <path|->` for prose.
3. **After a batch, run `aep artifact validate` and relay its output verbatim.** It accumulates
   defects and its detailed output is the useful result.
4. **A refusal is an answer.** Relay the legal moves the CLI names. Do not route around a refusal or
   silently walk through an intermediate state.
5. **An already-satisfied or actively wrong request still gets an artifact.** Record the finding and
   its evidence, plus the actual gap if one exists, instead of leaving only a conversational decline.

New artifacts start in the lifecycle's initial state. Creating an artifact and replacing its body
through the CLI are reversible and need no confirmation beyond the request that prompted them.
Lifecycle moves are claims about project state: propose them and wait for the operator, unless the
operator already requested the specific move. Never infer a bulk move.

`protocol` must be on `PATH`. If it is absent, do not improvise machine-owned frontmatter.

## Project schema contracts

`.engineering/project.yaml` names the project-owned JSON Schema registry; its `schemas: schemas`
entry resolves to `.engineering/schemas`. JSON Schema is the only authored runtime contract. Each
schema's absolute `$id` is its identity and instances select it with `schema`.

Use `ess schema validate … --schemas .engineering/schemas` for structural validation and
`ess schema typescript … --schemas .engineering/schemas` for a
deterministic consumer projection. Do not add repository-local validators or handwritten copies of
generated types. The repository skill at `.agents/skills/schema-contracts/SKILL.md` carries the full
workflow.
