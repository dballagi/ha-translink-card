import { describe, expect, it } from "vitest";

describe("departure time arithmetic", () => {
  it("uses real date differences across an hour boundary", () => {
    const now = new Date("2026-10-06T10:58:00-07:00").getTime();
    const departure = new Date("2026-10-06T11:03:00-07:00").getTime();
    expect(Math.round((departure - now) / 60_000)).toBe(5);
  });
});
