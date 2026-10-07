from __future__ import annotations

import json
import re
import sys
from pathlib import Path

SEMANTIC_VERSION = re.compile(
    r"(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)\.(?:0|[1-9]\d*)"
    r"(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?"
)


def replace_once(content: str, pattern: str, replacement: str) -> str:
    updated, count = re.subn(pattern, replacement, content, count=1)
    if count != 1:
        raise ValueError(f"Expected one version field matching {pattern!r}")
    return updated


def set_version(repository: Path, version: str) -> None:
    manifest = (
        repository
        / "custom_components"
        / "translink_schedule"
        / "manifest.json"
    )
    manifest.write_text(
        replace_once(
            manifest.read_text(encoding="utf-8"),
            r'("version":\s*")[^"]+(")',
            rf"\g<1>{version}\g<2>",
        ),
        encoding="utf-8",
    )

    project = repository / "pyproject.toml"
    project.write_text(
        replace_once(
            project.read_text(encoding="utf-8"),
            r'(?m)^version = "[^"]+"$',
            f'version = "{version}"',
        ),
        encoding="utf-8",
    )

    package = repository / "frontend" / "package.json"
    package_data = json.loads(package.read_text(encoding="utf-8"))
    package_data["version"] = version
    package.write_text(
        json.dumps(package_data, indent=2) + "\n",
        encoding="utf-8",
    )

    lockfile = repository / "frontend" / "package-lock.json"
    lockfile_data = json.loads(lockfile.read_text(encoding="utf-8"))
    lockfile_data["version"] = version
    lockfile_data["packages"][""]["version"] = version
    lockfile.write_text(
        json.dumps(lockfile_data, indent=2) + "\n",
        encoding="utf-8",
    )


def main() -> None:
    if len(sys.argv) != 2 or not SEMANTIC_VERSION.fullmatch(sys.argv[1]):
        raise SystemExit(
            "Usage: set_version.py <semantic-version-without-v-prefix>"
        )

    repository = Path(__file__).resolve().parents[2]
    set_version(repository, sys.argv[1])


if __name__ == "__main__":
    main()
