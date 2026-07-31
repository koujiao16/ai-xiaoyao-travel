import type { Product } from "./products";

const COVER_IMAGES = [
  "/images/shaanxi-resource-01.jpg",
  "/images/shaanxi-resource-02.jpg",
  "/images/shaanxi-resource-03.jpg",
  "/images/shaanxi-destination-hero.png",
] as const;

const SHAANXI_QUALITY_COMMITMENT: Product["qualityCommitment"] = [
  {
    titleCN: "真实产品信息",
    titleEN: "Authentic Product Information",
    descriptionCN:
      "行程设计即把高含金量景点与体验以旅行社底价包含。全程不推荐自费景点与演绎项目，绝不无故减少景点（不可抗力与突发限流除外）。",
    descriptionEN:
      "High-value sights and experiences are built in at agency rates—not upsold later. No forced paid activities, and no unannounced attraction cuts except force majeure or sudden capacity limits.",
  },
  {
    titleCN: "明确品质承诺",
    titleEN: "Clear Quality Commitments",
    descriptionCN:
      "全程0购物店、独立成团绝不卖团、不压缩游览时间；关键承诺可写入合同，违约明确赔付标准。",
    descriptionEN:
      "No shopping stops, no group resale, no compressed visit times. Key pledges can be written into contracts with clear compensation terms.",
  },
  {
    titleCN: "合作伙伴口碑保护",
    titleEN: "Partner Reputation Protection",
    descriptionCN:
      "持证服务配置与稳定地接执行，保护 B2B 合作伙伴面向终端客人的品牌口碑与交付体验。",
    descriptionEN:
      "Licensed service staffing and stable ground operations protect B2B partners’ end-guest reputation and delivery experience.",
  },
];

const REGULAR_EXCLUDED: Product["excluded"] = {
  cn: [
    "景区必坐小交通、索道、区间车等景区内自费交通",
    "不可抗力或航班延误、车辆故障等导致行程变更产生的额外费用",
    "出发地至西安的大交通，以及燃油附加费临时上涨差额",
    "个人消费：洗衣、通讯、娱乐、自由购物及费用包含未列明项目",
    "单房差；儿童门票、电瓶车、床位等另计费用",
    "酒店押金（通常每间100–300元，离店无损坏全额退还）",
  ],
  en: [
    "Mandatory on-site shuttles, cable cars and scenic-area transfers (self-pay)",
    "Extra costs from force majeure, flight delays, vehicle issues or itinerary changes",
    "Long-haul transport to Xi'an and temporary fuel surcharge differences",
    "Personal expenses (laundry, communications, entertainment, shopping) and unlisted items",
    "Single supplements; child tickets, shuttle carts, beds and similar extras",
    "Hotel deposits (typically CNY 100–300/room; refunded if no damage)",
  ],
};

const PRIVATE_EXCLUDED: Product["excluded"] = {
  cn: [
    "景区必坐小交通、索道、区间车等景区内自费交通（行程另有约定除外）",
    "不可抗力或航班延误导致行程变更产生的额外费用",
    "出发地至西安的大交通",
    "个人消费及费用包含未列明项目",
    "单房差；儿童门票、床位等另计费用",
    "酒店押金",
  ],
  en: [
    "On-site shuttles, cable cars and scenic transfers unless otherwise agreed",
    "Extra costs from force majeure or flight delays",
    "Long-haul transport to Xi'an",
    "Personal expenses and unlisted items",
    "Single supplements; child tickets, beds and similar extras",
    "Hotel deposits",
  ],
};

const PRIVATE_HIGHLIGHTS_BASE = {
  customization: {
    titleCN: "高端定制",
    titleEN: "Premium Customization",
    descriptionCN: "私家专属行程，按家庭与出行偏好量身定制景点、节奏与体验深度。",
    descriptionEN:
      "Fully private itinerary tailored to your family’s preferences for sights, pacing and experience depth.",
  },
  flexible: {
    titleCN: "灵活行程",
    titleEN: "Flexible Itinerary",
    descriptionCN: "出发时间、停留时长与餐饮安排可灵活调整，真正睡到自然醒、玩得从容。",
    descriptionEN:
      "Flexible departure times, dwell lengths and dining—true leisure pacing without group rush.",
  },
  vip: {
    titleCN: "VIP服务",
    titleEN: "VIP Service",
    descriptionCN: "专车专导全程陪同，0购物0强推自费，私密舒适的高端出行体验。",
    descriptionEN:
      "Private vehicle and licensed guide throughout—zero shopping, zero forced extras, discreet VIP service.",
  },
} as const;

