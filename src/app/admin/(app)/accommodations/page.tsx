import { AdminButton, AdminPageHeader } from "@/components/admin/AdminUI";
import { AccommodationsManager } from "@/components/admin/AccommodationsManager";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import { fallbackAccommodations } from "@/data/xingcheng/accommodations";
import type { AccommodationRecord } from "@/lib/xingcheng/types";

export default async function AccommodationsAdminPage() {
  const supabase = await tryCreateServerSupabaseClient();
  let items: AccommodationRecord[] = [];
  if (supabase) {
    const { data, error } = await supabase
      .from("accommodations")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (!error && data) items = data as AccommodationRecord[];
  }
  if (!items.length) items = fallbackAccommodations;

  return (
    <div>
      <AdminPageHeader
        title="住宿管理"
        description="维护酒店/住宿信息与图片。"
        actions={<AdminButton href="/admin/accommodations/new">新增住宿</AdminButton>}
      />
      <AccommodationsManager initial={items} />
    </div>
  );
}
