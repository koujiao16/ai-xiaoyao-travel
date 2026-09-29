import type { AttractionCategory, AttractionKind, AttractionRecord, LibraryItem } from "@/lib/xingcheng/types";
import { fallbackLibrary } from "@/data/xingcheng/library";

function inferCategory(item: LibraryItem): AttractionCategory {
  if (item.kind === "服务") return "服务";
  const blob = `${item.name} ${item.keywords.join(" ")}`;
  if (/博物馆|博物院|碑林|考古/.test(blob)) return "博物馆";
  if (/红色|纪念馆|革命|八路军|事变|枣园|杨家岭|王家坪|南泥湾|梁家河/.test(blob)) return "红色教育";
  if (/古镇|古城|地坑院/.test(blob)) return "古镇";
  if (/演出|千古情|驼铃|再回延安|戏剧/.test(blob)) return "演出";
  if (/研学|大学|植物园|保护区|科学公园/.test(blob)) return "研学";
  if (/华山|山|湖|瀑布|峡谷|波浪谷|乾坤湾|森林|梯田|溶洞|动物园|壶口|秦岭|太白|翠华/.test(blob)) {
    return "自然风光";
  }
  if (/寺|庙|宫|陵|城墙|遗址|书院|塔|府|祠/.test(blob)) return "历史文化";
  return "其他";
}

function inferProvinceCity(item: LibraryItem): { province: string; city: string } {
  const region = item.region || "";
  if (region.includes("安康")) return { province: "陕西", city: "安康" };
  if (region.includes("汉中")) return { province: "陕西", city: "汉中" };
  if (region.includes("商洛")) return { province: "陕西", city: "商洛" };
  if (region.includes("宝鸡")) return { province: "陕西", city: "宝鸡" };
  if (region.includes("西安周边")) return { province: "陕西", city: "西安" };
  if (item.id.startsWith("henan-") || /郑州|洛阳|开封|登封|三门峡|少林|龙门|汴|嵩山/.test(item.name + item.keywords.join(""))) {
    if (/少林|嵩阳|嵩山|中岳|登封/.test(item.name + item.keywords.join(""))) {
      return { province: "河南", city: "登封" };
    }
    if (/龙门|白马|牡丹|九洲|应天|明堂|丽景|老君|洛博|王城|隋唐|古墓/.test(item.name + item.keywords.join(""))) {
      return { province: "河南", city: "洛阳" };
    }
    if (/清明|开封|包公|相国|万岁/.test(item.name + item.keywords.join(""))) {
      return { province: "河南", city: "开封" };
    }
    if (/地坑|三门峡/.test(item.name + item.keywords.join(""))) {
      return { province: "河南", city: "三门峡" };
    }
    return { province: "河南", city: "郑州" };
  }
  if (/延安|宝塔|枣园|杨家岭|王家坪|南泥湾|梁家河|再回延安/.test(item.name + item.keywords.join(""))) {
    return { province: "陕西", city: "延安" };
  }
  if (/华山|西岳庙/.test(item.name + item.keywords.join(""))) {
    return { province: "陕西", city: "渭南" };
  }
  if (/壶口|黄帝陵|甘泉|波浪谷|乾坤湾/.test(item.name + item.keywords.join(""))) {
    return { province: "陕西", city: "延安" };
  }
  if (/法门|乾陵/.test(item.name + item.keywords.join(""))) {
    return { province: "陕西", city: "宝鸡" };
  }
  return { province: "陕西", city: region || "西安" };
}

export function libraryItemToAttractionRecord(item: LibraryItem, index: number): AttractionRecord {
  const { province, city } = inferProvinceCity(item);
  return {
    id: `local-${item.id}`,
    published: true,
    sort_order: index + 1,
    slug: item.id,
    name: item.name,
    province,
    city,
    region: item.region || null,
    category: inferCategory(item),
    kind: item.kind,
    description: item.description,
    duration: item.duration,
    open_hours_note: "",
    seasonal_note: item.seasonal || "",
    keywords: item.keywords,
    image_url: item.image || null,
    image_credit: "",
    image_license_source: "",
  };
}

export function attractionRecordToLibraryItem(record: AttractionRecord): LibraryItem {
  return {
    id: record.slug,
    name: record.name,
    keywords: record.keywords?.length ? record.keywords : [record.name],
    duration: record.duration || "",
    description: record.description || "",
    kind: (record.kind || "景点") as AttractionKind,
    image: record.image_url || undefined,
    region: record.region || record.city || undefined,
    seasonal: record.seasonal_note || undefined,
    province: record.province,
    city: record.city,
    category: record.category,
    openHoursNote: record.open_hours_note,
    imageCredit: record.image_credit,
    imageLicenseSource: record.image_license_source,
    source: record.id.startsWith("local-") ? "local" : "supabase",
  };
}

export const fallbackAttractionRecords: AttractionRecord[] = fallbackLibrary.map(libraryItemToAttractionRecord);

export const ATTRACTION_CATEGORIES: AttractionCategory[] = [
  "自然风光",
  "历史文化",
  "博物馆",
  "红色教育",
  "古镇",
  "演出",
  "研学",
  "其他",
  "服务",
];
