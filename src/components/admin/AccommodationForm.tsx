"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AccommodationRecord } from "@/lib/xingcheng/types";
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
      if (key === "name" && !isEdit && !current.slug) next.slug = slugify(String(value));
      return next;
    });
  };

  const previewSrc = pendingPreview || form.image_url;

  const payloadBase = useMemo(
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
    try {
      if (pendingPreview) URL.revokeObjectURL(pendingPreview);
      setPendingFile(null);
      setPendingPreview("");
      if (form.image_url) {
        await deleteMediaByUrl(form.image_url);
        setField("image_url", "");
      }
    } catch (err) {
      setError(formatUnknownError(err, "删除图片失败"));
    }
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const supabase = createClient();
      let id = initial?.id || "";
      let imageUrl = form.image_url || null;

      if (isEdit && initial) {
        const { error: updateError } = await supabase
          .from("accommodations")
          .update({ ...payloadBase, image_url: imageUrl })
          .eq("id", initial.id);
        if (updateError) throw updateError;
        id = initial.id;
      } else {
        const { data, error: insertError } = await supabase
          .from("accommodations")
          .insert({ ...payloadBase, image_url: null })
          .select("id")
          .single();
        if (insertError) throw insertError;
        id = data.id;
      }

      if (pendingFile) {
        try {
          const uploaded = await uploadMediaFile(pendingFile, {
            entityType: "accommodations",
            entityId: id,
            replaceUrl: imageUrl,
          });
          imageUrl = uploaded.publicUrl;
          const { error: imageError } = await supabase
            .from("accommodations")
            .update({ image_url: imageUrl })
            .eq("id", id);
          if (imageError) throw imageError;
          setField("image_url", imageUrl);
          setPendingFile(null);
          if (pendingPreview) URL.revokeObjectURL(pendingPreview);
          setPendingPreview("");
        } catch (uploadErr) {
          throw new Error(`住宿已保存，但图片上传失败：${formatUnknownError(uploadErr)}`);
        }
      }

      await logAdminActivity({
        entity_type: "accommodation",
        entity_id: id,
        entity_name: payloadBase.name,
        action: isEdit ? "更新" : "新增",
      });
      router.push("/admin/accommodations");
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
          <input value={form.star_or_type} onChange={(e) => setField("star_or_type", e.target.value)} />
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
        <span className="mb-1 block text-xs text-[#7a7168]">住宿图片（保存时上传到 Storage）</span>
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => onPickFile(e.target.files?.[0] || null)} />
        <div className="mt-3 flex items-start gap-3">
          {previewSrc && !previewBroken ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewSrc} alt="预览" className="thumb !h-24 !w-40" onError={() => setPreviewBroken(true)} />
          ) : (
            <div className="flex h-24 w-40 items-center justify-center rounded bg-[#efe6da] text-xs text-[#8a8076]">无图</div>
          )}
          <button type="button" className="ghost-btn" disabled={!previewSrc || saving} onClick={clearImage}>
            删除图片
          </button>
        </div>
      </div>

      {error ? <p className="text-sm text-[#9b2c2c]">{error}</p> : null}
      <div className="flex gap-2">
        <button type="submit" className="primary-btn" disabled={saving}>
          {saving ? "保存中…" : "保存"}
        </button>
        <button type="button" className="ghost-btn" onClick={() => router.push("/admin/accommodations")}>
          取消
        </button>
      </div>
    </form>
  );
}
