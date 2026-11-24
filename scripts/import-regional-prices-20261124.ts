/** Reviewed, bounded import. Default is a read-only dry run. --apply writes after a backup. */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { regionalPriceItems } from "./regional-prices-20261124";
import { PRICE_TAG, parsePrices, validatePrices } from "../src/lib/xingcheng/review-pricing";
import { quotePriceCatalog, type QuotePriceItem } from "../src/lib/xingcheng/quote-pricing";

config({path: ".env.local",quiet: true});
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.SUPABASE_SECRET_KEY!,{auth:{persistSession:false}});
const apply = process.argv.includes("--apply");
const norm = (s: string) => s.normalize("NFKC").replace(/[\s·（）()／/＋+—－-]/g,"").toLowerCase();
type RecordRow = { id: string; name: string; slug: string; province: string; city: string; keywords: string[]; published: boolean; [key: string]: unknown };
function feeKey(p: QuotePriceItem) {
  const text = p.name + " " + (p.options || []).map(x=>x.name).join(" ");
  if (/耳机|耳麦/.test(text)) return "headset";
  if (/讲解/.test(text)) return "guide";
  if (/索道/.test(text)) return "rope" + (/一索/.test(text)?"1":/二索/.test(text)?"2":"");
  if (/景交|电瓶车|观光车|环保车/.test(text)) return "transport";
  return norm(p.name);
}
export function mergePrices(old: QuotePriceItem[], incoming: QuotePriceItem[]) {
  const tickets = old.filter(p=>p.group==="ticket" && !p.pricePending);
  const result = tickets.length ? [...tickets] : incoming.filter(p=>p.group==="ticket");
  const extras = old.filter(p=>p.group==="extra");
  result.push(...extras);
  for (const price of incoming.filter(p=>p.group==="extra")) {
    const match = result.find(p=>p.group==="extra" && feeKey(p)===feeKey(price));
    if (!match) result.push(price);
    else if (match.pricePending && !match.options) result[result.indexOf(match)] = price;
  }
  // Extras-only museum entries must not erase an existing unknown ticket.
  if (!result.some(p=>p.group==="ticket") && old.some(p=>p.group==="ticket")) result.unshift(...old.filter(p=>p.group==="ticket"));
  return validatePrices(result);
}
function category(name: string) {
  if (/博物|纪念馆/.test(name)) return "博物馆";
  if (/革命|旧址|抗日|抗战|红旗渠|南泥湾/.test(name)) return "红色教育";
  if (/古镇|古村|古城/.test(name)) return "古镇";
  if (/山|峡|湖|草原|冰洞|瀑布|森林/.test(name)) return "自然风光";
  return "历史文化";
}
async function main() {
  const {data,error} = await db.from("attractions").select("*").eq("published",true);
  if(error) throw error;
  const all = data as RecordRow[];
  const used = new Set<string>();
  const plans = regionalPriceItems.map(item=>{
    const direct = all.filter(row=>row.slug===item.slug);
    const alias = all.filter(row=>row.province.replace(/省$/,"")===item.province && (norm(item.name)===norm(row.name) || (row.city===item.city && item.aliases.some(name=>norm(name)===norm(row.name)))));
    const matches = direct.length ? direct : alias;
    if (matches.length>1) throw Error("重复匹配，请人工核对："+item.name);
    const row = matches[0];
    if (row && row.province.replace(/省$/,"")!==item.province) throw Error("禁止跨省匹配："+item.name);
    if (row && used.has(row.id)) throw Error("同一景区重复导入："+item.name);
    if(row)used.add(row.id);
    const old = row ? (parsePrices(row.keywords)||quotePriceCatalog[row.name]||[]) : [];
    const prices = item.replace ? validatePrices(item.prices) : mergePrices(old,item.prices);
    const keywords = [...new Set([...(row?.keywords||[item.name,...item.aliases]).filter(k=>!k.startsWith(PRICE_TAG)),PRICE_TAG+JSON.stringify(prices)])];
    const changed = !row || JSON.stringify(row.keywords)!==JSON.stringify(keywords);
    return {item,row,old,prices,keywords,changed};
  });
  const {data:lodgings,error:lodgingError} = await db.from("accommodations").select("id,name,city").eq("published",true);
  if(lodgingError)throw lodgingError;
  const newCities = [...new Set(regionalPriceItems.map(x=>x.city))].filter(city=>!(lodgings||[]).some(x=>x.name===city));
  const summary = {mode:apply?"apply":"dry-run",projects:plans.length,newAttractions:plans.filter(x=>!x.row).length,updatedAttractions:plans.filter(x=>x.row&&x.changed).length,unchangedAttractions:plans.filter(x=>!x.changed).length,newLodgingCities:newCities};
  console.log(JSON.stringify(summary));
  const report = plans.map(p=>({name:p.item.name,province:p.item.province,city:p.item.city,action:!p.row?"新增":p.changed?"更新":"保留",prices:p.prices,old:p.old}));
  const fingerprint = createHash("sha256").update(JSON.stringify(report)).digest("hex");
  console.log("计划指纹",fingerprint);
  if(!apply) { if(process.argv.includes("--details"))console.log(JSON.stringify(report)); return; }
  const backupDir = "/private/tmp/xiaoyao-regional-import-" + Date.now();
  await mkdir(backupDir,{recursive:false,mode:0o700});
  await writeFile(backupDir+"/before.json",JSON.stringify({fingerprint,attractions:plans.filter(p=>p.row&&p.changed).map(p=>p.row),newSlugs:plans.filter(p=>!p.row).map(p=>p.item.slug),newCities},null,2),{mode:0o600});
  await writeFile(backupDir+"/plan.json",JSON.stringify(report,null,2),{mode:0o600});
  console.log("写入前备份",backupDir);
  const touched: string[] = [];
  const created: string[] = [];
  const createdLodgings: string[] = [];
  try {
    for (const p of plans.filter(p=>p.changed)) {
      if(p.row) {
        // Optimistic guard: do not overwrite a concurrent administrator price edit.
        const current = await db.from("attractions").select("keywords").eq("id",p.row.id).single();
        if(current.error || JSON.stringify(current.data.keywords)!==JSON.stringify(p.row.keywords)) throw Error("管理员刚修改了："+p.item.name+"，停止导入");
        const result = await db.from("attractions").update({keywords:p.keywords}).eq("id",p.row.id).eq("updated_at",p.row.updated_at).select("id");
        if(result.error)throw result.error;
        if(result.data?.length!==1)throw Error("更新冲突："+p.item.name);
        touched.push(p.row.id);
      } else {
        const result = await db.from("attractions").insert({slug:p.item.slug,name:p.item.name,province:p.item.province,city:p.item.city,region:"陕豫晋",keywords:p.keywords,description:p.item.description,kind:"景点",category:category(p.item.name),published:true,sort_order:1300,seasonal_note:""}).select("id").single();
        if(result.error)throw result.error;
        created.push(result.data.id);
      }
    }
    for (const city of newCities) {
      const result = await db.from("accommodations").insert({slug:"city-"+city,name:city,city,star_or_type:"城市住宿",description:city+"当地住宿，具体酒店另行确认",published:true}).select("id").single();
      if(result.error)throw result.error;
      createdLodgings.push(result.data.id);
    }
    for (const p of plans) {
      const checked = await db.from("attractions").select("keywords").eq("slug",p.row?.slug||p.item.slug).single();
      if(checked.error || JSON.stringify(parsePrices(checked.data.keywords))!==JSON.stringify(p.prices)) throw Error("写入复核失败："+p.item.name);
    }
    await writeFile(backupDir+"/result.json",JSON.stringify({summary,fingerprint,touched,created,createdLodgings},null,2),{mode:0o600});
    console.log("写入并逐项复核完成",JSON.stringify(summary));
  } catch(error) {
    console.error("导入未完成，按本次精确目标恢复。");
    for(const id of touched) {
      const original = plans.find(p=>p.row?.id===id)!.row!;
      const rollback = await db.from("attractions").update({keywords:original.keywords}).eq("id",id);
      if(rollback.error)console.error("恢复失败",id,rollback.error.message);
    }
    if(created.length)await db.from("attractions").delete().in("id",created);
    if(createdLodgings.length)await db.from("accommodations").delete().in("id",createdLodgings);
    throw error;
  }
}
if (process.argv[1]?.endsWith("import-regional-prices-20261124.ts")) main().catch(error=>{console.error(error instanceof Error?error.message:String(error));process.exitCode=1;});
