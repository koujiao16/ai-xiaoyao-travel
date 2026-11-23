import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { northeastLibrary } from "../src/data/xingcheng/northeast";
config({ path: ".env.local", quiet: true });
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, { auth: { persistSession: false } });
async function main() {
  for (const item of northeastLibrary) {
    const old = await client.from("attractions").select("id").or(`slug.eq.${item.id},name.eq.${item.name}`);
    if (old.error) throw old.error;
    if (old.data?.length) { console.log("已存在，保留", item.name); continue; }
    const result = await client.from("attractions").insert({
      slug: item.id, name: item.name, keywords: item.keywords, description: item.description,
      province: item.province, city: item.city, region: item.region, kind: item.kind, category: item.category,
      duration: item.duration, published: true, sort_order: 1100,
      image_url: item.image || null, image_credit: item.imageCredit || "", image_license_source: item.imageLicenseSource || "",
    });
    if (result.error) throw result.error;
    console.log("新增景区", item.name);
  }
  for (const city of ["长春", "二道白河", "延吉"]) {
    const old = await client.from("accommodations").select("id").eq("name", city);
    if (old.error) throw old.error;
    if (old.data?.length) continue;
    const result = await client.from("accommodations").insert({ slug: "city-" + city, name: city, city, star_or_type: "城市住宿", description: city + "当地住宿，具体酒店另行确认", published: true });
    if (result.error) throw result.error;
    console.log("新增住宿城市", city);
  }
}
main().catch(e => { console.error(e.message); process.exitCode = 1; });
