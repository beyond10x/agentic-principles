#!/usr/bin/env python3
"""Challenge scoped continuation with incomplete dependency declarations."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from simulate import run_policy, validate_graph


ROOT = Path(__file__).resolve().parent
CHALLENGES = ROOT / "annotation-challenges.json"
RESULTS = ROOT / "challenge-results.json"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--verify", action="store_true")
    parser.add_argument("--write-results", action="store_true")
    args = parser.parse_args()

    source = json.loads(CHALLENGES.read_text(encoding="utf-8"))
    results = []
    for scenario in source["scenarios"]:
        validate_graph(scenario)
        result = run_policy(scenario, "scoped-continuation")
        results.append(
            {
                "id": scenario["id"],
                "domain": scenario["domain"],
                "invalid_executions": result["invalid_executions"],
                "outage_useful_weight": result["outage_useful_weight"],
            }
        )

    document = {
        "schema": "urn:beyond10x:agentic-principles:schema:partial-failure-challenge-results:1",
        "challenge_count": len(results),
        "results": results,
    }
    if args.verify:
        assert len(results) == 4
        assert all(result["invalid_executions"] for result in results), (
            "annotation challenge failed to expose a hidden dependency"
        )
    if args.write_results:
        RESULTS.write_text(json.dumps(document, indent=2) + "\n", encoding="utf-8")

    print(
        json.dumps(
            {
                "challenge_count": len(results),
                "challenges_with_invalid_execution": sum(
                    bool(result["invalid_executions"]) for result in results
                ),
                "verified": args.verify,
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
