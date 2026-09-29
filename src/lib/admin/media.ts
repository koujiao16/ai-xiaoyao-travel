const TARGET_WIDTH = 1600;
const TARGET_HEIGHT = 960;
const MAX_INPUT_BYTES = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export function formatUnknownError(err: unknown, fallback = "操作失败") {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === "object" && err && "message" in err) {
    const message = String((err as { message?: unknown }).message || "");
    if (message) return message;
  }
  return fallback;
}

export async function compressImageToWebp(file: File): Promise<File> {
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    throw new Error("仅支持 JPG、PNG、WebP");
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new Error("图片过大，请选择 8MB 以内的图片");
  }

  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = TARGET_WIDTH;
  canvas.height = TARGET_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("无法处理图片（Canvas 不可用）");

  const scale = Math.max(TARGET_WIDTH / bitmap.width, TARGET_HEIGHT / bitmap.height);
  const drawW = bitmap.width * scale;
  const drawH = bitmap.height * scale;
  const dx = (TARGET_WIDTH - drawW) / 2;
  const dy = (TARGET_HEIGHT - drawH) / 2;
  ctx.fillStyle = "#111111";
  ctx.fillRect(0, 0, TARGET_WIDTH, TARGET_HEIGHT);
  ctx.drawImage(bitmap, dx, dy, drawW, drawH);
  bitmap.close?.();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("WebP 导出失败，请换一张图片重试"))),
      "image/webp",
      0.86,
    );
  });

  if (blob.size > MAX_INPUT_BYTES) {
    throw new Error("压缩后图片仍过大，请更换更小的原图");
  }

  const base = file.name.replace(/\.[^.]+$/, "") || "image";
  return new File([blob], `${base}.webp`, { type: "image/webp" });
}

function assertNotBlobUrl(url: string | null | undefined) {
  if (url && (url.startsWith("blob:") || url.startsWith("filesystem:"))) {
    throw new Error("检测到本地临时图片地址，尚未上传到 Storage，请重新选择图片并保存");
  }
}

/** Upload via server API (admin session + secret key). Never writes blob URLs. */
export async function uploadMediaFile(
  file: File,
  options: {
    entityType: "attractions" | "accommodations" | "itineraries";
    entityId: string;
    replaceUrl?: string | null;
  },
) {
  if (!options.entityId) throw new Error("缺少实体 ID，无法上传图片");
  assertNotBlobUrl(options.replaceUrl || undefined);

  const prepared = await compressImageToWebp(file);
  const body = new FormData();
  body.append("file", prepared, prepared.name);
  body.append("entityType", options.entityType);
  body.append("entityId", options.entityId);
  if (options.replaceUrl) body.append("replaceUrl", options.replaceUrl);

  const headers: Record<string, string> = {};
  try {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) {
      headers.Authorization = `Bearer ${session.access_token}`;
    }
  } catch {
    // cookies still used by same-origin request when available
  }

  const response = await fetch("/api/admin/media", {
    method: "POST",
    body,
    headers,
  });
  const json = (await response.json().catch(() => ({}))) as {
    error?: string;
    publicUrl?: string;
    path?: string;
  };
  if (!response.ok || !json.publicUrl) {
    throw new Error(json.error || `图片上传失败（HTTP ${response.status}）`);
  }
  if (!json.publicUrl.includes("/storage/v1/object/public/media/")) {
    throw new Error("上传返回的不是有效 Storage 地址");
  }
  return { publicUrl: json.publicUrl, path: json.path || "" };
}

export async function deleteMediaByUrl(publicUrl: string | null | undefined) {
  if (!publicUrl) return;
  assertNotBlobUrl(publicUrl);
  if (!publicUrl.includes("/storage/v1/object/public/media/")) return;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  try {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
  } catch {
    // ignore
  }

  const response = await fetch("/api/admin/media", {
    method: "DELETE",
    headers,
    body: JSON.stringify({ publicUrl }),
  });
  const json = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) {
    throw new Error(json.error || "删除图片失败");
  }
}

export async function deleteEntityMediaFolder(
  entityType: "attractions" | "accommodations" | "itineraries",
  entityId: string,
  publicUrl?: string | null,
) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  try {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session?.access_token) headers.Authorization = `Bearer ${session.access_token}`;
  } catch {
    // ignore
  }

  const response = await fetch("/api/admin/media", {
    method: "DELETE",
    headers,
    body: JSON.stringify({ entityType, entityId, publicUrl }),
  });
  const json = (await response.json().catch(() => ({}))) as { error?: string };
  if (!response.ok) {
    throw new Error(json.error || "删除图片目录失败");
  }
}

export function slugify(input: string) {
  return (
    input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fff-]+/g, "")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || `item-${Date.now()}`
  );
}

export async function logAdminActivity(payload: {
  entity_type: string;
  entity_id?: string | null;
  entity_name?: string | null;
  action: string;
  summary?: string;
}) {
  try {
    const { createClient } = await import("@/lib/supabase/client");
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
