import type { LibraryItem } from "./types";

/** Temporary project for this itinerary only; never written to the public library. */
export function createCustomProject(name: string): LibraryItem | null {
  const trimmed = name.trim();
  if (!trimmed) return null;
  return {
    id: "custom-" + crypto.randomUUID(),
    name: trimmed,
    keywords: [trimmed],
    kind: "景点",
    duration: "",
    description: "",
  };
}

export function isCustomProject(item: { id: string }) {
  return item.id.startsWith("custom-");
}
