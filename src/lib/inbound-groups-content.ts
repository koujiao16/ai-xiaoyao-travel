import type { SiteLocale } from "@/lib/locale-paths";

export type InboundGroupCasePlaceholder = {
  title: string;
  /** Future image — e.g. /images/inbound/hong-kong-macau.jpg */
  imagePath?: string;
  /** Future video — WeChat Channels or external link */
  videoUrl?: string;
};

export type InboundGroupsContent = {
  metadataTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  marketsWeSupport: { title: string; items: string[] };
  whatWeProvide: { title: string; items: string[] };
  bestFor: { title: string; items: string[] };
  casePlaceholders: {
    title: string;
    items: InboundGroupCasePlaceholder[];
  };
  finalCta: {
    title: string;
    description: string;
    contactLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

const inboundGroupsContentEn: InboundGroupsContent = {
  metadataTitle: "Inbound Groups",
  heroEyebrow: "Services",
  heroTitle: "Inbound Groups",
  heroSubtitle: "China destination reception for overseas and regional travel partners.",
  heroDescription:
    "We support overseas travel agencies and institutional partners with China inbound reception, multi-city coordination, cultural experiences and flexible local operations.",
  marketsWeSupport: {
    title: "Markets We Support",
    items: [
      "Hong Kong, Macau & Taiwan",
      "Southeast Asia",
      "Overseas Chinese Markets",
      "European Markets",
      "International School Groups",
      "Corporate Delegations",
    ],
  },
  whatWeProvide: {
    title: "What We Provide",
    items: [
      "China Route Planning",
      "Local Ground Services",
      "Multi-city Coordination",
      "Cultural Experiences",
      "Special Meal Requirements",
      "Prayer Arrangements",
      "Group Event Support",
      "Customized Reception",
    ],
  },
  bestFor: {
    title: "Best For",
    items: [
      "Overseas Travel Agencies",
      "Regional Travel Partners",
      "Overseas Chinese Groups",
      "Corporate Delegations",
      "School Groups",
      "Customized Groups",
    ],
  },
  casePlaceholders: {
    title: "Selected Inbound Group Experiences",
    items: [
      { title: "Hong Kong & Macau Groups", imagePath: "/images/inbound/hong-kong-macau.jpg" },
      { title: "Taiwan Groups", imagePath: "/images/inbound/taiwan.jpg" },
      { title: "Malaysia Groups", imagePath: "/images/inbound/malaysia.jpg" },
      { title: "Singapore Groups", imagePath: "/images/inbound/singapore.jpg" },
      { title: "Overseas Chinese Groups", imagePath: "/images/inbound/overseas-chinese.jpg" },
    ],
  },
  finalCta: {
    title: "Plan Your China Inbound Program",
    description:
      "Send your preferred destinations, group size, travel dates and service requirements. Our team will provide route ideas and local operation support.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

const inboundGroupsContentZh: InboundGroupsContent = {
  metadataTitle: "入境团队",
  heroEyebrow: "服务",
  heroTitle: "入境团队",
  heroSubtitle: "面向境外及区域合作伙伴的中国目的地接待服务。",
  heroDescription:
    "为境外旅行社、机构客户与区域合作伙伴提供中国入境接待、多城市联动、文化体验与灵活落地执行支持。",
  marketsWeSupport: {
    title: "服务市场",
    items: [
      "港澳台市场",
      "东南亚市场",
      "海外华人市场",
      "欧洲市场",
      "国际学校团队",
      "企业考察团",
    ],
  },
  whatWeProvide: {
    title: "我们提供",
    items: [
      "中国线路规划",
      "当地地接服务",
      "多城市联动",
      "文化体验",
      "特殊餐食安排",
      "礼拜需求协调",
      "团队活动支持",
      "定制化接待",
    ],
  },
  bestFor: {
    title: "适合客群",
    items: [
      "境外旅行社",
      "区域合作伙伴",
      "海外华人团队",
      "企业考察团",
      "学校团队",
      "定制化团队",
    ],
  },
  casePlaceholders: {
    title: "精选入境团队接待",
    items: [
      { title: "港澳团队", imagePath: "/images/inbound/hong-kong-macau.jpg" },
      { title: "台湾团队", imagePath: "/images/inbound/taiwan.jpg" },
      { title: "马来西亚团队", imagePath: "/images/inbound/malaysia.jpg" },
      { title: "新加坡团队", imagePath: "/images/inbound/singapore.jpg" },
      { title: "海外华人团队", imagePath: "/images/inbound/overseas-chinese.jpg" },
    ],
  },
  finalCta: {
    title: "定制您的中国入境接待方案",
    description:
      "请发送目的地、人数、出行日期与服务需求，我们将提供线路建议与落地执行支持。",
    contactLabel: "联系我们",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

export function getInboundGroupsContent(locale: SiteLocale): InboundGroupsContent {
  return locale === "zh" ? inboundGroupsContentZh : inboundGroupsContentEn;
}
