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
    cards: {
      title: string;
      subtitle: string;
      description: string;
      href: string;
      imageSrc: string;
      imageAlt: string;
    }[];
  };
  products: {
    eyebrow?: string;
    title: string;
    description: string;
    cards: {
      title: string;
      subtitle?: string;
      description: string;
      href: string;
      imageSrc: string;
      imageAlt: string;
    }[];
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
    subtitle: "China B2B Destination Management & Travel Operations Service Provider",
    description: "",
    exploreServices: "Explore Services",
    getProposal: "Get Proposal",
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
      "Three core destination regions support multi-city China programs and different types of group reception.",
    cards: [
      {
        title: "Northeast China",
        subtitle: "Heilongjiang & Jilin",
        description:
          "Ice and snow tourism, natural landscapes, border culture and seasonal travel experiences.",
        href: "/destinations/northeast",
        imageSrc: "/images/northeast-destination-hero.png",
        imageAlt: "Northeast China destination operations",
      },
      {
        title: "Shaanxi",
        subtitle: "Ancient Capital Region",
        description:
          "Ancient capital culture, world heritage sites, study tour resources and premium destination services.",
        href: "/destinations/shaanxi",
        imageSrc: "/images/shaanxi-destination-hero.png",
        imageAlt: "Shaanxi destination operations",
      },
      {
        title: "Henan",
        subtitle: "Central China",
        description:
          "Central China culture, world heritage sites, historical experiences and regional travel connections.",
        href: "/destinations/henan",
        imageSrc: "/images/henan-destination-hero.png",
        imageAlt: "Henan destination operations",
      },
    ],
  },
  products: {
    eyebrow: "Products",
    title: "Product Lines",
    description:
      "Designed for B2B partners, our product lines cover China-themed travel, group reception and customized destination operations.",
    cards: [
      {
        title: "Study Tours",
        description:
          "Educational travel programs covering history, museums, intangible heritage and nature exploration.",
        href: "/products/study-tours",
        imageSrc: "/images/product-study-tour.png",
        imageAlt: "Study tours product line",
      },
      {
        title: "MICE & Corporate Events",
        description:
          "Corporate incentives, meetings, events and premium group reception services.",
        href: "/products/corporate-mice",
        imageSrc: "/images/product-mice.png",
        imageAlt: "MICE and corporate events product line",
      },
      {
        title: "Yangtze River Cruises",
        description:
          "Scenic Yangtze River cruise programs with premium leisure and customized group services.",
        href: "/products/cruise-groups",
        imageSrc: "/images/product-yangtze-cruise.png",
        imageAlt: "Yangtze River cruises product line",
      },
      {
        title: "Wellness & Health Retreats",
        description:
          "Forest wellness, hot spring retreats and high-quality slow travel experiences.",
        href: "#",
        imageSrc: "/images/product-wellness.png",
        imageAlt: "Wellness and health retreats product line",
      },
    ],
  },
  quality: {
    eyebrow: "Quality",
    title: "Quality Travel, Honest Reception",
    description:
      "We are committed to accurate product information, clear quality commitments and partner reputation protection, helping B2B partners safeguard client experience and brand trust.",
    cards: [
      {
        title: "Accurate Product Information",
        description: "Presented clearly, with no false promises.",
      },
      {
        title: "Clear Quality Commitments",
        description: "Clear standards and quality written into contracts.",
      },
      {
        title: "Partner Reputation Protection",
        description: "Stable execution, protecting partner reputation.",
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
    description: "",
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
    description: "三大核心目的地支持中国多城市联线与不同类型团队接待。",
    cards: [
      {
        title: "中国东北",
        subtitle: "Northeast China",
        description: "冰雪旅游、自然风光、边境文化与季节性旅行体验。",
        href: "/destinations/northeast",
        imageSrc: "/images/northeast-destination-hero.png",
        imageAlt: "中国东北目的地运营",
      },
      {
        title: "陕西",
        subtitle: "Shaanxi",
        description: "古都文化、世界遗产、研学资源与高端目的地服务。",
        href: "/destinations/shaanxi",
        imageSrc: "/images/shaanxi-destination-hero.png",
        imageAlt: "陕西目的地运营",
      },
      {
        title: "河南",
        subtitle: "Henan",
        description: "中原文化、世界遗产、历史体验与区域旅游联动。",
        href: "/destinations/henan",
        imageSrc: "/images/henan-destination-hero.png",
        imageAlt: "河南目的地运营",
      },
    ],
  },
  products: {
    title: "产品体系",
    description:
      "围绕 B2B 合作伙伴需求，提供中国主题旅行、团队接待及定制化目的地运营服务。",
    cards: [
      {
        title: "研学旅行",
        subtitle: "Study Tours",
        description: "历史文化、博物馆、非遗体验与自然探索项目。",
        href: "/products/study-tours",
        imageSrc: "/images/product-study-tour.png",
        imageAlt: "研学旅行产品",
      },
      {
        title: "企业会奖",
        subtitle: "MICE & Corporate Events",
        description: "企业奖励旅游、会议活动及高端团队接待。",
        href: "/products/corporate-mice",
        imageSrc: "/images/product-mice.png",
        imageAlt: "企业会奖产品",
      },
      {
        title: "三峡邮轮",
        subtitle: "Yangtze River Cruises",
        description: "长江风光、高端休闲及定制团队邮轮服务。",
        href: "/products/cruise-groups",
        imageSrc: "/images/product-yangtze-cruise.png",
        imageAlt: "三峡邮轮产品",
      },
      {
        title: "康养旅行",
        subtitle: "Wellness & Health Retreats",
        description: "森林康养、温泉度假与高品质慢旅行体验。",
        href: "#",
        imageSrc: "/images/product-wellness.png",
        imageAlt: "康养旅行产品",
      },
    ],
  },
  quality: {
    title: "品质旅游，诚信接待",
    description:
      "我们坚持真实产品信息、明确品质承诺与合作伙伴口碑保护，帮助 B2B 合作伙伴维护客户体验与品牌声誉。",
    cards: [
      {
        title: "真实产品信息",
        description:
          "产品内容、接待标准、行程安排如实呈现，避免过度包装和不实承诺。",
      },
      {
        title: "明确品质承诺",
        description:
          "核心接待标准、服务细节与品质要求可在合作方案或合同中明确写入。",
      },
      {
        title: "合作伙伴口碑保护",
        description:
          "稳定执行、清晰沟通、及时反馈，帮助 B2B 合作伙伴维护客户体验与品牌声誉。",
      },
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
