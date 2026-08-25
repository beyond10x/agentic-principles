---
format: aep.planning-md/1
id: architecture-decision-record:vendor-engineering-protocols
kind: architecture-decision-record
status: rejected
title: Vendor a pinned engineering-protocols document tree
summary: Use a repository-local governed spec tree with globally identified upstream provenance.
relations:
- decides: epic:research-operating-system
revision: 2
---
# ADR: Vendor a pinned Engineering Protocols document tree

## Status

Rejected by the operator on 2026-08-25. The CLI recorded the `proposed -> rejected` transition as
revision 2.

## Context

At the time of the proposal, `protocol artifact` resolved its store from the project but independently
defaulted its governing document root to `.`. In a consumer repository, the default therefore became
permissive and allowed every lifecycle move.

A relative cross-repository path also fails to give the protocol snapshot a stable identity. The
`protocols` field is a filesystem path and cannot currently resolve a URL or URN.

## Rejected proposal

Vendor the upstream protocol document tree into this repository as one pinned set. Record its global
URN, canonical Git URL, and exact commit in `.engineering/protocol-source.yaml`; point the executable
project path at the repository-local tree.

## Reason for rejection

Vendoring the tree treated a shared loader defect as adopter architecture. It copied unrelated
profiles, drivers, principles, workflows, and protocol documents into the repository, exposed the
loader's directory convention at the top level, and reduced the pressure to correct the component
that caused the failure. That is technical debt, not a repository design.

## Resolution actually taken

`engineering-protocols` now makes artifact lifecycle and template discovery honor the `protocols`
path in the discovered `.engineering/project.yaml`; an explicit `--root` still overrides it. A
regression test covers lifecycle selection, template selection, nested-directory discovery, invalid
unrelated project documents, and explicit-root precedence. The full upstream gate passed before the
corrected CLI was reinstalled.

`engineering-protocols` now also types `protocols` as either a filesystem tree or an immutable Git
source. A `git+ssh://...#<full-commit>` source is materialized in a URL-hashed cache and verified at
the declared revision. This repository therefore names the globally stable repository and revision
directly in `.engineering/project.yaml`; it carries neither a checkout path nor a companion mapping
file. Its own research workflow lives separately under `.engineering/research-tree/`.

## Alternatives

- **Relative sibling path:** rejected because repository location is not identity and default artifact
  commands do not follow it for lifecycles.
- **Absolute filesystem path:** rejected as the durable representation because it is unique only on
  one machine and cannot travel with the repository.
- **Pinned Git URL directly in `protocols`:** selected. The domain model distinguishes repository
  sources from paths, and the engine resolves the immutable revision to a cached local tree at the
  filesystem boundary.
- **Always pass `--root`:** rejected as the main guard because omission silently selects a permissive
  lifecycle; a safety property should not depend on remembering an optional flag.
- **Patch the upstream CLI:** selected after the defect was reproduced and bounded with a regression
  test. The shared component is owned in this workspace and its complete gate establishes the
  compatibility evidence required for this change.

## Consequences

None of the proposed vendoring consequences were accepted. The temporary copied directories were
removed after the source repair and are recoverable from the trash or the pinned upstream revision.
