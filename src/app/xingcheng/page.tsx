"use client";

import "./xingcheng.css";

import { useMemo, useRef, useState } from "react";

type LibraryItem = {
  id: string;
  name: string;
  keywords: string[];
  duration: string;
  description: string;
  kind: "景点" | "服务";
  image?: string;
};

type DayPlan = {
  id: number;
  items: string[];
  query: string;
  touched: boolean;
  meals: string[];
  lodging: string;
  photoItems: string[];
};

const baseLibrary: LibraryItem[] = [
  {
    id: "pickup",
    name: "机场接机",
    keywords: ["接机", "机场", "接"],
    duration: "",
    description: "工作人员根据航班抵达时间提前等候，接到客人后乘车前往酒店，协助办理入住并介绍后续行程安排。",
    kind: "服务",
  },
  {
    id: "city-wall",
    name: "西安明城墙",
    keywords: ["城墙", "明城墙", "西安城墙"],
    duration: "约60分钟",
    description: "西安明城墙是中国现存规模较大、保存较完整的古代城垣建筑。登临城墙，可俯瞰古城街巷，感受传统城郭格局与古都风貌。",
    kind: "景点",
  },
  {
    id: "xian-museum",
    name: "西安博物院",
    keywords: ["西安博物院", "博物院", "博物馆"],
    duration: "约1.5小时",
    description: "西安博物院集文物展示、历史研究与园林游览于一体，通过丰富馆藏呈现西安不同历史时期的城市发展与文化积淀。",
    kind: "景点",
  },
  {
    id: "bell-drum-square",
    name: "钟鼓楼广场",
    keywords: ["钟楼", "鼓楼", "钟鼓楼", "广场"],
    duration: "约40分钟",
    description: "钟鼓楼广场位于西安市中心，可近距离欣赏钟楼、鼓楼建筑风貌，是了解古城中轴格局和拍摄城市地标的经典位置。",
    kind: "景点",
  },
  {
    id: "muslim-quarter",
    name: "回民小吃街",
    keywords: ["回民街", "小吃街", "美食"],
    duration: "约1小时",
    description: "回民小吃街汇集多种西安特色风味，街区烟火气浓厚。游客可自由漫步，按个人喜好品尝当地小吃、选购特色伴手礼。",
    kind: "景点",
  },
  {
    id: "terracotta",
    name: "秦始皇兵马俑博物馆",
    keywords: ["兵马俑", "秦始皇", "秦俑"],
    duration: "约2小时",
    description: "秦始皇兵马俑博物馆以规模宏大的秦代兵马俑坑闻名，陶俑形态丰富、排列严整，是了解秦代军事制度与雕塑艺术的重要窗口。",
    kind: "景点",
  },
  {
    id: "huaqing",
    name: "华清宫",
    keywords: ["华清宫", "华清池", "骊山"],
    duration: "约1.5小时",
    description: "华清宫坐落于骊山脚下，以温泉资源、唐代宫苑文化以及众多历史故事闻名，是展示盛唐文化和西安近现代历史的重要景区。",
    kind: "景点",
  },
  {
    id: "huashan",
    name: "西岳华山",
    keywords: ["华山", "西岳", "爬山"],
    duration: "约5小时",
    description: "华山为中国五岳之一，以山势险峻、峰岭奇秀著称。游客可根据体力和开放情况选择合适路线，沿途欣赏雄奇山景与自然风光。",
    kind: "景点",
  },
  {
    id: "dayan-pagoda",
    name: "大雁塔北广场",
    keywords: ["大雁塔", "北广场", "音乐喷泉"],
    duration: "约40分钟",
    description: "大雁塔北广场位于大雁塔脚下，是西安代表性的城市文化广场，可远观大雁塔，感受古典建筑与现代城市景观的融合。",
    kind: "景点",
  },
  {
    id: "everbright-city",
    name: "大唐不夜城",
    keywords: ["不夜城", "大唐不夜城", "夜景"],
    duration: "约1.5小时",
    description: "大唐不夜城以盛唐文化为主题，沿街分布景观装置、文化表演与特色商业，是体验西安夜间氛围、拍摄古都夜景的热门街区。",
    kind: "景点",
  },
  {
    id: "dropoff",
    name: "机场送机",
    keywords: ["送机", "机场", "送"],
    duration: "",
    description: "根据返程航班时间合理安排送机，提前从酒店出发前往机场，抵达后结束本次行程。",
    kind: "服务",
  },
];

