"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AccommodationRecord } from "@/lib/xingcheng/types";
import { createClient } from "@/lib/supabase/client";
import { deleteEntityMediaFolder, formatUnknownError, logAdminActivity } from "@/lib/admin/media";
import { EmptyState } from "@/components/admin/AdminUI";

export function AccommodationsManager({ initial }: { initial: AccommodationRecord[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [item.name, item.city, item.district, item.slug].some((v) => v.toLowerCase().includes(q)),
    );
  }, [items, query]);

  const togglePublish = async (item: AccommodationRecord) => {
    setBusyId(item.id);
    try {
      const supabase = createClient();
      const published = !item.published;
      const { error } = await supabase.from("accommodations").update({ published }).eq("id", item.id);
      if (error) throw error;
      setItems((current) => current.map((row) => (row.id === item.id ? { ...row, published } : row)));
      await logAdminActivity({
        entity_type: "accommodation",
        entity_id: item.id,
        entity_name: item.name,
        action: published ? "发布" : "隐藏",
      });
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "操作失败");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (item: AccommodationRecord) => {
    if (!confirm(`确定删除「${item.name}」？`)) return;
    setBusyId(item.id);
    try {
      const supabase = createClient();
      await deleteEntityMediaFolder("accommodations", item.id, item.image_url);
      const { error } = await supabase.from("accommodations").delete().eq("id", item.id);
      if (error) throw error;
      setItems((current) => current.filter((row) => row.id !== item.id));
      await logAdminActivity({
        entity_type: "accommodation",
        entity_id: item.id,
        entity_name: item.name,
        action: "删除",
      });
      router.refresh();
    } catch (err) {
      setMessage(formatUnknownError(err, "删除失败"));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="按名称 / 城市搜索"
        className="sm:max-w-sm"
      />
      {message ? <p className="text-sm text-[#8b3e2f]">{message}</p> : null}
      {filtered.length ? (
        <div className="panel overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>名称</th>
                <th>城市/区域</th>
                <th>类型</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-[#8a8076]">{item.slug}</div>
                  </td>
                  <td>
                    {item.city}
                    {item.district ? ` · ${item.district}` : ""}
                  </td>
                  <td>{item.star_or_type || "—"}</td>
                  <td>
                    <span className={`badge ${item.published ? "badge-on" : "badge-off"}`}>
                      {item.published ? "已发布" : "已隐藏"}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/admin/accommodations/${item.id}`}>编辑</Link>
                      <button type="button" disabled={busyId === item.id} onClick={() => togglePublish(item)}>
                        {item.published ? "隐藏" : "发布"}
                      </button>
                      <button type="button" className="danger" disabled={busyId === item.id} onClick={() => remove(item)}>
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState text="暂无住宿数据。" />
      )}
    </div>
  );
}
