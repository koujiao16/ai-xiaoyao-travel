export type HomeLocale = "en" | "zh";

export type HomeContent = {
  hero: {
    badge: string;
    title: string;
    brandLine?: string;
    subtitle: string;
    description: string;
    exploreServices: string;
    getProposal: string;
    imageAlt: string;
  };
  network: {
    eyebrow?: string;
    title: string;
    description: string;
    stats: { label: string; value: string }[];
    imageAlt: string;
    clickToEnlarge: string;
  };
  destinations: {
    eyebrow?: string;
    title: string;
    description: string;
    cards: { title: string; description: string; href: string }[];
    cta: string;
  };
  products: {
    eyebrow?: string;
    title: string;
    description: string;
    cards: { title: string; description: string; href: string }[];
    exploreLabel: string;
    cta: string;
  };
  quality: {
    eyebrow?: string;
    title: string;
    description: string;
    cards: { title: string; description?: string }[];
    note: string;
  };
  brands: {
    eyebrow?: string;
    title: string;
    description: string;
    cards: { title: string; description: string; logoSrc: string; logoAlt: string }[];
  };
  finalCta: {
    title: string;
    description: string;
    whatsapp: string;
    email: string;
    wechat: string;
    xiaohongshu: string;
    tapToEnlarge: string;
  };
};

export const homeContentEn: HomeContent = {
  hero: {
    badge:
      "Operated by Heilongjiang Xiaoyao International Travel Agency · Originated from Minjian Travel Group",
    title: "Ai Xiaoyao",
    subtitle: "China B2B Destination Management & Travel Operations",
    description:
      "Local reception, inbound groups, study tours, corporate programs, cruise groups and customized China routes.",
    exploreServices: "Explore Services",
    getProposal: "Get a Proposal",
    imageAlt: "Xiaoyao Travel premium destination operations",
  },
  network: {
    eyebrow: "Operations",
    title: "Multi-region Operation Network",
    description:
      "With four self-operated destinations, 30+ group sales offices and 11 other group-owned local DMCs, Ai Xiaoyao provides B2B partners with reliable destination reception and flexible China travel operations.",
    stats: [
      { label: "Self-operated Destinations", value: "4" },
      { label: "Group Sales Offices", value: "30+" },
      { label: "Other Group-owned Local DMCs", value: "11" },
    ],
    imageAlt: "China multi-region operation map",
    clickToEnlarge: "Click to enlarge",
  },
  destinations: {
    eyebrow: "Destinations",
    title: "Destination Capabilities",
    description:
      "Four key destination regions support multi-city China programs and different types of group reception.",
    cards: [
      {
        title: "Shaanxi",
        description:
          "Ancient capital culture, Xi’an ground services, study tour resources and Qinling routes.",
        href: "/destinations/shaanxi",
      },
      {
        title: "Heilongjiang",
        description:
          "Ice and snow travel, wellness groups, border culture and seasonal programs.",
        href: "/destinations/heilongjiang",
      },
      {
        title: "Henan",
        description:
          "Central China culture, provincial resources and multi-city route connections.",
        href: "/destinations/henan",
      },
      {
        title: "Jilin",
        description:
          "Changbai Mountain, winter scenery, natural landscapes and regional group reception.",
        href: "/destinations/jilin",
      },
    ],
    cta: "View Destination Overview",
  },
  products: {
    eyebrow: "Products",
    title: "Product Lines",
    description:
      "Designed for B2B partners, our product system includes classic China routes, destination products, study tours, corporate programs, special interest travel and cruise group services.",
    cards: [
      {
        title: "Classic China Routes",
        description:
          "Multi-city classic routes for overseas groups — Beijing, Xi’an, Shanghai and beyond.",
        href: "/products/classic-china-routes",
      },
      {
        title: "Four Destination Products",
        description:
          "Regular and customized products across Shaanxi, Heilongjiang, Henan and Jilin.",
        href: "/products/destination-products",
      },
      {
        title: "Study Tours",
        description:
          "Museums, cultural heritage, charity activities, nature exploration and youth programs.",
        href: "/products/study-tours",
      },
      {
        title: "Corporate & MICE",
        description:
          "Corporate reception, meetings, incentive travel, team building and business visits.",
        href: "/products/corporate-mice",
      },
      {
        title: "Special Interest Travel",
        description:
          "Food, light hiking, photography, heritage experiences and local lifestyle routes.",
        href: "/products/special-interest-travel",
      },
      {
        title: "Cruise Groups",
        description:
          "Shore excursions, pre/post-cruise extensions and cruise group ground handling.",
        href: "/products/cruise-groups",
      },
    ],
    exploreLabel: "Explore Program",
    cta: "Explore Product Lines",
  },
  quality: {
    eyebrow: "Quality",
    title: "Quality Travel, Honest Reception",
    description:
      "We focus on transparent communication, reliable on-site execution and long-term trust with B2B travel partners.",
    cards: [
      {
        title: "Clear Product Information",
        description: "Scope, inclusions and operational notes stated upfront.",
      },
      {
        title: "Reliable Ground Execution",
        description: "On-site delivery with clear roles, timing and accountability.",
      },
      {
        title: "Partner Reputation Protection",
        description: "We prioritize brand safety and guest experience for your clients.",
      },
    ],
    note: "Key quality commitments can be written into the contract.",
  },
  brands: {
    eyebrow: "Group",
    title: "Our Brands",
    description:
      "A connected group heritage — quality travel philosophy, China destination operations and educational travel programs.",
    cards: [
      {
        title: "Minjian Travel Group",
        description: "The origin of our quality travel service philosophy and group heritage.",
        logoSrc: "/images/logo-minjian.jpg",
        logoAlt: "Minjian Travel Group logo",
      },
      {
        title: "Xiaoyao Travel",
        description: "Quality travel products and China destination operation services.",
        logoSrc: "/images/logo-xiaoyao.jpg",
        logoAlt: "Xiaoyao Travel logo",
      },
      {
        title: "Adventure Hat Study Tours",
        description: "Educational travel, youth study tours and cultural learning programs.",
        logoSrc: "/images/logo-adventure-hat-square.jpg",
        logoAlt: "Adventure Hat Study Tours logo",
      },
    ],
  },
  finalCta: {
    title: "Build Your Next China Program",
    description:
      "Send your destination, group type, travel dates, group size and key requirements. Our team will provide route ideas and operation support.",
    whatsapp: "WhatsApp",
    email: "Email",
    wechat: "WeChat QR",
    xiaohongshu: "Xiaohongshu",
    tapToEnlarge: "Tap to enlarge",
  },
};

