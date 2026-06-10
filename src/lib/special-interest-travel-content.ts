import type { SiteLocale } from "@/lib/locale-paths";

export type SpecialInterestProgram = {
  title: string;
  description: string;
};

export type SpecialInterestMediaPlaceholder = {
  label: string;
  /** Future image — replace placeholder when asset is ready */
  imagePath: string;
};

export type SpecialInterestTravelContent = {
  metadataTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  featuredPrograms: {
    title: string;
    programs: SpecialInterestProgram[];
  };
  bestFor: { title: string; items: string[] };
  mediaPlaceholders: {
    title: string;
    items: SpecialInterestMediaPlaceholder[];
  };
  finalCta: {
    title: string;
    description: string;
    contactLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

const specialInterestTravelContentEn: SpecialInterestTravelContent = {
  metadataTitle: "Special Interest Travel",
  heroEyebrow: "Products",
  heroTitle: "Special Interest Travel",
  heroSubtitle:
    "Deep travel experiences built around food, nature, hiking, photography and cultural heritage.",
  heroDescription:
    "We design themed programs for small groups, institutions and customized clients who want more focused and meaningful China travel experiences.",
  featuredPrograms: {
    title: "Featured Programs",
    programs: [
      {
        title: "Qinling Nature Exploration",
        description:
          "Nature learning and exploration programs combining biodiversity, ecological observation and local outdoor resources.",
      },
      {
        title: "Qinling Light Hiking",
        description:
          "Flexible hiking experiences suitable for small groups, families and special-interest travelers.",
      },
      {
        title: "Food Discovery",
        description:
          "Local cuisine, specialty restaurants, market visits and cultural dining experiences.",
      },
      {
        title: "Cultural Photography",
        description:
          "Photography routes combining historic streets, landscapes, local life and seasonal scenery.",
      },
      {
        title: "Intangible Cultural Heritage",
        description:
          "Hands-on experiences involving local crafts, traditional performances and cultural learning.",
      },
      {
        title: "Architecture & History",
        description:
          "Focused cultural programs exploring ancient cities, museums, architecture and local history.",
      },
    ],
  },
  bestFor: {
    title: "Best For",
    items: [
      "Small Private Groups",
      "Families",
      "Schools & Institutions",
      "Photography Groups",
      "Outdoor Interest Groups",
      "Premium Customized Clients",
    ],
  },
  mediaPlaceholders: {
    title: "Program Highlights",
    items: [
      {
        label: "Qinling Nature Exploration",
        imagePath: "/images/special-interest/qinling-exploration.jpg",
      },
      {
        label: "Qinling Light Hiking",
        imagePath: "/images/special-interest/qinling-hiking.jpg",
      },
      {
        label: "Food Discovery",
        imagePath: "/images/special-interest/food-discovery.jpg",
      },
      {
        label: "Cultural Photography",
        imagePath: "/images/special-interest/photography.jpg",
      },
      {
        label: "Intangible Cultural Heritage",
        imagePath: "/images/special-interest/heritage.jpg",
      },
    ],
  },
  finalCta: {
    title: "Design Your Special Interest Program",
    description:
      "Share your interests, group type, travel dates and preferred destination. Our team will provide tailored program ideas.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

const specialInterestTravelContentZh: SpecialInterestTravelContent = {
  metadataTitle: "特殊兴趣旅行",
  heroEyebrow: "产品体系",
  heroTitle: "特殊兴趣旅行",
  heroSubtitle: "围绕美食、自然、徒步、摄影与文化遗产打造深度主题旅行体验。",
  heroDescription:
    "面向小团、机构客户与定制化客群，围绕兴趣主题设计更深入、更有内容的中国旅行产品。",
  featuredPrograms: {
    title: "代表项目",
    programs: [
      {
        title: "秦岭科考",
        description: "围绕生物多样性、生态观察与秦岭自然资源设计的科考与自然探索项目。",
      },
      {
        title: "秦岭轻徒步",
        description: "适合小团、家庭及兴趣客群的轻量化徒步与自然体验产品。",
      },
      {
        title: "美食品鉴",
        description: "融合地方风味、特色餐厅、市场探访与文化餐饮体验的主题产品。",
      },
      {
        title: "摄影采风",
        description: "围绕历史街区、自然风光、地方生活与季节景观设计的摄影线路。",
      },
      {
        title: "非遗深度体验",
        description: "结合地方手工艺、传统表演与文化学习的沉浸式非遗体验。",
      },
      {
        title: "建筑与历史主题",
        description: "围绕古城、博物馆、建筑与地方历史展开的深度文化主题线路。",
      },
    ],
  },
  bestFor: {
    title: "适合客群",
    items: [
      "定制小团",
      "亲子家庭",
      "学校与机构",
      "摄影团队",
      "户外兴趣团队",
      "高端定制客户",
    ],
  },
  mediaPlaceholders: {
    title: "主题项目展示",
    items: [
      {
        label: "秦岭科考",
        imagePath: "/images/special-interest/qinling-exploration.jpg",
      },
      {
        label: "秦岭轻徒步",
        imagePath: "/images/special-interest/qinling-hiking.jpg",
      },
      {
        label: "美食品鉴",
        imagePath: "/images/special-interest/food-discovery.jpg",
      },
      {
        label: "摄影采风",
        imagePath: "/images/special-interest/photography.jpg",
      },
      {
        label: "非遗深度体验",
        imagePath: "/images/special-interest/heritage.jpg",
      },
    ],
  },
  finalCta: {
    title: "定制您的特殊兴趣旅行",
    description:
      "请发送兴趣主题、团型、出行日期与目的地偏好，我们将提供定制化产品建议。",
    contactLabel: "联系我们",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

export function getSpecialInterestTravelContent(
  locale: SiteLocale
): SpecialInterestTravelContent {
  return locale === "zh" ? specialInterestTravelContentZh : specialInterestTravelContentEn;
}
