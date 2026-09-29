import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { type DayDraft, ItineraryForm } from "@/components/admin/ItineraryForm";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import { fallbackAttractionRecords } from "@/lib/xingcheng/mappers";
import { fallbackAccommodations } from "@/data/xingcheng/accommodations";
import type { AccommodationRecord, AttractionRecord, ItineraryRecord } from "@/lib/xingcheng/types";

type Props = { params: Promise<{ id: string }> };

export default async function EditItineraryPage({ params }: Props) {
  const { id } = await params;
  const supabase = await tryCreateServerSupabaseClient();
  if (!supabase) notFound();

  const { data: itinerary, error } = await supabase.from("itineraries").select("*").eq("id", id).maybeSingle();
  if (error || !itinerary) notFound();

  const [{ data: days }, { data: attractionsData }, { data: accommodationsData }] = await Promise.all([
    supabase
      .from("itinerary_days")
      .select("*, itinerary_day_attractions(*)")
      .eq("itinerary_id", id)
      .order("sort_order", { ascending: true }),
    supabase.from("attractions").select("*").order("sort_order").order("name"),
    supabase.from("accommodations").select("*").order("sort_order").order("name"),
  ]);

  const dayDrafts: DayDraft[] = (days || []).map((day) => ({
    key: day.id,
    day_number: day.day_number,
    title: day.title,
    breakfast: day.breakfast,
    lunch: day.lunch,
    dinner: day.dinner,
    accommodation_id: day.accommodation_id || "",
    lodging_label: day.lodging_label || "不住宿",
    transport: day.transport || "",
    activities: day.activities || "",
    notes: day.notes || "",
    attractions: [...(day.itinerary_day_attractions || [])]
      .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order)
      .map((attr: {
        id: string;
        attraction_id: string | null;
        custom_text: string | null;
        show_photo: boolean;
      }) => ({
        key: attr.id,
        attraction_id: attr.attraction_id || "",
        custom_text: attr.custom_text || "",
        show_photo: attr.show_photo,
      })),
  }));

  return (
    <div>
      <AdminPageHeader title="编辑行程模板" description={(itinerary as ItineraryRecord).name} />
      <ItineraryForm
        initial={{ ...(itinerary as ItineraryRecord), days: dayDrafts }}
        attractions={
          (attractionsData?.length ? attractionsData : fallbackAttractionRecords) as AttractionRecord[]
        }
        accommodations={
          (accommodationsData?.length ? accommodationsData : fallbackAccommodations) as AccommodationRecord[]
        }
      />
    </div>
  );
}
