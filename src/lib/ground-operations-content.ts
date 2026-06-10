import type { SiteLocale } from "@/lib/locale-paths";

export type GroundOperationsCapability = {
  title: string;
  description: string;
};

export type GroundOperationsMediaPlaceholder = {
  label: string;
  /** Future image — replace placeholder when asset is ready */
  imagePath: string;
};

export type GroundOperationsContent = {
  metadataTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  whatWeProvide: { title: string; items: string[] };
  bestFor: { title: string; items: string[] };
  operationCapabilities: {
    title: string;
    items: GroundOperationsCapability[];
  };
  mediaPlaceholders: {
    title: string;
    items: GroundOperationsMediaPlaceholder[];
  };
  finalCta: {
    title: string;
    description: string;
    contactLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

const groundOperationsContentEn: GroundOperationsContent = {
  metadataTitle: "Ground Handling & Local Operations",
  heroEyebrow: "Services",
  heroTitle: "Ground Handling & Local Operations",
  heroSubtitle: "Reliable local execution for different types of China travel groups.",
  heroDescription:
    "We coordinate guides, vehicles, hotels, meals, attraction bookings, transfers and on-site support to help travel partners deliver smooth and reliable destination experiences.",
  whatWeProvide: {
    title: "What We Provide",
    items: [
      "Guides & Vehicles",
      "Hotels & Meals",
      "Airport & Railway Station Transfers",
      "Attraction Bookings",
      "On-site Coordination",
      "Large Group Operations",
      "Emergency Support",
      "Customized Local Arrangements",
    ],
  },
  bestFor: {
    title: "Best For",
    items: [
      "Travel Agencies",
      "Inbound Groups",
      "Corporate Groups",
      "Study Tours",
      "Private Groups",
      "Large Series Groups",
    ],
  },
  operationCapabilities: {
    title: "Operation Capabilities",
    items: [
      {
        title: "Transportation Coordination",
        description:
          "Tour coaches, business vehicles, airport transfers and daily group transportation.",
      },
      {
        title: "Guide Services",
        description:
          "Professional guides, local coordination and group communication support.",
      },
      {
        title: "Hotel & Dining Arrangements",
        description:
          "Hotel check-in coordination, restaurant bookings and special meal requirements.",
      },
      {
        title: "On-site Execution",
        description:
          "Attraction bookings, activity coordination, group flow control and emergency response.",
      },
    ],
  },
  mediaPlaceholders: {
    title: "Fleet & Reception Operations",
    items: [
      { label: "Fleet", imagePath: "/images/operations/fleet.jpg" },
      { label: "Guides", imagePath: "/images/operations/guides.jpg" },
      { label: "Group Reception", imagePath: "/images/operations/group-reception.jpg" },
      { label: "Hotel & Dining", imagePath: "/images/operations/hotel-dining.jpg" },
    ],
  },
  finalCta: {
    title: "Plan Your Ground Operations",
    description:
      "Send your destination, group size, travel dates and service requirements. Our team will provide local operation support.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

const groundOperationsContentZh: GroundOperationsContent = {
  metadataTitle: "地接接待与落地运营",
  heroEyebrow: "服务",
  heroTitle: "地接接待与落地运营",
  heroSubtitle: "为不同类型的中国旅游团队提供稳定的当地执行支持。",
  heroDescription:
    "围绕导游、车辆、酒店、餐饮、景区预约、接送站与现场统筹，为合作伙伴提供稳定、灵活、可信赖的目的地接待服务。",
  whatWeProvide: {
    title: "我们提供",
    items: [
      "导游与车辆安排",
      "酒店与餐饮协调",
      "机场与高铁接送",
      "景区预约",
      "现场统筹",
      "大团执行",
      "应急支持",
      "定制化当地安排",
    ],
  },
  bestFor: {
    title: "适合客群",
    items: [
      "旅行社合作伙伴",
      "入境团队",
      "企业团队",
      "研学团队",
      "定制小团",
      "大型系列团队",
    ],
  },
  operationCapabilities: {
    title: "运营能力",
    items: [
      {
        title: "交通统筹",
        description: "旅游大巴、商务车辆、接送站及团队日常用车安排。",
      },
      {
        title: "导游服务",
        description: "专业导游、当地协调与团队沟通支持。",
      },
      {
        title: "酒店与餐饮",
        description: "酒店入住协调、餐厅预订及特殊餐食需求安排。",
      },
      {
        title: "现场执行",
        description: "景区预约、活动统筹、团队动线控制与应急响应。",
      },
    ],
  },
  mediaPlaceholders: {
    title: "车队与接待执行",
    items: [
      { label: "车队", imagePath: "/images/operations/fleet.jpg" },
      { label: "导游", imagePath: "/images/operations/guides.jpg" },
      { label: "团队接待", imagePath: "/images/operations/group-reception.jpg" },
      { label: "酒店与餐饮", imagePath: "/images/operations/hotel-dining.jpg" },
    ],
  },
  finalCta: {
    title: "定制您的地接接待方案",
    description:
      "请发送目的地、人数、出行日期与服务需求，我们将提供当地接待与落地执行支持。",
    contactLabel: "联系我们",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

export function getGroundOperationsContent(locale: SiteLocale): GroundOperationsContent {
  return locale === "zh" ? groundOperationsContentZh : groundOperationsContentEn;
}
