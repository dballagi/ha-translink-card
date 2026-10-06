import type { HomeAssistant } from "./types";

export function findScheduleEntity(
  hass: HomeAssistant,
  entities: string[] = [],
): string | undefined {
  const candidates = [...new Set([...entities, ...Object.keys(hass.states)])];
  return candidates.find((entityId) => {
    const attributes = hass.states[entityId]?.attributes;
    return (
      Array.isArray(attributes?.stops) &&
      Array.isArray(attributes?.departures)
    );
  });
}
