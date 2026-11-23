export const TRAVEL_REGIONS = [
  { id: "东北", provinces: "辽宁、吉林、黑龙江" },
  { id: "陕西＋河南", provinces: "陕西、河南" },
] as const;
export type TravelRegion = (typeof TRAVEL_REGIONS)[number]["id"];
export type TravelRegionFilter = TravelRegion;
export const DEFAULT_TRAVEL_REGION: TravelRegion = "陕西＋河南";
const cities: Record<string, TravelRegion> = {
  长春: "东北", 吉林: "东北", 二道白河: "东北", 二道: "东北", 延吉: "东北", 安图: "东北", 长白山: "东北", 沈阳: "东北", 大连: "东北", 哈尔滨: "东北", 雪乡: "东北",
  西安: "陕西＋河南", 华山: "陕西＋河南", 临潼: "陕西＋河南", 延安: "陕西＋河南", 壶口: "陕西＋河南", 汉中: "陕西＋河南", 安康: "陕西＋河南", 商洛: "陕西＋河南", 宝鸡: "陕西＋河南", 渭南: "陕西＋河南", 咸阳: "陕西＋河南", 郑州: "陕西＋河南", 洛阳: "陕西＋河南", 三门峡: "陕西＋河南", 开封: "陕西＋河南", 登封: "陕西＋河南", 林州: "陕西＋河南", 安阳: "陕西＋河南", 新乡: "陕西＋河南", 焦作: "陕西＋河南",
};
export function resolveTravelRegion(location: { province?: string | null; city?: string | null; name?: string | null }): TravelRegion | null {
  const province = (location.province || "").trim().replace(/省$/, "");
  if (["辽宁","吉林","黑龙江"].includes(province)) return "东北";
  if (["陕西","河南"].includes(province)) return "陕西＋河南";
  if (province) return null;
  const text = (location.city || location.name || "").trim().replace(/市$/, "");
  return cities[text] || Object.entries(cities).find(([city]) => text.startsWith(city))?.[1] || null;
}
