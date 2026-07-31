import type { Product } from "./products";

const HENAN_QUALITY_COMMITMENT: Product["qualityCommitment"] = [
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
    "老君山索道、区间车等景区内自费小交通",
    "不可抗力或航班延误、车辆故障等导致行程变更产生的额外费用",
    "出发地至郑州的大交通，以及燃油附加费临时上涨差额",
    "个人消费：洗衣、通讯、娱乐、自由购物及费用包含未列明项目",
    "单房差；儿童门票、电瓶车、床位等另计费用",
    "酒店押金（通常每间100–300元，离店无损坏全额退还）",
    "现场可选升级项目与未列明自费体验",
  ],
  en: [
    "Laojun Mountain cable cars and other on-site scenic transfers (self-pay)",
    "Extra costs from force majeure, flight delays, vehicle issues or itinerary changes",
    "Long-haul transport to Zhengzhou and temporary fuel surcharge differences",
    "Personal expenses (laundry, communications, entertainment, shopping) and unlisted items",
    "Single supplements; child tickets, shuttle carts, beds and similar extras",
    "Hotel deposits (typically CNY 100–300/room; refunded if no damage)",
    "On-site optional upgrades and unlisted paid experiences",
  ],
};

const VIP_EXCLUDED: Product["excluded"] = {
  cn: [
    "景区必坐小交通、索道、区间车等景区内自费交通（行程另有约定除外）",
    "不可抗力或航班延误导致行程变更产生的额外费用",
    "出发地至郑州的大交通",
    "个人消费及费用包含未列明项目",
    "单房差；儿童门票、床位等另计费用",
    "酒店押金",
    "现场可选升级项目与未列明自费体验",
  ],
  en: [
    "On-site shuttles, cable cars and scenic transfers unless otherwise agreed",
    "Extra costs from force majeure or flight delays",
    "Long-haul transport to Zhengzhou",
    "Personal expenses and unlisted items",
    "Single supplements; child tickets, beds and similar extras",
    "Hotel deposits",
    "On-site optional upgrades and unlisted paid experiences",
  ],
};

