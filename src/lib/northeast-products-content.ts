import type { SiteLocale } from "@/lib/locale-paths";

export const NORTHEAST_PRODUCT_SLUGS = [
  "jilin-highlights-5d",
  "yanji-culture-6d",
  "changbai-holiday-5d",
  "summer-corridor-6d",
] as const;

export type NortheastProductSlug = (typeof NORTHEAST_PRODUCT_SLUGS)[number];

export type NortheastProduct = {
  slug: NortheastProductSlug;
  title: string;
  route: string;
  duration: string;
  departure: string;
  groupSize: string;
  arrivalDeparture?: string;
  pdfUrl: string;
  overview: string;
  highlights: [string, string, string, string];
  itineraryIntro: string;
  gallerySlots: [
    { label: string; futureImagePath: string },
    { label: string; futureImagePath: string },
    { label: string; futureImagePath: string },
  ];
};

export type NortheastCategoryId =
  | "jilin-programs"
  | "heilongjiang-programs"
  | "northeast-cross-region"
  | "shaanxi-programs"
  | "henan-programs"
  | "northwest-routes";

export type NortheastCategory = {
  id: NortheastCategoryId;
  title: string;
  description?: string;
  slugs: NortheastProductSlug[];
};

export type NortheastListingLabels = {
  qualityBadgeLabel: string;
  categories: NortheastCategory[];
  routeLabel: string;
  durationLabel: string;
  departureLabel: string;
  arrivalDepartureLabel: string;
  groupSizeLabel: string;
  viewDetailsLabel: string;
  viewPdfLabel: string;
};

export type NortheastCategoryWithProducts = NortheastCategory & {
  products: NortheastProduct[];
};

export type NortheastDetailLabels = {
  qualityBadgeLabel: string;
  routeLabel: string;
  durationLabel: string;
  departureLabel: string;
  arrivalDepartureLabel: string;
  groupSizeLabel: string;
  overviewTitle: string;
  qualitySupportTitle: string;
  qualitySupportText: string;
  highlightsTitle: string;
  itineraryTitle: string;
  itineraryPdfNote: string;
  viewPdfLabel: string;
  galleryTitle: string;
  backLabel: string;
  finalCtaTitle: string;
  finalCtaDescription: string;
  contactLabel: string;
  whatsappLabel: string;
  emailLabel: string;
};

type NortheastLocaleBundle = {
  listing: NortheastListingLabels;
  detail: NortheastDetailLabels;
  products: NortheastProduct[];
};

