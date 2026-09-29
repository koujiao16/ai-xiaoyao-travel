import { AdminPageHeader } from "@/components/admin/AdminUI";
import { ItineraryForm } from "@/components/admin/ItineraryForm";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import { fallbackAttractionRecords } from "@/lib/xingcheng/mappers";
import { fallbackAccommodations } from "@/data/xingcheng/accommodations";
import type { AccommodationRecord, AttractionRecord } from "@/lib/xingcheng/types";

export default async function NewItineraryPage() {
  const supabase = await tryCreateServerSupabaseClient();
  let attractions: AttractionRecord[] = fallbackAttractionRecords;
  let accommodations: AccommodationRecord[] = fallbackAccommodations;

  if (supabase) {
    const [a, b] = await Promise.all([
      supabase.from("attractions").select("*").order("sort_order").order("name"),
      supabase.from("accommodations").select("*").order("sort_order").order("name"),
    ]);
    if (!a.error && a.data?.length) attractions = a.data as AttractionRecord[];
    if (!b.error && b.data?.length) accommodations = b.data as AccommodationRecord[];
  }

  return (
    <div>
      <AdminPageHeader title="新建行程模板" description="从数据库关联景区与住宿，支持拖拽排序与复制。" />
      <ItineraryForm attractions={attractions} accommodations={accommodations} />
    </div>
  );
}
