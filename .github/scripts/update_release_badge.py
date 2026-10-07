from __future__ import annotations

import html
import sys
from pathlib import Path

LABEL_WIDTH = 60
HORIZONTAL_PADDING = 20
GLYPH_WIDTHS = {
    ".": 4,
    "+": 10,
    "-": 5,
    **dict.fromkeys("0123456789", 8),
    **dict.fromkeys("acefijlrstvyz", 7),
    **dict.fromkeys("bdghknopqux", 8),
    "m": 12,
    "w": 11,
    **dict.fromkeys("BCESPTZ", 8),
    **dict.fromkeys("ADGHKNOQRUVXY", 9),
    **dict.fromkeys("FJL", 7),
    "I": 6,
    "M": 10,
    "W": 13,
}
DEFAULT_GLYPH_WIDTH = 8


def value_width(value: str) -> int:
    text_width = sum(
        GLYPH_WIDTHS.get(character, DEFAULT_GLYPH_WIDTH)
        for character in value
    )
    return text_width + HORIZONTAL_PADDING


def badge_svg(tag: str) -> str:
    escaped_tag = html.escape(tag, quote=True)
    value_segment_width = value_width(tag)
    total_width = LABEL_WIDTH + value_segment_width
    value_center = LABEL_WIDTH + value_segment_width / 2
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" '
        f'width="{total_width}" height="28" role="img" '
        f'aria-label="Release: {escaped_tag}">\n'
        f"  <title>Release: {escaped_tag}</title>\n"
        '  <defs><clipPath id="r"><rect '
        f'width="{total_width}" height="28" rx="7"/>'
        "</clipPath></defs>\n"
        '  <g clip-path="url(#r)">\n'
        f'    <rect width="{LABEL_WIDTH}" height="28" fill="#41464D"/>\n'
        f'    <rect x="{LABEL_WIDTH}" width="{value_segment_width}" '
        'height="28" fill="#806695"/>\n'
        "  </g>\n"
        '  <g fill="#F7FAFC" font-family="Verdana,Arial,sans-serif" '
        'font-size="11" font-weight="600" text-anchor="middle">\n'
        '    <text x="30" y="18">Release</text>\n'
        f'    <text x="{value_center:g}" y="18">{escaped_tag}</text>\n'
        "  </g>\n"
        "</svg>\n"
    )


def main() -> None:
    if len(sys.argv) != 2 or not sys.argv[1].strip():
        raise SystemExit("Usage: update_release_badge.py <release-tag>")

    repository = Path(__file__).resolve().parents[2]
    badge = repository / "docs" / "badges" / "releases.svg"
    badge.write_text(badge_svg(sys.argv[1].strip()), encoding="utf-8")


if __name__ == "__main__":
    main()
