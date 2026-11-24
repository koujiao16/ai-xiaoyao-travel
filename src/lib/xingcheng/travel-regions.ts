export const TRAVEL_REGIONS = [
  { id: "东北", provinces: "辽宁、吉林、黑龙江" },
  { id: "陕豫晋", provinces: "陕西、河南、山西" },
] as const;
export type TravelRegion = (typeof TRAVEL_REGIONS)[number]["id"];
export type TravelRegionFilter = TravelRegion;
export const DEFAULT_TRAVEL_REGION: TravelRegion = "陕豫晋";
const cities: Record<string, TravelRegion> = {
  松江河: "东北", 和龙: "东北", 图们: "东北", 珲春: "东北", 亚布力: "东北", 本溪: "东北", 鞍山: "东北", 丹东: "东北", 盘锦: "东北",
  长春: "东北", 吉林: "东北", 二道白河: "东北", 二道: "东北", 延吉: "东北", 安图: "东北", 长白山: "东北", 沈阳: "东北", 大连: "东北", 哈尔滨: "东北", 雪乡: "东北",
  西安: "陕豫晋", 华山: "陕豫晋", 临潼: "陕豫晋", 延安: "陕豫晋", 壶口: "陕豫晋", 汉中: "陕豫晋", 安康: "陕豫晋", 商洛: "陕豫晋", 宝鸡: "陕豫晋", 渭南: "陕豫晋", 咸阳: "陕豫晋", 郑州: "陕豫晋", 洛阳: "陕豫晋", 三门峡: "陕豫晋", 开封: "陕豫晋", 登封: "陕豫晋", 林州: "陕豫晋", 安阳: "陕豫晋", 新乡: "陕豫晋", 焦作: "陕豫晋", 济源: "陕豫晋", 南阳: "陕豫晋", 漯河: "陕豫晋", 巩义: "陕豫晋",
  太原: "陕豫晋", 大同: "陕豫晋", 朔州: "陕豫晋", 忻州: "陕豫晋", 晋中: "陕豫晋", 长治: "陕豫晋", 临汾: "陕豫晋", 运城: "陕豫晋", 晋城: "陕豫晋", 平遥: "陕豫晋", 五台山: "陕豫晋", 应县: "陕豫晋", 浑源: "陕豫晋", 阳泉: "陕豫晋", 吕梁: "陕豫晋",
};
export function resolveTravelRegion(location: { province?: string | null; city?: string | null; name?: string | null; region?: string | null }): TravelRegion | null {
  // Existing drafts/reviews may still carry the former two-province label.
  if (["陕西＋河南", "陕西+河南"].includes(location.region || "")) return "陕豫晋";
  if (TRAVEL_REGIONS.some(x=>x.id===location.region)) return location.region as TravelRegion;
  const province = (location.province || "").trim().replace(/省$/, "");
  if (["辽宁","吉林","黑龙江"].includes(province)) return "东北";
  if (["陕西","河南","山西"].includes(province)) return "陕豫晋";
  if (province) return null;
  const text = (location.city || location.name || "").trim().replace(/市$/, "");
  return cities[text] || Object.entries(cities).find(([city]) => text.startsWith(city))?.[1] || null;
}
