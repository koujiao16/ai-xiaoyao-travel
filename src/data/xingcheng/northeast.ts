import type { LibraryItem } from "@/lib/xingcheng/types";
import { northeastClassics } from "./northeast-classics";
const rows = [
  ["ne-jilin-rime", "吉林雾凇长廊", "吉林", ["雾凇长廊", "阿什哈达雾凇", "吉林雾凇"], "沿松花江岸漫步，欣赏低温与水汽共同形成的雾凇景观。枝条上的冰晶、江面雾气与沿岸林木相映，是冬日摄影的特色题材。雾凇形成受天气影响，实际观赏效果以当天情况为准。"],
  ["ne-changbai-ski", "长白山滑雪体验", "二道白河", ["长白山滑雪", "滑雪体验", "滑雪"], "在长白山地区体验冬季滑雪，感受雪道与山林间的冰雪乐趣。具体雪场、滑雪时长、雪具及教练服务按所选套餐安排，不默认包含。初学者请遵守雪场安全指引。"],
  ["ne-mojie-rafting", "魔界漂流", "二道白河", ["魔界漂流", "长白山漂流", "雾凇漂流"], "乘漂流艇沿长白山北麓河道缓行，从水面视角欣赏林间雾气、岸边树木及冬季冰雪景观。雾凇效果和漂流开放受天气、水况及景区安排影响，以实际情况为准。"],
  ["ne-changbai-north", "长白山北景区", "二道白河", ["长白山北坡", "长白山北景区", "天池", "长白瀑布"], "走进长白山北景区，感受火山地貌、高山湖泊、瀑布与森林构成的自然景观。天池及各参观点受天气和景区交通调度影响，实际开放范围以当天公告为准，不保证登顶观池。"],
  ["ne-xueronghua-reindeer", "雪绒花驯鹿园", "二道白河", ["雪绒花", "雪绒花驯鹿园", "驯鹿园"], "在长白山二道白河的雪绒花园区近距离观察驯鹿，体验林间与冰雪环境中的动物互动。喂食、合影及其他体验是否包含，以预订套餐及园区现场规定为准。"],
  ["ne-korean-folk-park", "中国朝鲜族民俗园", "延吉", ["延吉民俗园", "朝鲜族民俗园", "中国朝鲜族民俗园"], "走进中国朝鲜族民俗园，沿传统风格民居与庭院了解朝鲜族生活文化，感受建筑、服饰与民俗相结合的街景。服装租赁、妆造及摄影服务可按需要另行安排。"],
  ["ne-yanji-west-market", "延吉西市场", "延吉", ["延吉西市场", "西市场"], "逛一逛延吉西市场，在食品、地方物产与日用品摊位之间了解当地市井生活。可自行寻找朝鲜族风味食品，观察城市日常交易场景；购物和餐食按个人需要自理。"],
  ["ne-yanda-wall", "延边大学网红墙", "延吉", ["延大网红墙", "延吉网红墙", "延边大学网红墙"], "前往延边大学附近的网红墙街区，欣赏中韩双语招牌构成的城市街景，感受延吉的餐饮、咖啡与街区文化。此项目为校外街区游览，不包含进入大学校园。"],
  ["ne-yanji-water-market", "延吉水上市场", "延吉", ["水上市场", "延吉水上市场", "延边东方水上市场"], "清晨走进延吉水上市场，沿摊位寻找米肠、打糕等地方食品，体验当地早市的烟火气息。适合结合早餐自由逛吃，具体摊位、营业时间及餐费以现场实际情况为准。"],
  ["ne-changchun-ice-world", "长春冰雪新天地", "长春", ["长春冰雪新天地", "冰雪新天地"], "在长春冰雪新天地欣赏大型冰雪建筑与冬季游乐场景，体验冰雕、灯光和冰雪娱乐相结合的季节氛围。开放时间、夜场灯光及游乐项目受雪季和天气影响，以当季公告为准。"],
  ["ne-changchun-zoo", "长春动植物公园", "长春", ["长春动植物园", "长春动植物公园"], "漫步长春动植物公园，结合动物观赏、园林游览与园内主题活动，感受城市公园的休闲氛围。动物展区、夜游及演出按公园实际开放安排，不默认包含特别场次或收费体验。"],
] as const;
export const northeastLibrary: LibraryItem[] = [...rows.map(([id, name, city, keywords, description]): LibraryItem => ({
  id, name, city, province: "吉林", region: city, keywords: [...keywords], description,
  duration: "", kind: "景点", category: "其他",
  ...(["ne-changbai-north", "ne-yanji-west-market"].includes(id) ? {
    image: "/images/attractions/" + id + ".webp",
    imageCredit: "EditQ / Wikimedia Commons / CC BY-SA 4.0（已裁切转换；长白山图为非雪季实景）",
    imageLicenseSource: "https://commons.wikimedia.org/wiki/File:" + (id === "ne-changbai-north" ? "Changbai_Waterfall_5.jpg" : "West_Market_entrance.jpg"),
  } : {}),
})), ...northeastClassics];
