#!/usr/bin/env python3
"""Compare run-wide halt with capability-scoped continuation under partial failure."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parent
SCENARIOS = ROOT / "scenarios.json"
RESULTS = ROOT / "results.json"


def load_scenarios() -> list[dict[str, Any]]:
    document = json.loads(SCENARIOS.read_text(encoding="utf-8"))
    return document["scenarios"]


def validate_graph(scenario: dict[str, Any]) -> None:
    task_ids = [task["id"] for task in scenario["tasks"]]
    if len(task_ids) != len(set(task_ids)):
        raise ValueError(f"{scenario['id']}: duplicate task id")

    known: set[str] = set()
    for task in scenario["tasks"]:
        unknown = set(task["deps"]) - set(task_ids)
        if unknown:
            raise ValueError(f"{scenario['id']}:{task['id']}: unknown deps {sorted(unknown)}")
        if not set(task["deps"]).issubset(known):
            raise ValueError(f"{scenario['id']}:{task['id']}: tasks are not topologically ordered")
        known.add(task["id"])


def task_valid_during_outage(
    task: dict[str, Any], unavailable: set[str], tainted: set[str]
) -> bool:
    return (
        not (set(task["capabilities"]) & unavailable)
        and not task.get("wait_for_recovery")
        and not (set(task["deps"]) & tainted)
    )


def task_declared_runnable(task: dict[str, Any], unavailable: set[str]) -> bool:
    capabilities = task.get("declared_capabilities", task["capabilities"])
    wait_for_recovery = task.get(
        "declared_wait_for_recovery", task.get("wait_for_recovery")
    )
    return not (set(capabilities) & unavailable) and not wait_for_recovery


def run_policy(scenario: dict[str, Any], policy: str) -> dict[str, Any]:
    unavailable = set(scenario["outage_capabilities"])
    tasks = scenario["tasks"]
    completed: set[str] = set()
    trusted: set[str] = set()
    tainted: set[str] = set()
    outage_decisions: list[dict[str, Any]] = []

    if policy != "global-halt":
        made_progress = True
        while made_progress:
            made_progress = False
            for task in tasks:
                task_id = task["id"]
                if task_id in completed or not set(task["deps"]).issubset(completed):
                    continue

                valid = task_valid_during_outage(task, unavailable, tainted)
                if policy == "scoped-continuation" and not task_declared_runnable(task, unavailable):
                    continue

                completed.add(task_id)
                if valid:
                    trusted.add(task_id)
                else:
                    tainted.add(task_id)
                outage_decisions.append(
                    {
                        "task": task_id,
                        "valid": valid,
                        "weight": task["weight"],
                    }
                )
                made_progress = True

    recovery_decisions: list[str] = []
    if policy == "naive-continuation":
        completed = set(trusted)
    else:
        trusted = set(completed)

    made_progress = True
    while made_progress:
        made_progress = False
        for task in tasks:
            task_id = task["id"]
            if task_id in completed or not set(task["deps"]).issubset(completed):
                continue
            completed.add(task_id)
            trusted.add(task_id)
            recovery_decisions.append(task_id)
            made_progress = True

    if len(completed) != len(tasks):
        missing = [task["id"] for task in tasks if task["id"] not in completed]
        raise AssertionError(f"{scenario['id']}:{policy}: incomplete after recovery: {missing}")

    return {
        "policy": policy,
        "outage_useful_weight": sum(
            decision["weight"] for decision in outage_decisions if decision["valid"]
        ),
        "outage_executions": [decision["task"] for decision in outage_decisions],
        "invalid_executions": [
            decision["task"] for decision in outage_decisions if not decision["valid"]
        ],
        "rework_count": len(tainted),
        "recovery_decisions": recovery_decisions,
        "completed_after_recovery": len(completed),
    }


def run_experiment() -> dict[str, Any]:
    scenarios = load_scenarios()
    results: list[dict[str, Any]] = []
    for scenario in scenarios:
        validate_graph(scenario)
        results.append(
            {
                "id": scenario["id"],
                "domain": scenario["domain"],
                "class": scenario["class"],
                "task_count": len(scenario["tasks"]),
                "policies": [
                    run_policy(scenario, policy)
                    for policy in ("global-halt", "scoped-continuation", "naive-continuation")
                ],
            }
        )

    return {
        "schema": "urn:beyond10x:agentic-principles:schema:partial-failure-results:1",
        "scenario_count": len(results),
        "results": results,
    }


def by_policy(result: dict[str, Any], policy: str) -> dict[str, Any]:
    return next(item for item in result["policies"] if item["policy"] == policy)


def verify(document: dict[str, Any]) -> None:
    class_counts = {name: 0 for name in ("beneficial", "all-blocked", "safety-boundary")}
    planted_unsafe_detections = 0

    for result in document["results"]:
        class_counts[result["class"]] += 1
        global_halt = by_policy(result, "global-halt")
        scoped = by_policy(result, "scoped-continuation")
        naive = by_policy(result, "naive-continuation")

        assert global_halt["outage_useful_weight"] == 0, result["id"]
        assert not global_halt["invalid_executions"], result["id"]
        assert not scoped["invalid_executions"], result["id"]
        assert scoped["rework_count"] == 0, result["id"]
        assert scoped["completed_after_recovery"] == result["task_count"], result["id"]
        assert global_halt["completed_after_recovery"] == result["task_count"], result["id"]

        if result["class"] == "beneficial":
            assert scoped["outage_useful_weight"] > global_halt["outage_useful_weight"], result["id"]
            assert len(scoped["recovery_decisions"]) < len(global_halt["recovery_decisions"]), result["id"]
        elif result["class"] == "all-blocked":
            assert scoped["outage_useful_weight"] == 0, result["id"]
            assert not scoped["outage_executions"], result["id"]
        elif result["class"] == "safety-boundary":
            assert scoped["outage_useful_weight"] > 0, result["id"]
            assert naive["invalid_executions"], result["id"]
            planted_unsafe_detections += len(naive["invalid_executions"])

    assert class_counts == {"beneficial": 4, "all-blocked": 4, "safety-boundary": 4}
    assert planted_unsafe_detections > 0, "unsafe control was not detected"


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--verify", action="store_true", help="assert the preregistered conditions")
    parser.add_argument("--write-results", action="store_true", help="write deterministic results.json")
    args = parser.parse_args()

    document = run_experiment()
    if args.verify:
        verify(document)
    if args.write_results:
        RESULTS.write_text(json.dumps(document, indent=2) + "\n", encoding="utf-8")

    summary = {
        "scenario_count": document["scenario_count"],
        "scoped_outage_useful_weight": sum(
            by_policy(result, "scoped-continuation")["outage_useful_weight"]
            for result in document["results"]
        ),
        "scoped_invalid_executions": sum(
            len(by_policy(result, "scoped-continuation")["invalid_executions"])
            for result in document["results"]
        ),
        "naive_invalid_executions_detected": sum(
            len(by_policy(result, "naive-continuation")["invalid_executions"])
            for result in document["results"]
        ),
        "verified": args.verify,
    }
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