const additionalLibrary: LibraryItem[] = [
  { id: "xiyue-temple", name: "西岳庙", keywords: ["西岳庙", "华岳庙", "岳庙"], duration: "约1.5小时", description: "西岳庙是历代帝王祭祀西岳华山神的重要场所，中轴建筑层层展开，具有宫殿式庙宇的庄严格局。游览可欣赏古建筑、碑刻与华山祭祀文化。", kind: "景点" },
  { id: "daci-en-temple", name: "大慈恩寺", keywords: ["大慈恩寺", "慈恩寺", "大雁塔"], duration: "约1.5小时", description: "大慈恩寺是唐长安著名佛寺，也是大雁塔所在地，与玄奘法师译经弘法的历史密切相关。寺院古朴庄严，可感受佛教文化与盛唐气象。", kind: "景点" },
  { id: "gaojia-courtyard", name: "高家大院", keywords: ["高家大院", "高家宅院", "北院门"], duration: "约1小时", description: "高家大院位于西安北院门历史街区，是保存较完整的明清民居院落。院内可欣赏传统建筑、砖木雕饰及地方民俗展示，感受老西安生活气息。", kind: "景点" },
  { id: "bailuyuan", name: "白鹿原影视城", keywords: ["白鹿原", "白鹿原影视城", "影视城"], duration: "约3小时", description: "白鹿原影视城以关中地域文化和文学作品《白鹿原》为背景，设有白鹿村、滋水县城等实景区域。游客可漫步街巷，体验民俗、演艺与影视场景。", kind: "景点" },
  { id: "qinqiang", name: "非遗体验·秦腔", keywords: ["秦腔", "非遗", "非遗体验"], duration: "约1小时", description: "秦腔是流行于西北地区的传统戏曲艺术，唱腔高亢激越、表演质朴豪放。体验活动可近距离了解唱腔、脸谱、服饰与舞台程式。", kind: "景点" },
  { id: "changan-twelve", name: "长安十二时辰主题街区", keywords: ["长安十二时辰", "十二时辰", "主题街区"], duration: "约2小时", description: "长安十二时辰主题街区以唐代市井文化和沉浸式体验为特色，融合唐风场景、互动演艺、餐饮与文创。步入其中，可感受热闹鲜活的盛唐生活画卷。", kind: "景点" },
  { id: "daming-palace", name: "大明宫国家遗址公园", keywords: ["大明宫", "大明宫遗址", "遗址公园"], duration: "约2小时", description: "大明宫是唐代重要宫殿遗址，曾是唐王朝的政治中心之一。遗址公园通过夯土遗迹、复原展示和数字展陈，呈现盛唐宫城的宏大格局。", kind: "景点" },
  { id: "beilin-museum", name: "西安碑林博物馆", keywords: ["碑林", "碑林博物馆", "西安碑林"], duration: "约1.5小时", description: "西安碑林博物馆以收藏、研究和展示历代碑石、墓志及石刻艺术闻名。馆内名碑荟萃，是了解中国书法、经史文献与石刻艺术的重要窗口。", kind: "景点" },
  { id: "archaeology-museum", name: "陕西考古博物馆", keywords: ["考古博物馆", "陕西考古", "考古"], duration: "约2小时", description: "陕西考古博物馆以考古学科发展和陕西重要考古成果为主线，展示调查、发掘、保护与修复全过程。参观可从考古视角读懂文明演进。", kind: "景点" },
  { id: "banpo-museum", name: "西安半坡博物馆", keywords: ["半坡", "半坡博物馆", "半坡遗址"], duration: "约1.5小时", description: "西安半坡博物馆依托新石器时代聚落遗址建立，是了解仰韶文化的重要场所。遗址大厅与出土文物展现了先民的居住、生产和生活方式。", kind: "景点" },
  { id: "tang-paradise", name: "大唐芙蓉园", keywords: ["大唐芙蓉园", "芙蓉园", "唐文化"], duration: "约2.5小时", description: "大唐芙蓉园以盛唐文化为主题，园内分布仿唐建筑、水景园林和多种文化演艺。夜幕下灯光与湖景相映，适合体验唐风氛围。", kind: "景点" },
  { id: "xian-botanical", name: "西安植物园", keywords: ["西安植物园", "植物园", "花卉"], duration: "约2小时", description: "西安植物园汇集多类植物专园和季节性花卉景观，兼具科研、科普与休闲功能。游客可漫步园区，观察丰富植物并亲近自然。", kind: "景点" },
  { id: "shuyuanmen", name: "书院门文化街", keywords: ["书院门", "书院门文化街", "文房四宝"], duration: "约1小时", description: "书院门文化街紧邻关中书院，沿街聚集书画、篆刻、文房四宝和传统工艺店铺。青石街巷古意浓厚，是感受西安文脉的特色街区。", kind: "景点" },
  { id: "yongxingfang", name: "永兴坊", keywords: ["永兴坊", "陕西美食", "非遗美食"], duration: "约1小时", description: "永兴坊集中展示陕西各地特色小吃和民俗文化，街区以传统建筑风格营造热闹市井氛围。游客可自由品尝风味美食，体验地方非遗。", kind: "景点" },
  { id: "daxingshan", name: "大兴善寺", keywords: ["大兴善寺", "兴善寺", "寺院"], duration: "约1小时", description: "大兴善寺是西安历史悠久的佛教寺院之一，院落清幽，古木与殿宇相映。这里与中国佛教密宗传播关系密切，适合静心参访。", kind: "景点" },
  { id: "xian-incident", name: "西安事变纪念馆", keywords: ["西安事变纪念馆", "西安事变", "纪念馆"], duration: "约1.5小时", description: "西安事变纪念馆依托相关历史旧址建立，通过史实展览、文物图片和复原陈列，呈现西安事变的历史背景、经过及其重要影响。", kind: "景点" },
  { id: "xian-romance", name: "《西安千古情》", keywords: ["千古情", "西安千古情", "演出"], duration: "约1小时", description: "《西安千古情》以大型舞台艺术串联西安历史文化，通过舞美、灯光、音乐和演员表演呈现古都故事。演出节奏鲜明，适合集中感受地域文化。", kind: "景点" },
  { id: "camel-bells", name: "《驼铃传奇》", keywords: ["驼铃传奇", "驼铃", "演出"], duration: "约1小时", description: "《驼铃传奇》以古丝绸之路为背景，通过大型实景舞台、机械装置和水火特效讲述商旅往来故事。演出场面宏大，突出丝路文化主题。", kind: "景点" },
  { id: "zhang-residence", name: "张学良公馆", keywords: ["张学良公馆", "张学良", "公馆"], duration: "约1小时", description: "张学良公馆是西安事变重要旧址之一，由多幢中西合璧建筑组成。旧址复原陈列与史料展示，可帮助游客了解张学良生平及相关历史。", kind: "景点" },
  { id: "shaanxi-history", name: "陕西历史博物馆", keywords: ["陕西历史博物馆", "陕历博", "历史博物馆"], duration: "约2.5小时", description: "陕西历史博物馆以周、秦、汉、唐等时期文物见长，系统呈现陕西古代文明发展脉络。馆藏丰富，是了解中华文明和盛唐文化的重要窗口。", kind: "景点" },
  { id: "tang-west-market", name: "大唐西市", keywords: ["大唐西市", "西市", "丝路"], duration: "约1.5小时", description: "大唐西市所在区域承载着唐长安西市的历史记忆，现融合博物馆、商业街区与丝路文化展示。游客可了解古代商贸交流与城市生活。", kind: "景点" },
  { id: "hancheng-lake", name: "汉城湖景区", keywords: ["汉城湖", "汉城湖景区", "汉文化"], duration: "约2小时", description: "汉城湖景区依托汉长安城遗址周边水系建设，将生态景观与汉文化展示相结合。沿湖可欣赏园林、水景与主题建筑，适合休闲游览。", kind: "景点" },
  { id: "qinglong-temple", name: "青龙寺", keywords: ["青龙寺", "樱花", "寺院"], duration: "约1小时", description: "青龙寺是唐代佛教文化交流的重要场所，与中日佛教文化渊源深厚。寺院环境清雅，春季樱花盛开时尤受游客欢迎。", kind: "景点" },
  { id: "yisushe", name: "易俗社文化街区", keywords: ["易俗社", "易俗社街区", "秦腔"], duration: "约1.5小时", description: "易俗社文化街区围绕百年秦腔剧社打造，融合剧场、展陈、非遗体验与老字号商业。游客可感受秦腔艺术和西安近现代城市文化。", kind: "景点" },
  { id: "xiying", name: "西影电影园区", keywords: ["西安电影制片厂", "西影厂", "西影电影园区"], duration: "约1.5小时", description: "西影电影园区由西安电影制片厂更新而来，保留电影工业记忆并融入展览、文创和场景体验。游客可了解西部电影发展与经典影片故事。", kind: "景点" },
  { id: "qinling-four", name: "秦岭四宝科学公园", keywords: ["秦岭四宝", "四宝科学公园", "大熊猫"], duration: "约2.5小时", description: "秦岭四宝科学公园以大熊猫、朱鹮、金丝猴和羚牛等珍稀动物保护为核心，兼具救护繁育、科学研究与自然科普功能。", kind: "景点" },
  { id: "qinling-wildlife", name: "西安秦岭野生动物园", keywords: ["秦岭野生动物园", "野生动物园", "动物园"], duration: "约4小时", description: "西安秦岭野生动物园依托秦岭北麓自然环境，分布多种野生动物展区和科普体验项目。适合亲子家庭近距离观察动物、了解生态保护。", kind: "景点" },
  { id: "famen-temple", name: "法门文化景区", keywords: ["法门寺", "法门文化景区", "佛指舍利"], duration: "约3小时", description: "法门文化景区以法门寺历史文化和唐代地宫发现闻名，寺院、博物馆与现代礼佛建筑共同构成游览空间。可了解佛教文化与唐代珍宝。", kind: "景点" },
  { id: "qianling", name: "乾陵", keywords: ["乾陵", "武则天", "唐陵"], duration: "约2小时", description: "乾陵是唐高宗李治与武则天的合葬陵，依山为陵，神道石刻保存丰富。无字碑、述圣纪碑及石人石马展现唐代皇家陵寝气象。", kind: "景点" },
  { id: "hukou", name: "黄河壶口瀑布（陕西侧）", keywords: ["壶口瀑布", "黄河壶口", "陕西壶口"], duration: "约1.5小时", description: "黄河壶口瀑布因河水奔涌至狭窄河槽、形似巨壶倾泻而得名。水势磅礴、涛声震耳，是感受黄河壮阔景象的代表性自然景观。", kind: "景点" },
  { id: "huangdi-mausoleum", name: "黄帝陵", keywords: ["黄帝陵", "轩辕黄帝", "桥山"], duration: "约2小时", description: "黄帝陵位于桥山，是祭祀中华人文初祖轩辕黄帝的重要场所。古柏群、轩辕庙和陵区共同承载着悠久的中华祭祖文化。", kind: "景点" },
  { id: "yucha-canyon", name: "甘泉大峡谷（雨岔大峡谷）", keywords: ["雨岔大峡谷", "甘泉大峡谷", "雨岔"], duration: "约3小时", description: "甘泉大峡谷由流水长期冲蚀红色砂岩形成，峡壁曲线流畅，光影变化丰富。行走其间可欣赏幽深狭长、色彩斑斓的地质奇观。", kind: "景点" },
  { id: "wave-valley", name: "靖边波浪谷", keywords: ["波浪谷", "靖边波浪谷", "丹霞"], duration: "约3小时", description: "靖边波浪谷以红砂岩丹霞地貌闻名，岩层纹理如波浪般起伏延展。不同光线下色彩层次鲜明，是陕北极具特色的地质景观。", kind: "景点" },
  { id: "qiankun-bay", name: "延川黄河乾坤湾", keywords: ["乾坤湾", "黄河乾坤湾", "延川乾坤湾"], duration: "约2.5小时", description: "乾坤湾位于黄河蛇曲国家地质公园核心区域，黄河在峡谷间形成醒目的S形大转弯。登上观景台可俯瞰壮阔河湾与黄土高原风貌。", kind: "景点" },
  { id: "zaoyuan", name: "枣园革命旧址", keywords: ["枣园", "枣园革命旧址", "延安枣园"], duration: "约1.5小时", description: "枣园革命旧址是延安时期的重要革命旧址，保存有多处旧居、礼堂和办公场所。园区环境清幽，可结合史料了解相关历史。", kind: "景点" },
  { id: "yangjialing", name: "杨家岭革命旧址", keywords: ["杨家岭", "杨家岭革命旧址", "延安"], duration: "约1.5小时", description: "杨家岭革命旧址保留中央大礼堂、办公旧址及多处窑洞旧居，是了解延安时期重大会议和革命历史的重要参观地。", kind: "景点" },
  { id: "wangjiaping", name: "王家坪革命旧址", keywords: ["王家坪", "王家坪革命旧址", "延安"], duration: "约1小时", description: "王家坪革命旧址曾是延安时期重要军事机关所在地，现保存礼堂、办公旧址和窑洞建筑。参观可了解相关军事与革命历史。", kind: "景点" },
  { id: "liangjiahe", name: "梁家河村", keywords: ["梁家河", "梁家河村", "知青旧居"], duration: "约2小时", description: "梁家河村位于延川县黄土高原沟壑区，保留知青旧居、沼气池等参观内容，并展示村庄生产生活与乡村发展变迁。", kind: "景点" },
  { id: "nwpu", name: "西北工业大学", keywords: ["西北工业大学", "西工大", "大学"], duration: "约1.5小时", description: "西北工业大学是一所以航空、航天、航海等领域见长的高等学府。校园参访可感受大学文化，了解学校发展及科技人才培养特色。", kind: "景点" },
  { id: "xjtu", name: "西安交通大学", keywords: ["西安交通大学", "西交大", "大学"], duration: "约1.5小时", description: "西安交通大学是历史悠久的综合性研究型大学，校园兼具人文底蕴与现代学术氛围。参访可了解学校西迁历史和办学文化。", kind: "景点" },
];

