"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AccommodationRecord, AttractionRecord, ItineraryRecord } from "@/lib/xingcheng/types";
import { createClient } from "@/lib/supabase/client";
import { logAdminActivity, slugify } from "@/lib/admin/media";
import { EmptyState } from "@/components/admin/AdminUI";

export function ItinerariesManager({ initial }: { initial: ItineraryRecord[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [item.name, item.cities, item.slug].some((v) => v.toLowerCase().includes(q)),
    );
  }, [items, query]);

  const togglePublish = async (item: ItineraryRecord) => {
    setBusyId(item.id);
    try {
      const supabase = createClient();
      const published = !item.published;
      const { error } = await supabase.from("itineraries").update({ published }).eq("id", item.id);
      if (error) throw error;
      setItems((current) => current.map((row) => (row.id === item.id ? { ...row, published } : row)));
      await logAdminActivity({
        entity_type: "itinerary",
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

  const remove = async (item: ItineraryRecord) => {
    if (!confirm(`确定删除行程「${item.name}」？`)) return;
    setBusyId(item.id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("itineraries").delete().eq("id", item.id);
      if (error) throw error;
      setItems((current) => current.filter((row) => row.id !== item.id));
      await logAdminActivity({
        entity_type: "itinerary",
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

  const duplicate = async (item: ItineraryRecord) => {
    setBusyId(item.id);
    try {
      const supabase = createClient();
      const { data: fullDays, error: daysError } = await supabase
        .from("itinerary_days")
        .select("*, itinerary_day_attractions(*)")
        .eq("itinerary_id", item.id)
        .order("sort_order", { ascending: true });
      if (daysError) throw daysError;

      const newSlug = `${item.slug}-copy-${Date.now().toString(36).slice(-4)}`;
      const { data: created, error: createError } = await supabase
        .from("itineraries")
        .insert({
          name: `${item.name}（副本）`,
          slug: newSlug,
          days_count: item.days_count,
          cities: item.cities,
          cover_image_url: item.cover_image_url,
          summary: item.summary,
          fee_included: item.fee_included,
          fee_excluded: item.fee_excluded,
          published: false,
          sort_order: item.sort_order + 1,
        })
        .select("*")
        .single();
      if (createError) throw createError;

      for (const day of fullDays || []) {
        const { data: newDay, error: dayErr } = await supabase
          .from("itinerary_days")
          .insert({
            itinerary_id: created.id,
            day_number: day.day_number,
            title: day.title,
            breakfast: day.breakfast,
            lunch: day.lunch,
            dinner: day.dinner,
            accommodation_id: day.accommodation_id,
            lodging_label: day.lodging_label,
            transport: day.transport,
            activities: day.activities,
            notes: day.notes,
            sort_order: day.sort_order,
            published: true,
          })
          .select("id")
          .single();
        if (dayErr) throw dayErr;

        const attractions = (day.itinerary_day_attractions || []).map(
          (row: { attraction_id: string | null; custom_text: string | null; show_photo: boolean; sort_order: number }, index: number) => ({
            itinerary_day_id: newDay.id,
            attraction_id: row.attraction_id,
            custom_text: row.custom_text,
            show_photo: row.show_photo,
            sort_order: row.sort_order ?? index,
            published: true,
          }),
        );
        if (attractions.length) {
          const { error: attrErr } = await supabase.from("itinerary_day_attractions").insert(attractions);
          if (attrErr) throw attrErr;
        }
      }

      await logAdminActivity({
        entity_type: "itinerary",
        entity_id: created.id,
        entity_name: created.name,
        action: "复制",
        summary: `来自 ${item.name}`,
      });
      setMessage("已复制行程模板");
      router.refresh();
      router.push(`/admin/itineraries/${created.id}`);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "复制失败");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-4">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="按名称 / 线路搜索"
        className="sm:max-w-sm"
      />
      {message ? <p className="text-sm text-[#8b3e2f]">{message}</p> : null}
      {filtered.length ? (
        <div className="panel overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>行程</th>
                <th>天数</th>
                <th>线路</th>
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
                  <td>{item.days_count} 天</td>
                  <td>{item.cities || "—"}</td>
                  <td>
                    <span className={`badge ${item.published ? "badge-on" : "badge-off"}`}>
                      {item.published ? "已发布" : "已隐藏"}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <Link href={`/admin/itineraries/${item.id}`}>编辑</Link>
                      <button type="button" disabled={busyId === item.id} onClick={() => duplicate(item)}>
                        复制
                      </button>
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
        <EmptyState text="暂无行程模板。可新建，或将前台制作好的行程保存为模板。" />
      )}
    </div>
  );
}

export type DayDraft = {
  key: string;
  day_number: number;
  title: string;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  accommodation_id: string;
  lodging_label: string;
  transport: string;
  activities: string;
  notes: string;
  attractions: Array<{
    key: string;
    attraction_id: string;
    custom_text: string;
    show_photo: boolean;
  }>;
};

export function createEmptyDay(dayNumber: number): DayDraft {
  return {
    key: `day-${dayNumber}-${Math.random().toString(36).slice(2, 7)}`,
    day_number: dayNumber,
    title: `第${dayNumber}天`,
    breakfast: dayNumber > 1,
    lunch: false,
    dinner: false,
    accommodation_id: "",
    lodging_label: "不住宿",
    transport: "",
    activities: "",
    notes: "",
    attractions: [],
  };
}

export function ItineraryForm({
  initial,
  attractions,
  accommodations,
}: {
  initial?: ItineraryRecord & { days?: DayDraft[] };
  attractions: AttractionRecord[];
  accommodations: AccommodationRecord[];
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [name, setName] = useState(initial?.name || "");
  const [slug, setSlug] = useState(initial?.slug || "");
  const [cities, setCities] = useState(initial?.cities || "");
  const [summary, setSummary] = useState(initial?.summary || "");
  const [feeIncluded, setFeeIncluded] = useState(initial?.fee_included || "");
  const [feeExcluded, setFeeExcluded] = useState(initial?.fee_excluded || "");
  const [coverImageUrl, setCoverImageUrl] = useState(initial?.cover_image_url || "");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [days, setDays] = useState<DayDraft[]>(
    initial?.days?.length ? initial.days : [createEmptyDay(1), createEmptyDay(2), createEmptyDay(3)],
  );
  const [attractionQuery, setAttractionQuery] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [dragDayKey, setDragDayKey] = useState<string | null>(null);
  const [dragAttr, setDragAttr] = useState<{ dayKey: string; attrKey: string } | null>(null);

  const attractionById = useMemo(
    () => Object.fromEntries(attractions.map((a) => [a.id, a])),
    [attractions],
  );

  const renumber = (list: DayDraft[]) =>
    list.map((day, index) => ({
      ...day,
      day_number: index + 1,
      title: day.title.match(/^第\d+天$/) ? `第${index + 1}天` : day.title,
    }));

  const updateDay = (key: string, patch: Partial<DayDraft>) => {
    setDays((current) => current.map((day) => (day.key === key ? { ...day, ...patch } : day)));
  };

  const copyDay = (key: string) => {
    setDays((current) => {
      const source = current.find((d) => d.key === key);
      if (!source) return current;
      const clone: DayDraft = {
        ...source,
        key: `day-copy-${Math.random().toString(36).slice(2, 8)}`,
        attractions: source.attractions.map((a) => ({
          ...a,
          key: `attr-${Math.random().toString(36).slice(2, 8)}`,
        })),
      };
      const index = current.findIndex((d) => d.key === key);
      const next = [...current];
      next.splice(index + 1, 0, clone);
      return renumber(next);
    });
  };

  const removeDay = (key: string) => {
    setDays((current) => renumber(current.filter((d) => d.key !== key)));
  };

  const onDropDay = (targetKey: string) => {
    if (!dragDayKey || dragDayKey === targetKey) return;
    setDays((current) => {
      const next = [...current];
      const from = next.findIndex((d) => d.key === dragDayKey);
      const to = next.findIndex((d) => d.key === targetKey);
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return renumber(next);
    });
    setDragDayKey(null);
  };

  const onDropAttr = (dayKey: string, targetAttrKey: string) => {
    if (!dragAttr || dragAttr.dayKey !== dayKey || dragAttr.attrKey === targetAttrKey) return;
    setDays((current) =>
      current.map((day) => {
        if (day.key !== dayKey) return day;
        const next = [...day.attractions];
        const from = next.findIndex((a) => a.key === dragAttr.attrKey);
        const to = next.findIndex((a) => a.key === targetAttrKey);
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return { ...day, attractions: next };
      }),
    );
    setDragAttr(null);
  };

  const suggestions = (dayKey: string) => {
    const q = (attractionQuery[dayKey] || "").trim().toLowerCase();
    if (!q) return [];
    const used = new Set(days.find((d) => d.key === dayKey)?.attractions.map((a) => a.attraction_id));
    return attractions
      .filter((a) => !used.has(a.id))
      .filter((a) => [a.name, a.city, ...(a.keywords || [])].some((k) => k.toLowerCase().includes(q)))
      .slice(0, 8);
  };

  const previewWord = async () => {
    const { AlignmentType, BorderStyle, Document, Packer, Paragraph, TextRun, Table, TableCell, TableRow, WidthType, ShadingType, TableLayoutType } =
      await import("docx");
    const border = { style: BorderStyle.SINGLE, size: 10, color: "C8B6A4" };
    const zeroSpacing = { before: 0, after: 0, line: 240 };
    const rows = days.map((day) => {
      const names = day.attractions
        .map((a) => (a.attraction_id ? attractionById[a.attraction_id]?.name : a.custom_text) || "")
        .filter(Boolean)
        .join(" → ");
      const meals = [day.breakfast && "早餐", day.lunch && "中餐", day.dinner && "晚餐"].filter(Boolean).join("、") || "不含餐";
      return new TableRow({
        children: [
          new TableCell({
            width: { size: 1200, type: WidthType.DXA },
            borders: { top: border, bottom: border, left: border, right: border },
            children: [new Paragraph({ spacing: zeroSpacing, children: [new TextRun({ text: `D${day.day_number}`, bold: true })] })],
          }),
          new TableCell({
            width: { size: 5200, type: WidthType.DXA },
            borders: { top: border, bottom: border, left: border, right: border },
            children: [new Paragraph({ spacing: zeroSpacing, children: [new TextRun({ text: names || "待安排" })] })],
          }),
          new TableCell({
            width: { size: 1800, type: WidthType.DXA },
            borders: { top: border, bottom: border, left: border, right: border },
            children: [new Paragraph({ spacing: zeroSpacing, children: [new TextRun({ text: meals })] })],
          }),
          new TableCell({
            width: { size: 1800, type: WidthType.DXA },
            borders: { top: border, bottom: border, left: border, right: border },
            children: [new Paragraph({ spacing: zeroSpacing, children: [new TextRun({ text: day.lodging_label || "不住宿" })] })],
          }),
        ],
      });
    });

    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: name || "未命名行程", bold: true, size: 36 })],
            }),
            new Table({
              width: { size: 10000, type: WidthType.DXA },
              layout: TableLayoutType.FIXED,
              columnWidths: [1200, 5200, 1800, 1800],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      columnSpan: 4,
                      width: { size: 10000, type: WidthType.DXA },
                      borders: { top: border, bottom: border, left: border, right: border },
                      shading: { fill: "8B3E2F", type: ShadingType.CLEAR },
                      children: [
                        new Paragraph({
                          children: [new TextRun({ text: "简版行程安排（预览）", bold: true, color: "FFFFFF" })],
                        }),
                      ],
                    }),
                  ],
                }),
                ...rows,
              ],
            }),
          ],
        },
      ],
    });
    const blob = await Packer.toBlob(doc);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(name || "itinerary-preview").replace(/[\\/:*?"<>|]/g, "-")}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const supabase = createClient();
      const itineraryPayload = {
        name: name.trim(),
        slug: (slug.trim() || slugify(name)).slice(0, 80),
        days_count: days.length,
        cities: cities.trim(),
        cover_image_url: coverImageUrl || null,
        summary: summary.trim(),
        fee_included: feeIncluded,
        fee_excluded: feeExcluded,
        published,
        sort_order: Number(sortOrder) || 0,
      };

      let itineraryId = initial?.id;
      if (isEdit && itineraryId) {
        const { error: updateError } = await supabase.from("itineraries").update(itineraryPayload).eq("id", itineraryId);
        if (updateError) throw updateError;
        await supabase.from("itinerary_days").delete().eq("itinerary_id", itineraryId);
      } else {
        const { data, error: insertError } = await supabase.from("itineraries").insert(itineraryPayload).select("id").single();
        if (insertError) throw insertError;
        itineraryId = data.id;
      }

      for (const [index, day] of days.entries()) {
        const { data: dayRow, error: dayError } = await supabase
          .from("itinerary_days")
          .insert({
            itinerary_id: itineraryId,
            day_number: index + 1,
            title: day.title,
            breakfast: day.breakfast,
            lunch: day.lunch,
            dinner: day.dinner,
            accommodation_id: day.accommodation_id || null,
            lodging_label: day.lodging_label || "不住宿",
            transport: day.transport,
            activities: day.activities,
            notes: day.notes,
            sort_order: index,
            published: true,
          })
          .select("id")
          .single();
        if (dayError) throw dayError;

        const attrs = day.attractions
          .filter((a) => a.attraction_id || a.custom_text.trim())
          .map((a, attrIndex) => ({
            itinerary_day_id: dayRow.id,
            attraction_id: a.attraction_id || null,
            custom_text: a.custom_text.trim() || null,
            show_photo: a.show_photo,
            sort_order: attrIndex,
            published: true,
          }));
        if (attrs.length) {
          const { error: attrError } = await supabase.from("itinerary_day_attractions").insert(attrs);
          if (attrError) throw attrError;
        }
      }

      await logAdminActivity({
        entity_type: "itinerary",
        entity_id: itineraryId,
        entity_name: itineraryPayload.name,
        action: isEdit ? "更新" : "新增",
      });
      router.push("/admin/itineraries");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="panel field-grid cols-2">
        <label>
          <span>行程名称</span>
          <input
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!isEdit && !slug) setSlug(slugify(e.target.value));
            }}
          />
        </label>
        <label>
          <span>唯一 slug</span>
          <input required value={slug} onChange={(e) => setSlug(e.target.value)} />
        </label>
        <label>
          <span>适用城市/线路</span>
          <input value={cities} onChange={(e) => setCities(e.target.value)} placeholder="西安-华山" />
        </label>
        <label>
          <span>封面图片 URL</span>
          <input value={coverImageUrl} onChange={(e) => setCoverImageUrl(e.target.value)} placeholder="可选" />
        </label>
        <label>
          <span>排序</span>
          <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
        </label>
        <label className="flex items-end gap-2 pb-2">
          <input type="checkbox" className="!w-auto" checked={published} onChange={(e) => setPublished(e.target.checked)} />
          <span className="!mb-0">发布</span>
        </label>
        <label className="sm:col-span-2">
          <span>行程简介</span>
          <textarea rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
        </label>
        <label>
          <span>费用包含</span>
          <textarea rows={4} value={feeIncluded} onChange={(e) => setFeeIncluded(e.target.value)} />
        </label>
        <label>
          <span>费用不含</span>
          <textarea rows={4} value={feeExcluded} onChange={(e) => setFeeExcluded(e.target.value)} />
        </label>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="ghost-btn"
          onClick={() => setDays((current) => renumber([...current, createEmptyDay(current.length + 1)]))}
        >
          添加一天
        </button>
        <button type="button" className="ghost-btn" onClick={previewWord}>
          预览 Word 导出
        </button>
      </div>

      {days.map((day) => (
        <article
          key={day.key}
          className="panel"
          draggable
          onDragStart={() => setDragDayKey(day.key)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDropDay(day.key)}
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="drag-handle">⋮⋮</span>
              <strong>
                Day {day.day_number} · {day.title}
              </strong>
            </div>
            <div className="row-actions">
              <button type="button" onClick={() => copyDay(day.key)}>
                复制当天
              </button>
              <button type="button" className="danger" onClick={() => removeDay(day.key)} disabled={days.length <= 1}>
                删除当天
              </button>
            </div>
          </div>

          <div className="field-grid cols-2">
            <label>
              <span>当天标题</span>
              <input value={day.title} onChange={(e) => updateDay(day.key, { title: e.target.value })} />
            </label>
            <label>
              <span>住宿（下拉关联）</span>
              <select
                value={day.accommodation_id}
                onChange={(e) => {
                  const id = e.target.value;
                  const acc = accommodations.find((a) => a.id === id);
                  updateDay(day.key, {
                    accommodation_id: id,
                    lodging_label: acc?.name || "不住宿",
                  });
                }}
              >
                <option value="">不住宿 / 手动填写</option>
                {accommodations.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name}（{acc.city}）
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>住宿显示文案</span>
              <input value={day.lodging_label} onChange={(e) => updateDay(day.key, { lodging_label: e.target.value })} />
            </label>
            <div className="flex flex-wrap items-end gap-3 pb-2">
              {[
                ["breakfast", "早餐"],
                ["lunch", "中餐"],
                ["dinner", "晚餐"],
              ].map(([key, label]) => (
                <label key={key} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="!w-auto"
                    checked={Boolean(day[key as "breakfast" | "lunch" | "dinner"])}
                    onChange={(e) => updateDay(day.key, { [key]: e.target.checked } as Partial<DayDraft>)}
                  />
                  <span className="!mb-0">{label}</span>
                </label>
              ))}
            </div>
            <label>
              <span>交通</span>
              <input value={day.transport} onChange={(e) => updateDay(day.key, { transport: e.target.value })} />
            </label>
            <label>
              <span>活动</span>
              <input value={day.activities} onChange={(e) => updateDay(day.key, { activities: e.target.value })} />
            </label>
            <label className="sm:col-span-2">
              <span>备注</span>
              <input value={day.notes} onChange={(e) => updateDay(day.key, { notes: e.target.value })} />
            </label>
          </div>

          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">当天景区 / 服务</p>
            {day.attractions.map((attr) => (
              <div
                key={attr.key}
                className="flex flex-col gap-2 rounded-lg border border-[#efe6da] p-2 sm:flex-row sm:items-center"
                draggable
                onDragStart={() => setDragAttr({ dayKey: day.key, attrKey: attr.key })}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDropAttr(day.key, attr.key)}
              >
                <span className="drag-handle">⋮⋮</span>
                <div className="flex-1 text-sm">
                  {attr.attraction_id
                    ? attractionById[attr.attraction_id]?.name || attr.attraction_id
                    : attr.custom_text || "临时文本"}
                </div>
                <label className="flex items-center gap-1 text-xs">
                  <input
                    type="checkbox"
                    className="!w-auto"
                    checked={attr.show_photo}
                    onChange={(e) =>
                      updateDay(day.key, {
                        attractions: day.attractions.map((a) =>
                          a.key === attr.key ? { ...a, show_photo: e.target.checked } : a,
                        ),
                      })
                    }
                  />
                  配图
                </label>
                <button
                  type="button"
                  className="danger"
                  onClick={() =>
                    updateDay(day.key, {
                      attractions: day.attractions.filter((a) => a.key !== attr.key),
                    })
                  }
                >
                  移除
                </button>
              </div>
            ))}

            <div className="relative">
              <input
                value={attractionQuery[day.key] || ""}
                onChange={(e) => setAttractionQuery((c) => ({ ...c, [day.key]: e.target.value }))}
                placeholder="搜索景区并添加，或输入后按回车添加临时文本"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const text = (attractionQuery[day.key] || "").trim();
                    if (!text) return;
                    updateDay(day.key, {
                      attractions: [
                        ...day.attractions,
                        {
                          key: `attr-${Math.random().toString(36).slice(2, 8)}`,
                          attraction_id: "",
                          custom_text: text,
                          show_photo: false,
                        },
                      ],
                    });
                    setAttractionQuery((c) => ({ ...c, [day.key]: "" }));
                  }
                }}
              />
              {(attractionQuery[day.key] || "").trim() && (
                <div className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-[#e2d6c6] bg-white shadow">
                  {suggestions(day.key).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className="block w-full px-3 py-2 text-left text-sm hover:bg-[#f7f1e8]"
                      onClick={() => {
                        updateDay(day.key, {
                          attractions: [
                            ...day.attractions,
                            {
                              key: `attr-${Math.random().toString(36).slice(2, 8)}`,
                              attraction_id: item.id,
                              custom_text: "",
                              show_photo: Boolean(item.image_url),
                            },
                          ],
                        });
                        setAttractionQuery((c) => ({ ...c, [day.key]: "" }));
                      }}
                    >
                      {item.name}
                      <span className="ml-2 text-xs text-[#8a8076]">{item.city}</span>
                    </button>
                  ))}
                  {!suggestions(day.key).length ? (
                    <p className="px-3 py-2 text-xs text-[#8a8076]">无匹配，回车可添加临时文本</p>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </article>
      ))}

      {error ? <p className="text-sm text-[#9b2c2c]">{error}</p> : null}
      <div className="flex flex-wrap gap-2">
        <button type="submit" className="primary-btn" disabled={saving}>
          {saving ? "保存中…" : "保存行程模板"}
        </button>
        <button type="button" className="ghost-btn" onClick={() => router.push("/admin/itineraries")}>
          取消
        </button>
      </div>
    </form>
  );
}
