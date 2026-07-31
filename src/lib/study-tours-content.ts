import type { SiteLocale } from "@/lib/locale-paths";

export type StudyToursCapability = {
  /** Chinese title — always shown as the primary card heading */
  titleZh: string;
  /** English subtitle — always shown in gold under the Chinese title */
  titleEn: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type StudyToursVideoStory = {
  title: string;
  category: string;
  meta: string;
  description: string;
  videoUrl: string;
  watchLabel: string;
  /** Future cover image — replace placeholder when asset is ready */
  coverImagePath: string;
};

export type StudyToursResource = {
  title: string;
  description: string;
  downloadLabel: string;
  comingSoonLabel: string;
  /** Future PDF — link when file exists at public/resources/... */
  pdfPath: string;
};

export type StudyToursContent = {
  metadataTitle: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  whatWeProvide: {
    title: string;
    items: StudyToursCapability[];
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
    stories: StudyToursVideoStory[];
  };
  resources: {
    title: string;
    items: StudyToursResource[];
  };
  finalCta: {
    title: string;
    description: string;
    contactLabel: string;
    whatsappLabel: string;
    emailLabel: string;
  };
};

const studyToursContentEn: StudyToursContent = {
  metadataTitle: "Study Tours",
  heroEyebrow: "Products",
  heroTitle: "Study Tours",
  heroSubtitle:
    "Educational travel programs combining culture, history, nature and hands-on learning.",
  heroDescription:
    "We design educational travel programs for schools, institutions and youth groups, combining cultural learning, museum resources, practical workshops, charity activities, nature exploration and cross-city routes.",
  whatWeProvide: {
    title: "What We Provide",
    items: [
      {
        titleZh: "陕西历史博物馆大咖讲解",
        titleEn: "Museum Expert Interpretation",
        description:
          "Expert museum educators guide students through cultural relics and stories to deepen understanding of Chinese history and culture.",
        imageSrc: "/images/product-study-tour.png",
        imageAlt: "Museum expert interpretation for study tour students",
      },
      {
        titleZh: "专业定制研学手册",
        titleEn: "Customized Study Materials",
        description:
          "Study handbooks designed around school needs, including task cards, observation records and learning goals.",
        imageSrc: "/images/products/shaanxi/drunk-changan-4d-cover.jpg",
        imageAlt: "Customized study materials and learning observation",
      },
      {
        titleZh: "非遗文化体验",
        titleEn: "Intangible Cultural Heritage Experience",
        description:
          "Hands-on participation in Shaanxi intangible cultural heritage projects to experience traditional culture.",
        imageSrc: "/images/henan-resource-02.jpg",
        imageAlt: "Intangible cultural heritage experience",
      },
      {
        titleZh: "公益乡村墙体彩绘",
        titleEn: "Rural Public Welfare Projects",
        description:
          "Join rural community projects and wall murals to build social responsibility.",
        imageSrc: "/images/products/shaanxi/changan-city-4d-cover.jpg",
        imageAlt: "Rural public welfare and community study activities",
      },
      {
        titleZh: "秦岭四宝生态科考",
        titleEn: "Qinling Wildlife & Ecology Exploration",
        description:
          "Explore the giant panda, golden snub-nosed monkey, crested ibis and takin while learning Qinling ecological conservation.",
        imageSrc: "/images/shaanxi-resource-03.jpg",
        imageAlt: "Qinling wildlife and ecology exploration",
      },
      {
        titleZh: "工业与科技研学",
        titleEn: "Industrial & Technology Exploration",
        description:
          "Visit technology enterprises such as BYD and Geely to learn about smart manufacturing and new energy.",
        imageSrc: "/images/product-mice.png",
        imageAlt: "Industrial and technology study tour exploration",
      },
    ],
  },
  bestFor: {
    title: "Best For",
    items: [
      "Schools",
      "Educational Institutions",
      "Youth Groups",
      "International Exchange Programs",
      "Family Learning Programs",
      "Customized Educational Groups",
    ],
  },
  featuredPrograms: {
    title: "Featured Programs",
    programs: [
      {
        title: "Xi'an Educational Program",
        description:
          "A multi-module Xi'an educational program combining history, museums, cultural heritage, hands-on workshops and science exploration.",
      },
      {
        title: "Harbin Educational Program",
        description:
          "Educational travel programs in Harbin combining regional culture, seasonal experiences and local learning resources.",
      },
    ],
  },
  videoStories: {
    title: "Video Stories",
    stories: [
      {
        title: "Xi'an Educational Program",
        category: "Study Tour",
        meta: "Approx. 700 Students · Multi-group Educational Program",
        description:
          "A multi-module educational program combining Xi'an history, museums, cultural heritage, hands-on workshops and science exploration.",
        videoUrl: "https://weixin.qq.com/sph/AwH6BQdt2",
        watchLabel: "Watch Video",
        coverImagePath: "/images/videos/video-xian-study-tour.jpg",
      },
      {
        title: "Harbin Educational Program",
        category: "Study Tour",
        meta: "Regional Culture · Seasonal Learning · Group Operations",
        description:
          "Educational travel programs in Harbin combining regional culture, seasonal experiences and local learning resources.",
        videoUrl: "https://weixin.qq.com/sph/Ah0lZ1TKD",
        watchLabel: "Watch Video",
        coverImagePath: "/images/videos/video-harbin-study-tour.jpg",
      },
    ],
  },
  resources: {
    title: "Program Resources",
    items: [
      {
        title: "Xi'an 4-Day Educational Program",
        description:
          "Representative itinerary covering historical culture, museum learning, hands-on workshops and science exploration.",
        downloadLabel: "Download PDF",
        comingSoonLabel: "PDF coming soon",
        pdfPath: "/resources/xian-study-tour-4-day-program.pdf",
      },
    ],
  },
  finalCta: {
    title: "Plan Your Study Tour Program",
    description:
      "Send your destination, group size, travel dates and learning goals. Our team will provide program ideas and local operation support.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

const studyToursContentZh: StudyToursContent = {
  metadataTitle: "研学旅行",
  heroEyebrow: "产品体系",
  heroTitle: "研学旅行",
  heroSubtitle: "融合历史文化、自然探索与实践体验的教育旅行项目。",
  heroDescription:
    "面向学校、机构及青少年团队，围绕文化学习、博物馆资源、实践课程、公益活动、自然探索与跨城市线路，提供研学产品设计与落地执行支持。",
  whatWeProvide: {
    title: "我们提供",
    items: [
      {
        titleZh: "陕西历史博物馆大咖讲解",
        titleEn: "Museum Expert Interpretation",
        description:
          "专业文博老师深度讲解，通过文物故事帮助学生理解中华历史文化。",
        imageSrc: "/images/product-study-tour.png",
        imageAlt: "陕西历史博物馆大咖讲解",
      },
      {
        titleZh: "专业定制研学手册",
        titleEn: "Customized Study Materials",
        description:
          "根据学校需求设计研学手册，包括任务卡、观察记录和学习目标。",
        imageSrc: "/images/products/shaanxi/drunk-changan-4d-cover.jpg",
        imageAlt: "专业定制研学手册",
      },
      {
        titleZh: "非遗文化体验",
        titleEn: "Intangible Cultural Heritage Experience",
        description: "参与陕西特色非遗项目，通过实践体验传统文化。",
        imageSrc: "/images/henan-resource-02.jpg",
        imageAlt: "非遗文化体验",
      },
      {
        titleZh: "公益乡村墙体彩绘",
        titleEn: "Rural Public Welfare Projects",
        description: "参与乡村公益活动，通过墙体彩绘培养社会责任感。",
        imageSrc: "/images/products/shaanxi/changan-city-4d-cover.jpg",
        imageAlt: "公益乡村墙体彩绘",
      },
      {
        titleZh: "秦岭四宝生态科考",
        titleEn: "Qinling Wildlife & Ecology Exploration",
        description: "探索大熊猫、金丝猴、朱鹮、羚牛，学习秦岭生态保护。",
        imageSrc: "/images/shaanxi-resource-03.jpg",
        imageAlt: "秦岭四宝生态科考",
      },
      {
        titleZh: "工业与科技研学",
        titleEn: "Industrial & Technology Exploration",
        description: "参观比亚迪、吉利等科技企业，了解智能制造和新能源技术。",
        imageSrc: "/images/product-mice.png",
        imageAlt: "工业与科技研学",
      },
    ],
  },
  bestFor: {
    title: "适合客群",
    items: [
      "学校",
      "教育机构",
      "青少年团队",
      "国际交流项目",
      "亲子研学团队",
      "定制化研学团队",
    ],
  },
  featuredPrograms: {
    title: "代表项目",
    programs: [
      {
        title: "西安研学项目",
        description:
          "围绕历史文化、博物馆课程、非遗体验、手作课堂与科技探索，为学校团队提供多模块西安研学接待服务。",
      },
      {
        title: "哈尔滨研学项目",
        description:
          "结合哈尔滨区域文化、季节性体验与本地资源，为学校及机构团队提供研学接待服务。",
      },
    ],
  },
  videoStories: {
    title: "视频故事",
    stories: [
      {
        title: "西安研学项目",
        category: "研学旅行",
        meta: "约 700 人 · 多批次研学接待",
        description:
          "融合西安历史文化、博物馆课程、非遗体验、手作课堂与科技探索的多模块研学接待项目。",
        videoUrl: "https://weixin.qq.com/sph/AwH6BQdt2",
        watchLabel: "观看视频",
        coverImagePath: "/images/videos/video-xian-study-tour.jpg",
      },
      {
        title: "哈尔滨研学项目",
        category: "研学旅行",
        meta: "区域文化 · 季节体验 · 团队接待",
        description:
          "结合哈尔滨区域文化、季节性体验与本地资源，为学校及机构团队提供研学接待服务。",
        videoUrl: "https://weixin.qq.com/sph/Ah0lZ1TKD",
        watchLabel: "观看视频",
        coverImagePath: "/images/videos/video-harbin-study-tour.jpg",
      },
    ],
  },
  resources: {
    title: "项目资料",
    items: [
      {
        title: "西安 4 日研学课程方案",
        description: "涵盖历史文化、博物馆课程、手作体验与科技探索的代表性行程。",
        downloadLabel: "下载 PDF",
        comingSoonLabel: "PDF 即将上线",
        pdfPath: "/resources/xian-study-tour-4-day-program.pdf",
      },
    ],
  },
  finalCta: {
    title: "定制您的研学项目",
    description:
      "请发送目的地、人数、出行日期与研学目标，我们将提供项目建议与落地执行支持。",
    contactLabel: "联系我们",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  },
};

export function getStudyToursContent(locale: SiteLocale): StudyToursContent {
  return locale === "zh" ? studyToursContentZh : studyToursContentEn;
}
