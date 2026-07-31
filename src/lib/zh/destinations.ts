/** Overview cards for /zh/destinations — detail pages use destination-detail-content.ts */

export const zhDestinationsOverview = {
  eyebrow: "目的地",
  title: "中国核心目的地网络",
  description:
    "依托陕西、河南、黑龙江、吉林四大运营区域，提供入境团队、研学、企业会奖及定制化旅游服务。",
  cards: [
    {
      slug: "northeast",
      title: "中国东北",
      description: "冰雪旅游、自然风光、边境文化与季节性旅行体验。",
    },
    {
      slug: "shaanxi",
      title: "陕西",
      description: "古都文化、世界遗产、研学资源与高端目的地接待。",
    },
    {
      slug: "henan",
      title: "河南",
      description: "中原文化、历史遗产与区域线路联动。",
    },
  ],
  viewDetails: "查看目的地",
} as const;

export const zhDestinationSlugs = zhDestinationsOverview.cards.map((c) => c.slug);
