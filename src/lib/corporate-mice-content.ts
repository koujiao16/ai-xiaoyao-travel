import type { SiteLocale } from "@/lib/locale-paths";

export type CorporateMiceVideoStory = {
  title: string;
  category: string;
  meta: string;
  description: string;
  videoUrl: string;
  watchLabel: string;
  /** Future cover image — replace placeholder when asset is ready */
  coverImagePath: string;
};

export type CorporateMiceResource = {
  title: string;
  comingSoonLabel: string;
  /** Future PDF — link when file is added under public/resources/ */
  pdfPath: string;
};

export type CorporateMiceContent = {
  metadataTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  whatWeProvide: {
    title: string;
    items: string[];
  };
  bestFor: {
    title: string;
    items: string[];
  };
  featuredPrograms: {
    title: string;
    programs: { title: string; description: string }[];
  };
  videoStories: {
    title: string;
    stories: CorporateMiceVideoStory[];
  };
  resources: {
    title: string;
    items: CorporateMiceResource[];
  };
  finalCta: {
    title: string;
    description: string;
    contactLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

const corporateMiceContentEn: CorporateMiceContent = {
  metadataTitle: "Corporate & MICE",
  heroEyebrow: "Products",
  heroTitle: "Corporate & MICE",
  heroSubtitle:
    "Corporate reception, incentive travel, meetings and group event operations.",
  heroDescription:
    "We support corporate clients and travel partners with business reception, incentive travel, meetings, team building, industry visits and large-scale group operations across China.",
  whatWeProvide: {
    title: "What We Provide",
    items: [
      "Corporate Reception",
      "Incentive Travel",
      "Meetings & Events",
      "Team Building",
      "Business Visits",
      "Client Appreciation Events",
      "Large Group Coordination",
    ],
  },
  bestFor: {
    title: "Best For",
    items: [
      "Corporate Groups",
      "Business Delegations",
      "Incentive Travel Groups",
      "Industry Associations",
      "Conference Organizers",
      "Customized Large Groups",
    ],
  },
  featuredPrograms: {
    title: "Featured Programs",
    programs: [
      {
        title: "Xi'an Corporate Reception",
        description:
          "Premium local reception, cultural programs, hotel coordination, dining arrangements and group operation support in Xi'an.",
      },
      {
        title: "Multi-city Incentive Travel",
        description:
          "Flexible incentive travel programs combining destination experiences, team activities and reliable local execution.",
      },
    ],
  },
  videoStories: {
    title: "Video Stories",
    stories: [
      {
        title: "Malaysia Incentive Group in Xi'an",
        category: "Corporate & MICE",
        meta: "Approx. 300 Guests · Incentive Travel · Group Event",
        description:
          "A large-scale incentive travel program for a Malaysian group, including Xi'an destination reception, group coordination and a dedicated gathering event.",
        videoUrl: "https://weixin.qq.com/sph/AUVZPgLvd",
        watchLabel: "Watch Video",
        coverImagePath: "/images/videos/video-malaysia-incentive.jpg",
      },
    ],
  },
  resources: {
    title: "Program Resources",
    items: [
      {
        title: "Corporate Reception Program",
        comingSoonLabel: "PDF coming soon",
        pdfPath: "/resources/corporate-reception-program.pdf",
      },
      {
        title: "Incentive Travel Program",
        comingSoonLabel: "PDF coming soon",
        pdfPath: "/resources/incentive-travel-program.pdf",
      },
    ],
  },
  finalCta: {
    title: "Plan Your Corporate Program",
    description:
      "Send your destination, group size, travel dates and event requirements. Our team will provide program ideas and operation support.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

const corporateMiceContentZh: CorporateMiceContent = {
  metadataTitle: "企业会奖",
  heroEyebrow: "产品体系",
  heroTitle: "企业会奖",
  heroSubtitle: "企业接待、奖励旅游、会议会展与团队活动运营。",
  heroDescription:
    "面向企业客户及 B2B 合作伙伴，提供商务接待、奖励旅游、会议会展、团建活动、行业考察与大型团队统筹服务。",
  whatWeProvide: {
    title: "我们提供",
    items: [
      "企业接待",
      "奖励旅游",
      "会议会展",
      "团建活动",
      "商务考察",
      "客户答谢活动",
      "大型团队统筹",
    ],
  },
  bestFor: {
    title: "适合客群",
    items: [
      "企业团队",
      "商务考察团",
      "奖励旅游团队",
      "行业协会",
      "会务组织方",
      "定制化大型团队",
    ],
  },
  featuredPrograms: {
    title: "代表项目",
    programs: [
      {
        title: "西安企业接待",
        description:
          "结合西安本地资源，为企业团队提供高端接待、文化体验、酒店协调、餐饮安排及团队运营支持。",
      },
      {
        title: "多城市奖励旅游",
        description:
          "围绕目的地体验、团队活动与稳定落地执行，为企业客户提供灵活的奖励旅游方案。",
      },
    ],
  },
  videoStories: {
    title: "视频故事",
    stories: [
      {
        title: "马来西亚奖励旅游团队西安接待",
        category: "企业会奖",
        meta: "约 300 人 · 奖励旅游 · 团队聚会活动",
        description:
          "为马来西亚大型奖励旅游团队提供西安目的地接待、团队统筹及专属聚会活动执行服务。",
        videoUrl: "https://weixin.qq.com/sph/AUVZPgLvd",
        watchLabel: "观看视频",
        coverImagePath: "/images/videos/video-malaysia-incentive.jpg",
      },
    ],
  },
  resources: {
    title: "项目资料",
    items: [
      {
        title: "企业接待方案",
        comingSoonLabel: "PDF 即将上线",
        pdfPath: "/resources/corporate-reception-program.pdf",
      },
      {
        title: "奖励旅游方案",
        comingSoonLabel: "PDF 即将上线",
        pdfPath: "/resources/incentive-travel-program.pdf",
      },
    ],
  },
  finalCta: {
    title: "定制您的企业会奖项目",
    description:
      "请发送目的地、人数、出行日期与活动需求，我们将提供项目建议与落地执行支持。",
    contactLabel: "联系我们",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

export function getCorporateMiceContent(locale: SiteLocale): CorporateMiceContent {
  return locale === "zh" ? corporateMiceContentZh : corporateMiceContentEn;
}
