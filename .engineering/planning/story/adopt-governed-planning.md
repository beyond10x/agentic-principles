---
format: aep.planning-md/1
id: story:adopt-governed-planning
kind: story
status: draft
title: Adopt the engineering-protocols planning store
summary: Install the Codex planning skill and manage this repository through validated planning artifacts.
relations:
- derived_from: epic:research-operating-system
revision: 1
---
# Story: Adopt the Engineering Protocols planning store

## Outcome

An agent working in this repository manages plans and decisions through a lifecycle-validated local
store instead of reconstructing project state from conversation.

## Context

This is the first story under `epic:research-operating-system`. The Codex planning integration is
shipped by Engineering Protocols, but it requires both its skill instructions and a `protocol` CLI
that can load the same document tree as the store.

## Acceptance

`.agents/skills/planning/` contains the installed skill and reference; `AGENTS.md` carries the
always-on guardrails; `.engineering/project.yaml` names a globally identified `git+ssh` repository at
one full commit and carries no cross-repository path; a known lifecycle is constrained rather than
permissive; the cached revision remains usable without SSH; and `protocol artifact validate` reports
the complete store valid.

## Out of Scope

Marketplace installation, Codex hooks, a Codex transcript adapter, lifecycle status promotion, and
automatic execution through `protocol drive`.

## Open Questions

- Operator: when to advance the pinned upstream commit. Any update is an explicit project-file change
  whose new document tree must validate before it replaces the current source.