export const henanProducts: Product[] = [
  {
    id: "fun-henan-5d",
    titleCN: "趣河南5日",
    titleEN: "Fun Henan · 5 Days",
    region: "Henan",
    destination: "henan",
    days: 5,
    groupSize: "Regular Boutique Group · ~25 guests",
    groupSizeCN: "常规精品团 · 约25人",
    route: "Zhengzhou - Luoyang - Dengfeng - Kaifeng",
    routeCN: "郑州 - 洛阳 - 登封 - 开封",
    category: "Regular Product",
    categoryCN: "河南常规产品",
    tags: [
      { cn: "老君山", en: "Laojun Mountain" },
      { cn: "龙门石窟", en: "Longmen Grottoes" },
      { cn: "少林寺", en: "Shaolin Temple" },
      { cn: "亲子毕业季", en: "Family & Graduation Season" },
      { cn: "可选项目", en: "Optional Experiences" },
    ],
    coverImage: "/images/henan-resource-01.jpg",
    pdfFile: "/resources/henan/fun-henan-5d.docx",
    highlights: [
      {
        titleCN: "三大5A顶流",
        titleEN: "Three Top 5A Icons",
        descriptionCN: "老君山、龙门石窟、少林寺一线串游，覆盖河南最受欢迎的5A核心资源。",
        descriptionEN:
          "Laojun Mountain, Longmen Grottoes and Shaolin Temple in one route—Henan’s most-wanted 5A highlights.",
      },
      {
        titleCN: "自由选择景点",
        titleEN: "Flexible Sight Choices",
        descriptionCN: "开封万岁山武侠城 / 清明上河园，以及海昌海洋公园 / 只有河南·戏剧幻城，按兴趣二选一。",
        descriptionEN:
          "Choose Kaifeng’s Wansui Mountain Wuxia City or Millennium City Park, then Haichang Ocean Park or Only Henan Drama City.",
      },
      {
        titleCN: "功夫天下秀赠送",
        titleEN: "Kung Fu Show Gift",
        descriptionCN: "行程赠送功夫天下秀演出，少林功夫氛围感拉满，无需额外自费。",
        descriptionEN:
          "Complimentary Kung Fu Tianxia show—Shaolin energy included, no extra ticket purchase required.",
      },
      {
        titleCN: "0购物纯玩",
        titleEN: "Pure Play · Zero Shopping",
        descriptionCN: "全程0购物店、不推强制自费，把时间留给真正值得停留的中原风景与古都人文。",
        descriptionEN:
          "Zero shopping stops and no forced extras—time stays on Henan’s landscapes and ancient capitals.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达郑州 · 接机入住",
        titleEN: "Arrive Zhengzhou · Pickup & Check-in",
        descriptionCN:
          "抵达郑州后安排接机/站，送至酒店办理入住。全天自由活动，建议早班抵达充分休息。次日导游将于当晚联系确认集合信息。",
        descriptionEN:
          "Airport/station pickup and hotel check-in on arrival. Free day to rest—early arrivals recommended. Day-2 guide confirms meet-up details by evening.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "郑州",
        lodgingEN: "Zhengzhou",
      },
      {
        day: 2,
        titleCN: "老君山 · 洛邑古城",
        titleEN: "Laojun Mountain · Luoyi Ancient City",
        descriptionCN:
          "前往老君山（5A）览云海仙山胜景（索道自理），感受道教名山气质。晚间漫步洛邑古城，沉浸洛阳夜色与市井烟火。",
        descriptionEN:
          "Visit Laojun Mountain (5A) for cloud-sea vistas (cable car self-pay), then evening stroll through Luoyi Ancient City’s night streets.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "洛阳",
        lodgingEN: "Luoyang",
      },
      {
        day: 3,
        titleCN: "龙门石窟 · 丽景门 · 少林寺 · 功夫秀",
        titleEN: "Longmen · Lijingmen · Shaolin · Kung Fu Show",
        descriptionCN:
          "游览世界文化遗产龙门石窟，打卡丽景门古城印象。续赴登封少林寺感受禅武文化，晚间赠送功夫天下秀演出。",
        descriptionEN:
          "UNESCO Longmen Grottoes and Lijingmen photo stop, then Shaolin Temple in Dengfeng. Complimentary Kung Fu Tianxia show in the evening.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "登封 / 郑州",
        lodgingEN: "Dengfeng / Zhengzhou",
      },
      {
        day: 4,
        titleCN: "开封二选一 · 万岁山 / 清明上河园",
        titleEN: "Kaifeng Choice · Wansui Mountain / Millennium City Park",
        descriptionCN:
          "前往开封，自由选择【万岁山武侠城】或【清明上河园】深度游玩，沉浸宋风武侠或《清明上河图》实景乐园。",
        descriptionEN:
          "In Kaifeng, choose either Wansui Mountain Wuxia City or Millennium City Park for Song-dynasty immersion.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "开封 / 郑州",
        lodgingEN: "Kaifeng / Zhengzhou",
      },
      {
        day: 5,
        titleCN: "海昌 / 只有河南 · 返程",
        titleEN: "Ocean Park / Only Henan · Departure",
        descriptionCN:
          "今日无导游陪同。自由选择【郑州海昌海洋公园】或【只有河南·戏剧幻城】游玩，后视航班自行返程（或按约定送机/站）。",
        descriptionEN:
          "No guide today. Choose Zhengzhou Haichang Ocean Park or Only Henan Drama City, then depart as arranged (airport/station transfer if booked).",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车",
        "住宿：携程3钻 / 4钻酒店（默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算；二选一景点按所选项目计）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务（第5日自由活动日无导游）",
        "接送：郑州接机/站与返程送机/站（按行程约定）",
        "赠送：功夫天下秀演出",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach",
        "Hotels: Ctrip 3- or 4-diamond properties (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency rates; choice days per selected option)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide (no guide on Day 5 free-choice day)",
        "Transfers: Zhengzhou airport/station pickup and departure drop-off as arranged",
        "Complimentary: Kung Fu Tianxia show",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: HENAN_QUALITY_COMMITMENT,
  },
  {
    id: "laojunshan-4d",
    titleCN: "玩转老君山4日",
    titleEN: "Laojun Mountain Explorer · 4 Days",
    region: "Henan",
    destination: "henan",
    days: 4,
    groupSize: "Regular Boutique Group · ~25 guests",
    groupSizeCN: "常规精品团 · 约25人",
    route: "Zhengzhou - Luoyang - Dengfeng - Kaifeng",
    routeCN: "郑州 - 洛阳 - 登封 - 开封",
    category: "Regular Product",
    categoryCN: "河南常规产品",
    tags: [
      { cn: "老君山", en: "Laojun Mountain" },
      { cn: "龙门石窟", en: "Longmen Grottoes" },
      { cn: "少林寺", en: "Shaolin Temple" },
      { cn: "清明上河园/万岁山", en: "Millennium City / Wansui Mountain" },
      { cn: "三大古都", en: "Three Ancient Capitals" },
    ],
    coverImage: "/images/henan-resource-02.jpg",
    pdfFile: "/resources/henan/laojunshan-4d.docx",
    highlights: [
      {
        titleCN: "老君山深度",
        titleEN: "Laojun Mountain Focus",
        descriptionCN: "以老君山为核心亮点，云海仙山与道教文化一步到位，适合想深度打卡名山的团队。",
        descriptionEN:
          "Centered on Laojun Mountain—cloud seas and Daoist mountain culture for teams seeking a deep 5A mountain day.",
      },
      {
        titleCN: "龙门 + 少林",
        titleEN: "Longmen + Shaolin",
        descriptionCN: "世界文化遗产龙门石窟与少林寺同线串联，石窟艺术与禅武文化一次尽览。",
        descriptionEN:
          "UNESCO Longmen Grottoes and Shaolin Temple on one line—grotto art and Chan-martial culture together.",
      },
      {
        titleCN: "功夫秀赠送",
        titleEN: "Kung Fu Show Gift",
        descriptionCN: "赠送功夫天下秀，少林功夫视听体验无需另购门票。",
        descriptionEN:
          "Complimentary Kung Fu Tianxia show—Shaolin stage energy included without a separate ticket buy.",
      },
      {
        titleCN: "开封二选一自由行",
        titleEN: "Kaifeng Free Choice",
        descriptionCN: "万岁山武侠城或清明上河园二选一，按兴趣沉浸宋风武侠或汴京市井乐园。",
        descriptionEN:
          "Pick Wansui Mountain Wuxia City or Millennium City Park—Song-dynasty wuxia or Bianjing city vibes.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达郑州 · 接机入住",
        titleEN: "Arrive Zhengzhou · Pickup & Check-in",
        descriptionCN:
          "抵达郑州后安排接机/站，送至酒店办理入住。全天自由活动，建议早班抵达充分休息。次日导游将于当晚联系确认集合信息。",
        descriptionEN:
          "Airport/station pickup and hotel check-in on arrival. Free day to rest—early arrivals recommended. Day-2 guide confirms meet-up details by evening.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "郑州",
        lodgingEN: "Zhengzhou",
      },
      {
        day: 2,
        titleCN: "老君山 · 洛邑古城",
        titleEN: "Laojun Mountain · Luoyi Ancient City",
        descriptionCN:
          "前往老君山（5A）览云海仙山胜景（索道自理），感受道教名山气质。晚间漫步洛邑古城，沉浸洛阳夜色与市井烟火。",
        descriptionEN:
          "Visit Laojun Mountain (5A) for cloud-sea vistas (cable car self-pay), then evening stroll through Luoyi Ancient City’s night streets.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "洛阳",
        lodgingEN: "Luoyang",
      },
      {
        day: 3,
        titleCN: "龙门石窟 · 丽景门 · 少林寺 · 功夫秀",
        titleEN: "Longmen · Lijingmen · Shaolin · Kung Fu Show",
        descriptionCN:
          "游览世界文化遗产龙门石窟，打卡丽景门古城印象。续赴登封少林寺感受禅武文化，晚间赠送功夫天下秀演出。",
        descriptionEN:
          "UNESCO Longmen Grottoes and Lijingmen photo stop, then Shaolin Temple in Dengfeng. Complimentary Kung Fu Tianxia show in the evening.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "登封 / 郑州",
        lodgingEN: "Dengfeng / Zhengzhou",
      },
      {
        day: 4,
        titleCN: "开封二选一 · 返程",
        titleEN: "Kaifeng Choice · Departure",
        descriptionCN:
          "前往开封，自由选择【万岁山武侠城】或【清明上河园】游玩，后视航班送机/站返程。",
        descriptionEN:
          "In Kaifeng, choose Wansui Mountain Wuxia City or Millennium City Park, then airport/station transfer for departure.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车",
        "住宿：携程3钻 / 4钻酒店（默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算；开封二选一按所选项目计）",
        "用餐：含酒店早餐；正餐按行程说明",
        "导游：当地持证导游服务",
        "接送：郑州接机/站与返程送机/站（按行程约定）",
        "赠送：功夫天下秀演出",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach",
        "Hotels: Ctrip 3- or 4-diamond properties (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency rates; Kaifeng day per selected option)",
        "Meals: hotel breakfasts; main meals per itinerary notes",
        "Guide: licensed local guide",
        "Transfers: Zhengzhou airport/station pickup and departure drop-off as arranged",
        "Complimentary: Kung Fu Tianxia show",
      ],
    },
    excluded: REGULAR_EXCLUDED,
    qualityCommitment: HENAN_QUALITY_COMMITMENT,
  },
  {
    id: "henan-explorer-4d",
    titleCN: "玩转河南4日",
    titleEN: "Henan Explorer · 4 Days",
    region: "Henan",
    destination: "henan",
    days: 4,
    groupSize: "VIP Small Group · Max 13",
    groupSizeCN: "VIP精品小团 · 13人封顶",
    route: "Zhengzhou - Kaifeng - Dengfeng - Luoyang",
    routeCN: "郑州 - 开封 - 登封 - 洛阳",
    category: "Regular Product",
    categoryCN: "河南常规产品",
    tags: [
      { cn: "省博物院", en: "Henan Museum" },
      { cn: "清明上河园", en: "Millennium City Park" },
      { cn: "少林寺", en: "Shaolin Temple" },
      { cn: "龙门石窟", en: "Longmen Grottoes" },
      { cn: "洛邑古城", en: "Luoyi Ancient City" },
      { cn: "13人封顶", en: "Max 13 Guests" },
    ],
    coverImage: "/images/henan-resource-03.jpg",
    pdfFile: "/resources/henan/henan-explorer-4d.docx",
    highlights: [
      {
        titleCN: "VIP小团",
        titleEN: "VIP Small Group",
        descriptionCN: "13人封顶独立成团，持证导游配置更到位，讲解更细、节奏更从容。",
        descriptionEN:
          "Independent groups capped at 13 with dedicated licensed guide staffing—richer commentary, calmer pacing.",
      },
      {
        titleCN: "省博精讲",
        titleEN: "Henan Museum Deep Dive",
        descriptionCN: "走进河南博物院，以精讲方式读懂中原文明脉络与镇馆之宝故事。",
        descriptionEN:
          "Henan Museum with focused guiding—Central Plains civilization and signature treasures, told clearly.",
      },
      {
        titleCN: "少林 + 龙门",
        titleEN: "Shaolin + Longmen",
        descriptionCN: "少林禅武与龙门石窟艺术同日串联，丽景门与洛邑古城补齐洛阳古城夜色。",
        descriptionEN:
          "Shaolin Chan-martial culture and Longmen grotto art in one day, plus Lijingmen and Luoyi for Luoyang nights.",
      },
      {
        titleCN: "宋文化沉浸",
        titleEN: "Song Culture Immersion",
        descriptionCN: "清明上河园沉浸北宋汴京风貌，开封宋风市井与园林体验一步到位。",
        descriptionEN:
          "Millennium City Park for Northern Song Bianjing immersion—Kaifeng’s Song-era streets and gardens in one visit.",
      },
    ],
    itinerary: [
      {
        day: 1,
        titleCN: "抵达郑州 · 接机入住",
        titleEN: "Arrive Zhengzhou · Pickup & Check-in",
        descriptionCN:
          "抵达郑州后安排接机/站，送至酒店办理入住。全天自由活动，建议早班抵达充分休息。次日导游将于当晚联系确认集合信息。",
        descriptionEN:
          "Airport/station pickup and hotel check-in on arrival. Free day to rest—early arrivals recommended. Day-2 guide confirms meet-up details by evening.",
        mealsCN: "早 / 中 / 晚 自理",
        mealsEN: "Breakfast / Lunch / Dinner on own",
        lodgingCN: "郑州",
        lodgingEN: "Zhengzhou",
      },
      {
        day: 2,
        titleCN: "河南博物院 · 清明上河园",
        titleEN: "Henan Museum · Millennium City Park",
        descriptionCN:
          "上午精讲游览河南博物院，读懂中原文明。下午赴开封【清明上河园】，沉浸北宋汴京市井与园林实景。",
        descriptionEN:
          "Morning deep-dive at Henan Museum, then Kaifeng’s Millennium City Park for Northern Song Bianjing immersion.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "开封 / 郑州",
        lodgingEN: "Kaifeng / Zhengzhou",
      },
      {
        day: 3,
        titleCN: "少林寺 · 龙门石窟 · 丽景门 · 洛邑古城",
        titleEN: "Shaolin · Longmen · Lijingmen · Luoyi",
        descriptionCN:
          "前往登封少林寺感受禅武文化，续游世界文化遗产龙门石窟。打卡丽景门，晚间漫步洛邑古城。",
        descriptionEN:
          "Shaolin Temple in Dengfeng, UNESCO Longmen Grottoes, Lijingmen photo stop, then evening Luoyi Ancient City.",
        mealsCN: "早含 / 中晚自理",
        mealsEN: "Breakfast included · Lunch & dinner on own",
        lodgingCN: "洛阳",
        lodgingEN: "Luoyang",
      },
      {
        day: 4,
        titleCN: "牡丹园/牡丹博物馆 · 白马寺 · 洛阳水席 · 返程",
        titleEN: "Peony Garden/Museum · White Horse Temple · Water Banquet · Departure",
        descriptionCN:
          "3–4月赏牡丹园，其余季节改访牡丹博物馆；续游白马寺感受中国佛教祖庭气象。安排洛阳水席午餐，后送机/站返程（洛阳或郑州）。",
        descriptionEN:
          "Peony Garden in Mar–Apr (Peony Museum otherwise), White Horse Temple, Luoyang Water Banquet lunch, then depart via Luoyang or Zhengzhou.",
        mealsCN: "早含 / 中含（洛阳水席）/ 晚自理",
        mealsEN: "Breakfast included · Lunch included (Water Banquet) · Dinner on own",
        lodgingCN: "不含",
        lodgingEN: "Not included",
      },
    ],
    included: {
      cn: [
        "交通：全程正规营运手续空调旅游车（13人封顶，保证每人1正座）",
        "住宿：携程3钻 / 4钻酒店（默认普通双标间）",
        "门票：行程所列景区首道大门票（按旅行社优惠价核算）",
        "用餐：含酒店早餐；洛阳水席午餐一次；其余正餐按行程说明",
        "导游：VIP精品小团持证导游服务；小团配置讲解更细致",
        "接送：郑州接机/站与洛阳或郑州返程送机/站（按行程约定）",
      ],
      en: [
        "Transport: licensed air-conditioned tourist coach (max 13; guaranteed seats)",
        "Hotels: Ctrip 3- or 4-diamond properties (twin room default)",
        "Tickets: first-entry scenic tickets as listed (agency preferential rates)",
        "Meals: hotel breakfasts; one Luoyang Water Banquet lunch; other meals per itinerary",
        "Guide: VIP small-group licensed guide staffing with richer commentary",
        "Transfers: Zhengzhou airport/station pickup and Luoyang/Zhengzhou departure drop-off as arranged",
      ],
    },
    excluded: VIP_EXCLUDED,
    qualityCommitment: HENAN_QUALITY_COMMITMENT,
  },
];
