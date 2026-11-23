import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { createServiceSupabaseClient } from "@/lib/admin/server-media";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "来源无效" }, { status: 403 });
    if (Number(request.headers.get("content-length")) > 3500000) return NextResponse.json({ error: "图片过大" }, { status: 413 });
    const form = await request.formData(), file = form.get("file"), slug = form.get("slug"), name = form.get("name");
    if (!(file instanceof File) || file.size > 3000000 || !file.size || typeof slug !== "string" || !slug || slug.length > 200 || typeof name !== "string" || name.length > 100 || !name.trim()) throw Error("图片信息无效");
    const service = createServiceSupabaseClient();
    const ip = createHash("sha256").update(request.headers.get("x-forwarded-for")?.split(",")[0] || "unknown").digest("hex").slice(0,24);
    const rate = await service.from("attractions").select("id", { count: "exact", head: true }).contains("keywords", ["image-ip:" + ip]).gte("created_at", new Date(Date.now()-3600000).toISOString());
    if (rate.error || (rate.count || 0) >= 30) throw Error("提交频繁，请稍后重试");
    const original = Buffer.from(await file.arrayBuffer());
    const meta = await sharp(original, { limitInputPixels: 40000000 }).metadata();
    if (!["jpeg","png","webp"].includes(meta.format || "")) throw Error("仅支持JPG、PNG、WebP");
    const bytes = await sharp(original, { limitInputPixels: 40000000 }).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 85 }).toBuffer();
    const key = createHash("sha256").update(slug + "\n").update(original).digest("hex");
    const reviewSlug = "review-image-" + key, path = key + ".jpg";
    const old = await service.from("attractions").select("id").eq("slug", reviewSlug);
    if (old.error) throw old.error;
    if (old.data.length) return NextResponse.json({ duplicate: true });
    const bucket = await service.storage.getBucket("review-images");
    if (bucket.error) {
      const created = await service.storage.createBucket("review-images", { public: false, fileSizeLimit: 3000000, allowedMimeTypes: ["image/jpeg"] });
      if (created.error && !/exist/i.test(created.error.message)) throw created.error;
    } else if (bucket.data.public) throw Error("审核图片存储配置错误");
    const uploaded = await service.storage.from("review-images").upload(path, bytes, { contentType: "image/jpeg", upsert: false });
    if (uploaded.error && !/exist|duplicate/i.test(uploaded.error.message)) throw uploaded.error;
    const target = await service.from("attractions").select("id").eq("slug", slug).eq("published", true).maybeSingle();
    if (target.error) throw target.error;
    const result = await service.from("attractions").upsert({
      slug: reviewSlug, name: name.trim(), description: "", province: "", city: "", published: false, kind: "景点", category: "其他",
      keywords: ["review-status:pending", "review-kind:image", "image-path:" + path, "image-ip:" + ip, ...(target.data ? ["image-target:" + target.data.id] : [])],
    }, { onConflict: "slug", ignoreDuplicates: true }).select("id");
    if (result.error) throw result.error;
    return NextResponse.json({ duplicate: !result.data.length });
  } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "图片提交失败" }, { status: 400 }); }
}
