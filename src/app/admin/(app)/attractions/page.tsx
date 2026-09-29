import { AdminButton, AdminPageHeader } from "@/components/admin/AdminUI";
import { AttractionsManager } from "@/components/admin/AttractionsManager";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import { fallbackAttractionRecords } from "@/lib/xingcheng/mappers";
import type { AttractionRecord } from "@/lib/xingcheng/types";

export default async function AttractionsAdminPage() {
  const supabase = await tryCreateServerSupabaseClient();
  let items: AttractionRecord[] = [];
  if (supabase) {
    const { data, error } = await supabase
      .from("attractions")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("name", { ascending: true });
    if (!error && data) items = data as AttractionRecord[];
  }
  if (!items.length) items = fallbackAttractionRecords;

  return (
    <div>
      <AdminPageHeader
        title="景区管理"
        description="维护景区资料、图片与发布状态。未连接数据库时显示本地兜底列表（只读预览）。"
        actions={<AdminButton href="/admin/attractions/new">新增景区</AdminButton>}
      />
      <AttractionsManager initial={items} />
    </div>
  );
}
