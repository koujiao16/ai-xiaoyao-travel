import { AdminButton, AdminPageHeader } from "@/components/admin/AdminUI";
import { ItinerariesManager } from "@/components/admin/ItineraryForm";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import type { ItineraryRecord } from "@/lib/xingcheng/types";

export default async function ItinerariesAdminPage() {
  const supabase = await tryCreateServerSupabaseClient();
  let items: ItineraryRecord[] = [];
  if (supabase) {
    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("updated_at", { ascending: false });
    if (!error && data) items = data as ItineraryRecord[];
  }

  return (
    <div>
      <AdminPageHeader
        title="行程模板"
        description="新建、复制、发布行程模板；可预览 Word 导出效果。"
        actions={<AdminButton href="/admin/itineraries/new">新建行程</AdminButton>}
      />
      <ItinerariesManager initial={items} />
    </div>
  );
}
