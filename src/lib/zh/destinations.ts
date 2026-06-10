/** Overview cards for /zh/destinations — detail pages use destination-detail-content.ts */

export const zhDestinationsOverview = {
  eyebrow: "目的地",
  title: "目的地能力",
  description:
    "逍遥旅游以陕西、黑龙江、河南、吉林四大重点目的地为基础，支持中国多城市联线、入境团队、研学旅行、企业会奖及定制化团队接待。",
  cards: [
    {
      slug: "shaanxi",
      title: "陕西",
      description: "古都文化、西安地接、研学资源与秦岭线路。",
    },
    {
      slug: "heilongjiang",
      title: "黑龙江",
      description: "冰雪旅游、疗休养、边境文化与季节性团队产品。",
    },
    {
      slug: "henan",
      title: "河南",
      description: "中原文化、省内资源与跨区域线路联动。",
    },
    {
      slug: "jilin",
      title: "吉林",
      description: "长白山、冬季资源、自然风光与区域团队接待。",
    },
  ],
  viewDetails: "查看详情",
} as const;

export const zhDestinationSlugs = zhDestinationsOverview.cards.map((c) => c.slug);
