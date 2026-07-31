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
  listingTitle: string;
  listingDescription: string;
  quickJump: QuickJumpItem[];
  finalCta: {
    title: string;
    description: string;
    contactLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

const destinationProductsContentEn: DestinationProductsContent = {
  metadataTitle: "Northeast Regular Products",
  heroEyebrow: "Products",
  heroTitle: "Northeast Regular Products",
  heroSubtitle:
    "Curated Jilin, Heilongjiang and cross-region Northeast programs, supporting overseas group reception and customized delivery.",
  heroDescription:
    "Boutique small-group and multi-destination programs across Jilin and Heilongjiang, supported by Ai Xiaoyao quality operations.",
  listingTitle: "Northeast Regular Products",
  listingDescription:
    "Curated Jilin, Heilongjiang and cross-region Northeast programs, supporting overseas group reception and customized delivery.",
  quickJump: [{ id: "northeast", label: "Northeast Regular Products" }],
  finalCta: {
    title: "Explore Northeast Destination Products",
    description:
      "Send your target market, preferred route and group requirements. Our team will provide suitable product ideas.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

const destinationProductsContentZh: DestinationProductsContent = {
  metadataTitle: "东北常规产品",
  heroEyebrow: "产品体系",
  heroTitle: "东北常规产品",
  heroSubtitle: "精选吉林、黑龙江及东北跨区域精品线路，支持海外团队接待与定制化执行。",
  heroDescription:
    "依托爱逍遥体系品质支持，精选吉林、黑龙江及东北跨区域精品线路，服务入境团队与合作伙伴打包需求。",
  listingTitle: "东北常规产品",
  listingDescription:
    "精选吉林、黑龙江及东北跨区域精品线路，支持海外团队接待与定制化执行。",
  quickJump: [{ id: "northeast", label: "东北常规产品" }],
  finalCta: {
    title: "了解东北常规产品",
    description: "请发送目标市场、线路偏好与团队需求，我们将提供适合的产品建议。",
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