const northeastEn: NortheastLocaleBundle = {
  listing: {
    qualityBadgeLabel: "Supported by the Leisure Travel Product System",
    categories: [
      {
        id: "jilin-programs",
        title: "Jilin Programs",
        description:
          "Small-group Jilin programs supported by the Leisure Travel product system, covering Changchun, Changbai Mountain, Yanji, Tumen and Jilin City.",
        slugs: ["jilin-highlights-5d", "yanji-culture-6d", "changbai-holiday-5d"],
      },
      {
        id: "heilongjiang-programs",
        title: "Heilongjiang Programs",
        slugs: [],
      },
      {
        id: "northeast-cross-region",
        title: "Northeast Cross-region Routes",
        description:
          "Cross-region Northeast China programs connecting representative destinations in Jilin and Heilongjiang.",
        slugs: ["summer-corridor-6d"],
      },
      {
        id: "shaanxi-programs",
        title: "Shaanxi Programs",
        slugs: [],
      },
      {
        id: "henan-programs",
        title: "Henan Programs",
        slugs: [],
      },
      {
        id: "northwest-routes",
        title: "Northwest China Routes",
        slugs: [],
      },
    ],
    routeLabel: "Route",
    durationLabel: "Duration",
    departureLabel: "Departures",
    arrivalDepartureLabel: "Arrival & departure",
    groupSizeLabel: "Group size",
    viewDetailsLabel: "View Details",
    viewPdfLabel: "View PDF",
  },
  detail: {
    qualityBadgeLabel: "Supported by the Leisure Travel Product System",
    routeLabel: "Route",
    durationLabel: "Duration",
    departureLabel: "Departures",
    arrivalDepartureLabel: "Arrival & departure",
    groupSizeLabel: "Group size",
    overviewTitle: "Product Overview",
    qualitySupportTitle: "Leisure Travel Product Quality Support",
    qualitySupportText: "Key quality commitments can be written into the contract.",
    highlightsTitle: "Highlights",
    itineraryTitle: "Detailed Itinerary",
    itineraryPdfNote:
      "The full day-by-day itinerary, inclusions and operational notes are provided in the product PDF for partner reference.",
    viewPdfLabel: "View PDF",
    galleryTitle: "Image Gallery",
    backLabel: "Back to Destination Products",
    finalCtaTitle: "Discuss This Program",
    finalCtaDescription:
      "Share your market, travel dates and group profile. We will confirm availability and operational details for this Northeast program.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
  products: [
    {
      slug: "jilin-highlights-5d",
      title: "Jilin Highlights · 5 Days",
      route: "Changchun → Changbai Mountain → Yanji → Tumen",
      duration: "5 days",
      departure: "Departures every Tuesday, Thursday and Saturday",
      groupSize: "Small group · 2–13 guests",
      pdfUrl: "/resources/northeast/jilin/jilin-highlights-5d.pdf",
      overview:
        "A five-day small-group route connecting Changchun, Changbai Mountain, Yanji and Tumen—suited for partners seeking Changbai scenery, Korean-border culture and dependable Northeast ground handling within a compact schedule.",
      highlights: [
        "Changbai Mountain scenic access",
        "Yanji ethnic culture stopover",
        "Tumen border-town orientation",
        "Stable small-group ground operations",
      ],
      itineraryIntro:
        "Five operating days from Changchun through Changbai Mountain, Yanji and Tumen. Refer to the PDF for daily sequencing, hotel zones and partner notes.",
      gallerySlots: [
        {
          label: "Changbai Mountain",
          futureImagePath: "/images/northeast/jilin-highlights-changbai.jpg",
        },
        {
          label: "Yanji",
          futureImagePath: "/images/northeast/jilin-highlights-yanji.jpg",
        },
        {
          label: "Tumen",
          futureImagePath: "/images/northeast/jilin-highlights-tumen.jpg",
        },
      ],
    },
    {
      slug: "yanji-culture-6d",
      title: "Changbai Mountain & Yanji Culture · 6 Days",
      route: "Changchun → Changbai Mountain → Yanji → Tumen → Jilin City",
      duration: "6 days",
      departure: "Departures every Tuesday, Thursday and Saturday",
      groupSize: "Small group · 2–13 guests",
      pdfUrl: "/resources/northeast/jilin/yanji-culture-6d.pdf",
      overview:
        "Six days across Changbai Mountain, Yanji, Tumen and Jilin City—balancing nature, border culture and Songhua River heritage for overseas small groups that want depth without a long Northeast stay.",
      highlights: [
        "Extended Changbai Mountain stay",
        "Yanji cultural experiences",
        "Tumen border context",
        "Jilin City Songhua River finish",
      ],
      itineraryIntro:
        "Six-day loop with a Jilin City close. The PDF outlines daily pacing, optional activities and B2B coordination points.",
      gallerySlots: [
        {
          label: "Changbai Mountain",
          futureImagePath: "/images/northeast/yanji-culture-changbai.jpg",
        },
        {
          label: "Yanji",
          futureImagePath: "/images/northeast/yanji-culture-yanji.jpg",
        },
        {
          label: "Jilin City",
          futureImagePath: "/images/northeast/yanji-culture-jilin-city.jpg",
        },
      ],
    },
    {
      slug: "changbai-holiday-5d",
      title: "Changbai Mountain Holiday · 5 Days",
      route: "Changchun → Changbai Mountain North Slope → Huamei Resort",
      duration: "5 days",
      departure: "Departures every Wednesday, Friday and Sunday",
      groupSize: "Small group · 2–13 guests",
      pdfUrl: "/resources/northeast/jilin/changbai-holiday-5d.pdf",
      overview:
        "A resort-oriented five-day program focused on Changbai Mountain North Slope and Huamei Resort—ideal for leisure-minded small groups prioritizing mountain scenery and on-site resort time.",
      highlights: [
        "Changbai North Slope access",
        "Huamei Resort stay",
        "Leisure-paced daily rhythm",
        "Small-group transfer coordination",
      ],
      itineraryIntro:
        "Five days centered on Changbai North Slope and Huamei Resort. See the PDF for slope timing, resort blocks and partner service standards.",
      gallerySlots: [
        {
          label: "Changbai North Slope",
          futureImagePath: "/images/northeast/changbai-holiday-north-slope.jpg",
        },
        {
          label: "Huamei Resort",
          futureImagePath: "/images/northeast/changbai-holiday-huamei.jpg",
        },
        {
          label: "Changchun gateway",
          futureImagePath: "/images/northeast/changbai-holiday-changchun.jpg",
        },
      ],
    },
    {
      slug: "summer-corridor-6d",
      title: "22°C Northeast Summer Corridor · 6 Days",
      route: "Changchun → Yanji → Changbai Mountain → Jingpo Lake → Harbin",
      duration: "6 days",
      arrivalDeparture: "Arrival in Changchun · Departure from Harbin",
      departure: "Departures every Monday, Wednesday, Friday and Sunday",
      groupSize: "Small group · 2–13 guests",
      pdfUrl: "/resources/northeast/cross-region/summer-corridor-6d.pdf",
      overview:
        "A six-day summer corridor from Changchun to Harbin via Yanji, Changbai Mountain and Jingpo Lake—designed for partners packaging cool-climate Northeast travel with open-jaw flights.",
      highlights: [
        "Multi-province summer routing",
        "Changbai Mountain segment",
        "Jingpo Lake nature stop",
        "Harbin departure flexibility",
      ],
      itineraryIntro:
        "Changchun in, Harbin out over six days. The PDF documents inter-city transfers, lake timing and summer operational notes.",
      gallerySlots: [
        {
          label: "Yanji",
          futureImagePath: "/images/northeast/summer-corridor-yanji.jpg",
        },
        {
          label: "Jingpo Lake",
          futureImagePath: "/images/northeast/summer-corridor-jingpo.jpg",
        },
        {
          label: "Harbin",
          futureImagePath: "/images/northeast/summer-corridor-harbin.jpg",
        },
      ],
    },
  ],
};

const northeastZh: NortheastLocaleBundle = {
  listing: {
    qualityBadgeLabel: "爱逍遥体系产品 · 品质支持",
    categories: [
      {
        id: "jilin-programs",
        title: "吉林常规产品",
        description:
          "依托爱逍遥体系产品品质支持，提供长春、长白山、延吉、图们及吉林市等吉林省内精品小团线路。",
        slugs: ["jilin-highlights-5d", "yanji-culture-6d", "changbai-holiday-5d"],
      },
      {
        id: "heilongjiang-programs",
        title: "黑龙江常规产品",
        slugs: [],
      },
      {
        id: "northeast-cross-region",
        title: "东北跨区域联线",
        description:
          "串联吉林与黑龙江代表性目的地，适合希望一次体验东北多地资源的团队与定制客群。",
        slugs: ["summer-corridor-6d"],
      },
      {
        id: "shaanxi-programs",
        title: "陕西常规产品",
        slugs: [],
      },
      {
        id: "henan-programs",
        title: "河南常规产品",
        slugs: [],
      },
      {
        id: "northwest-routes",
        title: "西北联线产品",
        slugs: [],
      },
    ],
    routeLabel: "线路",
    durationLabel: "天数",
    departureLabel: "开班",
    arrivalDepartureLabel: "进出港",
    groupSizeLabel: "团型",
    viewDetailsLabel: "查看详情",
    viewPdfLabel: "查看 PDF",
  },
  detail: {
    qualityBadgeLabel: "爱逍遥体系产品 · 品质支持",
    routeLabel: "线路",
    durationLabel: "天数",
    departureLabel: "开班",
    arrivalDepartureLabel: "进出港",
    groupSizeLabel: "团型",
    overviewTitle: "产品概述",
    qualitySupportTitle: "爱逍遥体系产品品质支持",
    qualitySupportText: "关键品质承诺可写入合同。",
    highlightsTitle: "行程亮点",
    itineraryTitle: "详细行程",
    itineraryPdfNote: "完整每日行程、包含项目及操作说明请参阅产品 PDF，便于合作伙伴报价与执行对接。",
    viewPdfLabel: "查看 PDF",
    galleryTitle: "图片展示",
    backLabel: "返回四大目的地常规产品",
    finalCtaTitle: "咨询本产品",
    finalCtaDescription:
      "请提供目标市场、出行日期与团队类型，我们将确认开班情况及东北地接执行细节。",
    contactLabel: "联系我们",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
  products: [
    {
      slug: "jilin-highlights-5d",
      title: "臻享吉林 5 日",
      route: "长春 → 长白山 → 延吉 → 图们",
      duration: "5 天",
      departure: "每周二 / 四 / 六开班",
      groupSize: "2–13 人精品小团",
      pdfUrl: "/resources/northeast/jilin/jilin-highlights-5d.pdf",
      overview:
        "五日精品小团，串联长春、长白山、延吉与图们，适合海外小团快速体验长白山风光与边境多元文化，地接节奏稳定，便于 B2B 打包推广。",
      highlights: [
        "长白山核心景区安排",
        "延吉朝鲜族文化体验",
        "图们边境城镇参观",
        "精品小团地接保障",
      ],
      itineraryIntro:
        "五日行程自长春出发，经长白山、延吉至图们。详细每日安排、酒店区域及合作说明见 PDF。",
      gallerySlots: [
        {
          label: "长白山",
          futureImagePath: "/images/northeast/jilin-highlights-changbai.jpg",
        },
        {
          label: "延吉",
          futureImagePath: "/images/northeast/jilin-highlights-yanji.jpg",
        },
        {
          label: "图们",
          futureImagePath: "/images/northeast/jilin-highlights-tumen.jpg",
        },
      ],
    },
    {
      slug: "yanji-culture-6d",
      title: "三江源 · 延吉谣 6 日",
      route: "长春 → 长白山 → 延吉 → 图们 → 吉林市",
      duration: "6 天",
      departure: "每周二 / 四 / 六开班",
      groupSize: "2–13 人精品小团",
      pdfUrl: "/resources/northeast/jilin/yanji-culture-6d.pdf",
      overview:
        "六日线路覆盖长白山、延吉、图们及吉林市，兼顾自然、边境文化与松花江人文，适合希望深度体验东北而不拉长行程的海外精品小团。",
      highlights: [
        "长白山深度停留",
        "延吉文化体验",
        "图们边境参观",
        "吉林市松花江收官",
      ],
      itineraryIntro:
        "六日环线，终点吉林市。每日节奏、可选项目及 B2B 对接要点见 PDF。",
      gallerySlots: [
        {
          label: "长白山",
          futureImagePath: "/images/northeast/yanji-culture-changbai.jpg",
        },
        {
          label: "延吉",
          futureImagePath: "/images/northeast/yanji-culture-yanji.jpg",
        },
        {
          label: "吉林市",
          futureImagePath: "/images/northeast/yanji-culture-jilin-city.jpg",
        },
      ],
    },
    {
      slug: "changbai-holiday-5d",
      title: "长白秘境 · 欢享假期 5 日",
      route: "长春 → 长白山北坡 → 华美胜地度假区",
      duration: "5 天",
      departure: "每周三 / 五 / 日开班",
      groupSize: "2–13 人精品小团",
      pdfUrl: "/resources/northeast/jilin/changbai-holiday-5d.pdf",
      overview:
        "以长白山北坡与华美胜地度假区为核心的五日度假型产品，适合注重山地风光与度假区体验的休闲导向精品小团。",
      highlights: [
        "长白山北坡游览",
        "华美胜地度假区住宿",
        "休闲度假节奏",
        "小团专车衔接",
      ],
      itineraryIntro:
        "五日聚焦长白山北坡与华美胜地。北坡开放时间、度假区安排及品质标准见 PDF。",
      gallerySlots: [
        {
          label: "长白山北坡",
          futureImagePath: "/images/northeast/changbai-holiday-north-slope.jpg",
        },
        {
          label: "华美胜地",
          futureImagePath: "/images/northeast/changbai-holiday-huamei.jpg",
        },
        {
          label: "长春进出",
          futureImagePath: "/images/northeast/changbai-holiday-changchun.jpg",
        },
      ],
    },
    {
      slug: "summer-corridor-6d",
      title: "22℃ 黑吉避暑走廊 6 日",
      route: "长春 → 延吉 → 长白山 → 镜泊湖 → 哈尔滨",
      duration: "6 天",
      arrivalDeparture: "长春进 · 哈尔滨出",
      departure: "每周一 / 三 / 五 / 日开班",
      groupSize: "2–13 人精品小团",
      pdfUrl: "/resources/northeast/cross-region/summer-corridor-6d.pdf",
      overview:
        "六日避暑联线，自长春入境、哈尔滨出境，途经延吉、长白山与镜泊湖，适合搭配开口航班推广东北夏季清凉产品。",
      highlights: [
        "黑吉跨省夏季联线",
        "长白山核心段",
        "镜泊湖自然景观",
        "哈尔滨灵活出港",
      ],
      itineraryIntro:
        "长春进、哈尔滨出，共六日。城际交通、湖区安排及夏季操作说明见 PDF。",
      gallerySlots: [
        {
          label: "延吉",
          futureImagePath: "/images/northeast/summer-corridor-yanji.jpg",
        },
        {
          label: "镜泊湖",
          futureImagePath: "/images/northeast/summer-corridor-jingpo.jpg",
        },
        {
          label: "哈尔滨",
          futureImagePath: "/images/northeast/summer-corridor-harbin.jpg",
        },
      ],
    },
  ],
};

function getBundle(locale: SiteLocale): NortheastLocaleBundle {
  return locale === "zh" ? northeastZh : northeastEn;
}

export function getNortheastListingLabels(locale: SiteLocale): NortheastListingLabels {
  return getBundle(locale).listing;
}

export function getNortheastDetailLabels(locale: SiteLocale): NortheastDetailLabels {
  return getBundle(locale).detail;
}

export function getNortheastProducts(locale: SiteLocale): NortheastProduct[] {
  return getBundle(locale).products;
}

export function getNortheastCategories(
  locale: SiteLocale
): NortheastCategoryWithProducts[] {
  const bundle = getBundle(locale);
  return bundle.listing.categories.map((category) => ({
    ...category,
    products: category.slugs
      .map((slug) => bundle.products.find((p) => p.slug === slug))
      .filter((p): p is NortheastProduct => p !== undefined),
  }));
}

export function getNortheastProduct(
  locale: SiteLocale,
  slug: string
): NortheastProduct | undefined {
  return getBundle(locale).products.find((p) => p.slug === slug);
}

export function isNortheastProductSlug(slug: string): slug is NortheastProductSlug {
  return (NORTHEAST_PRODUCT_SLUGS as readonly string[]).includes(slug);
}
