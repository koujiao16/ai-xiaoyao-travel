export type DestinationSlug = "shaanxi" | "northeast" | "henan";

export type FeaturedResource = {
  imagePath: string;
  title: string;
  description: string;
};

export type DestinationCapability = {
  title: string;
  description: string;
};

export type DestinationDetailContent = {
  slug: DestinationSlug;
  title: string;
  positioning: string;
  heroImageSrc?: string;
  featuredResources: FeaturedResource[];
  capabilities: DestinationCapability[];
};

const destinationDetailsEn: Record<DestinationSlug, DestinationDetailContent> = {
  shaanxi: {
    slug: "shaanxi",
    title: "Shaanxi",
    positioning:
      "Ancient capital culture, Xi'an ground services, study tour resources and Qinling routes.",
    heroImageSrc: "/images/shaanxi-destination-hero.png",
    featuredResources: [
      {
        imagePath: "/images/shaanxi-resource-01.jpg",
        title: "National Archives Resource",
        description: "Exclusive cultural access with in-depth guided interpretation.",
      },
      {
        imagePath: "/images/shaanxi-resource-02.jpg",
        title: "Qinling Ecology Exploration",
        description: "Wildlife observation, ecology workshops and nature exploration.",
      },
      {
        imagePath: "/images/shaanxi-resource-03.jpg",
        title: "Industrial & Technology Study Tour",
        description:
          "Connecting automotive manufacturing and premium industrial visit resources.",
      },
      {
        imagePath: "/images/shaanxi-destination-hero.png",
        title: "Intangible Cultural Heritage Experience",
        description: "Traditional craft experiences and interactive cultural programs.",
      },
    ],
    capabilities: [
      {
        title: "Xi'an Ground Operations",
        description: "Stable local reception, transfers and day-to-day destination execution.",
      },
      {
        title: "Exclusive Cultural Access",
        description: "Specialist heritage resources with guided interpretation support.",
      },
      {
        title: "Boutique Group Delivery",
        description: "Small-group pacing, flexible routing and partner-ready packaging.",
      },
      {
        title: "B2B Quality Assurance",
        description: "Contract-ready service standards that protect partner reputation.",
      },
    ],
  },
  northeast: {
    slug: "northeast",
    title: "Northeast China",
    positioning:
      "Ice and snow tourism, natural landscapes, border culture and seasonal travel experiences across Heilongjiang and Jilin.",
    heroImageSrc: "/images/northeast-destination-hero.png",
    featuredResources: [
      {
        imagePath: "/images/northeast-destination-hero.png",
        title: "Changbai Mountain Nature",
        description: "Tianchi, alpine forests and four-season mountain landscapes.",
      },
      {
        imagePath: "/images/northeast-border.jpg",
        title: "Northeast Border Culture",
        description: "Border routes, Korean ethnic culture and cross-region experiences.",
      },
      {
        imagePath: "/images/northeast-snow.jpg",
        title: "Winter & Ice Snow",
        description: "Ice festivals, winter scenery and seasonal snow programs.",
      },
      {
        imagePath: "/images/northeast-wellness.jpg",
        title: "Forest Ecology & Wellness",
        description: "Cool-climate forests, lakeside retreats and wellness resources.",
      },
    ],
    capabilities: [
      {
        title: "Inbound Group Reception",
        description: "Reliable entry handling for overseas teams across Northeast gateways.",
      },
      {
        title: "Cross-Province Operations",
        description: "Heilongjiang–Jilin multi-city routing with coordinated ground delivery.",
      },
      {
        title: "Seasonal Product Support",
        description: "Ice-snow, border and summer wellness programs for partner packaging.",
      },
      {
        title: "B2B Execution Standards",
        description: "Clear operational notes and quality commitments for trade partners.",
      },
    ],
  },
  henan: {
    slug: "henan",
    title: "Henan",
    positioning:
      "Central China culture, provincial heritage resources and multi-city route connections.",
    heroImageSrc: "/images/henan-destination-hero.png",
    featuredResources: [
      {
        imagePath: "/images/henan-resource-01.jpg",
        title: "Longmen Grottoes",
        description: "Grotto art, ancient-capital culture and heritage sightseeing routes.",
      },
      {
        imagePath: "/images/henan-resource-02.jpg",
        title: "Shaolin Culture",
        description: "Martial arts, Zen heritage and cultural experience programs.",
      },
      {
        imagePath: "/images/henan-resource-03.jpg",
        title: "Central China Heritage",
        description: "Museum learning, historic cities and multi-site cultural links.",
      },
    ],
    capabilities: [
      {
        title: "Central China Routing",
        description: "Multi-city connections across Henan’s core heritage destinations.",
      },
      {
        title: "Heritage Experience Delivery",
        description: "Grottoes, Shaolin and cultural programs with local operational support.",
      },
      {
        title: "Group Reception Support",
        description: "Inbound team handling, transfers and on-ground destination services.",
      },
      {
        title: "Partner Product Packaging",
        description: "B2B-ready itineraries designed for trade partners and group markets.",
      },
    ],
  },
};

