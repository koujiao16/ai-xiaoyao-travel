import { NextResponse } from "next/server";
import { createServiceSupabaseClient, requireAdminUser } from "@/lib/admin/server-media";

export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    await requireAdminUser(request);
    const service = createServiceSupabaseClient();
    const reviews = await service.from("attractions").select("id,name,description,province,city,keywords,created_at,published").like("slug", "review-%").order("created_at", { ascending: false }).limit(500);
    const existing = await service.from("attractions").select("id,name,province,city").eq("published", true);
    if (reviews.error || existing.error) throw new Error("读取审核列表失败");
    return NextResponse.json({ reviews: reviews.data, existing: existing.data });
  } catch { return NextResponse.json({ error: "请确认管理员登录及数据库连接" }, { status: 403 }); }
}
export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) return NextResponse.json({ error: "请求来源无效" }, { status: 403 });
  try { await requireAdminUser(request); } catch { return NextResponse.json({ error: "需要管理员权限" }, { status: 403 }); }
  try {
    const body = await request.json();
    const { id, action } = body;
    if (typeof id !== "string" || !["approve", "reject"].includes(action)) throw new Error("审核操作无效");
    const patch = action === "approve" ? {
      name: typeof body.name === "string" ? body.name.trim() : "",
      description: typeof body.description === "string" ? body.description.trim() : "",
      province: typeof body.province === "string" ? body.province.trim() : "",
      city: typeof body.city === "string" ? body.city.trim() : "",
    } : null;
    if (patch && (!patch.name || patch.name.length > 100 || !patch.description || patch.description.length > 5000 || !patch.province || !patch.city || patch.province.length > 50 || patch.city.length > 50)) throw new Error("请完整填写景区名称、描述、省份、城市");
    const service = createServiceSupabaseClient();
    const result = await service.from("attractions").update(patch ? {
      ...patch, region: patch.city, published: true, keywords: [patch.name, "review-status:approved"],
    } : { published: false, keywords: ["review-status:rejected"] }).eq("id", id).like("slug", "review-%").contains("keywords", ["review-status:pending"]).eq("published", false).select("id");
    if (result.error) throw new Error("保存失败，请稍后重试");
    if (!result.data.length) throw new Error("该申请已处理，请刷新列表");
    return NextResponse.json({ ok: true });
  } catch (e) { return NextResponse.json({ error: e instanceof Error ? e.message : "审核失败" }, { status: 400 }); }
}
