#!/usr/bin/env python3
"""Project gated principle transfer packages into a harness context document.

The output of this projector is an ordinary file. An operator passes it to a run with
`harness --context <file>`, where it becomes one `ProvidedContext` layer at `Operator` trust with
its path rendered as the layer source. No harness change, contract version, or flag is required, so
nothing here is ambient: the operator names the file on the command line.

A context layer is billed on every turn of a run and compaction cannot reclaim it, so the set of
principles that may reach a run is deliberately small and gated:

1. `PROJECTABLE_MATURITIES` is a module constant with no command-line override. A principle below
   the candidate bar has no code path to a document. `docs/index.mdx` states the responsible use of
   a seed as "Generate a research question; do not turn it into policy"; projecting one into an
   agent loop would contradict that, so the refusal is structural rather than advisory.
2. A `candidate` or `supported` principle with no transfer package is refused. This is what makes
   the maturity label cost something.
3. The claim statement in a package must be a verbatim quotation of its cited research note. Per
   AGENTS.md "Navigation and summaries are projections, not a second research corpus", a projection
   may not strengthen a claim; a statement that has drifted from its source is refused.
4. Structural validation is delegated to `ess schema validate`, the same tool CI uses. If `ess` is
   absent the projector fails closed rather than projecting unvalidated documents.

`challenged`, `revised` and `retired` are not projectable. They are not "above candidate" on the
lifecycle chain seed -> hypothesis -> candidate -> supported; they are labels for a principle whose
standing is in flux or ended, and a run should not be told to weigh one.

Determinism: identical inputs produce identical bytes. Nothing here reads the clock, the
environment, or an unordered collection.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path
from typing import Any, NamedTuple

TOOLS = Path(__file__).resolve().parent
ROOT = TOOLS.parent
REGISTRY = ROOT / "docs" / "principles.json"
PACKAGES = ROOT / "docs" / "transfer-packages"
SCHEMAS = ROOT / ".engineering" / "schemas"
FIXTURES = TOOLS / "fixtures" / "gate-proof"
DEFAULT_OUT = ROOT / "build" / "harness-context"

PACKAGE_SCHEMA = "urn:beyond10x:agentic-principles:schema:transfer-package:1"
REGISTRY_SCHEMA = "urn:beyond10x:agentic-principles:schema:registry:1"

# The injection bar. Not a flag, not an argument, not read from a file.
PROJECTABLE_MATURITIES = ("candidate", "supported")

MATURITY_NOTE = {
    "candidate": (
        "A candidate principle has defined scope, supporting evidence, counter-pressure and an "
        "operational consequence. It has not survived independent empirical falsification and is "
        "not supported."
    ),
    "supported": (
        "A supported principle has survived serious attempts at falsification and is supported by "
        "more than one independent source of evidence, including empirical evidence relevant to "
        "its intended domain."
    ),
}


class Refusal(NamedTuple):
    principle: str
    code: str
    reason: str

    def render(self) -> str:
        return f"refused {self.principle}: {self.reason} [{self.code}]"


class Projection(NamedTuple):
    principle: str
    document: str

    @property
    def bytes_(self) -> bytes:
        return self.document.encode("utf-8")

    @property
    def digest(self) -> str:
        return hashlib.sha256(self.bytes_).hexdigest()


def read_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8"))


def ess_validate(paths: list[Path]) -> tuple[int, str]:
    """Delegate structural validation to the project's schema tool."""
    executable = shutil.which("ess")
    if executable is None:
        raise SystemExit(
            "ess is not on PATH; refusing to project unvalidated documents. "
            "Install ess-cli as .github/workflows/pages.yml does."
        )
    completed = subprocess.run(
        [executable, "schema", "validate", *[str(path) for path in paths], "--schemas", str(SCHEMAS)],
        capture_output=True,
        text=True,
        check=False,
    )
    return completed.returncode, (completed.stdout + completed.stderr).strip()


def normalize_prose(text: str) -> str:
    """Flatten wrapped Markdown prose so a quotation can be checked against its source."""
    lines = [re.sub(r"^\s*>+\s?", "", line) for line in text.splitlines()]
    return re.sub(r"\s+", " ", " ".join(lines)).strip()


