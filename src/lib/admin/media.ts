import imageCompression from "browser-image-compression";
import { createClient } from "@/lib/supabase/client";

const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 960;

export async function compressImageToWebp(file: File): Promise<File> {
  const compressed = await imageCompression(file, {
    maxWidthOrHeight: Math.max(TARGET_WIDTH, TARGET_HEIGHT),
    maxSizeMB: 1.2,
    fileType: "image/webp",
    initialQuality: 0.82,
    useWebWorker: true,
  });

  const bitmap = await createImageBitmap(compressed);
  const canvas = document.createElement("canvas");
  canvas.width = TARGET_WIDTH;
  canvas.height = TARGET_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("无法处理图片");

  const scale = Math.max(TARGET_WIDTH / bitmap.width, TARGET_HEIGHT / bitmap.height);
  const drawW = bitmap.width * scale;
  const drawH = bitmap.height * scale;
  const dx = (TARGET_WIDTH - drawW) / 2;
  const dy = (TARGET_HEIGHT - drawH) / 2;
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
  ctx.drawImage(bitmap, dx, dy, drawW, drawH);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("WebP 导出失败"))), "image/webp", 0.86);
  });

  const base = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${base}.webp`, { type: "image/webp" });
}

export async function uploadMediaFile(file: File, folder: string) {
  const supabase = createClient();
  const prepared = await compressImageToWebp(file);
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

  const { error: uploadError } = await supabase.storage.from("media").upload(path, prepared, {
    cacheControl: "3600",
    upsert: false,
    contentType: "image/webp",
  });
  if (uploadError) throw uploadError;

  const {
    data: { publicUrl },
  } = supabase.storage.from("media").getPublicUrl(path);

  const { data: asset, error: assetError } = await supabase
    .from("media_assets")
    .insert({
      bucket: "media",
      path,
      public_url: publicUrl,
      mime_type: "image/webp",
      width: TARGET_WIDTH,
      height: TARGET_HEIGHT,
      alt_text: prepared.name,
      entity_type: folder,
    })
    .select("*")
    .single();

  if (assetError) throw assetError;
  return { publicUrl, asset, path };
}

export async function deleteMediaByUrl(publicUrl: string | null | undefined) {
  if (!publicUrl) return;
  const supabase = createClient();
  const marker = "/storage/v1/object/public/media/";
  const idx = publicUrl.indexOf(marker);
  if (idx < 0) return;
  const path = publicUrl.slice(idx + marker.length);
  await supabase.storage.from("media").remove([path]);
  await supabase.from("media_assets").delete().eq("path", path);
}

export function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]+/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80) || `item-${Date.now()}`;
}

export async function logAdminActivity(payload: {
  entity_type: string;
  entity_id?: string | null;
  entity_name?: string | null;
  action: string;
  summary?: string;
}) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await supabase.from("admin_activity_log").insert({
      actor_email: user?.email ?? null,
      entity_type: payload.entity_type,
      entity_id: payload.entity_id ?? null,
      entity_name: payload.entity_name ?? null,
      action: payload.action,
      summary: payload.summary ?? "",
    });
  } catch {
    // non-blocking
  }
}
