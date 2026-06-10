import type { SiteLocale } from "@/lib/locale-paths";

export type CustomChinaRoute = {
  title: string;
  description: string;
};

export type CustomChinaRouteMediaPlaceholder = {
  label: string;
  /** Future image — replace placeholder when asset is ready */
  imagePath: string;
};

export type CustomChinaRoutesContent = {
  metadataTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  featuredRoutes: {
    title: string;
    routes: CustomChinaRoute[];
  };
  whatWeProvide: { title: string; items: string[] };
  bestFor: { title: string; items: string[] };
  mediaPlaceholders: {
    title: string;
    items: CustomChinaRouteMediaPlaceholder[];
  };
  finalCta: {
    title: string;
    description: string;
    contactLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

const customChinaRoutesContentEn: CustomChinaRoutesContent = {
  metadataTitle: "Custom China Routes",
  heroEyebrow: "Products",
  heroTitle: "Custom China Routes",
  heroSubtitle:
    "Flexible multi-city China programs designed for different markets and group types.",
  heroDescription:
    "We design cross-region China itineraries that connect major gateways, cultural destinations and seasonal experiences through reliable multi-city ground operations.",
  featuredRoutes: {
    title: "Featured Routes",
    routes: [
      {
        title: "Beijing + Xi'an + Shanghai",
        description:
          "A classic first-time China route combining major gateways, imperial history, ancient capital culture and modern city experiences.",
      },
      {
        title: "Beijing + Xi'an + Luoyang",
        description:
          "A cultural heritage route connecting imperial history, ancient capitals, Terracotta Warriors, Longmen Grottoes and Central China culture.",
      },
      {
        title: "Shanghai + Xi'an + Chengdu",
        description:
          "A route combining modern city life, ancient capital history, local cuisine and regional culture.",
      },
      {
        title: "Harbin + Beijing + Xi'an",
        description:
          "A seasonal winter route combining Northeast China snow experiences, capital city culture and ancient Xi'an heritage.",
      },
      {
        title: "Xi'an + Zhengzhou + Luoyang",
        description:
          "A convenient high-speed rail cultural route connecting Shaanxi and Henan heritage resources.",
      },
    ],
  },
  whatWeProvide: {
    title: "What We Provide",
    items: [
      "Multi-city Itinerary Design",
      "Flight & High-speed Rail Connections",
      "Multi-region Ground Operations",
      "Local Guide Coordination",
      "Hotel & Dining Arrangements",
      "Seasonal Route Design",
      "Customized Group Support",
    ],
  },
  bestFor: {
    title: "Best For",
    items: [
      "Overseas Travel Agencies",
      "First-time China Groups",
      "Cultural Travel Groups",
      "Customized Private Groups",
      "Study Tours",
      "Seasonal Groups",
    ],
  },
  mediaPlaceholders: {
    title: "Route Highlights",
    items: [
      {
        label: "Beijing + Xi'an + Shanghai",
        imagePath: "/images/routes/beijing-xian-shanghai.jpg",
      },
      {
        label: "Beijing + Xi'an + Luoyang",
        imagePath: "/images/routes/beijing-xian-luoyang.jpg",
      },
      {
        label: "Shanghai + Xi'an + Chengdu",
        imagePath: "/images/routes/shanghai-xian-chengdu.jpg",
      },
      {
        label: "Harbin + Beijing + Xi'an",
        imagePath: "/images/routes/harbin-beijing-xian.jpg",
      },
    ],
  },
  finalCta: {
    title: "Plan Your Multi-city China Route",
    description:
      "Send your target market, destinations, travel dates and group requirements. Our team will provide route ideas and local operation support.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

const customChinaRoutesContentZh: CustomChinaRoutesContent = {
  metadataTitle: "中国定制联线",
  heroEyebrow: "产品体系",
  heroTitle: "中国定制联线",
  heroSubtitle: "面向不同市场与客群设计灵活的中国多城市联线产品。",
  heroDescription:
    "通过多地地接协同、高铁与航班衔接，将门户城市、文化目的地与季节性体验灵活串联，为合作伙伴提供中国多城市产品设计支持。",
  featuredRoutes: {
    title: "代表联线",
    routes: [
      {
        title: "北京 + 西安 + 上海",
        description:
          "适合首次来华客人的中国经典联线，融合门户城市、古都文化、历史体验与现代都市风貌。",
      },
      {
        title: "北京 + 西安 + 洛阳",
        description:
          "串联北京、西安与洛阳的历史文化线路，涵盖古都文明、兵马俑、龙门石窟与中原文化。",
      },
      {
        title: "上海 + 西安 + 成都",
        description: "融合现代都市、古都历史、地方美食与区域文化体验的中国联线产品。",
      },
      {
        title: "哈尔滨 + 北京 + 西安",
        description: "结合东北冰雪、北京文化与西安古都体验的季节性中国联线产品。",
      },
      {
        title: "西安 + 郑州 + 洛阳",
        description: "通过高铁串联陕西与河南文化资源，适合文化主题、研学及区域联动团队。",
      },
    ],
  },
  whatWeProvide: {
    title: "我们提供",
    items: [
      "多城市线路设计",
      "航班与高铁衔接",
      "多区域地接执行",
      "当地导游协调",
      "酒店与餐饮安排",
      "季节性线路设计",
      "定制化团队支持",
    ],
  },
  bestFor: {
    title: "适合客群",
    items: [
      "境外旅行社",
      "首次来华团队",
      "文化旅游团队",
      "定制小团",
      "研学团队",
      "季节性主题团队",
    ],
  },
  mediaPlaceholders: {
    title: "联线展示",
    items: [
      {
        label: "北京 + 西安 + 上海",
        imagePath: "/images/routes/beijing-xian-shanghai.jpg",
      },
      {
        label: "北京 + 西安 + 洛阳",
        imagePath: "/images/routes/beijing-xian-luoyang.jpg",
      },
      {
        label: "上海 + 西安 + 成都",
        imagePath: "/images/routes/shanghai-xian-chengdu.jpg",
      },
      {
        label: "哈尔滨 + 北京 + 西安",
        imagePath: "/images/routes/harbin-beijing-xian.jpg",
      },
    ],
  },
  finalCta: {
    title: "定制您的中国联线产品",
    description:
      "请发送目标市场、目的地、出行日期与团队需求，我们将提供线路建议与多地接待支持。",
    contactLabel: "联系我们",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

export function getCustomChinaRoutesContent(locale: SiteLocale): CustomChinaRoutesContent {
  return locale === "zh" ? customChinaRoutesContentZh : customChinaRoutesContentEn;
}
