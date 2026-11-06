export const ALL_TRAVEL_REGIONS = "全部" as const;

export const TRAVEL_REGIONS = [
  { id: "华东", provinces: "上海、江苏、浙江、安徽、福建、江西、山东" },
  { id: "华北", provinces: "北京、天津、河北、山西、内蒙古" },
  { id: "东北", provinces: "辽宁、吉林、黑龙江" },
  { id: "中南", provinces: "河南、湖北、湖南、广东、广西、海南" },
  { id: "西南", provinces: "重庆、四川、贵州、云南、西藏" },
  { id: "西北", provinces: "陕西、甘肃、青海、宁夏、新疆" },
] as const;

export type TravelRegion = (typeof TRAVEL_REGIONS)[number]["id"];
export type TravelRegionFilter = typeof ALL_TRAVEL_REGIONS | TravelRegion;

const provinceRegionMap: Record<string, TravelRegion> = {
  上海: "华东", 江苏: "华东", 浙江: "华东", 安徽: "华东", 福建: "华东", 江西: "华东", 山东: "华东",
  北京: "华北", 天津: "华北", 河北: "华北", 山西: "华北", 内蒙古: "华北",
  辽宁: "东北", 吉林: "东北", 黑龙江: "东北",
  河南: "中南", 湖北: "中南", 湖南: "中南", 广东: "中南", 广西: "中南", 海南: "中南",
  重庆: "西南", 四川: "西南", 贵州: "西南", 云南: "西南", 西藏: "西南",
  陕西: "西北", 甘肃: "西北", 青海: "西北", 宁夏: "西北", 新疆: "西北",
};

/** Current lodging labels use cities as their names, so map them until province is added to lodging records. */
const cityRegionMap: Record<string, TravelRegion> = {
  西安: "西北", 华山: "西北", 临潼: "西北", 延安: "西北", 壶口: "西北", 汉中: "西北", 安康: "西北", 商洛: "西北", 宝鸡: "西北",
  郑州: "中南", 洛阳: "中南", 三门峡: "中南", 开封: "中南", 登封: "中南", 武汉: "中南",
};

function normalize(value?: string | null) {
  return (value || "").trim().replace(/(省|市|自治区|壮族自治区|回族自治区|维吾尔自治区)$/, "");
}

export function resolveTravelRegion(location: { province?: string | null; city?: string | null; name?: string | null }): TravelRegion | null {
  const province = normalize(location.province);
  if (provinceRegionMap[province]) return provinceRegionMap[province];

  const city = normalize(location.city || location.name);
  return cityRegionMap[city] || null;
}
