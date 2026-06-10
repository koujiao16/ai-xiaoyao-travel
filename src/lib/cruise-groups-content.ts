import type { SiteLocale } from "@/lib/locale-paths";

export type CruiseGroupProgramPlaceholder = {
  title: string;
  /** Future image — replace placeholder when asset is ready */
  imagePath: string;
};

export type CruiseGroupsContent = {
  metadataTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  whatWeProvide: { title: string; items: string[] };
  bestFor: { title: string; items: string[] };
  programPlaceholders: {
    title: string;
    programs: CruiseGroupProgramPlaceholder[];
  };
  finalCta: {
    title: string;
    description: string;
    contactLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

const cruiseGroupsContentEn: CruiseGroupsContent = {
  metadataTitle: "Cruise Groups",
  heroEyebrow: "Products",
  heroTitle: "Cruise Groups",
  heroSubtitle:
    "Shore excursions, pre/post-cruise routes and China ground operations for cruise-related groups.",
  heroDescription:
    "We support cruise-related groups with port city reception, shore excursions, pre/post-cruise extensions and multi-city China ground arrangements.",
  whatWeProvide: {
    title: "What We Provide",
    items: [
      "Shore Excursions",
      "Pre/Post-cruise Routes",
      "Port City Connections",
      "Local Ground Handling",
      "Multi-city Extensions",
      "Large Series Groups",
      "Customized Group Operations",
    ],
  },
  bestFor: {
    title: "Best For",
    items: [
      "Cruise Operators",
      "Overseas Travel Agencies",
      "Large Series Groups",
      "Overseas Chinese Groups",
      "Customized Cruise Groups",
      "Multi-city Extension Groups",
    ],
  },
  programPlaceholders: {
    title: "Cruise Group Programs",
    programs: [
      {
        title: "Port City Shore Excursion",
        imagePath: "/images/cruise/shore-excursion.jpg",
      },
      {
        title: "Pre-cruise China Extension",
        imagePath: "/images/cruise/pre-cruise-route.jpg",
      },
      {
        title: "Post-cruise China Extension",
        imagePath: "/images/cruise/post-cruise-route.jpg",
      },
      {
        title: "Multi-city Cruise Group Program",
        imagePath: "/images/cruise/multi-city-extension.jpg",
      },
    ],
  },
  finalCta: {
    title: "Plan Your Cruise Group Program",
    description:
      "Send your port city, travel dates, group size and extension requirements. Our team will provide route ideas and local operation support.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

const cruiseGroupsContentZh: CruiseGroupsContent = {
  metadataTitle: "邮轮团队",
  heroEyebrow: "产品体系",
  heroTitle: "邮轮团队",
  heroSubtitle: "邮轮岸上观光、前后延伸线路及邮轮相关团队地接服务。",
  heroDescription:
    "面向邮轮相关客群，为合作伙伴提供港口城市接待、岸上观光、邮轮前后延伸线路及中国多城市地接支持。",
  whatWeProvide: {
    title: "我们提供",
    items: [
      "邮轮岸上观光",
      "邮轮前后延伸线路",
      "港口城市联动",
      "当地地接服务",
      "中国多城市延伸线路",
      "大型系列团队",
      "定制化团队运营",
    ],
  },
  bestFor: {
    title: "适合客群",
    items: [
      "邮轮运营方",
      "境外旅行社",
      "大型系列团队",
      "海外华人团队",
      "定制邮轮团队",
      "多城市延伸线路团队",
    ],
  },
  programPlaceholders: {
    title: "邮轮团队产品",
    programs: [
      {
        title: "港口城市岸上观光",
        imagePath: "/images/cruise/shore-excursion.jpg",
      },
      {
        title: "邮轮前中国延伸线路",
        imagePath: "/images/cruise/pre-cruise-route.jpg",
      },
      {
        title: "邮轮后中国延伸线路",
        imagePath: "/images/cruise/post-cruise-route.jpg",
      },
      {
        title: "邮轮团队中国多城市联线",
        imagePath: "/images/cruise/multi-city-extension.jpg",
      },
    ],
  },
  finalCta: {
    title: "定制您的邮轮团队方案",
    description:
      "请发送港口城市、出行日期、人数与延伸线路需求，我们将提供产品建议与地接支持。",
    contactLabel: "联系我们",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

export function getCruiseGroupsContent(locale: SiteLocale): CruiseGroupsContent {
  return locale === "zh" ? cruiseGroupsContentZh : cruiseGroupsContentEn;
}
