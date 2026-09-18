---
format: aep.planning-md/1
id: story:project-transfer-package-into-harness-context
kind: story
status: draft
title: Project a gated transfer package into a harness context document
summary: Render a candidate-or-above principle carrying a package into one deterministic, digest-identified context document.
relations:
- derived_from: epic:research-operating-system
- depends_on: story:principle-transfer-package-contract
revision: 1
---
# Story: Project a gated transfer package into a harness context document

## Outcome

A principle reaches a running agent only when the evidence behind it has cleared a bar that costs
something, the document it reaches by is deterministic and identifiable, and a product result can be
correlated back to the research run that produced it.

## Context

`tools/project_harness_context.py` renders one gated principle into one context document. The
operator passes it with `harness --context <file>`, where it becomes a single provided-context layer
at operator trust with its path as the source. No harness change, contract version, or flag was
needed, and nothing is ambient: the operator names the file on the command line.

The bar is `candidate` or `supported` **and** a valid transfer package. It is a module constant with
no command-line override, so a principle below it has no code path to a document at all. `docs/index.mdx`
already publishes the responsible use of a seed — generate a research question; do not turn it into
policy — and projecting one into an agent loop would contradict that, so the refusal is structural
rather than advisory. `challenged`, `revised` and `retired` are not projectable either: they are not
stages above `candidate`, they label a principle whose standing is in flux or ended.

Today AP-011 is the only principle that clears the bar; the other ten are seeds and are refused by
name.

The bar has a price attached, and the price is the reason it is not "all principles". The projected
document is 6,848 bytes, roughly 1.7k tokens, and a context layer is billed on every turn of a run
and cannot be reclaimed by compaction. A hundred-turn run pays it a hundred times. Projecting all
eleven would cost roughly an order of magnitude more per turn for ten claims the evidence does not
support.

The correlation key is the sha256 of the projected document. It covers the registry entry and the
package together, so it names the exact claim, maturity label and package revision a run carried. A
result returns as a dated note under `docs/research/` recording the run identifier, model, harness
and configuration version, that digest, and the package's evaluation measures; its conclusion then
becomes a citation on the package. A contradiction becomes a counterevidence citation plus a new
research run — the originating run stays closed, and maturity moves only through a reviewable
synthesis decision, never automatically from a product result.

## Acceptance

- Projection is deterministic: identical inputs produce identical bytes, with nothing read from the
  clock, the environment, or an unordered collection.
- Structural validation is delegated to `ess schema validate`, the same tool CI uses; if `ess` is
  absent the projector fails closed rather than projecting an unvalidated document.
- A projected document may not restate or strengthen a claim: a claim statement that is not a
  verbatim quotation of its cited study is refused.
- `python3 tools/project_harness_context.py --verify` proves each refusal fires against planted
  fixtures, and `.github/workflows/pages.yml` runs it on every pull request.
- The per-turn cost of the projected layer and the correlation key are recorded where a reader finds
  them, not only in the projector's source.

## Out of Scope

Changing `harness` or `metaharness`, driving a harness run from this repository, promoting a
principle on the strength of a product result, and projecting anything below the bar.

## Open Questions

- Whether a run should ever carry more than one principle at once is unanswered, and stays
  unanswered until a second principle clears the bar; the per-turn cost is the constraint that
  decides it.
