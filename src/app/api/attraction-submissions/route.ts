import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { createServiceSupabaseClient } from "@/lib/admin/server-media";
import { PRICE_TAG, validatePrices } from "@/lib/xingcheng/review-pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const hash = (s: string) => createHash("sha256").update(s).digest("hex");
export async function GET() {
  try {
    const { count, error } = await createServiceSupabaseClient().from("attractions").select("id", { count: "exact", head: true }).eq("published", false).like("slug", "review-%").contains("keywords", ["review-status:pending"]);
    if (error) throw error;
    return NextResponse.json({ pending: Boolean(count) }, { headers: { "Cache-Control": "no-store" } });
  } catch { return NextResponse.json({ error: "暂不可用" }, { status: 503 }); }
}
export async function POST(request: Request) {
  try {
    if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "请求来源无效" }, { status: 403 });
    const raw = await request.text();
    if (raw.length > 80000) return NextResponse.json({ error: "提交内容过长" }, { status: 413 });
    const body = JSON.parse(raw);
    if (!Array.isArray(body.items) || body.items.length > 40) return NextResponse.json({ error: "每次最多提交40项" }, { status: 400 });
    const items = body.items.map((item: { name?: unknown; description?: unknown; price?: unknown; mode?: unknown }) => {
      if (typeof item.name !== "string") throw new Error("请填写景区名称");
      const name = item.name.trim(), description = typeof item.description === "string" ? item.description.trim() : "";
      if (!name || name.length > 100 || description.length > 5000) throw new Error("名称或描述长度不符合要求");
      const prices = item.price !== undefined ? validatePrices([{ name, price: item.price, mode: item.mode, group: "ticket" }]) : undefined;
      return { name, description, prices };
    });
    const service = createServiceSupabaseClient();
    const ip = hash(request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown").slice(0, 24);
    const rate = await service.from("attractions").select("id", { count: "exact", head: true }).contains("keywords", ["review-ip:" + ip]).gte("created_at", new Date(Date.now() - 3600000).toISOString());
    if (rate.error) throw rate.error;
    if ((rate.count || 0) >= 80) return NextResponse.json({ error: "提交频繁，请稍后重试" }, { status: 429 });
    let submitted = 0, duplicates = 0, skipped = 0;
    for (const item of items) {
      if (!item.description && !item.prices) { skipped++; continue; }
      const key = hash(item.name.normalize("NFKC").toLowerCase().replace(/\s+/g, "") + "\n" + (item.prices ? JSON.stringify(item.prices) : item.description.normalize("NFKC").replace(/\s+/g, "")));
      const slug = "review-" + key;
      const { data, error } = await service.from("attractions").upsert({
        name: item.name, description: item.description, slug, published: false, province: "", city: "", region: "",
        category: "其他", kind: "景点", keywords: ["review-status:pending", "review-ip:" + ip, ...(item.prices ? ["review-kind:price", PRICE_TAG + JSON.stringify(item.prices)] : [])],
      }, { onConflict: "slug", ignoreDuplicates: true }).select("id");
      if (error) throw error;
      if (data.length) submitted++; else duplicates++;
    }
    return NextResponse.json({ submitted, duplicates, skipped });
  } catch {
    return NextResponse.json({ error: "提交未完成，请检查名称和描述后重试" }, { status: 400 });
  }
}
