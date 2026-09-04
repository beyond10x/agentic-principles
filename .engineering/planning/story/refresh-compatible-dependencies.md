---
format: aep.planning-md/1
id: story:refresh-compatible-dependencies
kind: story
status: active
title: Refresh compatible website and workflow dependencies
summary: Upgrade the website compiler and GitHub Actions dependency set together.
relations:
- derived_from: epic:research-operating-system
scope:
- confidence: cited
  path: .github/workflows/b10x-docs-bundle.yml
- confidence: cited
  path: .github/workflows/pages.yml
- confidence: cited
  path: website/package-lock.json
- confidence: cited
  path: website/package.json
- confidence: cited
  path: website/tsconfig.json
revision: 6
---
## Goal

Refresh the Agentic Principles website compiler and GitHub Actions dependencies while keeping schema generation, type checking, and the static site build deterministic.

## Acceptance

Every compatible Agentic Principles upgrade currently proposed by Dependabot is applied together and the repository's schema, typecheck, build, and audit gates pass from the resulting lockfile.

## Scope

- `.github/workflows/pages.yml`
- `website/package.json`
- `website/package-lock.json`