def gate(
    entry: dict[str, Any],
    packages_dir: Path,
    root: Path,
) -> tuple[Projection | None, Refusal | None]:
    principle = entry["id"]
    maturity = entry["maturity"]

    if maturity not in PROJECTABLE_MATURITIES:
        return None, Refusal(
            principle,
            "maturity_below_bar",
            f"maturity '{maturity}' is below the projection bar "
            f"({' or '.join(PROJECTABLE_MATURITIES)}); a principle at this label generates a "
            f"research question, it does not enter an agent loop",
        )

    package_path = packages_dir / f"{principle}.json"
    if not package_path.is_file():
        return None, Refusal(
            principle,
            "no_transfer_package",
            f"maturity '{maturity}' requires a transfer package; none at "
            f"{package_path.relative_to(root) if package_path.is_relative_to(root) else package_path}",
        )

    code, report = ess_validate([package_path])
    if code != 0:
        return None, Refusal(
            principle,
            "package_invalid",
            f"transfer package failed ess schema validate: {report.splitlines()[-1] if report else code}",
        )

    package = read_json(package_path)
    if package.get("schema") != PACKAGE_SCHEMA:
        return None, Refusal(principle, "package_invalid", "transfer package selects another schema")
    if package.get("principle") != principle:
        return None, Refusal(
            principle,
            "principle_id_mismatch",
            f"transfer package declares principle '{package.get('principle')}'",
        )

    quoted_from = root / package["claim"]["quotedFrom"]
    if not quoted_from.is_file():
        return None, Refusal(
            principle,
            "quote_source_missing",
            f"claim cites {package['claim']['quotedFrom']}, which does not exist",
        )
    if normalize_prose(package["claim"]["statement"]) not in normalize_prose(
        quoted_from.read_text(encoding="utf-8")
    ):
        return None, Refusal(
            principle,
            "claim_not_quoted",
            f"claim statement is not a verbatim quotation of {package['claim']['quotedFrom']}; a "
            f"projection may not restate or strengthen a claim",
        )

    return Projection(principle, render(entry, package)), None


def render(entry: dict[str, Any], package: dict[str, Any]) -> str:
    """Render one context document. Order is document order; nothing is sorted or timestamped."""
    maturity = entry["maturity"]
    claim = package["claim"]
    out: list[str] = []

    out.append(f"# {entry['id']} — {entry['title']}")
    out.append("")
    out.append(
        f"Maturity: {maturity} (lifecycle: seed -> hypothesis -> candidate -> supported). "
        f"{MATURITY_NOTE[maturity]}"
    )
    out.append("")
    out.append(
        "This document states when the principle applies and when it does not. It is not an "
        "instruction to apply it, and it does not override the run's own objective, authority, or "
        "operator instructions."
    )
    out.append("")
    out.append(f"Claim and maturity: docs/principles.json. Study: {claim['quotedFrom']}.")
    out.append(f"Transfer package: docs/transfer-packages/{entry['id']}.json (updated {package['updated']}).")
    out.append("")

    out.append("## Claim")
    out.append("")
    out.append(f"Registry claim: {entry['claim']}")
    out.append("")
    out.append(f"As stated in the study: {claim['statement']}")
    out.append("")

    out.append("## Mechanism")
    out.append("")
    out.append(package["mechanism"])
    out.append("")

    out.append("## Confidence")
    out.append("")
    for axis in package["confidence"]:
        out.append(f"- {axis['axis']}: {axis['level']} — {axis['basis']}")
    out.append("")

    out.append("## Applies when")
    out.append("")
    out.extend(f"- {line}" for line in package["conditions"]["appliesWhen"])
    out.append("")

    out.append("## Halt instead when")
    out.append("")
    out.extend(f"- {line}" for line in package["conditions"]["haltWhen"])
    out.append("")

    out.append("## Continuing does not mean")
    out.append("")
    out.extend(f"- {line}" for line in package["conditions"]["doesNotMean"])
    out.append("")

    out.append("## Counterevidence")
    out.append("")
    for item in package["counterevidence"]:
        out.append(f"- [{item['kind']}] {item['statement']} ({item['source']})")
    out.append("")

    out.append("## Caveats")
    out.append("")
    out.extend(f"- {line}" for line in package["caveats"])
    out.append("")

    out.append("## What would weaken this principle")
    out.append("")
    out.extend(f"- {line}" for line in package["falsifier"]["weakenedIf"])
    out.append("")

    out.append("## If this run contradicts the principle")
    out.append("")
    out.append(
        "Report the contradiction to the operator with the run identifier and what was observed. "
        f"It returns to {package['returnPath']['originatingRun']} as research input, recorded as "
        "follows."
    )
    out.append("")
    out.append(f"- Outcome: {package['returnPath']['recordOutcomeAs']}")
    out.append(f"- Contradiction: {package['returnPath']['contradictionBecomes']}")

    return "\n".join(out) + "\n"


def project(
    registry_path: Path,
    packages_dir: Path,
    root: Path,
    ids: list[str] | None = None,
) -> tuple[list[Projection], list[Refusal]]:
    registry = read_json(registry_path)
    if registry.get("schema") != REGISTRY_SCHEMA:
        raise SystemExit(f"{registry_path} does not select {REGISTRY_SCHEMA}")

    entries = registry["principles"]
    if ids is not None:
        known = {entry["id"] for entry in entries}
        unknown = [identifier for identifier in ids if identifier not in known]
        if unknown:
            raise SystemExit(f"not in {registry_path}: {', '.join(unknown)}")
        entries = [entry for entry in entries if entry["id"] in ids]

    projections: list[Projection] = []
    refusals: list[Refusal] = []
    for entry in entries:
        projection, refusal = gate(entry, packages_dir, root)
        if projection is not None:
            projections.append(projection)
        if refusal is not None:
            refusals.append(refusal)
    return projections, refusals