export const homeContentZh: HomeContent = {
  hero: {
    badge: "由黑龙江逍遥国际旅行社运营｜源自民间旅游集团",
    title: "Ai Xiaoyao",
    brandLine: "爱逍遥旅游",
    subtitle: "中国 B2B 目的地管理与旅游运营服务商",
    description:
      "提供地接接待、入境团队、研学旅行、企业会奖、邮轮团队、中国经典联线及定制化旅游服务。",
    exploreServices: "了解服务",
    getProposal: "获取方案",
    imageAlt: "逍遥旅游中国目的地运营服务",
  },
  network: {
    title: "多区域运营网络",
    description:
      "依托4大自营目的地、集团内30+外办公司及11家集团内其他地接公司，爱逍遥旅游为 B2B 合作伙伴提供稳定、灵活、可信赖的中国目的地接待与旅游运营服务。",
    stats: [
      { label: "大自营目的地", value: "4" },
      { label: "集团内外办公司", value: "30+" },
      { label: "集团内其他地接公司", value: "11" },
    ],
    imageAlt: "中国多区域运营网络地图",
    clickToEnlarge: "点击放大",
  },
  destinations: {
    title: "目的地能力",
    description: "四大重点目的地支持中国多城市联线与不同类型团队接待。",
    cards: [
      {
        title: "陕西",
        description: "古都文化、西安地接、研学资源与秦岭线路。",
        href: "/destinations/shaanxi",
      },
      {
        title: "黑龙江",
        description: "冰雪旅游、疗休养、边境文化与季节性产品。",
        href: "/destinations/heilongjiang",
      },
      {
        title: "河南",
        description: "中原文化、省内资源与跨区域线路联动。",
        href: "/destinations/henan",
      },
      {
        title: "吉林",
        description: "长白山、冬季资源、自然风光与区域团队接待。",
        href: "/destinations/jilin",
      },
    ],
    cta: "查看目的地",
  },
  products: {
    title: "产品体系",
    description:
      "围绕 B2B 合作伙伴需求，提供中国经典联线、目的地常规产品、研学、企业会奖、特殊兴趣与邮轮团队服务。",
    cards: [
      {
        title: "中国经典联线",
        description: "适合境外客人的中国多城市经典线路。",
        href: "/products/classic-china-routes",
      },
      {
        title: "四大目的地常规产品",
        description: "基于陕西、黑龙江、河南、吉林的成熟稳定产品体系。",
        href: "/products/destination-products",
      },
      {
        title: "研学旅行",
        description: "历史文化、博物馆、非遗、公益与自然探索项目。",
        href: "/products/study-tours",
      },
      {
        title: "企业会奖",
        description: "企业接待、会议会展、团建、奖励旅游及行业考察。",
        href: "/products/corporate-mice",
      },
      {
        title: "特殊兴趣旅行",
        description: "美食、轻徒步、摄影、非遗体验与地方生活方式探索。",
        href: "/products/special-interest-travel",
      },
      {
        title: "邮轮团队",
        description: "岸上观光、前后延伸线路及邮轮团队地接服务。",
        href: "/products/cruise-groups",
      },
    ],
    exploreLabel: "查看产品",
    cta: "查看产品体系",
  },
  quality: {
    title: "品质旅游，诚信接待",
    description:
      "我们重视真实宣传、清晰沟通和稳定执行，帮助 B2B 合作伙伴保护客人体验与品牌口碑。",
    cards: [
      { title: "真实产品信息" },
      { title: "稳定落地执行" },
      { title: "保护合作伙伴口碑" },
    ],
    note: "关键品质承诺可写入合同。",
  },
  brands: {
    title: "品牌矩阵",
    description: "集团品牌体系连接品质旅游理念、中国目的地运营与研学旅行项目。",
    cards: [
      {
        title: "民间旅游集团",
        description: "品质旅游服务理念来源与集团背书。",
        logoSrc: "/images/logo-minjian.jpg",
        logoAlt: "民间旅游集团标志",
      },
      {
        title: "逍遥旅游",
        description: "品质旅游产品与中国目的地运营服务品牌。",
        logoSrc: "/images/logo-xiaoyao.jpg",
        logoAlt: "逍遥旅游标志",
      },
      {
        title: "探险帽研学",
        description: "面向青少年、学校及机构客户的研学与文化教育旅行品牌。",
        logoSrc: "/images/logo-adventure-hat-square.jpg",
        logoAlt: "探险帽研学标志",
      },
    ],
  },
  finalCta: {
    title: "定制您的下一段中国行程",
    description:
      "请发送您的目的地、团型、出行日期、人数及核心需求，我们将提供线路建议与落地执行支持。",
    whatsapp: "WhatsApp",
    email: "邮箱",
    wechat: "微信二维码",
    xiaohongshu: "小红书",
    tapToEnlarge: "点击放大",
  },
};
