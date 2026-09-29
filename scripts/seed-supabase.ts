/**
 * Seed Supabase with local attraction / accommodation fallback data.
 *
 * Prerequisites:
 * 1. Create Supabase project and run supabase/migrations/001_init.sql
 * 2. Create Storage bucket `media` (SQL migration also creates it)
 * 3. Add to .env.local:
 *    NEXT_PUBLIC_SUPABASE_URL=...
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=...
 *    SUPABASE_SERVICE_ROLE_KEY=...   (required for seed upserts)
 * 4. Insert your admin email into admin_email_allowlist, then create Auth user
 *
 * Usage:
 *   npm run seed:supabase
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "node:path";
import { readFileSync, existsSync } from "node:fs";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function loadMappers() {
  // Dynamic import of compiled TS via tsx
  const { fallbackAttractionRecords } = await import("../src/lib/xingcheng/mappers");
  const { fallbackAccommodations } = await import("../src/data/xingcheng/accommodations");
  return { fallbackAttractionRecords, fallbackAccommodations };
}

async function uploadLocalImageIfNeeded(imageUrl: string | null, slug: string) {
  if (!imageUrl || !imageUrl.startsWith("/")) return imageUrl;
  const filePath = resolve(process.cwd(), "public", imageUrl.replace(/^\//, ""));
  if (!existsSync(filePath)) return imageUrl;

  const buffer = readFileSync(filePath);
  const ext = filePath.split(".").pop() || "webp";
  const storagePath = `attractions/seed-${slug}.${ext}`;
  const contentType = ext === "png" ? "image/png" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/webp";

  const { error } = await supabase.storage.from("media").upload(storagePath, buffer, {
    upsert: true,
    contentType,
  });
  if (error) {
    console.warn(`Skip upload ${slug}:`, error.message);
    return imageUrl;
  }
  const { data } = supabase.storage.from("media").getPublicUrl(storagePath);
  return data.publicUrl;
}

async function main() {
  const { fallbackAttractionRecords, fallbackAccommodations } = await loadMappers();

  console.log(`Seeding ${fallbackAttractionRecords.length} attractions...`);
  const attractionRows = [];
  for (const [index, item] of fallbackAttractionRecords.entries()) {
    const image_url = await uploadLocalImageIfNeeded(item.image_url, item.slug);
    attractionRows.push({
      slug: item.slug,
      name: item.name,
      province: item.province,
      city: item.city,
      region: item.region,
      category: item.category,
      kind: item.kind,
      description: item.description,
      duration: item.duration,
      open_hours_note: item.open_hours_note,
      seasonal_note: item.seasonal_note,
      keywords: item.keywords,
      image_url,
      image_credit: item.image_credit,
      image_license_source: item.image_license_source,
      published: true,
      sort_order: index + 1,
    });
  }

  const { error: attractionError } = await supabase
    .from("attractions")
    .upsert(attractionRows, { onConflict: "slug" });
  if (attractionError) throw attractionError;
  console.log("Attractions upserted.");

  console.log(`Seeding ${fallbackAccommodations.length} accommodations...`);
  const accommodationRows = fallbackAccommodations.map((item, index) => ({
    slug: item.slug,
    name: item.name,
    city: item.city,
    district: item.district,
    star_or_type: item.star_or_type,
    address: item.address,
    contact: item.contact,
    room_notes: item.room_notes,
    description: item.description,
    image_url: item.image_url,
    published: true,
    sort_order: index + 1,
  }));
  const { error: lodgingError } = await supabase
    .from("accommodations")
    .upsert(accommodationRows, { onConflict: "slug" });
  if (lodgingError) throw lodgingError;
  console.log("Accommodations upserted.");

  // Sample itinerary template: 西安华山3日游
  const { data: attractions } = await supabase.from("attractions").select("id, slug").in("slug", [
    "pickup",
    "city-wall",
    "huashan",
    "dropoff",
  ]);
  const bySlug = Object.fromEntries((attractions || []).map((a) => [a.slug, a.id]));
  const { data: lodging } = await supabase.from("accommodations").select("id, slug").eq("slug", "city-西安").maybeSingle();

  const { data: itinerary, error: itinError } = await supabase
    .from("itineraries")
    .upsert(
      {
        slug: "xian-huashan-3d",
        name: "西安华山3日游",
        days_count: 3,
        cities: "西安-华山",
        summary: "经典西安城墙与华山组合示例行程。",
        fee_included: "行程所列门票\n导游服务\n含餐餐食",
        fee_excluded: "单房差\n个人消费",
        published: true,
        sort_order: 1,
      },
      { onConflict: "slug" },
    )
    .select("id")
    .single();
  if (itinError) throw itinError;

  await supabase.from("itinerary_days").delete().eq("itinerary_id", itinerary.id);

  const dayDefs = [
    { day_number: 1, title: "第1天", items: ["pickup"], lodging: lodging?.id || null, lodging_label: "西安", breakfast: false },
    {
      day_number: 2,
      title: "第2天",
      items: ["city-wall", "huashan"],
      lodging: lodging?.id || null,
      lodging_label: "西安",
      breakfast: true,
    },
    { day_number: 3, title: "第3天", items: ["dropoff"], lodging: null, lodging_label: "不住宿", breakfast: true },
  ];

  for (const day of dayDefs) {
    const { data: dayRow, error: dayError } = await supabase
      .from("itinerary_days")
      .insert({
        itinerary_id: itinerary.id,
        day_number: day.day_number,
        title: day.title,
        breakfast: day.breakfast,
        lunch: false,
        dinner: false,
        accommodation_id: day.lodging,
        lodging_label: day.lodging_label,
        sort_order: day.day_number - 1,
        published: true,
      })
      .select("id")
      .single();
    if (dayError) throw dayError;

    const attrs = day.items
      .map((slug, index) => bySlug[slug] && ({
        itinerary_day_id: dayRow.id,
        attraction_id: bySlug[slug],
        show_photo: ["city-wall", "huashan"].includes(slug),
        sort_order: index,
        published: true,
      }))
      .filter(Boolean);
    if (attrs.length) {
      const { error: attrError } = await supabase.from("itinerary_day_attractions").insert(attrs);
      if (attrError) throw attrError;
    }
  }

  console.log("Sample itinerary seeded: 西安华山3日游");
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
