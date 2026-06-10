export type ZhProductDetail = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  sections: { title: string; eyebrow?: string; description?: string; items: string[] }[];
  cta: string;
};

export const zhProductsOverview = {
  eyebrow: "产品",
  title: "产品体系",
  description:
    "我们为 B2B 合作伙伴提供适合不同市场、客群与季节的中国旅游产品，包括中国经典联线、四大目的地常规产品、研学旅行、企业会奖、特殊兴趣旅行与邮轮团队服务。",
  cards: [
    {
      slug: "classic-china-routes",
      title: "中国经典联线",
      description: "适合境外客人的中国多城市经典线路。",
    },
    {
      slug: "destination-products",
      title: "四大目的地常规产品",
      description: "基于陕西、黑龙江、河南、吉林的成熟稳定产品体系。",
    },
    {
      slug: "study-tours",
      title: "研学旅行",
      description: "历史文化、博物馆、非遗、公益与自然探索项目。",
    },
    {
      slug: "corporate-mice",
      title: "企业会奖",
      description: "企业接待、会议会展、奖励旅游与团建活动。",
    },
    {
      slug: "special-interest-travel",
      title: "特殊兴趣旅行",
      description: "美食品鉴、轻徒步、秦岭科考、摄影及非遗体验。",
    },
    {
      slug: "cruise-groups",
      title: "邮轮团队",
      description: "岸上观光、前后延伸线路与邮轮相关地接服务。",
    },
  ],
} as const;

export const zhProducts: Record<string, ZhProductDetail> = {
  "classic-china-routes": {
    slug: "classic-china-routes",
    title: "中国经典联线",
    subtitle: "适合境外客人的中国多城市经典线路。",
    description:
      "中国经典联线面向首次来华或希望深度了解中国文化的境外团队，结合北京、上海、西安、洛阳、成都、哈尔滨等城市资源，支持高铁、航班与多地地接联动。",
    sections: [
      {
        eyebrow: "线路",
        title: "代表线路示例",
        description: "可根据市场偏好、季节、行程节奏与团型灵活调整。",
        items: [
          "北京 + 西安 + 上海",
          "北京 + 西安 + 洛阳",
          "上海 + 西安 + 成都",
          "西安 + 郑州 + 洛阳",
          "哈尔滨 + 北京 + 西安",
        ],
      },
      {
        eyebrow: "团型",
        title: "适合团型",
        items: [
          "境外团队",
          "第一次来华客人",
          "文化历史线路",
          "多城市联动线路",
          "高铁及航班衔接团队",
        ],
      },
    ],
    cta: "咨询中国经典联线",
  },
  "destination-products": {
    slug: "destination-products",
    title: "四大目的地常规产品",
    subtitle: "基于陕西、黑龙江、河南、吉林的成熟稳定产品体系。",
    description:
      "依托四大重点目的地资源，逍遥旅游为合作伙伴提供常规团队、散客定制、季节性产品及本地接待服务，适合旅行社打包销售与长期合作。",
    sections: [
      {
        eyebrow: "方向",
        title: "产品方向",
        items: [
          "陕西常规产品",
          "黑龙江常规产品",
          "河南常规产品",
          "吉林常规产品",
          "区域联线产品",
          "小团定制产品",
        ],
      },
    ],
    cta: "咨询目的地常规产品",
  },
  "study-tours": {
    slug: "study-tours",
    title: "研学旅行",
    subtitle: "面向学校、机构及青少年团队的文化教育旅行项目。",
    description:
      "研学旅行结合历史文化、博物馆课程、非遗体验、公益活动、自然探索与跨城市线路，适合学校、机构、青少年团队及国际交流项目。",
    sections: [
      {
        eyebrow: "项目",
        title: "项目类型",
        items: [
          "博物馆课程",
          "历史文化研学",
          "非遗体验",
          "公益活动",
          "大学交流",
          "秦岭自然探索",
          "跨城市研学线路",
        ],
      },
    ],
    cta: "咨询研学项目",
  },
  "corporate-mice": {
    slug: "corporate-mice",
    title: "企业会奖",
    subtitle: "企业接待、会议会展、奖励旅游与团建活动。",
    description:
      "企业会奖产品面向企业客户、机构客户及商务团队，提供商务接待、会议会展、奖励旅游、团建活动、行业考察及客户答谢等综合服务。",
    sections: [
      {
        eyebrow: "项目",
        title: "项目类型",
        items: [
          "企业接待",
          "会议会展",
          "奖励旅游",
          "团建活动",
          "商务考察",
          "客户答谢",
          "行业交流",
        ],
      },
    ],
    cta: "咨询企业会奖项目",
  },
  "special-interest-travel": {
    slug: "special-interest-travel",
    title: "特殊兴趣旅行",
    subtitle: "围绕美食、自然、徒步、摄影、非遗与地方生活方式的深度体验。",
    description:
      "特殊兴趣旅行适合小团、定制团及高端兴趣客群，可围绕美食品鉴、轻徒步、秦岭科考、摄影采风、非遗体验、历史建筑与地方生活方式等主题进行设计。",
    sections: [
      {
        eyebrow: "项目",
        title: "项目类型",
        items: [
          "美食品鉴",
          "轻徒步",
          "秦岭科考",
          "摄影采风",
          "非遗深度体验",
          "建筑与历史主题",
          "地方生活方式体验",
        ],
      },
    ],
    cta: "咨询特殊兴趣旅行",
  },
  "cruise-groups": {
    slug: "cruise-groups",
    title: "邮轮团队",
    subtitle: "邮轮岸上观光、前后延伸线路及邮轮相关团队地接服务。",
    description:
      "邮轮团队服务面向邮轮相关客群，为合作伙伴提供岸上观光、港口城市联动、邮轮前后延伸线路及中国多城市地接接待支持。",
    sections: [
      {
        eyebrow: "项目",
        title: "项目类型",
        items: [
          "邮轮岸上观光",
          "邮轮前后延伸线路",
          "入境邮轮团队接待",
          "港口城市联动",
          "团队地接服务",
        ],
      },
    ],
    cta: "咨询邮轮团队服务",
  },
};

export const zhProductSlugs = Object.keys(zhProducts);
