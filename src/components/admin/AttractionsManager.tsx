"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AttractionRecord } from "@/lib/xingcheng/types";
import { createClient } from "@/lib/supabase/client";
import { logAdminActivity } from "@/lib/admin/media";
import { EmptyState } from "@/components/admin/AdminUI";

export function AttractionsManager({ initial }: { initial: AttractionRecord[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [item.name, item.city, item.province, item.region || "", item.slug].some((v) =>
        v.toLowerCase().includes(q),
      ),
    );
  }, [items, query]);

  const togglePublish = async (item: AttractionRecord) => {
    setBusyId(item.id);
    try {
      const supabase = createClient();
      const published = !item.published;
      const { error } = await supabase.from("attractions").update({ published }).eq("id", item.id);
      if (error) throw error;
      setItems((current) => current.map((row) => (row.id === item.id ? { ...row, published } : row)));
      await logAdminActivity({
        entity_type: "attraction",
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

  const remove = async (item: AttractionRecord) => {
    if (!confirm(`确定删除「${item.name}」？`)) return;
    setBusyId(item.id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("attractions").delete().eq("id", item.id);
      if (error) throw error;
      setItems((current) => current.filter((row) => row.id !== item.id));
      await logAdminActivity({
        entity_type: "attraction",
        entity_id: item.id,
        entity_name: item.name,
        action: "删除",
      });
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "删除失败");
    } finally {
      setBusyId(null);
    }
  };

  const move = async (item: AttractionRecord, direction: -1 | 1) => {
    const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order);
    const index = sorted.findIndex((row) => row.id === item.id);
    const swap = sorted[index + direction];
    if (!swap) return;
    setBusyId(item.id);
    try {
      const supabase = createClient();
      await Promise.all([
        supabase.from("attractions").update({ sort_order: swap.sort_order }).eq("id", item.id),
        supabase.from("attractions").update({ sort_order: item.sort_order }).eq("id", swap.id),
      ]);
      setItems((current) =>
        current.map((row) => {
          if (row.id === item.id) return { ...row, sort_order: swap.sort_order };
          if (row.id === swap.id) return { ...row, sort_order: item.sort_order };
          return row;
        }),
      );
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "排序失败");
    } finally {
      setBusyId(null);
    }
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attractions-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (file: File | null) => {
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as AttractionRecord[];
      if (!Array.isArray(parsed)) throw new Error("JSON 须为数组");
      const supabase = createClient();
      const rows = parsed.map((item, index) => ({
        slug: item.slug,
        name: item.name,
        province: item.province || "陕西",
        city: item.city || "西安",
        region: item.region || null,
        category: item.category || "其他",
        kind: item.kind || "景点",
        description: item.description || "",
        duration: item.duration || "",
        open_hours_note: item.open_hours_note || "",
        seasonal_note: item.seasonal_note || "",
        keywords: item.keywords || [],
        image_url: item.image_url || null,
        image_credit: item.image_credit || "",
        image_license_source: item.image_license_source || "",
        published: item.published ?? true,
        sort_order: item.sort_order ?? index + 1,
      }));
      const { error } = await supabase.from("attractions").upsert(rows, { onConflict: "slug" });
      if (error) throw error;
      setMessage(`已导入 ${rows.length} 条景区`);
      router.refresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "导入失败");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="按名称 / 地区搜索"
          className="sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          <button type="button" className="ghost-btn" onClick={exportJson}>
            导出 JSON
          </button>
          <label className="ghost-btn cursor-pointer">
            导入 JSON
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => importJson(e.target.files?.[0] || null)}
            />
          </label>
        </div>
      </div>

      {message ? <p className="text-sm text-[#8b3e2f]">{message}</p> : null}

      {filtered.length ? (
        <div className="panel overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>排序</th>
                <th>名称</th>
                <th>地区</th>
                <th>分类</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name, "zh"))
                .map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="row-actions">
                        <button type="button" disabled={busyId === item.id} onClick={() => move(item, -1)}>
                          ↑
                        </button>
                        <button type="button" disabled={busyId === item.id} onClick={() => move(item, 1)}>
                          ↓
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-[#8a8076]">{item.slug}</div>
                    </td>
                    <td>
                      {item.province}
                      {item.city ? ` · ${item.city}` : ""}
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <span className={`badge ${item.published ? "badge-on" : "badge-off"}`}>
                        {item.published ? "已发布" : "已隐藏"}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <Link href={`/admin/attractions/${item.id}`}>编辑</Link>
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
        <EmptyState text="没有匹配的景区，或尚未导入数据。" />
      )}
    </div>
  );
}
