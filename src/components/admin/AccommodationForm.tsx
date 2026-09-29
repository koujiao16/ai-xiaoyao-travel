"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AccommodationRecord } from "@/lib/xingcheng/types";
import { createClient } from "@/lib/supabase/client";
import { deleteMediaByUrl, logAdminActivity, slugify, uploadMediaFile } from "@/lib/admin/media";

type FormState = {
  name: string;
  slug: string;
  city: string;
  district: string;
  star_or_type: string;
  address: string;
  contact: string;
  room_notes: string;
  description: string;
  image_url: string;
  published: boolean;
  sort_order: number;
};

function toForm(record?: Partial<AccommodationRecord> | null): FormState {
  return {
    name: record?.name || "",
    slug: record?.slug || "",
    city: record?.city || "",
    district: record?.district || "",
    star_or_type: record?.star_or_type || "",
    address: record?.address || "",
    contact: record?.contact || "",
    room_notes: record?.room_notes || "",
    description: record?.description || "",
    image_url: record?.image_url || "",
    published: record?.published ?? true,
    sort_order: record?.sort_order ?? 0,
  };
}

export function AccommodationForm({ initial }: { initial?: AccommodationRecord | null }) {
  const router = useRouter();
  const [form, setForm] = useState(() => toForm(initial));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewBroken, setPreviewBroken] = useState(false);
  const isEdit = Boolean(initial?.id);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => {
      const next = { ...current, [key]: value };
      if (key === "name" && !isEdit && !current.slug) next.slug = slugify(String(value));
      return next;
    });
  };

  const payload = useMemo(
    () => ({
      name: form.name.trim(),
      slug: form.slug.trim() || slugify(form.name),
      city: form.city.trim(),
      district: form.district.trim(),
      star_or_type: form.star_or_type.trim(),
      address: form.address.trim(),
      contact: form.contact.trim(),
      room_notes: form.room_notes.trim(),
      description: form.description.trim(),
      image_url: form.image_url || null,
      published: form.published,
      sort_order: Number(form.sort_order) || 0,
    }),
    [form],
  );

  const onUpload = async (file: File | null) => {
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("仅支持 JPG、PNG、WebP");
      return;
    }
    setUploading(true);
    setError("");
    try {
      if (form.image_url?.includes("/storage/v1/object/public/media/")) {
        await deleteMediaByUrl(form.image_url);
      }
      const { publicUrl } = await uploadMediaFile(file, "accommodations");
      setField("image_url", publicUrl);
      setPreviewBroken(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "图片上传失败");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const supabase = createClient();
      if (isEdit && initial) {
        const { error: updateError } = await supabase.from("accommodations").update(payload).eq("id", initial.id);
        if (updateError) throw updateError;
        await logAdminActivity({
          entity_type: "accommodation",
          entity_id: initial.id,
          entity_name: payload.name,
          action: "更新",
        });
      } else {
        const { data, error: insertError } = await supabase.from("accommodations").insert(payload).select("id").single();
        if (insertError) throw insertError;
        await logAdminActivity({
          entity_type: "accommodation",
          entity_id: data.id,
          entity_name: payload.name,
          action: "新增",
        });
      }
      router.push("/admin/accommodations");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="panel space-y-4" onSubmit={onSubmit}>
      <div className="field-grid cols-2">
        <label>
          <span>酒店/住宿名称</span>
          <input required value={form.name} onChange={(e) => setField("name", e.target.value)} />
        </label>
        <label>
          <span>唯一 ID / slug</span>
          <input required value={form.slug} onChange={(e) => setField("slug", e.target.value)} />
        </label>
        <label>
          <span>所属城市</span>
          <input value={form.city} onChange={(e) => setField("city", e.target.value)} />
        </label>
        <label>
          <span>区域</span>
          <input value={form.district} onChange={(e) => setField("district", e.target.value)} />
        </label>
        <label>
          <span>星级或住宿类型</span>
          <input value={form.star_or_type} onChange={(e) => setField("star_or_type", e.target.value)} placeholder="四星 / 民宿" />
        </label>
        <label>
          <span>联系方式</span>
          <input value={form.contact} onChange={(e) => setField("contact", e.target.value)} />
        </label>
        <label>
          <span>排序</span>
          <input type="number" value={form.sort_order} onChange={(e) => setField("sort_order", Number(e.target.value))} />
        </label>
        <label className="flex items-end gap-2 pb-2">
          <input type="checkbox" className="!w-auto" checked={form.published} onChange={(e) => setField("published", e.target.checked)} />
          <span className="!mb-0">发布（前台可见）</span>
        </label>
      </div>

      <label>
        <span>地址</span>
        <input value={form.address} onChange={(e) => setField("address", e.target.value)} />
      </label>
      <label>
        <span>房型或容量备注</span>
        <input value={form.room_notes} onChange={(e) => setField("room_notes", e.target.value)} />
      </label>
      <label>
        <span>住宿介绍</span>
        <textarea rows={5} value={form.description} onChange={(e) => setField("description", e.target.value)} />
      </label>

      <div>
        <span className="mb-1 block text-xs text-[#7a7168]">住宿图片</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => onUpload(e.target.files?.[0] || null)} />
        <div className="mt-3 flex items-start gap-3">
          {form.image_url && !previewBroken ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={form.image_url} alt="预览" className="thumb !h-24 !w-40" onError={() => setPreviewBroken(true)} />
          ) : (
            <div className="flex h-24 w-40 items-center justify-center rounded bg-[#efe6da] text-xs text-[#8a8076]">无图</div>
          )}
          <button
            type="button"
            className="ghost-btn"
            disabled={!form.image_url || uploading}
            onClick={async () => {
              await deleteMediaByUrl(form.image_url);
              setField("image_url", "");
            }}
          >
            删除图片
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-[#9b2c2c]">{error}</p> : null}
      <div className="flex gap-2">
        <button type="submit" className="primary-btn" disabled={saving || uploading}>
          {saving ? "保存中…" : "保存"}
        </button>
        <button type="button" className="ghost-btn" onClick={() => router.push("/admin/accommodations")}>
          取消
        </button>
      </div>
    </form>
  );
}
