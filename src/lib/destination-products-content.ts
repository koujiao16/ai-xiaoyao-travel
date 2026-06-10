import type { SiteLocale } from "@/lib/locale-paths";

export type QuickJumpItem = {
  id: string;
  label: string;
};

export type DestinationProductsContent = {
  metadataTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  quickJump: QuickJumpItem[];
  productDirections: { title: string; items: string[] };
  placeholderMessage: string;
  finalCta: {
    title: string;
    description: string;
    contactLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

const destinationProductsContentEn: DestinationProductsContent = {
  metadataTitle: "Four Destination Products",
  heroEyebrow: "Products",
  heroTitle: "Four Destination Products",
  heroSubtitle: "",
  heroDescription:
    "Regular small-group, customized and cross-region programs supported by our local destination operations.",
  quickJump: [
    { id: "jilin-programs", label: "Jilin Programs" },
    { id: "heilongjiang-programs", label: "Heilongjiang Programs" },
    { id: "northeast-cross-region", label: "Northeast Cross-region Routes" },
    { id: "shaanxi-programs", label: "Shaanxi Programs" },
    { id: "henan-programs", label: "Henan Programs" },
    { id: "northwest-routes", label: "Northwest China Routes" },
  ],
  productDirections: {
    title: "Product Directions",
    items: [
      "Regular Group Routes",
      "Boutique Small Groups",
      "FIT & Private Custom Routes",
      "Seasonal Programs",
      "Study Tour Extensions",
      "Cross-region Routes",
    ],
  },
  placeholderMessage: "More programs coming soon.",
  finalCta: {
    title: "Explore Our Destination Products",
    description:
      "Send your target market, preferred destination and group requirements. Our team will provide suitable product ideas.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

const destinationProductsContentZh: DestinationProductsContent = {
  metadataTitle: "四大目的地常规产品",
  heroEyebrow: "产品体系",
  heroTitle: "四大目的地常规产品",
  heroSubtitle: "",
  heroDescription:
    "依托区域落地资源，为合作伙伴提供成熟稳定的常规团队、精品小团、定制产品及跨区域联线方案。",
  quickJump: [
    { id: "jilin-programs", label: "吉林常规产品" },
    { id: "heilongjiang-programs", label: "黑龙江常规产品" },
    { id: "northeast-cross-region", label: "东北跨区域联线" },
    { id: "shaanxi-programs", label: "陕西常规产品" },
    { id: "henan-programs", label: "河南常规产品" },
    { id: "northwest-routes", label: "西北联线产品" },
  ],
  productDirections: {
    title: "产品方向",
    items: [
      "常规团队线路",
      "精品小团",
      "散客与私家定制",
      "季节性产品",
      "研学延伸线路",
      "跨区域联线",
    ],
  },
  placeholderMessage: "更多产品持续更新中。",
  finalCta: {
    title: "了解四大目的地常规产品",
    description: "请发送目标市场、目的地与团队需求，我们将提供适合的产品建议。",
    contactLabel: "联系我们",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

export function getDestinationProductsContent(
  locale: SiteLocale
): DestinationProductsContent {
  return locale === "zh" ? destinationProductsContentZh : destinationProductsContentEn;
}
