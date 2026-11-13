import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { baseLibrary } from "../src/data/xingcheng/library";

config({ path: ".env.local", quiet: true });
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SECRET_KEY;
if (!url || !key) throw new Error("缺少数据库配置");
const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

async function main() {
  for (const slug of ["xingqing-palace", "henan-swan-lake"]) {
    const item = baseLibrary.find(x => x.id === slug)!;
    const { data, error } = await client.from("attractions").select("id,name,slug,published")
      .or(`slug.eq.${slug},name.eq.${item.name}`);
    if (error) throw error;
    if (data?.length) {
      console.log("已存在，不覆盖：", data);
      continue;
    }
    const { data: inserted, error: insertError } = await client.from("attractions").insert({
      slug, name: item.name, keywords: item.keywords, duration: item.duration,
      description: item.description, kind: item.kind, category: item.category,
      province: item.province, city: item.city, region: item.region,
      published: true, sort_order: 901,
    }).select("name,slug,province,city,published");
    if (insertError) throw insertError;
    console.log("新增已发布：", inserted);
  }
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