const destinationDetailsZh: Record<DestinationSlug, DestinationDetailContent> = {
  shaanxi: {
    slug: "shaanxi",
    title: "陕西",
    positioning: "古都文化、西安地接、研学资源与秦岭线路。",
    heroImageSrc: "/images/shaanxi-destination-hero.png",
    featuredResources: [
      {
        imagePath: "/images/shaanxi-resource-01.jpg",
        title: "国家版本馆独家资源",
        description: "专属文化资源与深度讲解体验。",
      },
      {
        imagePath: "/images/shaanxi-resource-02.jpg",
        title: "秦岭生态科考",
        description: "动植物观察、生态课堂与自然探索。",
      },
      {
        imagePath: "/images/shaanxi-resource-03.jpg",
        title: "工业与科技研学",
        description: "连接汽车制造、高端工业参访资源。",
      },
      {
        imagePath: "/images/shaanxi-destination-hero.png",
        title: "非遗文化体验",
        description: "传统技艺体验与文化互动课程。",
      },
    ],
    capabilities: [
      {
        title: "西安地接执行",
        description: "稳定的接送、接待与目的地日常落地执行。",
      },
      {
        title: "独家文化资源对接",
        description: "特色文化遗产资源与专业讲解支持。",
      },
      {
        title: "精品小团交付",
        description: "灵活行程节奏与适合合作伙伴打包的产品结构。",
      },
      {
        title: "B2B 品质保障",
        description: "可写入合同的服务标准，保护合作伙伴口碑。",
      },
    ],
  },
  northeast: {
    slug: "northeast",
    title: "中国东北",
    positioning: "冰雪旅游、自然风光、边境文化与季节性旅行体验，覆盖黑龙江与吉林区域资源。",
    heroImageSrc: "/images/northeast-destination-hero.png",
    featuredResources: [
      {
        imagePath: "/images/northeast-destination-hero.png",
        title: "长白山自然资源",
        description: "天池、高山森林与四季山地景观。",
      },
      {
        imagePath: "/images/northeast-border.jpg",
        title: "东北边境文化体验",
        description: "边境线路、朝鲜族文化与跨区域体验。",
      },
      {
        imagePath: "/images/northeast-snow.jpg",
        title: "冰雪旅游资源",
        description: "冰雪节庆、冬季景观与季节性产品。",
      },
      {
        imagePath: "/images/northeast-wellness.jpg",
        title: "森林生态与康养资源",
        description: "清凉山林、湖畔度假与康养资源。",
      },
    ],
    capabilities: [
      {
        title: "入境团队接待",
        description: "覆盖东北门户城市的海外团队稳定接待能力。",
      },
      {
        title: "黑吉跨省联线执行",
        description: "黑龙江—吉林多城联线与协调一致的地接交付。",
      },
      {
        title: "季节性产品支持",
        description: "冰雪、边境与夏季康养等主题，便于合作伙伴打包。",
      },
      {
        title: "B2B 落地标准",
        description: "清晰的操作说明与品质承诺，服务贸易合作伙伴。",
      },
    ],
  },
  henan: {
    slug: "henan",
    title: "河南",
    positioning: "中原文化、省内资源与跨区域线路联动。",
    heroImageSrc: "/images/henan-destination-hero.png",
    featuredResources: [
      {
        imagePath: "/images/henan-resource-01.jpg",
        title: "龙门石窟",
        description: "石窟艺术、古都文化与观光线路。",
      },
      {
        imagePath: "/images/henan-resource-02.jpg",
        title: "少林文化",
        description: "武术禅宗与文化体验项目。",
      },
      {
        imagePath: "/images/henan-resource-03.jpg",
        title: "中原文明体验",
        description: "博物学习、历史名城与多点联线。",
      },
    ],
    capabilities: [
      {
        title: "中原线路联线",
        description: "串联河南核心遗产目的地的多城市行程能力。",
      },
      {
        title: "遗产体验执行",
        description: "石窟、少林与文化项目的本地落地支持。",
      },
      {
        title: "团队接待支持",
        description: "入境团队接待、接送与目的地服务保障。",
      },
      {
        title: "合作伙伴产品打包",
        description: "面向贸易合作伙伴的 B2B 行程与产品结构。",
      },
    ],
  },
};

export const destinationSlugs = Object.keys(destinationDetailsEn) as DestinationSlug[];

export function getDestinationDetail(
  slug: string,
  locale: "en" | "zh"
): DestinationDetailContent | null {
  if (!(slug in destinationDetailsEn)) return null;
  const key = slug as DestinationSlug;
  return locale === "zh" ? destinationDetailsZh[key] : destinationDetailsEn[key];
}

export function getDestinationDetailLabels(locale: "en" | "zh") {
  if (locale === "zh") {
    return {
      heroEyebrow: "目的地",
      featuredTitle: "特色资源",
      featuredEyebrow: "本地资源",
      capabilityTitle: "目的地服务能力",
      capabilityEyebrow: "接待与执行",
      productsComingSoon: "产品即将上线，敬请期待。",
      finalCtaTitle: "定制您的目的地项目",
      finalCtaDescription:
        "请发送人数、出行日期与核心需求，我们将提供产品建议与当地执行支持。",
      contactLabel: "联系我们",
      whatsappLabel: "WhatsApp",
      emailLabel: "发送邮件",
    };
  }
  return {
    heroEyebrow: "Destination",
    featuredTitle: "Featured Resources",
    featuredEyebrow: "Local Resources",
    capabilityTitle: "Destination Capabilities",
    capabilityEyebrow: "Reception & Delivery",
    productsComingSoon: "Products coming soon.",
    finalCtaTitle: "Plan Your Destination Program",
    finalCtaDescription:
      "Send your group size, travel dates and key requirements. Our team will provide product ideas and local operation support.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  };
}