const library: LibraryItem[] = [...baseLibrary, ...additionalLibrary];

const lodgingOptions = ["西安", "华山", "临潼", "延安", "壶口", "不住宿"] as const;

const initialDays: DayPlan[] = [
  { id: 1, items: ["pickup"], query: "", touched: false, meals: [], lodging: "西安", photoItems: [] },
  { id: 2, items: ["city-wall", "huashan"], query: "", touched: false, meals: ["早餐"], lodging: "西安", photoItems: [] },
  { id: 3, items: ["dropoff"], query: "", touched: false, meals: ["早餐"], lodging: "不住宿", photoItems: [] },
];

const emptyDay = (id: number): DayPlan => ({
  id,
  items: [],
  query: "",
  touched: false,
  meals: [],
  lodging: id === 1 ? "西安" : "不住宿",
  photoItems: [],
});

export default function Home() {
  const [tripName, setTripName] = useState("西安华山3日游");
  const [days, setDays] = useState<DayPlan[]>(initialDays);
  const [feeIncluded, setFeeIncluded] = useState("");
  const [feeExcluded, setFeeExcluded] = useState("");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const dragRef = useRef<{ dayId: number; itemId: string } | null>(null);

  const itemById = useMemo(
    () => Object.fromEntries(library.map((item) => [item.id, item])),
    [],
  );

  const updateDay = (id: number, patch: Partial<DayPlan>) => {
    setDays((current) => current.map((day) => (day.id === id ? { ...day, ...patch } : day)));
  };

  const setDayCount = (count: number) => {
    setDays((current) =>
      Array.from({ length: count }, (_, index) => current[index] ?? emptyDay(index + 1)),
    );
  };

  const suggestionsFor = (day: DayPlan) => {
    const query = day.query.trim().toLowerCase();
    if (!query) return [];
    return library
      .filter((item) => !day.items.includes(item.id))
      .filter((item) =>
        [item.name, ...item.keywords].some((keyword) => keyword.toLowerCase().includes(query)),
      )
      .slice(0, 6);
  };

  const addItem = (day: DayPlan, itemId: string) => {
    updateDay(day.id, { items: [...day.items, itemId], query: "", touched: false });
  };

  const removeItem = (day: DayPlan, itemId: string) => {
    updateDay(day.id, {
      items: day.items.filter((id) => id !== itemId),
      photoItems: day.photoItems.filter((id) => id !== itemId),
    });
  };

  const toggleMeal = (day: DayPlan, meal: string) => {
    const meals = day.meals.includes(meal)
      ? day.meals.filter((value) => value !== meal)
      : [...day.meals, meal];
    updateDay(day.id, { meals });
  };

  const togglePhoto = (day: DayPlan, itemId: string) => {
    if (day.photoItems.includes(itemId)) {
      updateDay(day.id, { photoItems: day.photoItems.filter((id) => id !== itemId) });
      return;
    }
    if (day.photoItems.length >= 3) {
      setMessage(`Day${day.id}最多只能选择3张景区图片`);
      return;
    }
    updateDay(day.id, { photoItems: [...day.photoItems, itemId] });
    setMessage("");
  };

  const dropItem = (day: DayPlan, targetId: string) => {
    const dragging = dragRef.current;
    if (!dragging || dragging.dayId !== day.id || dragging.itemId === targetId) return;
    const next = [...day.items];
    const from = next.indexOf(dragging.itemId);
    const to = next.indexOf(targetId);
    next.splice(from, 1);
    next.splice(to, 0, dragging.itemId);
    updateDay(day.id, { items: next });
    dragRef.current = null;
  };

  const validate = () => {
    const hasName = tripName.trim().length > 0;
    const nextDays = days.map((day) => ({
      ...day,
      touched: day.query.trim().length > 0 || day.items.length === 0,
    }));
    setDays(nextDays);
    if (!hasName) {
      setMessage("请先填写行程名称");
      return false;
    }
    if (nextDays.some((day) => day.query.trim().length > 0 || day.items.length === 0)) {
      setMessage("有景点尚未从联想结果中确认，请检查红色输入框");
      setTimeout(() => document.querySelector(".field-error")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
      return false;
    }
    setMessage("");
    return true;
  };

  const exportDocx = async () => {
    if (!validate()) return;
    setExporting(true);
    try {
      const {
        AlignmentType,
        BorderStyle,
        Document,
        ImageRun,
        Packer,
        Paragraph,
        ShadingType,
        Table,
        TableCell,
        TableLayoutType,
        TableRow,
        TextRun,
        WidthType,
      } = await import("docx");

      const photoBuffers = new Map<string, ArrayBuffer>();
      const photoIds = [...new Set(days.flatMap((day) => day.photoItems))];
      await Promise.all(
        photoIds.map(async (id) => {
          const item = itemById[id];
          if (!item?.image) return;
          const response = await fetch(item.image);
          if (!response.ok) throw new Error("图片读取失败");
          photoBuffers.set(id, await response.arrayBuffer());
        }),
      );

      const border = { style: BorderStyle.SINGLE, size: 10, color: "C8B6A4" };
      const zeroSpacing = { before: 0, after: 0, line: 240 };
      const feeBodyParagraphs = (text: string) => {
        const lines = text.trim() ? text.replace(/\r\n/g, "\n").split("\n") : ["暂无说明"];
        return lines.map(
          (line) =>
            new Paragraph({
              spacing: zeroSpacing,
              children: [new TextRun({ text: line.length ? line : " " })],
            }),
        );
      };
      const buildFeeTable = (title: string, text: string) =>
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  borders: { top: border, bottom: border, left: border, right: border },
                  shading: { fill: "8B3E2F", type: ShadingType.CLEAR },
                  margins: { top: 170, bottom: 170, left: 200, right: 200 },
                  children: [
                    new Paragraph({
                      spacing: zeroSpacing,
                      children: [new TextRun({ text: title, bold: true, size: 27, color: "FFFFFF" })],
                    }),
                  ],
                }),
              ],
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 100, type: WidthType.PERCENTAGE },
                  borders: { top: border, bottom: border, left: border, right: border },
                  margins: { top: 140, bottom: 140, left: 200, right: 200 },
                  children: feeBodyParagraphs(text),
                }),
              ],
            }),
          ],
        });

      const children: Array<InstanceType<typeof Paragraph> | InstanceType<typeof Table>> = [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 500 },
          children: [new TextRun({ text: tripName.trim(), bold: true, size: 36, color: "2E2924" })],
        }),
      ];

      days.forEach((day) => {
        const selected = day.items.map((id) => itemById[id]);
        const detailContent: Array<InstanceType<typeof Paragraph> | InstanceType<typeof Table>> = [];

        selected.forEach((item) => {
          const headingRuns = [
            new TextRun({ text: `【${item.name}】`, bold: true, color: "2E2924" }),
          ];
          if (item.duration) {
            headingRuns.push(
              new TextRun({ text: `  参考游览时间：${item.duration}`, color: "786F66", size: 20 }),
            );
          }
          detailContent.push(
            new Paragraph({
              spacing: { before: 180, after: 70 },
              children: headingRuns,
            }),
            new Paragraph({
              spacing: { after: 100, line: 360 },
              children: [new TextRun({ text: item.description })],
            }),
          );
        });

        detailContent.push(
          new Paragraph({
            spacing: { before: 120, after: 120 },
            children: [
              new TextRun({ text: "温馨提示：", bold: true, color: "8B3E2F" }),
              new TextRun({ text: "具体游览顺序及时间以当天实际安排为准。", color: "5F5851" }),
            ],
          }),
        );

        const dayPhotos = day.photoItems
          .map((id) => itemById[id])
          .filter((item) => item?.image && photoBuffers.has(item.id))
          .slice(0, 3);
        if (dayPhotos.length) {
          const imageWidth = dayPhotos.length === 1 ? 420 : dayPhotos.length === 2 ? 260 : 165;
          const imageHeight = Math.round(imageWidth * 0.64);
          detailContent.push(
            new Paragraph({
              spacing: { before: 180, after: 100 },
              children: [new TextRun({ text: "行程图片", bold: true, color: "8B3E2F" })],
            }),
            new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              rows: [
                new TableRow({
                  children: dayPhotos.map((item) =>
                    new TableCell({
                      width: { size: Math.floor(100 / dayPhotos.length), type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                        bottom: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                        left: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                        right: { style: BorderStyle.SINGLE, size: 6, color: "E3D8CD" },
                      },
                      margins: { top: 100, bottom: 100, left: 80, right: 80 },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new ImageRun({
                              type: "jpg",
                              data: photoBuffers.get(item.id)!,
                              transformation: { width: imageWidth, height: imageHeight },
                            }),
                          ],
                        }),
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          spacing: { before: 70 },
                          children: [new TextRun({ text: item.name, bold: true, size: 18, color: "5F5851" })],
                        }),
                      ],
                    }),
                  ),
                }),
              ],
            }),
          );
        }

        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            layout: TableLayoutType.FIXED,
            columnWidths: [5000, 5000],
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    columnSpan: 2,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: "8B3E2F", type: ShadingType.CLEAR },
                    margins: { top: 170, bottom: 170, left: 200, right: 200 },
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: `Day${day.id}  ${selected.map((item) => item.name).join(" · ")}`,
                            bold: true,
                            size: 27,
                            color: "FFFFFF",
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 5000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: "F8F3EC", type: ShadingType.CLEAR },
                    margins: { top: 140, bottom: 140, left: 180, right: 180 },
                    children: [new Paragraph({ children: [new TextRun({ text: `用餐：${day.meals.length ? day.meals.join("、") : "不含餐"}`, bold: true })] })],
                  }),
                  new TableCell({
                    width: { size: 5000, type: WidthType.DXA },
                    borders: { top: border, bottom: border, left: border, right: border },
                    shading: { fill: "F8F3EC", type: ShadingType.CLEAR },
                    margins: { top: 140, bottom: 140, left: 180, right: 180 },
                    children: [new Paragraph({ children: [new TextRun({ text: `住宿：${day.lodging}`, bold: true })] })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    columnSpan: 2,
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: { top: border, bottom: border, left: border, right: border },
                    margins: { top: 90, bottom: 120, left: 200, right: 200 },
                    children: detailContent,
                  }),
                ],
              }),
            ],
          }),
        );
      });

      children.push(buildFeeTable("费用包含", feeIncluded), buildFeeTable("费用不含", feeExcluded));

      const doc = new Document({
        styles: {
          default: {
            document: {
              run: { font: "Microsoft YaHei", size: 22, color: "37322E" },
              paragraph: { spacing: { line: 340, after: 100 } },
            },
          },
        },
        sections: [
          {
            properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } },
            children,
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${tripName.trim().replace(/[\\/:*?"<>|]/g, "-")}.docx`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("Word文档已生成");
    } catch {
      setMessage("文档生成失败，请重试");
    } finally {
      setExporting(false);
    }
  };

  return (
    <main className="trip-builder">
      <header className="topbar">
        <div className="brand-mark">行</div>
        <div>
          <strong>行程生成器</strong>
          <span>简单选择，快速成稿</span>
        </div>
        <div className="library-count">景点资料库 · {library.length} 项</div>
      </header>

      <section className="hero">
        <p className="eyebrow">TRIP BUILDER</p>
        <h1>把简版行程，变成客人看得懂的详细安排</h1>
        <p>输入关键词选择景点，再补充用餐和住宿，最后一键生成 Word。</p>
      </section>

      <section className="setup-card" aria-label="行程基本信息">
        <label className={!tripName.trim() && message ? "field-error" : ""}>
          <span>行程名称</span>
          <input value={tripName} onChange={(event) => setTripName(event.target.value)} placeholder="例如：西安华山3日游" />
        </label>
        <label>
          <span>行程天数</span>
          <select value={days.length} onChange={(event) => setDayCount(Number(event.target.value))}>
            {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
              <option key={count} value={count}>{count} 天</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          className="sample-button"
          onClick={() => {
            setTripName("西安华山3日游");
            setDays(initialDays);
            setMessage("");
          }}
        >
          恢复示例
        </button>
      </section>

      <section className="days-section">
        <div className="section-heading">
          <div>
            <span>每日安排</span>
            <h2>按天添加景点</h2>
          </div>
          <p>输入关键词后，请点击联想结果确认</p>
        </div>

        <div className="timeline">
          {days.map((day) => {
            const suggestions = suggestionsFor(day);
            const invalid = day.touched && (day.query.trim().length > 0 || day.items.length === 0);
            return (
              <article className="day-card" key={day.id}>
                <div className="day-index">
                  <span>DAY</span>
                  <strong>{String(day.id).padStart(2, "0")}</strong>
                </div>
                <div className="day-content">
                  <div className="route-preview">
                    {day.items.length
                      ? day.items.map((id) => itemById[id].name).join("  →  ")
                      : "这一天还没有添加安排"}
                  </div>

                  <div className={`search-box ${invalid ? "field-error" : ""}`}>
                    <div className="selected-items">
                      {day.items.map((id) => (
                        <span
                          className="item-chip"
                          key={id}
                          draggable
                          onDragStart={() => { dragRef.current = { dayId: day.id, itemId: id }; }}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={() => dropItem(day, id)}
                          title="拖动可调整顺序"
                        >
                          <i aria-hidden="true">⋮⋮</i>
                          {itemById[id].name}
                          <button type="button" aria-label={`删除${itemById[id].name}`} onClick={() => removeItem(day, id)}>×</button>
                        </span>
                      ))}
                    </div>
                    <input
                      aria-label={`Day${day.id}景点关键词`}
                      value={day.query}
                      onChange={(event) => updateDay(day.id, { query: event.target.value, touched: false })}
                      onBlur={() => {
                        if (day.query.trim() || day.items.length === 0) updateDay(day.id, { touched: true });
                      }}
                      placeholder="输入景点关键词，例如：城墙、华山、接机"
                    />
                    {day.query.trim() && (
                      <div className="suggestions" role="listbox">
                        {suggestions.length ? suggestions.map((item) => (
                          <button
                            type="button"
                            key={item.id}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => addItem(day, item.id)}
                          >
                            <span>{item.name}<small>{item.kind}</small></span>
                            {item.duration && <em>{item.duration}</em>}
                          </button>
                        )) : <p>没有找到匹配项目</p>}
                      </div>
                    )}
                  </div>
                  {invalid && <p className="error-note">请从联想结果中选择景点或服务项目</p>}

                  <div className="day-options">
                    <fieldset>
                      <legend>当天含餐</legend>
                      <div className="meal-options">
                        {["早餐", "中餐", "晚餐"].map((meal) => (
                          <label key={meal}>
                            <input type="checkbox" checked={day.meals.includes(meal)} onChange={() => toggleMeal(day, meal)} />
                            <span>{meal}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                    <label className="lodging-select">
                      <span>当天住宿</span>
                      <select value={day.lodging} onChange={(event) => updateDay(day.id, { lodging: event.target.value })}>
                        {lodgingOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="photo-picker">
                    <div className="photo-picker-title">
                      <strong>行程图片</strong>
                      <span>最多选择3张，统一放在当天文字最后</span>
                    </div>
                    <div className="photo-options">
                      {day.items.filter((id) => itemById[id].kind === "景点").length ? (
                        day.items
                          .filter((id) => itemById[id].kind === "景点")
                          .map((id) => {
                            const item = itemById[id];
                            const ready = Boolean(item.image);
                            return (
                              <label key={id} className={!ready ? "photo-pending" : ""}>
                                <input
                                  type="checkbox"
                                  checked={day.photoItems.includes(id)}
                                  disabled={!ready || (!day.photoItems.includes(id) && day.photoItems.length >= 3)}
                                  onChange={() => togglePhoto(day, id)}
                                />
                                <span>{item.name}</span>
                                {!ready && <small>图片待补</small>}
                              </label>
                            );
                          })
                      ) : (
                        <p>当天没有需要配图的景区</p>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="fee-section" aria-label="费用说明">
        <label className="fee-box">
          <span>费用包含</span>
          <textarea
            value={feeIncluded}
            onChange={(event) => setFeeIncluded(event.target.value)}
            placeholder="请输入交通、住宿、门票、用餐、导游等包含项目，每行一项"
            rows={5}
          />
        </label>
        <label className="fee-box">
          <span>费用不含</span>
          <textarea
            value={feeExcluded}
            onChange={(event) => setFeeExcluded(event.target.value)}
            placeholder="请输入单房差、个人消费、自费项目等不包含项目，每行一项"
            rows={5}
          />
        </label>
      </section>

      <footer className="action-bar">
        <div>
          <strong>{tripName || "未命名行程"}</strong>
          <span>{days.length} 天 · 共 {days.reduce((sum, day) => sum + day.items.length, 0)} 个项目</span>
        </div>
        {message && <p className={message.includes("已生成") ? "success-message" : "status-message"}>{message}</p>}
        <button type="button" onClick={exportDocx} disabled={exporting}>
          {exporting ? "正在生成…" : "生成 Word 文档"}
        </button>
      </footer>
    </main>
  );
}
