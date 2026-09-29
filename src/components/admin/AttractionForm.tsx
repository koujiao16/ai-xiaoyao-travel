"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ATTRACTION_CATEGORIES } from "@/lib/xingcheng/mappers";
import type { AttractionRecord } from "@/lib/xingcheng/types";
import { createClient } from "@/lib/supabase/client";
import {
  deleteMediaByUrl,
  formatUnknownError,
  logAdminActivity,
  slugify,
  uploadMediaFile,
} from "@/lib/admin/media";

type FormState = {
  name: string;
  slug: string;
  province: string;
  city: string;
  region: string;
  category: string;
  kind: "景点" | "服务";
  description: string;
  duration: string;
  open_hours_note: string;
  seasonal_note: string;
  keywords: string;
  image_url: string;
  image_credit: string;
  image_license_source: string;
  published: boolean;
  sort_order: number;
};

function toForm(record?: Partial<AttractionRecord> | null): FormState {
  return {
    name: record?.name || "",
    slug: record?.slug || "",
    province: record?.province || "陕西",
    city: record?.city || "西安",
    region: record?.region || "",
    category: record?.category || "其他",
    kind: record?.kind || "景点",
    description: record?.description || "",
    duration: record?.duration || "",
    open_hours_note: record?.open_hours_note || "",
    seasonal_note: record?.seasonal_note || "",
    keywords: (record?.keywords || []).join("、"),
    image_url: record?.image_url || "",
    image_credit: record?.image_credit || "",
    image_license_source: record?.image_license_source || "",
    published: record?.published ?? true,
    sort_order: record?.sort_order ?? 0,
  };
}

