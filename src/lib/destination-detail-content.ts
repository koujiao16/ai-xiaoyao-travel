export type DestinationSlug = "shaanxi" | "heilongjiang" | "jilin" | "henan";

export type FeaturedResource = {
  imagePath: string;
  title: string;
  description: string;
};

export type DestinationDetailContent = {
  slug: DestinationSlug;
  title: string;
  positioning: string;
  featuredResources: FeaturedResource[];
  guideImagePaths: [string, string, string, string];
};

const destinationDetailsEn: Record<DestinationSlug, DestinationDetailContent> = {
  shaanxi: {
    slug: "shaanxi",
    title: "Shaanxi",
    positioning:
      "Ancient capital culture, Xi'an ground services, study tour resources and Qinling routes.",
    featuredResources: [
      {
        imagePath: "/images/destinations/shaanxi/resources/version-museum.jpg",
        title: "National Archives of Publications and Culture",
        description: "Exclusive cultural resources and curated visit coordination.",
      },
      {
        imagePath: "/images/destinations/shaanxi/resources/qinling-exploration.jpg",
        title: "Qinling Scientific Exploration",
        description: "Nature observation, ecological exploration and outdoor learning programs.",
      },
      {
        imagePath: "/images/destinations/shaanxi/resources/industrial-study.jpg",
        title: "Industrial Study Programs",
        description: "Smart manufacturing, aviation technology and practical learning experiences.",
      },
      {
        imagePath: "/images/destinations/shaanxi/resources/zhongnan-taoism.jpg",
        title: "Zhongnan Mountain Taoist Culture Experience",
        description: "Traditional culture, mountain landscapes and distinctive local experiences.",
      },
    ],
    guideImagePaths: [
      "/images/destinations/shaanxi/guides/guide-01.jpg",
      "/images/destinations/shaanxi/guides/guide-02.jpg",
      "/images/destinations/shaanxi/guides/guide-03.jpg",
      "/images/destinations/shaanxi/guides/guide-04.jpg",
    ],
  },
  heilongjiang: {
    slug: "heilongjiang",
    title: "Heilongjiang",
    positioning: "Ice and snow travel, border culture, wellness travel and seasonal group products.",
    featuredResources: [
      {
        imagePath: "/images/destinations/heilongjiang/resources/harbin-ice-snow.jpg",
        title: "Harbin Ice and Snow Resources",
        description: "Winter culture, seasonal activities and city experiences.",
      },
      {
        imagePath: "/images/destinations/heilongjiang/resources/wudalianchi-volcano.jpg",
        title: "Wudalianchi Volcanic Landscapes",
        description: "Geological landscapes, ecological observation and wellness resources.",
      },
      {
        imagePath: "/images/destinations/heilongjiang/resources/yichun-forest.jpg",
        title: "Yichun Forest Wellness",
        description: "Forest retreats, summer wellness and nature-based experiences.",
      },
      {
        imagePath: "/images/destinations/heilongjiang/resources/border-culture.jpg",
        title: "Border Culture and Northeast Experiences",
        description: "Border routes, regional culture and seasonal Northeast China programs.",
      },
    ],
    guideImagePaths: [
      "/images/destinations/heilongjiang/guides/guide-01.jpg",
      "/images/destinations/heilongjiang/guides/guide-02.jpg",
      "/images/destinations/heilongjiang/guides/guide-03.jpg",
      "/images/destinations/heilongjiang/guides/guide-04.jpg",
    ],
  },
  jilin: {
    slug: "jilin",
    title: "Jilin",
    positioning:
      "Changbai Mountain, winter resources, natural scenery and regional group reception.",
    featuredResources: [
      {
        imagePath: "/images/destinations/jilin/resources/changbai-mountain.jpg",
        title: "Changbai Mountain",
        description: "Tianchi Lake, forest landscapes and four-season nature experiences.",
      },
      {
        imagePath: "/images/destinations/jilin/resources/yanji-culture.jpg",
        title: "Yanji Korean Ethnic Culture",
        description: "Regional culture, local cuisine, photography and immersive experiences.",
      },
      {
        imagePath: "/images/destinations/jilin/resources/tumen-border.jpg",
        title: "Tumen Border Experience",
        description: "Border landscapes and regional cultural routes.",
      },
      {
        imagePath: "/images/destinations/jilin/resources/changbai-resort.jpg",
        title: "Changbai Mountain Resort Resources",
        description: "Resort stays, family experiences and boutique small-group programs.",
      },
    ],
    guideImagePaths: [
      "/images/destinations/jilin/guides/guide-01.jpg",
      "/images/destinations/jilin/guides/guide-02.jpg",
      "/images/destinations/jilin/guides/guide-03.jpg",
      "/images/destinations/jilin/guides/guide-04.jpg",
    ],
  },
  henan: {
    slug: "henan",
    title: "Henan",
    positioning:
      "Central China culture, provincial heritage resources and multi-city route connections.",
    featuredResources: [
      {
        imagePath: "/images/destinations/henan/resources/henan-museum.jpg",
        title: "Henan Museum",
        description: "Central China civilization, museum learning and cultural experiences.",
      },
      {
        imagePath: "/images/destinations/henan/resources/shaolin-culture.jpg",
        title: "Shaolin Culture",
        description: "Martial arts, Zen culture and educational activities.",
      },
      {
        imagePath: "/images/destinations/henan/resources/longmen-grottoes.jpg",
        title: "Longmen Grottoes",
        description: "Grotto art, ancient capital culture and historical routes.",
      },
      {
        imagePath: "/images/destinations/henan/resources/ancient-capital-route.jpg",
        title: "Central China Ancient Capital Routes",
        description:
          "Cultural connections across Zhengzhou, Luoyang, Kaifeng and surrounding destinations.",
      },
    ],
    guideImagePaths: [
      "/images/destinations/henan/guides/guide-01.jpg",
      "/images/destinations/henan/guides/guide-02.jpg",
      "/images/destinations/henan/guides/guide-03.jpg",
      "/images/destinations/henan/guides/guide-04.jpg",
    ],
  },
};