# --- gate proofs -------------------------------------------------------------------------------


def verify() -> None:
    """Prove each gate fires against planted fixtures. A gate that cannot fail is not a gate."""
    checks: list[str] = []

    fixture_registry = FIXTURES / "registry.json"
    fixture_packages = FIXTURES / "packages"

    _, refusals = project(fixture_registry, fixture_packages, ROOT)
    by_id = {refusal.principle: refusal for refusal in refusals}

    # 1. A seed is refused even though a well-formed transfer package exists for it.
    assert (fixture_packages / "AP-901.json").is_file(), "fixture AP-901 package is missing"
    assert "AP-901" in by_id, "a seed principle was not refused"
    assert by_id["AP-901"].code == "maturity_below_bar", by_id["AP-901"]
    checks.append(by_id["AP-901"].render())

    # 2. A candidate with no transfer package is refused.
    assert not (fixture_packages / "AP-902.json").exists(), "fixture AP-902 must have no package"
    assert "AP-902" in by_id, "a candidate without a transfer package was not refused"
    assert by_id["AP-902"].code == "no_transfer_package", by_id["AP-902"]
    checks.append(by_id["AP-902"].render())

    # 3. A candidate whose package strengthens the claim beyond its cited source is refused.
    assert "AP-903" in by_id, "a drifted claim quotation was not refused"
    assert by_id["AP-903"].code == "claim_not_quoted", by_id["AP-903"]
    checks.append(by_id["AP-903"].render())

    # 4. The real registry projects exactly the principles at or above the bar, and does so
    #    byte-identically on repeated runs.
    first, real_refusals = project(REGISTRY, PACKAGES, ROOT)
    second, _ = project(REGISTRY, PACKAGES, ROOT)
    assert first, "nothing projected from the real registry"
    assert [p.principle for p in first] == [p.principle for p in second]
    for left, right in zip(first, second):
        assert left.bytes_ == right.bytes_, f"{left.principle} is not byte-stable"
    projected = ", ".join(f"{p.principle} sha256:{p.digest} {len(p.bytes_)} bytes" for p in first)
    checks.append(f"projected twice, identical bytes: {projected}")
    assert len(real_refusals) == len(read_json(REGISTRY)["principles"]) - len(first)
    checks.append(f"refused from the real registry: {len(real_refusals)}")

    # 5. A malformed transfer package fails the project's own validator, and the projector refuses
    #    to render it rather than trusting its own reader.
    malformed = FIXTURES / "malformed" / "AP-904.json"
    code, report = ess_validate([malformed])
    assert code != 0, "ess schema validate accepted a malformed transfer package"
    checks.append(f"ess schema validate {malformed.relative_to(ROOT)} exited {code}")
    with tempfile.TemporaryDirectory() as staging:
        staged = Path(staging)
        (staged / "AP-904.json").write_text(malformed.read_text(encoding="utf-8"), encoding="utf-8")
        entry = {"id": "AP-904", "title": "Planted malformed package", "maturity": "candidate"}
        _, refusal = gate(entry, staged, ROOT)
        assert refusal is not None and refusal.code == "package_invalid", refusal
        checks.append(refusal.render())

    for line in checks:
        print(f"ok  {line}")
    print(f"ok  {len(checks)} gate proofs fired")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("ids", nargs="*", help="principle ids to project; default is the whole registry")
    parser.add_argument("--out", type=Path, default=DEFAULT_OUT, help="directory for the documents")
    parser.add_argument("--registry", type=Path, default=REGISTRY)
    parser.add_argument("--packages", type=Path, default=PACKAGES)
    parser.add_argument("--verify", action="store_true", help="prove the gates fire and exit")
    args = parser.parse_args()

    if args.verify:
        verify()
        return 0

    requested = args.ids or None
    projections, refusals = project(args.registry, args.packages, ROOT, requested)

    args.out.mkdir(parents=True, exist_ok=True)
    written = []
    for projection in projections:
        target = args.out / f"{projection.principle}.md"
        target.write_bytes(projection.bytes_)
        written.append(
            {
                "principle": projection.principle,
                "path": str(target),
                "bytes": len(projection.bytes_),
                "sha256": projection.digest,
            }
        )

    print(
        json.dumps(
            {
                "projected": written,
                "refused": [
                    {"principle": r.principle, "code": r.code, "reason": r.reason} for r in refusals
                ],
            },
            indent=2,
        )
    )
    for refusal in refusals:
        print(refusal.render(), file=sys.stderr)

    if requested and refusals:
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