export function AttractionForm({ initial }: { initial?: AttractionRecord | null }) {
  const router = useRouter();
  const [form, setForm] = useState(() => toForm(initial));
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreview, setPendingPreview] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [previewBroken, setPreviewBroken] = useState(false);
  const isEdit = Boolean(initial?.id);

  useEffect(() => {
    return () => {
      if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    };
  }, [pendingPreview]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "name" && !isEdit && !current.slug) {
        next.slug = slugify(String(value));
      }
      return next;
    });
  };

  const previewSrc = pendingPreview || form.image_url;

  const payloadBase = useMemo(
    () => ({
      name: form.name.trim(),
      slug: form.slug.trim() || slugify(form.name),
      province: form.province.trim(),
      city: form.city.trim(),
      region: form.region.trim() || null,
      category: form.category,
      kind: form.kind,
      description: form.description.trim(),
      duration: form.duration.trim(),
      open_hours_note: form.open_hours_note.trim(),
      seasonal_note: form.seasonal_note.trim(),
      keywords: form.keywords
        .split(/[,，、\n]/)
        .map((x) => x.trim())
        .filter(Boolean),
      image_credit: form.image_credit.trim(),
      image_license_source: form.image_license_source.trim(),
      published: form.published,
      sort_order: Number(form.sort_order) || 0,
    }),
    [form],
  );

  const onPickFile = (file: File | null) => {
    setError("");
    setPreviewBroken(false);
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("仅支持 JPG、PNG、WebP");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("图片过大，请选择 8MB 以内的图片");
      return;
    }
    if (pendingPreview) URL.revokeObjectURL(pendingPreview);
    setPendingFile(file);
    setPendingPreview(URL.createObjectURL(file));
  };

  const clearImage = async () => {
    setError("");
    try {
      if (pendingPreview) URL.revokeObjectURL(pendingPreview);
      setPendingFile(null);
      setPendingPreview("");
      if (form.image_url) {
        await deleteMediaByUrl(form.image_url);
        setField("image_url", "");
      }
      setPreviewBroken(false);
    } catch (err) {
      setError(formatUnknownError(err, "删除图片失败"));
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (form.image_url.startsWith("blob:")) {
        throw new Error("图片尚未上传到 Storage，请重新选择图片后保存");
      }

      const supabase = createClient();
      let attractionId = initial?.id || "";
      let imageUrl = form.image_url || null;

      if (isEdit && initial) {
        const { error: updateError } = await supabase
          .from("attractions")
          .update({ ...payloadBase, image_url: imageUrl })
          .eq("id", initial.id);
        if (updateError) throw updateError;
        attractionId = initial.id;
      } else {
        const { data, error: insertError } = await supabase
          .from("attractions")
          .insert({ ...payloadBase, image_url: null })
          .select("id")
          .single();
        if (insertError) throw insertError;
        attractionId = data.id;
      }

      if (pendingFile) {
        try {
          const uploaded = await uploadMediaFile(pendingFile, {
            entityType: "attractions",
            entityId: attractionId,
            replaceUrl: imageUrl,
          });
          imageUrl = uploaded.publicUrl;
          const { error: imageUpdateError } = await supabase
            .from("attractions")
            .update({ image_url: imageUrl })
            .eq("id", attractionId);
          if (imageUpdateError) throw imageUpdateError;
          setField("image_url", imageUrl);
          setPendingFile(null);
          if (pendingPreview) URL.revokeObjectURL(pendingPreview);
          setPendingPreview("");
        } catch (uploadErr) {
          throw new Error(
            `景区已保存，但图片上传失败：${formatUnknownError(uploadErr)}。请重新选择图片后再保存。`,
          );
        }
      }

      await logAdminActivity({
        entity_type: "attraction",
        entity_id: attractionId,
        entity_name: payloadBase.name,
        action: isEdit ? "更新" : "新增",
        summary: pendingFile ? "含图片上传" : undefined,
      });

      router.push("/admin/attractions");
      router.refresh();
    } catch (err) {
      setError(formatUnknownError(err, "保存失败"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="panel space-y-4" onSubmit={onSubmit}>
      <div className="field-grid cols-2">
        <label>
          <span>名称</span>
          <input required value={form.name} onChange={(e) => setField("name", e.target.value)} />
        </label>
        <label>
          <span>唯一 ID / slug</span>
          <input required value={form.slug} onChange={(e) => setField("slug", e.target.value)} />
        </label>
        <label>
          <span>所属省份</span>
          <input value={form.province} onChange={(e) => setField("province", e.target.value)} />
        </label>
        <label>
          <span>所属城市</span>
          <input value={form.city} onChange={(e) => setField("city", e.target.value)} />
        </label>
        <label>
          <span>地区备注</span>
          <input value={form.region} onChange={(e) => setField("region", e.target.value)} />
        </label>
        <label>
          <span>分类</span>
          <select value={form.category} onChange={(e) => setField("category", e.target.value)}>
            {ATTRACTION_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>类型</span>
          <select value={form.kind} onChange={(e) => setField("kind", e.target.value as "景点" | "服务")}>
            <option value="景点">景点</option>
            <option value="服务">服务</option>
          </select>
        </label>
        <label>
          <span>推荐游览时长</span>
          <input value={form.duration} onChange={(e) => setField("duration", e.target.value)} placeholder="约2小时" />
        </label>
        <label>
          <span>开放时间备注</span>
          <input value={form.open_hours_note} onChange={(e) => setField("open_hours_note", e.target.value)} />
        </label>
        <label>
          <span>适游季节备注</span>
          <input value={form.seasonal_note} onChange={(e) => setField("seasonal_note", e.target.value)} placeholder="春季限定" />
        </label>
        <label>
          <span>排序</span>
          <input type="number" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} />
        </label>
        <label className="flex items-end gap-2 pb-2">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setField("published", e.target.checked)}
            className="!w-auto"
          />
          <span className="!mb-0">发布（前台可见）</span>
        </label>
      </div>

      <label>
        <span>关键词（用顿号/逗号分隔）</span>
        <input value={form.keywords} onChange={(e) => setField("keywords", e.target.value)} />
      </label>

      <label>
        <span>景区描述</span>
        <textarea required rows={6} value={form.description} onChange={(e) => setField("description", e.target.value)} />
      </label>

      <div className="field-grid cols-2">
        <div>
          <span className="mb-1 block text-xs text-[#7a7168]">
            景区图片（选择后点保存才会上传到 Storage；JPG/PNG/WebP → 1600×960 WebP）
          </span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => onPickFile(e.target.files?.[0] || null)}
          />
          <div className="mt-3 flex items-start gap-3">
            {previewSrc && !previewBroken ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewSrc}
                alt="预览"
                className="thumb !h-24 !w-40"
                onError={() => setPreviewBroken(true)}
              />
            ) : (
              <div className="flex h-24 w-40 items-center justify-center rounded bg-[#efe6da] text-xs text-[#8a8076]">
                无图 / 文字兜底
              </div>
            )}
            <div className="space-y-2">
              <button type="button" className="ghost-btn" disabled={!previewSrc || saving} onClick={clearImage}>
                删除图片
              </button>
              <p className="text-xs text-[#8a8076]">
                {pendingFile
                  ? `待上传：${pendingFile.name}（保存后写入 Storage）`
                  : form.image_url
                    ? form.image_url
                    : "尚未上传"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <label>
            <span>图片署名</span>
            <input value={form.image_credit} onChange={(e) => setField("image_credit", e.target.value)} />
          </label>
          <label>
            <span>授权来源</span>
            <input value={form.image_license_source} onChange={(e) => setField("image_license_source", e.target.value)} />
          </label>
        </div>
      </div>

      {error ? <p className="text-sm text-[#9b2c2c]">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <button type="submit" className="primary-btn" disabled={saving}>
          {saving ? "保存中…" : "保存"}
        </button>
        <button type="button" className="ghost-btn" onClick={() => router.push("/admin/attractions")}>
          取消
        </button>
      </div>
    </form>
  );
}