export const shaanxiProducts: Product[] = [
  {
    id: "xian-930-4d",
    titleCN: "九点半西安4日",
    titleEN: "Xi'an Nine-Thirty · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Small Group · Max 13",
    groupSizeCN: "精品小团 · 13人封顶",
    route: "Xi'an City Loop",
    routeCN: "西安市区环线",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "睡到自然醒", en: "Sleep In Naturally" },
      { cn: "9:30出发", en: "9:30 Departure" },
      { cn: "汉服妆造", en: "Hanfu Styling" },
      { cn: "兵马俑", en: "Terracotta Warriors" },
      { cn: "千古情", en: "Eternal Love Show" },
      { cn: "大唐不夜城", en: "Great Tang All-Day Mall" },
    ],
    coverImage: COVER_IMAGES[0],
    pdfFile: "/resources/shaanxi/xian-930-4d.docx",
    highlights: [
      {
        titleCN: "9:30晚出发",
        titleEN: "Late 9:30 Start",
        descriptionCN: "每日约9:30集合出发，睡到自然醒，告别早起赶路，适合轻松度假节奏。",
        descriptionEN:
          "Daily meet-up around 9:30—sleep in naturally and skip dawn rushes for a relaxed holiday pace.",
      },
      {
        titleCN: "汉服妆造体验",
        titleEN: "Hanfu Styling",
        descriptionCN: "专业汉服妆造，打卡大雁塔北广场与盛唐夜景，旅拍氛围感拉满。",
        descriptionEN:
          "Professional Hanfu styling at Giant Wild Goose Pagoda North Square and Tang-night backdrops.",
      },
      {
        titleCN: "兵马俑 + 秦俑DIY",
        titleEN: "Terracotta + DIY",
        descriptionCN: "深度游览兵马俑博物馆，并亲手制作迷你秦俑，把博物馆体验带回家。",
        descriptionEN:
          "In-depth Terracotta Warriors visit plus hands-on mini warrior DIY to take the museum home.",
      },
      {
        titleCN: "千古情夜游接送",
        titleEN: "Tang Paradise Night Transfer",
        descriptionCN: "安排西安千古情演出，并提供酒店往返接送，夜游大唐不夜城更省心。",
        descriptionEN:
          "Eternal Love show with hotel round-trip transfer, plus an easy Great Tang All-Day Mall night stroll.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 接机入住",
        titleEN: "Arrive Xi'an · Pickup & Check-in",
        descriptionCN:
          "抵达西安后专车接机/站，送至酒店办理入住。全天自由活动，建议早班抵达充分休息。次日导游将于当晚联系确认集合信息。",
        descriptionEN:
          "Private airport/station pickup and hotel check-in. Free day to rest—early arrivals recommended. Day-2 guide confirms meet-up details by evening.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "青龙寺 · 西安博物院 · 汉服 · 大唐不夜城",
        titleEN: "Qinglong Temple · Xi'an Museum · Hanfu · Tang Night City",
        descriptionCN:
          "约9:30出发，游览青龙寺与西安博物院，感受古都人文底蕴。下午安排汉服妆造，打卡大雁塔北广场，晚间漫步大唐不夜城，沉浸盛唐夜色。",
        descriptionEN:
          "Depart ~9:30 for Qinglong Temple and Xi'an Museum. Afternoon Hanfu styling at Giant Wild Goose Pagoda North Square, then evening stroll through Great Tang All-Day Mall.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "兵马俑 · 秦俑DIY · 千古情",
        titleEN: "Terracotta Warriors · DIY · Eternal Love",
        descriptionCN:
          "前往世界第八大奇迹兵马俑博物馆深度游览，并体验秦俑DIY手工。晚间观看西安千古情演出，酒店接送往返。",
        descriptionEN:
          "In-depth visit to the Terracotta Warriors Museum with mini warrior DIY. Evening Eternal Love show with hotel round-trip transfer.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "明城墙 · 洒金桥 · 返程",
        titleEN: "City Wall · Sajinqiao · Departure",
        descriptionCN:
          "骑行或漫步明城墙，感受古城轮廓；探访洒金桥烟火市井。视季节安排盲盒景点，后送机/站返程。",
        descriptionEN:
          "Walk or cycle the Ming City Wall and explore Sajinqiao’s local food streets. Seasonal blind-box sight as available, then airport/station transfer for departure.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车（13人封顶，保证每人1正座）",
        "住宿：携程3钻 / 4钻任选（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务；5人及以下司机兼导",
        "接送：西安接机/站与返程送机/站",
        "赠送：汉服妆造体验、秦俑DIY、西安千古情演出及酒店往返接送",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach (max 13; guaranteed seats)",
        "Hotels: Ctrip 3- or 4-diamond options in Xi'an (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide; driver-guide for 5 or fewer",
        "Transfers: Xi'an airport/station pickup and departure drop-off",
        "Complimentary: Hanfu styling, Terracotta DIY, Eternal Love show with hotel transfer",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "gudu-adventure-4d",
    titleCN: "古都奇遇记4日",
    titleEN: "Ancient Capital Adventure · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Small Group · Max 22",
    groupSizeCN: "精品小团 · 22人封顶",
    route: "Xi'an · Xianyang · Qinling",
    routeCN: "西安 · 咸阳 · 秦岭",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "兵马俑", en: "Terracotta Warriors" },
      { cn: "铜车马", en: "Bronze Chariots" },
      { cn: "秦小篆体验", en: "Qin Seal Script" },
      { cn: "咸阳宫考古", en: "Xianyang Palace Dig" },
      { cn: "秦岭四宝", en: "Qinling Four Treasures" },
      { cn: "千古情", en: "Eternal Love Show" },
    ],
    coverImage: COVER_IMAGES[1],
    pdfFile: "/resources/shaanxi/gudu-adventure-4d.docx",
    highlights: [
      {
        titleCN: "兵马俑 + 铜车马",
        titleEN: "Warriors & Bronze Chariots",
        descriptionCN: "兵马俑博物馆深度游览，并参观铜车马展厅，近距离感受秦帝国军阵与工艺巅峰。",
        descriptionEN:
          "In-depth Terracotta Museum visit plus Bronze Chariots hall—Qin military might and craftsmanship up close.",
      },
      {
        titleCN: "秦小篆与考古体验",
        titleEN: "Seal Script & Archaeology",
        descriptionCN: "体验秦小篆书写，并参与咸阳宫考古挖掘互动，把课堂搬进遗址现场。",
        descriptionEN:
          "Hands-on Qin seal-script practice and interactive dig at Xianyang Palace ruins.",
      },
      {
        titleCN: "秦岭四宝观熊猫",
        titleEN: "Qinling Pandas",
        descriptionCN: "走进秦岭四宝主题园区，近距离观察大熊猫等秦岭珍稀物种。",
        descriptionEN:
          "Visit the Qinling Four Treasures park for close encounters with giant pandas and rare Qinling wildlife.",
      },
      {
        titleCN: "博物院 + 不夜城",
        titleEN: "Museum & Night City",
        descriptionCN: "西安博物院读懂古都脉络，夜游大唐不夜城与千古情，文旅体验更立体。",
        descriptionEN:
          "Xi'an Museum for capital context, plus Eternal Love and Great Tang All-Day Mall for night immersion.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 接机入住",
        titleEN: "Arrive Xi'an · Pickup & Check-in",
        descriptionCN:
          "抵达西安后专车接机/站入住。全天自由活动，充分休息。导游当晚联系确认次日行程。",
        descriptionEN:
          "Airport/station pickup and hotel check-in. Free day to rest. Guide confirms Day-2 details by evening.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "兵马俑 · 秦小篆 · 铜车马 · 千古情",
        titleEN: "Terracotta · Seal Script · Chariots · Eternal Love",
        descriptionCN:
          "深度游览兵马俑，体验秦小篆书写，参观铜车马展厅。晚间观看西安千古情演出。",
        descriptionEN:
          "Terracotta Warriors in depth, Qin seal-script workshop, Bronze Chariots hall, then evening Eternal Love show.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "咸阳宫考古 · 秦岭四宝 · 大唐不夜城",
        titleEN: "Xianyang Dig · Qinling Pandas · Tang Night City",
        descriptionCN:
          "前往秦咸阳宫遗址参与考古挖掘体验，再赴秦岭四宝园区观熊猫。晚间漫步大唐不夜城。",
        descriptionEN:
          "Interactive archaeology at Qin Xianyang Palace ruins, Qinling Four Treasures panda visit, then Great Tang All-Day Mall at night.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "西安博物院 · 钟鼓楼回民街 · 返程",
        titleEN: "Xi'an Museum · Muslim Quarter · Departure",
        descriptionCN:
          "参观西安博物院梳理古都脉络，漫步钟鼓楼与回民街感受市井烟火，后送机/站返程。",
        descriptionEN:
          "Xi'an Museum for capital context, Bell & Drum Towers and Muslim Quarter stroll, then departure transfer.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车（22人封顶，保证每人1正座）",
        "住宿：携程3钻 / 4钻任选（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务；5人及以下司机兼导",
        "接送：西安接机/站与返程送机/站",
        "赠送：秦小篆体验、咸阳宫考古互动、西安千古情演出",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach (max 22; guaranteed seats)",
        "Hotels: Ctrip 3- or 4-diamond options in Xi'an (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide; driver-guide for 5 or fewer",
        "Transfers: Xi'an airport/station pickup and departure drop-off",
        "Complimentary: Qin seal-script workshop, Xianyang dig experience, Eternal Love show",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "premium-xian-4d",
    titleCN: "尊贵西安4日",
    titleEN: "Prestigious Xi'an · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Boutique Group · Max 6",
    groupSizeCN: "精品小团 · 6人封顶",
    route: "Xi'an Premium Loop",
    routeCN: "西安精品环线",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "奔驰商务", en: "Mercedes Business Van" },
      { cn: "6人封顶", en: "Max 6 Guests" },
      { cn: "武皇盛宴", en: "Wu Empress Banquet" },
      { cn: "长恨歌", en: "Song of Everlasting Sorrow" },
      { cn: "碑林", en: "Stele Forest" },
      { cn: "独立讲解", en: "Private Guiding" },
    ],
    coverImage: COVER_IMAGES[2],
    pdfFile: "/resources/shaanxi/premium-xian-4d.docx",
    highlights: [
      {
        titleCN: "奔驰商务专车",
        titleEN: "Mercedes Business Van",
        descriptionCN: "全程奔驰商务用车，2人起即配导游+司机，尊享私密舒适出行。",
        descriptionEN:
          "Mercedes business van throughout; dedicated guide + driver from just 2 guests for private comfort.",
      },
      {
        titleCN: "武皇盛宴前两排",
        titleEN: "Wu Banquet Front Rows",
        descriptionCN: "武皇盛宴优先前两排席位，沉浸式感受盛唐宫廷宴乐。",
        descriptionEN:
          "Priority front-two-row seats at the Wu Empress Banquet for immersive Tang court pageantry.",
      },
      {
        titleCN: "长恨歌中区前两场",
        titleEN: "Everlasting Sorrow Prime Slots",
        descriptionCN: "长恨歌优先中区前两场次观演，华清夜色与史诗演出尽收眼底。",
        descriptionEN:
          "Priority mid-section seats for the first two Song of Everlasting Sorrow shows—prime Huaqing night viewing.",
      },
      {
        titleCN: "三大博物馆独立讲解",
        titleEN: "Private Museum Guiding",
        descriptionCN: "碑林、陕西历史博物馆与兵马俑均安排独立讲解，深度读懂古都。",
        descriptionEN:
          "Dedicated guiding at Stele Forest, Shaanxi History Museum and Terracotta Warriors.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · VIP奔驰接机",
        titleEN: "Arrive Xi'an · VIP B-Class Pickup",
        descriptionCN:
          "抵达后奔驰商务专车接机/站，尊享入住服务。全天自由活动，充分休息。",
        descriptionEN:
          "Mercedes business-van VIP pickup and hotel check-in. Free day to rest and settle in.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "碑林 · 武皇盛宴 · 明城墙 · 大唐不夜城",
        titleEN: "Stele Forest · Wu Banquet · City Wall · Tang Night",
        descriptionCN:
          "碑林博物馆独立讲解；午后或晚间观赏武皇盛宴（前两排）。漫步明城墙，夜游大唐不夜城。",
        descriptionEN:
          "Private Stele Forest guiding; Wu Empress Banquet (front rows). Ming City Wall stroll and Great Tang All-Day Mall at night.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "兵马俑 · DIY · 长恨歌",
        titleEN: "Terracotta · DIY · Everlasting Sorrow",
        descriptionCN:
          "兵马俑独立讲解深度游览，体验秦俑DIY。晚间于华清宫观赏长恨歌（中区前两场优先）。",
        descriptionEN:
          "Private Terracotta guiding with DIY workshop. Evening Song of Everlasting Sorrow at Huaqing (priority mid-section early shows).",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "陕历博 · 钟鼓楼回民街 · 返程",
        titleEN: "Shaanxi History Museum · Muslim Quarter · Departure",
        descriptionCN:
          "陕西历史博物馆独立讲解，漫步钟鼓楼与回民街，后尊享送机/站返程。",
        descriptionEN:
          "Private guiding at Shaanxi History Museum, Bell & Drum Towers and Muslim Quarter, then VIP departure transfer.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程奔驰商务空调专车（6人封顶）",
        "住宿：携程3钻 / 4钻任选（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：2人起导游+司机双服务配置",
        "接送：西安奔驰商务接机/站与返程送机/站",
        "赠送：武皇盛宴前两排、长恨歌中区前两场优先、碑林/陕历博/兵马俑独立讲解、秦俑DIY",
      ],
      en: [
        "Transport: Mercedes business van throughout (max 6)",
        "Hotels: Ctrip 3- or 4-diamond options in Xi'an (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: dedicated guide + driver from 2 guests",
        "Transfers: Xi'an Mercedes pickup and departure drop-off",
        "Complimentary: Wu Banquet front rows, Everlasting Sorrow priority seats, private museum guiding, Terracotta DIY",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "weekend-fly-3d",
    titleCN: "打个飞的度周末3日",
    titleEN: "Fly-in Weekend · 3 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 3,
    groupSize: "Small Group · Max 13",
    groupSizeCN: "精品小团 · 13人封顶",
    route: "Xi'an Classic Weekend Route",
    routeCN: "西安经典周末线",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "周末短途", en: "Weekend Escape" },
      { cn: "13人封顶", en: "Max 13 Guests" },
      { cn: "兵马俑", en: "Terracotta Warriors" },
      { cn: "千古情", en: "Eternal Love Show" },
      { cn: "汉服妆造", en: "Hanfu Styling" },
      { cn: "大唐不夜城", en: "Great Tang All-Day Mall" },
    ],
    coverImage: COVER_IMAGES[3],
    pdfFile: "/resources/shaanxi/weekend-fly-3d.docx",
    highlights: [
      {
        titleCN: "周末高效打卡",
        titleEN: "Efficient Weekend Hits",
        descriptionCN: "三天浓缩西安精华，适合打个飞的度周末的都市旅客。",
        descriptionEN:
          "Three days of Xi'an essentials—ideal for fly-in weekend travelers from other cities.",
      },
      {
        titleCN: "兵马俑 + 千古情",
        titleEN: "Warriors & Eternal Love",
        descriptionCN: "白天兵马俑，夜晚千古情，古今对照的周末体验。",
        descriptionEN:
          "Terracotta by day and Eternal Love by night—past and spectacle in one weekend.",
      },
      {
        titleCN: "汉服夜游不夜城",
        titleEN: "Hanfu Night City",
        descriptionCN: "汉服妆造后漫步大唐不夜城，周末夜色更有仪式感。",
        descriptionEN:
          "Hanfu styling then a night walk through Great Tang All-Day Mall for weekend atmosphere.",
      },
      {
        titleCN: "博物院 + 盲盒景点",
        titleEN: "Museum + Blind-Box Sight",
        descriptionCN: "西安博物院梳理脉络，返程前再加季节性盲盒景点惊喜。",
        descriptionEN:
          "Xi'an Museum for context, plus a seasonal blind-box sight before departure.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 接机入住",
        titleEN: "Arrive Xi'an · Pickup & Check-in",
        descriptionCN:
          "抵达西安后专车接机/站入住。建议周五晚或周六早抵达，当晚自由活动休整。",
        descriptionEN:
          "Airport/station pickup and hotel check-in. Friday evening or Saturday morning arrivals recommended; free evening to rest.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "兵马俑 · 千古情 · 汉服 · 大唐不夜城",
        titleEN: "Terracotta · Eternal Love · Hanfu · Tang Night",
        descriptionCN:
          "全天精华：兵马俑博物馆；傍晚汉服妆造；晚间千古情演出并夜游大唐不夜城。",
        descriptionEN:
          "Full classic day: Terracotta Warriors, Hanfu styling, Eternal Love show and Great Tang All-Day Mall night walk.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "西安博物院 · 钟鼓楼回民街 · 盲盒 · 返程",
        titleEN: "Xi'an Museum · Muslim Quarter · Blind-Box · Departure",
        descriptionCN:
          "参观西安博物院，漫步钟鼓楼与回民街，视季节安排盲盒景点，后送机/站返程。",
        descriptionEN:
          "Xi'an Museum, Bell & Drum Towers and Muslim Quarter, seasonal blind-box sight, then departure transfer.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车（13人封顶，保证每人1正座）",
        "住宿：携程3钻 / 4钻任选（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务；5人及以下司机兼导",
        "接送：西安接机/站与返程送机/站",
        "赠送：汉服妆造体验、西安千古情演出",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach (max 13; guaranteed seats)",
        "Hotels: Ctrip 3- or 4-diamond options in Xi'an (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide; driver-guide for 5 or fewer",
        "Transfers: Xi'an airport/station pickup and departure drop-off",
        "Complimentary: Hanfu styling and Eternal Love show",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "huashan-explorer-5d",
    titleCN: "玩转华山5日",
    titleEN: "Huashan Explorer · 5 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 5,
    groupSize: "Small Group · Max 13",
    groupSizeCN: "精品小团 · 13人封顶",
    route: "Xi'an - Huaqing Palace - Mount Hua",
    routeCN: "西安 - 华清宫 - 华山",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "华山全天", en: "Full Day Huashan" },
      { cn: "华清宫", en: "Huaqing Palace" },
      { cn: "兵马俑", en: "Terracotta Warriors" },
      { cn: "千古情", en: "Eternal Love Show" },
      { cn: "汉服妆造", en: "Hanfu Styling" },
      { cn: "13人封顶", en: "Max 13 Guests" },
    ],
    coverImage: COVER_IMAGES[0],
    pdfFile: "/resources/shaanxi/huashan-explorer-5d.docx",
    highlights: [
      {
        titleCN: "华山全天深度",
        titleEN: "Full-Day Mount Hua",
        descriptionCN: "华山全天游览，含导览器、手套与祈福带，尽览五岳奇险。",
        descriptionEN:
          "Full-day Mount Hua with audio guide, gloves and blessing ribbon—classic Hua cliffs experience.",
      },
      {
        titleCN: "兵马俑 + 华清宫",
        titleEN: "Warriors & Huaqing",
        descriptionCN: "临潼双经典：兵马俑与华清宫连线，历史脉络一气呵成。",
        descriptionEN:
          "Lintong classics linked—Terracotta Warriors and Huaqing Palace in one historical arc.",
      },
      {
        titleCN: "古城夜游套餐",
        titleEN: "City Night Package",
        descriptionCN: "城墙、博物院、千古情与汉服不夜城，西安夜色一次集齐。",
        descriptionEN:
          "City Wall, museum, Eternal Love and Hanfu night city—Xi'an evenings covered.",
      },
      {
        titleCN: "精品小团服务",
        titleEN: "Small Group Service",
        descriptionCN: "13人封顶，节奏可控；索道与景区小交通自理，行程透明无隐藏强制。",
        descriptionEN:
          "Capped at 13 for manageable pacing; cable cars and entry shuttles self-pay—transparent, no forced add-ons.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 接机入住",
        titleEN: "Arrive Xi'an · Pickup & Check-in",
        descriptionCN:
          "抵达西安后专车接机/站入住。全天自由活动，建议充分休息以迎接后续行程。",
        descriptionEN:
          "Airport/station pickup and hotel check-in. Free day—rest well ahead of the fuller itinerary.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "明城墙 · 西安博物院 · 钟鼓楼 · 千古情 · 汉服 · 不夜城",
        titleEN: "City Wall · Museum · Towers · Eternal Love · Hanfu · Night City",
        descriptionCN:
          "漫步明城墙，参观西安博物院，打卡钟鼓楼与回民街。晚间千古情演出，汉服妆造后夜游大唐不夜城。",
        descriptionEN:
          "Ming City Wall, Xi'an Museum, Bell & Drum Towers and Muslim Quarter. Evening Eternal Love, Hanfu styling and Great Tang All-Day Mall.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "兵马俑 · 华清宫 · 赴华山住宿",
        titleEN: "Terracotta · Huaqing · Transfer to Huashan",
        descriptionCN:
          "游览兵马俑与华清宫，感受临潼双名片。傍晚赴华山脚下入住，为次日登山蓄力。",
        descriptionEN:
          "Terracotta Warriors and Huaqing Palace in Lintong. Evening transfer to Mount Hua foothills lodging for the summit day.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "华山",
        lodgingEN: "Huashan",
      },
      {
        day: 4,
        titleCN: "华山全天 · 返西安",
        titleEN: "Full-Day Mount Hua · Return Xi'an",
        descriptionCN:
          "华山全天游览（含导览器、手套、祈福带；索道与进山小交通自理）。傍晚返回西安入住。",
        descriptionEN:
          "Full-day Mount Hua (audio guide, gloves, blessing ribbon included; cable cars and entry shuttle self-pay). Evening return to Xi'an.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 5,
        titleCN: "送机/站返程",
        titleEN: "Departure Transfer",
        descriptionCN:
          "酒店早餐后按航班/车次安排送机/站，结束华山西安之旅。",
        descriptionEN:
          "After hotel breakfast, airport/station transfer per your schedule—end of the Huashan–Xi'an journey.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车（13人封顶，保证每人1正座）",
        "住宿：携程3钻 / 4钻任选（西安、华山；默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务；5人及以下司机兼导",
        "接送：西安接机/站与返程送机/站",
        "赠送：华山导览器+手套+祈福带、汉服妆造、西安千古情演出",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach (max 13; guaranteed seats)",
        "Hotels: Ctrip 3- or 4-diamond options in Xi'an and Huashan (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide; driver-guide for 5 or fewer",
        "Transfers: Xi'an airport/station pickup and departure drop-off",
        "Complimentary: Huashan audio guide + gloves + blessing ribbon, Hanfu styling, Eternal Love show",
      ],
    },
    excluded: {
      cn: [
        "华山索道、进山区间车等景区内自费交通（需自理）",
        "不可抗力或航班延误、车辆故障等导致行程变更产生的额外费用",
        "出发地至西安的大交通，以及燃油附加费临时上涨差额",
        "个人消费：洗衣、通讯、娱乐、自由购物及费用包含未列明项目",
        "单房差；儿童门票、电瓶车、床位等另计费用",
        "酒店押金（通常每间100–300元，离店无损坏全额退还）",
      ],
      en: [
        "Mount Hua cable cars and entry shuttles (self-pay)",
        "Extra costs from force majeure, flight delays, vehicle issues or itinerary changes",
        "Long-haul transport to Xi'an and temporary fuel surcharge differences",
        "Personal expenses (laundry, communications, entertainment, shopping) and unlisted items",
        "Single supplements; child tickets, shuttle carts, beds and similar extras",
        "Hotel deposits (typically CNY 100–300/room; refunded if no damage)",
      ],
    },
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "changan-city-4d",
    titleCN: "玩转长安城4日",
    titleEN: "Chang'an City Explorer · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Small Group · Max 22 · 2+1 First-Class Coach",
    groupSizeCN: "精品小团 · 22人封顶 · 2+1头等舱用车",
    route: "Xi'an · Bailuyuan · Yongxingfang",
    routeCN: "西安 · 白鹿原 · 永兴坊",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "2+1头等舱", en: "2+1 First-Class Coach" },
      { cn: "白鹿原", en: "Bailuyuan" },
      { cn: "永兴坊", en: "Yongxingfang" },
      { cn: "兵马俑", en: "Terracotta Warriors" },
      { cn: "小南门早市", en: "Xiaonanmen Morning Market" },
      { cn: "酒店升级", en: "Hotel Upgrade" },
    ],
    coverImage: "/images/products/shaanxi/changan-city-4d-cover.jpg",
    featured: true,
    pdfFile: "/resources/shaanxi/changan-city-4d.doc",
    highlights: [
      {
        titleCN: "2+1头等舱用车",
        titleEN: "2+1 First-Class Coach",
        descriptionCN: "2+1头等舱布局旅游车，乘坐舒适度更高，长途不累。",
        descriptionEN:
          "2+1 first-class coach seating for superior comfort on transfer days.",
      },
      {
        titleCN: "白鹿原沉浸体验",
        titleEN: "Bailuyuan Immersion",
        descriptionCN: "白鹿原民俗文化体验（含二虎守长安等），读懂关中乡土与传奇。",
        descriptionEN:
          "Bailuyuan folk-culture immersion including Erhu Guard Chang'an and related experiences.",
      },
      {
        titleCN: "早市 + 永兴坊",
        titleEN: "Morning Market & Yongxingfang",
        descriptionCN: "小南门早市烟火与永兴坊非遗美食，吃出真正的长安味道。",
        descriptionEN:
          "Xiaonanmen morning market energy and Yongxingfang heritage snacks—real Chang'an flavors.",
      },
      {
        titleCN: "酒店钻级升级",
        titleEN: "Hotel Diamond Upgrade",
        descriptionCN: "三钻酒店为主，并升级含1晚五钻住宿，住得更有品质。",
        descriptionEN:
          "Primarily 3-diamond hotels with one night upgraded to 5-diamond.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 接机入住",
        titleEN: "Arrive Xi'an · Pickup & Check-in",
        descriptionCN:
          "抵达西安后专车接机/站入住。全天自由活动，适应古都节奏。",
        descriptionEN:
          "Airport/station pickup and hotel check-in. Free day to settle into the capital’s pace.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "兵马俑 · 铜车马 · 千古情 · 钟鼓楼回民街",
        titleEN: "Terracotta · Chariots · Eternal Love · Muslim Quarter",
        descriptionCN:
          "深度游览兵马俑与铜车马，晚间观看千古情。可夜游钟鼓楼与回民街感受市井烟火。",
        descriptionEN:
          "Terracotta Warriors and Bronze Chariots by day; Eternal Love show, then Bell & Drum Towers and Muslim Quarter at night.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "小南门早市 · 博物院小雁塔 · 白鹿原 · 汉服 · 不夜城",
        titleEN: "Morning Market · Museum · Bailuyuan · Hanfu · Night City",
        descriptionCN:
          "清晨探访小南门早市；参观西安博物院与小雁塔；赴白鹿原体验（含二虎守长安等）；下午汉服妆造，夜游大唐不夜城。",
        descriptionEN:
          "Xiaonanmen morning market; Xi'an Museum and Small Wild Goose Pagoda; Bailuyuan experiences (incl. Erhu Guard Chang'an); Hanfu styling and Great Tang All-Day Mall.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "陕历博 · 永兴坊 · 返程",
        titleEN: "Shaanxi History Museum · Yongxingfang · Departure",
        descriptionCN:
          "参观陕西历史博物馆，逛永兴坊品尝非遗美食，后送机/站返程。",
        descriptionEN:
          "Shaanxi History Museum, Yongxingfang heritage food street, then departure transfer.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程2+1头等舱布局空调旅游车（22人封顶，保证每人1正座）",
        "住宿：携程三钻酒店为主，含1晚五钻升级（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务；5人及以下司机兼导",
        "接送：西安接机/站与返程送机/站",
        "赠送：汉服妆造体验、西安千古情演出、白鹿原指定体验项目",
      ],
      en: [
        "Transport: 2+1 first-class air-conditioned coach (max 22; guaranteed seats)",
        "Hotels: primarily Ctrip 3-diamond with 1 night 5-diamond upgrade (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide; driver-guide for 5 or fewer",
        "Transfers: Xi'an airport/station pickup and departure drop-off",
        "Complimentary: Hanfu styling, Eternal Love show, Bailuyuan designated experiences",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "time-travel-xian-4d",
    titleCN: "穿越西安4日",
    titleEN: "Time-Travel Xi'an · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Small Group · Max 13",
    groupSizeCN: "精品小团 · 13人封顶",
    route: "Xi'an · Lintong · Yongxingfang",
    routeCN: "西安 · 临潼 · 永兴坊",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "千古情", en: "Eternal Love Show" },
      { cn: "驼铃传奇", en: "Camel Bell Legend" },
      { cn: "唐猫酒肆", en: "Tang Cat Tavern" },
      { cn: "汉服妆造", en: "Hanfu Styling" },
      { cn: "华清宫骊山", en: "Huaqing & Lishan" },
      { cn: "广仁寺", en: "Guangren Temple" },
    ],
    coverImage: "/images/products/shaanxi/time-travel-xian-4d-cover.jpg",
    featured: true,
    pdfFile: "/resources/shaanxi/time-travel-xian-4d.docx",
    highlights: [
      {
        titleCN: "双演艺穿越",
        titleEN: "Dual Shows Time-Travel",
        descriptionCN: "千古情与驼铃传奇双演艺，丝路与盛唐两条时间线同框。",
        descriptionEN:
          "Eternal Love and Camel Bell Legend—Silk Road and Tang timelines in one trip.",
      },
      {
        titleCN: "汉服 + 唐猫酒肆",
        titleEN: "Hanfu & Tang Cat Tavern",
        descriptionCN: "汉服妆造搭配唐风打卡，唐猫酒肆氛围感满满。",
        descriptionEN:
          "Hanfu styling with Tang-atmosphere photo stops including Tang Cat Tavern vibes.",
      },
      {
        titleCN: "临潼经典线",
        titleEN: "Lintong Classics",
        descriptionCN: "兵马俑与华清宫骊山连线，秦唐传奇一站打卡。",
        descriptionEN:
          "Terracotta Warriors linked with Huaqing Palace and Mount Li—Qin and Tang legends.",
      },
      {
        titleCN: "广仁寺 + 永兴坊",
        titleEN: "Guangren & Yongxingfang",
        descriptionCN: "广仁寺静心祈福，永兴坊收尾美食，穿越之旅圆满落幕。",
        descriptionEN:
          "Quiet blessing at Guangren Temple and Yongxingfang snacks to close the time-travel loop.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 接机入住",
        titleEN: "Arrive Xi'an · Pickup & Check-in",
        descriptionCN:
          "抵达西安后专车接机/站入住。全天自由活动，开启穿越古都之旅。",
        descriptionEN:
          "Airport/station pickup and hotel check-in. Free day to begin your time-travel in the ancient capital.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "西安博物院 · 汉服 · 回民街 · 驼铃传奇 · 不夜城",
        titleEN: "Museum · Hanfu · Muslim Quarter · Camel Bell · Night City",
        descriptionCN:
          "参观西安博物院，汉服妆造后漫步钟鼓楼回民街；晚间观看驼铃传奇，夜游大唐不夜城。",
        descriptionEN:
          "Xi'an Museum, Hanfu styling, Bell & Drum Towers and Muslim Quarter; evening Camel Bell Legend and Great Tang All-Day Mall.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "兵马俑 · 华清宫骊山 · 千古情",
        titleEN: "Terracotta · Huaqing & Lishan · Eternal Love",
        descriptionCN:
          "游览兵马俑，登华清宫与骊山感受唐宫传奇；晚间观看西安千古情。",
        descriptionEN:
          "Terracotta Warriors, Huaqing Palace and Mount Li, then evening Eternal Love show.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "广仁寺 · 明城墙 · 永兴坊 · 返程",
        titleEN: "Guangren Temple · City Wall · Yongxingfang · Departure",
        descriptionCN:
          "广仁寺静心游览，漫步明城墙，永兴坊品尝非遗美食后送机/站返程。",
        descriptionEN:
          "Guangren Temple, Ming City Wall stroll, Yongxingfang heritage snacks, then departure transfer.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车（13人封顶，保证每人1正座）",
        "住宿：携程3钻 / 4钻任选（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务；5人及以下司机兼导",
        "接送：西安接机/站与返程送机/站",
        "赠送：汉服妆造、千古情与驼铃传奇双演艺",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach (max 13; guaranteed seats)",
        "Hotels: Ctrip 3- or 4-diamond options in Xi'an (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide; driver-guide for 5 or fewer",
        "Transfers: Xi'an airport/station pickup and departure drop-off",
        "Complimentary: Hanfu styling, Eternal Love and Camel Bell Legend dual shows",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "xiaoyao-xian-4d",
    titleCN: "逍遥西安4日",
    titleEN: "Carefree Xi'an · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Small Group · Max 10",
    groupSizeCN: "精品小团 · 10人封顶",
    route: "Xi'an · Lintong",
    routeCN: "西安 · 临潼",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "长恨歌", en: "Song of Everlasting Sorrow" },
      { cn: "陕历博", en: "Shaanxi History Museum" },
      { cn: "长安十二时辰", en: "The Longest Day in Chang'an" },
      { cn: "汉服妆造", en: "Hanfu Styling" },
      { cn: "华清电瓶车", en: "Huaqing Shuttle Included" },
      { cn: "10人封顶", en: "Max 10 Guests" },
    ],
    coverImage: COVER_IMAGES[3],
    pdfFile: "/resources/shaanxi/xiaoyao-xian-4d.docx",
    highlights: [
      {
        titleCN: "长恨歌华清夜",
        titleEN: "Everlasting Sorrow Night",
        descriptionCN: "临潼住宿观看长恨歌，沉浸华清宫夜色与盛唐爱情史诗。",
        descriptionEN:
          "Overnight in Lintong for Song of Everlasting Sorrow—Huaqing night and Tang romance epic.",
      },
      {
        titleCN: "长安十二时辰",
        titleEN: "Longest Day in Chang'an",
        descriptionCN: "沉浸式街区长安十二时辰，穿越盛唐市井一日。",
        descriptionEN:
          "Immersive The Longest Day in Chang'an district—one day inside Tang street life.",
      },
      {
        titleCN: "陕历博 + 汉服",
        titleEN: "Museum & Hanfu",
        descriptionCN: "陕西历史博物馆打底，汉服妆造出片，文化与颜值兼得。",
        descriptionEN:
          "Shaanxi History Museum for depth, Hanfu styling for photos—culture and camera-ready looks.",
      },
      {
        titleCN: "华清电瓶车赠送",
        titleEN: "Huaqing Cart Included",
        descriptionCN: "华清宫电瓶车赠送，减少步行疲劳，逍遥更轻松。",
        descriptionEN:
          "Complimentary Huaqing Palace electric cart—less walking fatigue, more carefree pacing.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 接机入住",
        titleEN: "Arrive Xi'an · Pickup & Check-in",
        descriptionCN:
          "抵达西安后专车接机/站入住。全天自由活动，开启逍遥古都之旅。",
        descriptionEN:
          "Airport/station pickup and hotel check-in. Free day to begin a carefree capital escape.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "陕历博 · 汉服 · 长安十二时辰 · 大唐不夜城",
        titleEN: "History Museum · Hanfu · Chang'an Day · Night City",
        descriptionCN:
          "参观陕西历史博物馆，汉服妆造后沉浸长安十二时辰街区，晚间漫步大唐不夜城。",
        descriptionEN:
          "Shaanxi History Museum, Hanfu styling, The Longest Day in Chang'an immersion, then Great Tang All-Day Mall at night.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "兵马俑 · 华清宫骊山 · 长恨歌（临潼住）",
        titleEN: "Terracotta · Huaqing · Everlasting Sorrow (Lintong)",
        descriptionCN:
          "游览兵马俑与华清宫骊山（含电瓶车），晚间观赏长恨歌，当晚临潼入住。",
        descriptionEN:
          "Terracotta Warriors and Huaqing Palace & Mount Li (cart included); evening Song of Everlasting Sorrow with Lintong overnight.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "临潼",
        lodgingEN: "Lintong",
      },
      {
        day: 4,
        titleCN: "明城墙 · 钟鼓楼回民街 · 返程",
        titleEN: "City Wall · Muslim Quarter · Departure",
        descriptionCN:
          "返回西安漫步明城墙，逛钟鼓楼与回民街，后送机/站返程。",
        descriptionEN:
          "Return to Xi'an for Ming City Wall, Bell & Drum Towers and Muslim Quarter, then departure transfer.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车（10人封顶，保证每人1正座）",
        "住宿：携程3钻 / 4钻任选（西安、临潼；默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务；5人及以下司机兼导",
        "接送：西安接机/站与返程送机/站",
        "赠送：汉服妆造、长恨歌演出、华清宫电瓶车",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach (max 10; guaranteed seats)",
        "Hotels: Ctrip 3- or 4-diamond options in Xi'an and Lintong (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide; driver-guide for 5 or fewer",
        "Transfers: Xi'an airport/station pickup and departure drop-off",
        "Complimentary: Hanfu styling, Song of Everlasting Sorrow, Huaqing electric cart",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "drunk-changan-4d",
    titleCN: "醉长安4日",
    titleEN: "Enchanted Chang'an · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Small Group · Max 13",
    groupSizeCN: "精品小团 · 13人封顶",
    route: "Xi'an · Lintong",
    routeCN: "西安 · 临潼",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "三博三绎", en: "3 Museums · 3 Shows" },
      { cn: "长恨歌", en: "Song of Everlasting Sorrow" },
      { cn: "千古情", en: "Eternal Love Show" },
      { cn: "1212", en: "1212 Show" },
      { cn: "华阴老腔", en: "Huayin Laoqiang" },
      { cn: "皮影", en: "Shadow Puppetry" },
    ],
    coverImage: "/images/products/shaanxi/drunk-changan-4d-cover.jpg",
    featured: true,
    pdfFile: "/resources/shaanxi/drunk-changan-4d.docx",
    highlights: [
      {
        titleCN: "三博三绎",
        titleEN: "3 Museums · 3 Shows",
        descriptionCN: "三大博物馆 + 长恨歌、千古情、1212三大演艺，文化密度拉满。",
        descriptionEN:
          "Three museums plus Song of Everlasting Sorrow, Eternal Love and 1212—maximum cultural density.",
      },
      {
        titleCN: "临潼双夜经典",
        titleEN: "Lintong Dual Classics",
        descriptionCN: "华清宫日游，1212与长恨歌夜演，临潼住宿无赶路焦虑。",
        descriptionEN:
          "Huaqing by day with 1212 and Everlasting Sorrow by night—Lintong lodging, no late rush.",
      },
      {
        titleCN: "老腔 + 皮影",
        titleEN: "Laoqiang & Shadow Play",
        descriptionCN: "高家大院华阴老腔与皮影表演，听见真正的关中声音。",
        descriptionEN:
          "Huayin Laoqiang and shadow puppetry at Gao Family Courtyard—authentic Guanzhong sound.",
      },
      {
        titleCN: "博物院 + 不夜城",
        titleEN: "Museum Circuit & Night City",
        descriptionCN: "陕历博、西安博物院与永兴坊、不夜城串线，醉在长安昼夜。",
        descriptionEN:
          "Shaanxi History Museum, Xi'an Museum, Yongxingfang and Great Tang All-Day Mall—day-to-night Chang'an.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 接机入住",
        titleEN: "Arrive Xi'an · Pickup & Check-in",
        descriptionCN:
          "抵达西安后专车接机/站入住。全天自由活动，准备沉醉长安。",
        descriptionEN:
          "Airport/station pickup and hotel check-in. Free day before diving into enchanted Chang'an.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "兵马俑 · 华清宫 · 1212 · 长恨歌（临潼）",
        titleEN: "Terracotta · Huaqing · 1212 · Everlasting Sorrow",
        descriptionCN:
          "游览兵马俑与华清宫；晚间连看1212与长恨歌，当晚临潼入住。",
        descriptionEN:
          "Terracotta Warriors and Huaqing Palace; evening 1212 and Song of Everlasting Sorrow with Lintong overnight.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "临潼",
        lodgingEN: "Lintong",
      },
      {
        day: 3,
        titleCN: "陕历博 · 明城墙 · 永兴坊 · 千古情 · 不夜城",
        titleEN: "History Museum · Wall · Yongxingfang · Eternal Love · Night City",
        descriptionCN:
          "返回西安参观陕历博，漫步明城墙与永兴坊；晚间千古情并夜游大唐不夜城。",
        descriptionEN:
          "Return to Xi'an for Shaanxi History Museum, City Wall and Yongxingfang; evening Eternal Love and Great Tang All-Day Mall.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "西安博物院小雁塔 · 回民街 · 高家大院 · 返程",
        titleEN: "Museum & Pagoda · Muslim Quarter · Gao Courtyard · Departure",
        descriptionCN:
          "参观西安博物院与小雁塔，逛钟鼓楼回民街；高家大院观赏皮影与华阴老腔后送机/站。",
        descriptionEN:
          "Xi'an Museum and Small Wild Goose Pagoda, Muslim Quarter, then Gao Family Courtyard shadow play and Huayin Laoqiang before departure.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车（13人封顶，保证每人1正座）",
        "住宿：携程3钻 / 4钻任选（西安、临潼；默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务；5人及以下司机兼导",
        "接送：西安接机/站与返程送机/站",
        "赠送：长恨歌、千古情、1212三大演艺，高家大院皮影与华阴老腔观赏",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach (max 13; guaranteed seats)",
        "Hotels: Ctrip 3- or 4-diamond options in Xi'an and Lintong (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide; driver-guide for 5 or fewer",
        "Transfers: Xi'an airport/station pickup and departure drop-off",
        "Complimentary: Everlasting Sorrow, Eternal Love and 1212 shows; Gao Courtyard shadow play & Laoqiang",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "changan-family-4d",
    titleCN: "长安亲子行4日",
    titleEN: "Chang'an Family Journey · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Small Group · Max 22",
    groupSizeCN: "精品小团 · 22人封顶",
    route: "Xi'an Family Study Route",
    routeCN: "西安亲子研学线",
    category: "Regular Product",
    categoryCN: "陕西常规产品",
    tags: [
      { cn: "亲子研学", en: "Family Study Tour" },
      { cn: "三大博物馆", en: "Three Museums" },
      { cn: "手工秦俑", en: "Terracotta DIY" },
      { cn: "帝国密码XR", en: "Empire Code XR" },
      { cn: "西安交大", en: "Xi'an Jiaotong University" },
      { cn: "礼仪手绘", en: "Etiquette & Silk Road Map" },
    ],
    coverImage: COVER_IMAGES[1],
    pdfFile: "/resources/shaanxi/changan-family-4d.doc",
    highlights: [
      {
        titleCN: "三大博物馆",
        titleEN: "Three Museums",
        descriptionCN: "兵马俑、陕历博秦汉馆与亲子友好场馆串线，寓教于游。",
        descriptionEN:
          "Terracotta, Shaanxi History Qin-Han halls and family-friendly venues—learning through travel.",
      },
      {
        titleCN: "三大游学体验",
        titleEN: "Three Study Experiences",
        descriptionCN: "中华礼仪+手绘丝路地图、手工秦俑、帝国密码XR，动手动脑。",
        descriptionEN:
          "Chinese etiquette + Silk Road map drawing, Terracotta DIY and Empire Code XR—hands-on learning.",
      },
      {
        titleCN: "西安交大校园",
        titleEN: "XJTU Campus Visit",
        descriptionCN: "走进西安交通大学，激发少年求知与名校向往。",
        descriptionEN:
          "Visit Xi'an Jiaotong University to inspire curiosity and campus dreams.",
      },
      {
        titleCN: "永兴坊亲子寻宝",
        titleEN: "Yongxingfang Treasure Hunt",
        descriptionCN: "永兴坊趣味寻宝，亲子协作完成美食与非遗挑战。",
        descriptionEN:
          "Yongxingfang family treasure hunt—team up for food and heritage challenges.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 长安初印象",
        titleEN: "Arrive Xi'an · First Impressions of Chang'an",
        descriptionCN:
          "抵达西安后专车接机/站入住。轻量城市印象活动，帮助孩子适应旅途节奏。",
        descriptionEN:
          "Airport/station pickup and check-in. Light city-first-impression activities so kids settle into travel pace.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "兵马俑 · 帝国密码XR · 手工秦俑 · 铜车马",
        titleEN: "Terracotta · Empire Code XR · DIY · Bronze Chariots",
        descriptionCN:
          "深度游览兵马俑与铜车马，体验帝国密码XR沉浸课，动手制作手工秦俑。",
        descriptionEN:
          "Terracotta Warriors and Bronze Chariots, Empire Code XR immersion, and hands-on Terracotta DIY.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "西安交大 · 陕历博秦汉馆 · 大雁塔大唐不夜城",
        titleEN: "XJTU · History Museum · Pagoda & Night City",
        descriptionCN:
          "参观西安交通大学校园，走进陕历博秦汉馆；傍晚大雁塔与大唐不夜城亲子夜游。",
        descriptionEN:
          "Xi'an Jiaotong University campus, Shaanxi History Qin-Han halls, then Giant Wild Goose Pagoda and Great Tang All-Day Mall evening.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "汉城湖礼仪手绘 · 永兴坊寻宝 · 返程",
        titleEN: "Hancheng Lake Etiquette · Yongxingfang Hunt · Departure",
        descriptionCN:
          "汉城湖开展中华礼仪与手绘丝路地图研学，永兴坊亲子寻宝后送机/站返程。",
        descriptionEN:
          "Chinese etiquette and Silk Road map drawing at Hancheng Lake, Yongxingfang family treasure hunt, then departure.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车（22人封顶，保证每人1正座）",
        "住宿：携程3钻 / 4钻任选（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务；5人及以下司机兼导",
        "接送：西安接机/站与返程送机/站",
        "赠送：中华礼仪+手绘丝路地图、手工秦俑、帝国密码XR三大游学体验",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach (max 22; guaranteed seats)",
        "Hotels: Ctrip 3- or 4-diamond options in Xi'an (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide; driver-guide for 5 or fewer",
        "Transfers: Xi'an airport/station pickup and departure drop-off",
        "Complimentary: etiquette + Silk Road map, Terracotta DIY, Empire Code XR study experiences",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "private-mom-kids-4d",
    titleCN: "嗨妈遛娃·西安4日",
    titleEN: "Fun Mom & Kids Xi'an · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Private Tour · 2–6 guests",
    groupSizeCN: "2–6人私家团",
    route: "Xi'an Private Custom Route",
    routeCN: "西安私家定制线",
    category: "Private Tour",
    categoryCN: "陕西私家团",
    tags: [
      { cn: "私家团", en: "Private Tour" },
      { cn: "亲子家庭", en: "Mom & Kids" },
      { cn: "2–6人", en: "2–6 Guests" },
      { cn: "手工秦俑", en: "Terracotta DIY" },
      { cn: "大秦腔", en: "Qin Opera" },
      { cn: "驼铃传奇", en: "Camel Bell Legend" },
    ],
    coverImage: COVER_IMAGES[2],
    pdfFile: "/resources/shaanxi/private-mom-kids-4d.docx",
    highlights: [
      {
        ...PRIVATE_HIGHLIGHTS_BASE.customization,
        descriptionCN: "按亲子节奏私人定制，景点与互动体验可灵活加减，遛娃不赶路。",
        descriptionEN:
          "Premium customization around family pacing—add or trim sights and interactive stops without rushing kids.",
      },
      PRIVATE_HIGHLIGHTS_BASE.flexible,
      PRIVATE_HIGHLIGHTS_BASE.vip,
      {
        titleCN: "亲子家庭高端出行",
        titleEN: "High-end Family Travelers",
        descriptionCN: "专为嗨妈遛娃设计的高端私家出行，兼顾趣味互动与舒适服务。",
        descriptionEN:
          "Designed for high-end family travelers—playful interactions with VIP comfort for moms and kids.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 私家接机入住",
        titleEN: "Arrive Xi'an · Private Pickup",
        descriptionCN:
          "私家专车接机/站入住。全天自由活动，按家庭作息轻松开启旅程。",
        descriptionEN:
          "Private vehicle pickup and hotel check-in. Free day paced to your family’s rhythm.",
        mealsCN: "早 / 中 / 晚 自理（可协助订餐）",
        mealsEN: "Meals on own (restaurant booking assisted)",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "兵马俑 · 手工秦俑 · 华清宫 · 千古情",
        titleEN: "Terracotta · DIY · Huaqing · Eternal Love",
        descriptionCN:
          "私家游览兵马俑，孩子动手做手工秦俑；赴华清宫轻松游览，晚间千古情演出。",
        descriptionEN:
          "Private Terracotta visit with kids’ DIY warriors; easy Huaqing Palace stroll and evening Eternal Love show.",
        mealsCN: "早含 / 中晚自理（可送指定餐厅）",
        mealsEN: "Breakfast included · Flexible lunch/dinner delivery to chosen restaurants",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "城墙外观 · 大秦腔 · 皮影 · 回民街 · 驼铃传奇 · 不夜城",
        titleEN: "City Wall · Qin Opera · Puppets · Quarter · Camel Bell · Night City",
        descriptionCN:
          "明城墙外观打卡，欣赏大秦腔与高家大院皮影；回民街觅食，晚间驼铃传奇并夜游大唐不夜城。",
        descriptionEN:
          "City Wall exterior, Qin opera and Gao Courtyard shadow puppets; Muslim Quarter snacks, Camel Bell Legend and Great Tang All-Day Mall.",
        mealsCN: "早含 / 中晚自理（可送指定餐厅）",
        mealsEN: "Breakfast included · Flexible lunch/dinner delivery to chosen restaurants",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "白鹿原 · 返程",
        titleEN: "Bailuyuan · Departure",
        descriptionCN:
          "私家畅游白鹿原亲子友好体验，后专车送机/站返程。",
        descriptionEN:
          "Private Bailuyuan family-friendly visit, then private airport/station transfer for departure.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程私家专车（2–6人）",
        "住宿：携程3钻 / 4钻或按需求升级（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐灵活送达客人选定餐厅（费用自理或另议）",
        "导游：持证私家导游全程陪同",
        "接送：西安私家接机/站与返程送机/站",
        "承诺：0购物店、0强推自费；行程可按亲子需求微调",
      ],
      en: [
        "Transport: private vehicle throughout (2–6 guests)",
        "Hotels: Ctrip 3-/4-diamond or upgrades on request (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; flexible drop-off at chosen restaurants (meal cost separate or arranged)",
        "Guide: licensed private guide throughout",
        "Transfers: private Xi'an airport/station pickup and departure drop-off",
        "Pledge: zero shopping, zero forced extras; itinerary fine-tuned for families",
      ],
    },
    excluded: PRIVATE_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "private-lazy-holiday-4d",
    titleCN: "懒人假期·西安4日",
    titleEN: "Lazy Holiday Xi'an · 4 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 4,
    groupSize: "Private Tour · 2–6 guests",
    groupSizeCN: "2–6人私家团 · 09:00出发",
    route: "Xi'an Private Leisure Route",
    routeCN: "西安私家休闲线",
    category: "Private Tour",
    categoryCN: "陕西私家团",
    tags: [
      { cn: "私家团", en: "Private Tour" },
      { cn: "睡到自然醒", en: "Sleep In Naturally" },
      { cn: "09:00出发", en: "09:00 Departure" },
      { cn: "汉服妆造", en: "Hanfu Styling" },
      { cn: "城墙骑行", en: "City Wall Cycling" },
      { cn: "方所书店", en: "Fangsuo Bookstore" },
    ],
    coverImage: COVER_IMAGES[3],
    pdfFile: "/resources/shaanxi/private-lazy-holiday-4d.docx",
    highlights: [
      PRIVATE_HIGHLIGHTS_BASE.customization,
      {
        ...PRIVATE_HIGHLIGHTS_BASE.flexible,
        descriptionCN: "约09:00出发，睡到自然醒；停留时长与餐饮均可按心情调整。",
        descriptionEN:
          "Around 09:00 starts so you sleep in; dwell times and dining flex with your mood.",
      },
      PRIVATE_HIGHLIGHTS_BASE.vip,
      {
        titleCN: "高端休闲旅人",
        titleEN: "High-end Leisure Travelers",
        descriptionCN: "专为追求慢节奏的高端休闲客设计，不赶行程、尽兴即止。",
        descriptionEN:
          "Built for high-end leisure travelers who prefer slow days over checklist rushing.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 私家接机入住",
        titleEN: "Arrive Xi'an · Private Pickup",
        descriptionCN:
          "私家专车接机/站入住。全天自由活动，彻底放松开启懒人假期。",
        descriptionEN:
          "Private pickup and check-in. Free day to fully unwind into lazy-holiday mode.",
        mealsCN: "早 / 中 / 晚 自理（可协助订餐）",
        mealsEN: "Meals on own (restaurant booking assisted)",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "兵马俑 · 陶俑DIY · 华清宫 · 无界长安",
        titleEN: "Terracotta · DIY · Huaqing · Boundless Chang'an",
        descriptionCN:
          "约09:00出发，悠游兵马俑并陶俑DIY；华清宫轻松游览，体验无界长安沉浸内容。",
        descriptionEN:
          "Depart ~09:00 for Terracotta with pottery DIY; easy Huaqing Palace and Boundless Chang'an immersion.",
        mealsCN: "早含 / 中晚自理（可送指定餐厅）",
        mealsEN: "Breakfast included · Flexible lunch/dinner delivery to chosen restaurants",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "陕历博 · 汉服 · 大唐芙蓉园 · 慈恩寺 · 不夜城",
        titleEN: "History Museum · Hanfu · Tang Paradise · Ci'en · Night City",
        descriptionCN:
          "慢游陕历博，汉服妆造后漫步大唐芙蓉园与慈恩寺，晚间大唐不夜城夜色。",
        descriptionEN:
          "Leisurely Shaanxi History Museum, Hanfu styling, Tang Paradise and Ci'en Temple, then Great Tang All-Day Mall at night.",
        mealsCN: "早含 / 中晚自理（可送指定餐厅）",
        mealsEN: "Breakfast included · Flexible lunch/dinner delivery to chosen restaurants",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "方所书店 · 城墙骑行 · 回民街钟鼓楼 · 返程",
        titleEN: "Fangsuo · Wall Cycling · Muslim Quarter · Departure",
        descriptionCN:
          "方所书店悠闲打卡，明城墙骑行，逛回民街与钟鼓楼后专车送返程。",
        descriptionEN:
          "Fangsuo Bookstore, Ming City Wall cycling, Muslim Quarter and Bell & Drum Towers, then private departure transfer.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程私家专车（2–6人）",
        "住宿：携程3钻 / 4钻或按需求升级（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐灵活送达客人选定餐厅（费用自理或另议）",
        "导游：持证私家导游全程陪同",
        "接送：西安私家接机/站与返程送机/站",
        "承诺：0购物店、0强推自费；约09:00出发可微调",
      ],
      en: [
        "Transport: private vehicle throughout (2–6 guests)",
        "Hotels: Ctrip 3-/4-diamond or upgrades on request (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; flexible drop-off at chosen restaurants (meal cost separate or arranged)",
        "Guide: licensed private guide throughout",
        "Transfers: private Xi'an airport/station pickup and departure drop-off",
        "Pledge: zero shopping, zero forced extras; ~09:00 starts adjustable",
      ],
    },
    excluded: PRIVATE_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
  {
    id: "private-trendy-xian-5d",
    titleCN: "网红西安5日",
    titleEN: "Trendy Xi'an Private · 5 Days",
    region: "Shaanxi",
    destination: "shaanxi",
    days: 5,
    groupSize: "Private Tour · 2–6 guests",
    groupSizeCN: "2–6人私家团 · 蜜月情侣闺蜜",
    route: "Xi'an Trendy Private Route",
    routeCN: "西安网红私家线",
    category: "Private Tour",
    categoryCN: "陕西私家团",
    tags: [
      { cn: "私家团", en: "Private Tour" },
      { cn: "蜜月情侣", en: "Honeymoon / Couples" },
      { cn: "闺蜜出行", en: "Besties Trip" },
      { cn: "汉服妆造", en: "Hanfu Styling" },
      { cn: "西影厂", en: "Western Film Studio" },
      { cn: "长恨歌", en: "Song of Everlasting Sorrow" },
    ],
    coverImage: COVER_IMAGES[0],
    pdfFile: "/resources/shaanxi/private-trendy-xian-5d.docx",
    highlights: [
      PRIVATE_HIGHLIGHTS_BASE.customization,
      PRIVATE_HIGHLIGHTS_BASE.flexible,
      PRIVATE_HIGHLIGHTS_BASE.vip,
      {
        titleCN: "高端潮流旅人",
        titleEN: "High-end Trendy Travelers",
        descriptionCN: "专为蜜月、情侣与闺蜜打造的网红打卡私家线，出片与体验兼顾。",
        descriptionEN:
          "Private trendy route for honeymoon, couples and besties—photo moments with VIP pacing.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达西安 · 私家接机入住",
        titleEN: "Arrive Xi'an · Private Pickup",
        descriptionCN:
          "私家专车接机/站入住。全天自由活动，为后续网红打卡蓄力。",
        descriptionEN:
          "Private pickup and check-in. Free day to rest before the trendy photo itinerary.",
        mealsCN: "早 / 中 / 晚 自理（可协助订餐）",
        mealsEN: "Meals on own (restaurant booking assisted)",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 2,
        titleCN: "兵马俑 · 华清宫 · 长恨歌",
        titleEN: "Terracotta · Huaqing · Everlasting Sorrow",
        descriptionCN:
          "私家深度兵马俑与华清宫，晚间观赏长恨歌，经典与氛围感兼具。",
        descriptionEN:
          "Private Terracotta and Huaqing Palace, then evening Song of Everlasting Sorrow—classics with atmosphere.",
        mealsCN: "早含 / 中晚自理（可送指定餐厅）",
        mealsEN: "Breakfast included · Flexible lunch/dinner delivery to chosen restaurants",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 3,
        titleCN: "陕历博 · 明城墙 · 书院门 · 老菜场 · 大明宫",
        titleEN: "Museum · Wall · Shuyuanmen · Old Market · Daming Palace",
        descriptionCN:
          "陕历博打底，明城墙与书院门文艺街拍；老菜场潮流市集，大明宫遗址出片。",
        descriptionEN:
          "Shaanxi History Museum, City Wall and Shuyuanmen street photos; trendy Old Market and Daming Palace ruins.",
        mealsCN: "早含 / 中晚自理（可送指定餐厅）",
        mealsEN: "Breakfast included · Flexible lunch/dinner delivery to chosen restaurants",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 4,
        titleCN: "汉服 · 青龙寺 · 曲江池 · 西影厂 · 大慈恩寺 · 不夜城",
        titleEN: "Hanfu · Qinglong · Qujiang · Film Studio · Ci'en · Night City",
        descriptionCN:
          "全天网红线：汉服妆造，青龙寺、曲江池、西影厂、大慈恩寺连打卡，夜游大唐不夜城。",
        descriptionEN:
          "Full trendy day: Hanfu styling, Qinglong Temple, Qujiang Pool, Western Film Studio, Great Ci'en Temple, Great Tang All-Day Mall.",
        mealsCN: "早含 / 中晚自理（可送指定餐厅）",
        mealsEN: "Breakfast included · Flexible lunch/dinner delivery to chosen restaurants",
        lodgingCN: "西安",
        lodgingEN: "Xi'an",
      },
      {
        day: 5,
        titleCN: "小南门早市 · 易俗社 · 湘子庙 · 返程",
        titleEN: "Morning Market · Yisu Society · Xiangzi Temple · Departure",
        descriptionCN:
          "清晨小南门早市烟火，易俗社与湘子庙文艺收尾，后私家送机/站返程。",
        descriptionEN:
          "Xiaonanmen morning market, Yisu Society and Xiangzi Temple finale, then private departure transfer.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程私家专车（2–6人）",
        "住宿：携程3钻 / 4钻或按需求升级（西安，默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；正餐灵活送达客人选定餐厅（费用自理或另议）",
        "导游：持证私家导游全程陪同",
        "接送：西安私家接机/站与返程送机/站",
        "承诺：0购物店、0强推自费；适合蜜月情侣闺蜜定制微调",
      ],
      en: [
        "Transport: private vehicle throughout (2–6 guests)",
        "Hotels: Ctrip 3-/4-diamond or upgrades on request (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; flexible drop-off at chosen restaurants (meal cost separate or arranged)",
        "Guide: licensed private guide throughout",
        "Transfers: private Xi'an airport/station pickup and departure drop-off",
        "Pledge: zero shopping, zero forced extras; fine-tunable for couples and besties",
      ],
    },
    excluded: PRIVATE_EXCLUDED,
    qualityCommitment: SHAANXI_QUALITY_COMMITMENT,
  },
];