const destinationDetailsZh: Record<DestinationSlug, DestinationDetailContent> = {
  shaanxi: {
    slug: "shaanxi",
    title: "陕西",
    positioning: "古都文化、西安地接、研学资源与秦岭线路。",
    featuredResources: [
      {
        imagePath: "/images/destinations/shaanxi/resources/version-museum.jpg",
        title: "国家版本馆",
        description: "独家文化资源与参访对接。",
      },
      {
        imagePath: "/images/destinations/shaanxi/resources/qinling-exploration.jpg",
        title: "秦岭科考",
        description: "自然观察、生态探索与户外研学。",
      },
      {
        imagePath: "/images/destinations/shaanxi/resources/industrial-study.jpg",
        title: "工业研学",
        description: "智能制造、航空科技与实践课程。",
      },
      {
        imagePath: "/images/destinations/shaanxi/resources/zhongnan-taoism.jpg",
        title: "终南山道教文化体验",
        description: "传统文化、山野环境与特色体验。",
      },
    ],
    guideImagePaths: destinationDetailsEn.shaanxi.guideImagePaths,
  },
  heilongjiang: {
    slug: "heilongjiang",
    title: "黑龙江",
    positioning: "冰雪旅游、边境文化、疗休养与季节性团队产品。",
    featuredResources: [
      {
        imagePath: "/images/destinations/heilongjiang/resources/harbin-ice-snow.jpg",
        title: "哈尔滨冰雪资源",
        description: "冰雪文化、冬季活动与城市体验。",
      },
      {
        imagePath: "/images/destinations/heilongjiang/resources/wudalianchi-volcano.jpg",
        title: "五大连池火山地貌",
        description: "自然地质、生态观察与康养资源。",
      },
      {
        imagePath: "/images/destinations/heilongjiang/resources/yichun-forest.jpg",
        title: "伊春森林康养",
        description: "森林氧吧、避暑疗休养与自然体验。",
      },
      {
        imagePath: "/images/destinations/heilongjiang/resources/border-culture.jpg",
        title: "边境文化与东北特色体验",
        description: "边境线路、地方文化与季节性产品。",
      },
    ],
    guideImagePaths: destinationDetailsEn.heilongjiang.guideImagePaths,
  },
  jilin: {
    slug: "jilin",
    title: "吉林",
    positioning: "长白山、冬季资源、自然风光与区域团队接待。",
    featuredResources: [
      {
        imagePath: "/images/destinations/jilin/resources/changbai-mountain.jpg",
        title: "长白山",
        description: "天池、森林资源与四季自然体验。",
      },
      {
        imagePath: "/images/destinations/jilin/resources/yanji-culture.jpg",
        title: "延吉朝鲜族文化",
        description: "民俗、美食、旅拍与区域文化体验。",
      },
      {
        imagePath: "/images/destinations/jilin/resources/tumen-border.jpg",
        title: "图们边境",
        description: "边境风光与区域文化线路。",
      },
      {
        imagePath: "/images/destinations/jilin/resources/changbai-resort.jpg",
        title: "长白山度假资源",
        description: "度假区、亲子体验与精品小团产品。",
      },
    ],
    guideImagePaths: destinationDetailsEn.jilin.guideImagePaths,
  },
  henan: {
    slug: "henan",
    title: "河南",
    positioning: "中原文化、省内资源与跨区域线路联动。",
    featuredResources: [
      {
        imagePath: "/images/destinations/henan/resources/henan-museum.jpg",
        title: "河南博物院",
        description: "中原文明、文博课程与文化体验。",
      },
      {
        imagePath: "/images/destinations/henan/resources/shaolin-culture.jpg",
        title: "少林文化",
        description: "武术、禅宗文化与研学活动。",
      },
      {
        imagePath: "/images/destinations/henan/resources/longmen-grottoes.jpg",
        title: "洛阳龙门石窟",
        description: "石窟艺术、古都文化与历史线路。",
      },
      {
        imagePath: "/images/destinations/henan/resources/ancient-capital-route.jpg",
        title: "中原古都文化联线",
        description: "郑州、洛阳、开封等多城市文化资源。",
      },
    ],
    guideImagePaths: destinationDetailsEn.henan.guideImagePaths,
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
      guidesTitle: "优秀导游",
      guidesDescription:
        "精选当地导游，覆盖文化讲解、研学课程与团队接待等方向。",
      guideNickname: "昵称待补充",
      guideSpecialty: "擅长方向待补充",
      imageComingSoon: "图片即将上线",
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
    guidesTitle: "Experienced Local Guides",
    guidesDescription:
      "Selected local guides with experience in destination interpretation, educational programs and group reception.",
    guideNickname: "Guide nickname coming soon",
    guideSpecialty: "Specialty details coming soon",
    imageComingSoon: "Image coming soon",
    finalCtaTitle: "Plan Your Destination Program",
    finalCtaDescription:
      "Send your group size, travel dates and key requirements. Our team will provide product ideas and local operation support.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  };
}
