import { NextResponse } from "next/server";
import {
  createServiceSupabaseClient,
  ensureMediaBucket,
  pathFromPublicUrl,
  requireAdminUser,
  storagePublicUrl,
} from "@/lib/admin/server-media";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  try {
    await requireAdminUser(request);
    await ensureMediaBucket();

    const form = await request.formData();
    const file = form.get("file");
    const entityType = String(form.get("entityType") || "attractions").replace(/[^\w-]/g, "");
    const entityId = String(form.get("entityId") || "").trim();
    const replaceUrl = String(form.get("replaceUrl") || "");

    if (!(file instanceof File)) return jsonError("缺少图片文件");
    if (!entityId) return jsonError("缺少景区/实体 ID，无法上传");
    if (!ALLOWED.has(file.type)) return jsonError("仅支持 JPG、PNG、WebP");
    if (file.size <= 0) return jsonError("图片文件为空");
    if (file.size > MAX_BYTES) return jsonError("图片过大，请压缩到 8MB 以内后再上传");

    const bytes = Buffer.from(await file.arrayBuffer());
    // Client should already convert to WebP; accept and store as webp when possible.
    const isWebp = file.type === "image/webp" || file.name.toLowerCase().endsWith(".webp");
    const ext = isWebp ? "webp" : file.type === "image/png" ? "png" : "jpg";
    const objectPath = `${entityType}/${entityId}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

    const service = createServiceSupabaseClient();
    const { error: uploadError } = await service.storage.from("media").upload(objectPath, bytes, {
      contentType: isWebp ? "image/webp" : file.type,
      upsert: false,
      cacheControl: "3600",
    });
    if (uploadError) {
      return jsonError(`Storage 上传失败：${uploadError.message}`, 500);
    }

    const publicUrl = storagePublicUrl(objectPath);

    const { data: asset, error: assetError } = await service
      .from("media_assets")
      .insert({
        bucket: "media",
        path: objectPath,
        public_url: publicUrl,
        mime_type: isWebp ? "image/webp" : file.type,
        width: isWebp ? 1600 : null,
        height: isWebp ? 960 : null,
        alt_text: file.name,
        entity_type: entityType,
        entity_id: entityId,
      })
      .select("*")
      .single();
    if (assetError) {
      // Roll back uploaded object if metadata insert fails
      await service.storage.from("media").remove([objectPath]);
      return jsonError(`图片记录写入失败：${assetError.message}`, 500);
    }

    const oldPath = pathFromPublicUrl(replaceUrl);
    if (oldPath && oldPath !== objectPath) {
      await service.storage.from("media").remove([oldPath]);
      await service.from("media_assets").delete().eq("path", oldPath);
    }

    return NextResponse.json({ publicUrl, path: objectPath, asset });
  } catch (err) {
    const message = err instanceof Error ? err.message : "上传失败";
    const status = /登录|管理员/.test(message) ? 401 : 500;
    return jsonError(message, status);
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdminUser(request);
    const body = (await request.json().catch(() => ({}))) as {
      publicUrl?: string;
      entityType?: string;
      entityId?: string;
    };

    const service = createServiceSupabaseClient();
    const paths: string[] = [];

    const single = pathFromPublicUrl(body.publicUrl);
    if (single) paths.push(single);

    if (body.entityType && body.entityId) {
      const prefix = `${body.entityType}/${body.entityId}`;
      const { data: files } = await service.storage.from("media").list(prefix, { limit: 100 });
      for (const file of files || []) {
        if (file.name) paths.push(`${prefix}/${file.name}`);
      }
    }

    if (!paths.length) return NextResponse.json({ ok: true, removed: 0 });

    const unique = [...new Set(paths)];
    const { error } = await service.storage.from("media").remove(unique);
    if (error) return jsonError(`删除 Storage 文件失败：${error.message}`, 500);
    await service.from("media_assets").delete().in("path", unique);
    return NextResponse.json({ ok: true, removed: unique.length });
  } catch (err) {
    const message = err instanceof Error ? err.message : "删除失败";
    const status = /登录|管理员/.test(message) ? 401 : 500;
    return jsonError(message, status);
  }
}
