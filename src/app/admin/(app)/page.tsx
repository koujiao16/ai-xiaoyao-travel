import { AdminButton, AdminPageHeader, EmptyState, StatCard } from "@/components/admin/AdminUI";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import { fallbackAttractionRecords } from "@/lib/xingcheng/mappers";
import { fallbackAccommodations } from "@/data/xingcheng/accommodations";

export default async function AdminDashboardPage() {
  const supabase = await tryCreateServerSupabaseClient();

  let attractionCount = fallbackAttractionRecords.length;
  let accommodationCount = fallbackAccommodations.length;
  let itineraryCount = 0;
  let activities: Array<{
    id: string;
    created_at: string;
    entity_type: string;
    entity_name: string | null;
    action: string;
    summary: string;
    actor_email: string | null;
  }> = [];
  let usingFallback = true;

  if (supabase) {
    const [a, b, c, logs] = await Promise.all([
      supabase.from("attractions").select("id", { count: "exact", head: true }),
      supabase.from("accommodations").select("id", { count: "exact", head: true }),
      supabase.from("itineraries").select("id", { count: "exact", head: true }),
      supabase
        .from("admin_activity_log")
        .select("id, created_at, entity_type, entity_name, action, summary, actor_email")
        .order("created_at", { ascending: false })
        .limit(8),
    ]);
    if (!a.error) {
      attractionCount = a.count ?? 0;
      usingFallback = false;
    }
    if (!b.error) accommodationCount = b.count ?? 0;
    if (!c.error) itineraryCount = c.count ?? 0;
    if (!logs.error && logs.data) activities = logs.data;
  }

  return (
    <div>
      <AdminPageHeader
        title="后台概览"
        description={
          usingFallback
            ? "当前未连接数据库或表为空，前台仍使用本地兜底数据。"
            : "数据来自 Supabase，前台刷新即可看到已发布内容更新。"
        }
        actions={
          <>
            <AdminButton href="/admin/attractions/new">新增景区</AdminButton>
            <AdminButton href="/admin/accommodations/new" variant="secondary">
              新增住宿
            </AdminButton>
            <AdminButton href="/admin/itineraries/new" variant="secondary">
              新建行程
            </AdminButton>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="景区总数" value={attractionCount} />
        <StatCard label="住宿总数" value={accommodationCount} />
        <StatCard label="行程模板总数" value={itineraryCount} />
      </div>

      <section className="panel mt-6">
        <h2 className="mb-3 text-sm font-semibold">最近编辑记录</h2>
        {activities.length ? (
          <ul className="space-y-3">
            {activities.map((item) => (
              <li key={item.id} className="border-b border-[#efe6da] pb-3 last:border-0 last:pb-0">
                <p className="text-sm font-medium">
                  {item.action} · {item.entity_type}
                  {item.entity_name ? ` · ${item.entity_name}` : ""}
                </p>
                <p className="text-xs text-[#8a8076]">
                  {new Date(item.created_at).toLocaleString("zh-CN")}
                  {item.actor_email ? ` · ${item.actor_email}` : ""}
                  {item.summary ? ` · ${item.summary}` : ""}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState text="暂无编辑记录。保存景区、住宿或行程后会显示在这里。" />
        )}
      </section>
    </div>
  );
}
