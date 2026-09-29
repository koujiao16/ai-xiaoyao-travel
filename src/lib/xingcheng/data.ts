import { fallbackAccommodations, fallbackLodgingLabels, NO_LODGING_LABEL } from "@/data/xingcheng/accommodations";
import { fallbackLibrary } from "@/data/xingcheng/library";
import { attractionRecordToLibraryItem, fallbackAttractionRecords } from "@/lib/xingcheng/mappers";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import { tryCreateClient } from "@/lib/supabase/client";
import type {
  AccommodationRecord,
  AttractionRecord,
  FullItinerary,
  ItineraryRecord,
  LibraryItem,
} from "@/lib/xingcheng/types";

async function getReadableClient() {
  if (typeof window === "undefined") {
    return tryCreateServerSupabaseClient();
  }
  return tryCreateClient();
}

export async function fetchPublishedAttractions(): Promise<AttractionRecord[]> {
  try {
    const supabase = await getReadableClient();
    if (!supabase) return fallbackAttractionRecords;
    const { data, error } = await supabase
      .from("attractions")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error || !data?.length) return fallbackAttractionRecords;
    return data as AttractionRecord[];
  } catch {
    return fallbackAttractionRecords;
  }
}

export async function fetchPublishedLibrary(): Promise<LibraryItem[]> {
  const records = await fetchPublishedAttractions();
  if (!records.length) return fallbackLibrary;
  return records.map(attractionRecordToLibraryItem);
}

export async function fetchPublishedAccommodations(): Promise<AccommodationRecord[]> {
  try {
    const supabase = await getReadableClient();
    if (!supabase) return fallbackAccommodations;
    const { data, error } = await supabase
      .from("accommodations")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (error || !data?.length) return fallbackAccommodations;
    return data as AccommodationRecord[];
  } catch {
    return fallbackAccommodations;
  }
}

export async function fetchLodgingLabels(): Promise<string[]> {
  const accommodations = await fetchPublishedAccommodations();
  const names = accommodations.map((item) => item.name);
  const unique = Array.from(new Set([...names, ...fallbackLodgingLabels.filter((x) => x !== NO_LODGING_LABEL)]));
  return [...unique, NO_LODGING_LABEL];
}

export async function fetchPublishedItineraries(): Promise<ItineraryRecord[]> {
  try {
    const supabase = await getReadableClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false });
    if (error || !data) return [];
    return data as ItineraryRecord[];
  } catch {
    return [];
  }
}

export async function fetchFullItinerary(idOrSlug: string): Promise<FullItinerary | null> {
  try {
    const supabase = await getReadableClient();
    if (!supabase) return null;

    const byId = idOrSlug.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    );
    let query = supabase.from("itineraries").select("*");
    query = byId ? query.eq("id", idOrSlug) : query.eq("slug", idOrSlug);
    const { data: itinerary, error } = await query.maybeSingle();
    if (error || !itinerary) return null;

    const { data: days } = await supabase
      .from("itinerary_days")
      .select("*")
      .eq("itinerary_id", itinerary.id)
      .order("sort_order", { ascending: true })
      .order("day_number", { ascending: true });

    const dayIds = (days || []).map((d) => d.id);
    const { data: dayAttractions } = dayIds.length
      ? await supabase
          .from("itinerary_day_attractions")
          .select("*")
          .in("itinerary_day_id", dayIds)
          .order("sort_order", { ascending: true })
      : { data: [] as never[] };

    const attractionIds = [...new Set((dayAttractions || []).map((a) => a.attraction_id).filter(Boolean))];
    const accommodationIds = [...new Set((days || []).map((d) => d.accommodation_id).filter(Boolean))];

    const [{ data: attractions }, { data: accommodations }] = await Promise.all([
      attractionIds.length
        ? supabase.from("attractions").select("*").in("id", attractionIds as string[])
        : Promise.resolve({ data: [] as AttractionRecord[] }),
      accommodationIds.length
        ? supabase.from("accommodations").select("*").in("id", accommodationIds as string[])
        : Promise.resolve({ data: [] as AccommodationRecord[] }),
    ]);

    const attractionMap = Object.fromEntries((attractions || []).map((a) => [a.id, a]));
    const accommodationMap = Object.fromEntries((accommodations || []).map((a) => [a.id, a]));

    return {
      ...(itinerary as ItineraryRecord),
      days: (days || []).map((day) => ({
        ...day,
        accommodation: day.accommodation_id ? accommodationMap[day.accommodation_id] || null : null,
        day_attractions: (dayAttractions || [])
          .filter((item) => item.itinerary_day_id === day.id)
          .map((item) => ({
            ...item,
            attraction: item.attraction_id ? attractionMap[item.attraction_id] || null : null,
          })),
      })),
    };
  } catch {
    return null;
  }
}

export { NO_LODGING_LABEL, fallbackLodgingLabels };
