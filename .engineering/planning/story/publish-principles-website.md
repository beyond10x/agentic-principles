---
format: aep.planning-md/1
id: story:publish-principles-website
kind: story
status: draft
title: Publish the agentic principles website
summary: Create a polished Docusaurus site that exposes the research corpus and current principle maturity.
relations:
- derived_from: epic:research-operating-system
revision: 1
---
# Story: Publish the agentic principles website

## Outcome

Researchers, operators, and product engineers can browse the vision, evidence, and current principles
through a clear, polished documentation site without confusing research maturity levels.

## Context

The corpus already includes broad research seeds, a workflow-fit analysis, and incident-derived
principle work, but discovery currently requires reading filenames in the repository. The website
should expose the existing Markdown rather than create a second research source of truth.

## Acceptance

- A Docusaurus TypeScript project exists at `website/` and builds successfully with its locked
  dependencies.
- The home page explains the mission, method, intended product domains, and current evidence posture.
- A principle catalog lists every explicitly named current principle, its maturity, its normative
  claim, and a link to the supporting research note.
- Root `docs/` content is rendered directly or linked canonically; research prose is not copied into a
  competing website-owned corpus.
- The layout is responsive, keyboard-usable, readable in light and dark modes, and visually distinct
  without relying on remote runtime assets.
- Navigation exposes the vision, principles, research notes, GitHub repository, and methodology.

## Out of Scope

Hosting, DNS, analytics, a CMS, authentication, and automatic promotion of principle maturity are not
included. A successful local production build does not claim that the site is deployed.

## Open Questions

- Deployment target and public visibility are operator decisions after local review.
- A future structured principle registry may replace the initial catalog when the lifecycle needs
  machine-enforced promotion.
