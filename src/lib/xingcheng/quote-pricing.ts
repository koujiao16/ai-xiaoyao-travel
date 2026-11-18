export type QuotePriceGroup = "ticket" | "extra";
export type QuotePriceMode = "perPerson" | "perGroup";
export type QuotePriceItem = {
  name: string; price: number; group: QuotePriceGroup; mode: QuotePriceMode; selected: boolean;
  includedPeople?: number;
  additionalPersonPrice?: number;
  pricePending?: boolean;
};

/** Ordinary exterior/public-area visits only, never paid exhibitions or experiences.
 * Xingqing admission: https://www.xingqinggong.com/
 * Luoyi reopening: https://www.thepaper.cn/newsDetail_forward_30591120
 * Public street/square admission is distinct from tower ascent or performances.
 */
export const confirmedFreeTicketNames = new Set([
  "兴庆宫", "兴庆宫公园", "洛邑古城", "应天门外观",
  "钟鼓楼广场", "回民小吃街", "大唐不夜城", "大雁塔北广场", "永兴坊",
]);

export function isKnownFreeTicket(item: Pick<QuotePriceItem, "group" | "price" | "pricePending">) {
  return item.group === "ticket" && item.price === 0 && item.pricePending !== true;
}

/** Distinguish explicitly free tickets from unknown prices and custom manual items. */
export function getProjectQuotePrices(item: { id: string; name: string; quotePrices?: QuotePriceItem[] }): QuotePriceItem[] {
  if (item.quotePrices) return item.quotePrices.filter(entry => !isKnownFreeTicket(entry));
  const custom = item.id.startsWith("custom-");
  const configured = !custom ? quotePriceCatalog[item.name] : undefined;
  if (configured) return configured.filter(entry => !isKnownFreeTicket(entry));
  if (!custom && confirmedFreeTicketNames.has(item.name)) return [];
  return [{ name: item.name, price: 0, pricePending: true, group: "ticket", mode: "perPerson", selected: true }];
}

/**
 * Team-approved regular adult defaults from historical quotations.
 * Optional services are unchecked. No student/child, seasonal or educational packages.
 * Unconfirmed prices are omitted for manual entry, not assumed to be free.
 * DIY is a separate project and never attached to regular museum admission.
 */
export const quotePriceCatalog: Record<string, QuotePriceItem[]> = {
  "西安明城墙": [
    {
      "name": "城墙",
      "price": 44,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "秦始皇兵马俑博物馆": [
    {
      "name": "兵马俑",
      "price": 120,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "兵马俑讲解",
      "price": 100,
      "group": "extra",
      "mode": "perGroup",
      "selected": false
    },
    {
      "name": "兵马俑耳机",
      "price": 5,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    },
    {
      "name": "兵马俑景交",
      "price": 5,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "兵马俑DIY": [
    {
      "name": "兵马俑DIY",
      "price": 20,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "铜车马": [
    {
      "name": "丽山园铜车马景交",
      "price": 15,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "华清宫": [
    {
      "name": "华清宫",
      "price": 85,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "华清宫景交",
      "price": 20,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "西岳华山": [
    {
      "name": "华山",
      "price": 144,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "《西安千古情》": [
    {
      "name": "西安千古情",
      "price": 60,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "《驼铃传奇》": [
    {
      "name": "驼铃传奇",
      "price": 60,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "乾陵": [
    {
      "name": "乾陵",
      "price": 80,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "乾陵景交",
      "price": 20,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    },
    {
      "name": "乾陵耳机",
      "price": 5,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "法门文化景区": [
    {
      "name": "法门寺",
      "price": 65,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "白鹿原影视城": [
    {
      "name": "白鹿原影视城常规套票",
      "price": 60,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "大慈恩寺": [
    {
      "name": "大慈恩寺",
      "price": 10,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "大雁塔登塔",
      "price": 25,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "西安碑林博物馆": [
    {
      "name": "碑林博物馆",
      "price": 72,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "高家大院": [
    {
      "name": "高家大院",
      "price": 10,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "西安博物院": [
    {
      "name": "西安博物院讲解",
      "price": 100,
      "group": "extra",
      "mode": "perGroup",
      "selected": false
    },
    {
      "name": "西安博物院耳机",
      "price": 5,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "八路军西安办事处纪念馆": [
    {
      "name": "八路军办事处讲解",
      "price": 200,
      "group": "extra",
      "mode": "perGroup",
      "selected": false
    }
  ],
  "张学良公馆": [
    {
      "name": "张学良公馆讲解",
      "price": 200,
      "group": "extra",
      "mode": "perGroup",
      "selected": false
    }
  ],
  "长安十二时辰主题街区": [
    {
      "name": "长安十二时辰",
      "price": 68,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "汉阳陵（汉景帝阳陵）": [
    {
      "name": "汉阳陵",
      "price": 40,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "汉阳陵": [
    {
      "name": "汉阳陵",
      "price": 40,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "黄河壶口瀑布（陕西侧）": [
    {
      "name": "壶口瀑布",
      "price": 60,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "壶口景交",
      "price": 16,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "甘泉大峡谷（雨岔大峡谷）": [
    {
      "name": "甘泉大峡谷景交",
      "price": 70,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "《再回延安》": [
    {
      "name": "再回延安",
      "price": 65,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "靖边波浪谷": [
    {
      "name": "波浪谷",
      "price": 70,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "波浪谷玻璃桥",
      "price": 30,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "龙门石窟": [
    {
      "name": "龙门石窟",
      "price": 90,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "龙门景交",
      "price": 20,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    },
    {
      "name": "龙门耳机",
      "price": 10,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "少林寺": [
    {
      "name": "少林寺",
      "price": 80,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "少林寺单程景交",
      "price": 15,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    },
    {
      "name": "少林寺耳机",
      "price": 10,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "清明上河园": [
    {
      "name": "清明上河园",
      "price": 102,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "老君山": [
    {
      "name": "老君山",
      "price": 100,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "老君山一索",
      "price": 130,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    },
    {
      "name": "老君山二索",
      "price": 80,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "丽景门": [
    {
      "name": "丽景门登楼",
      "price": 45,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "白马寺": [
    {
      "name": "白马寺",
      "price": 35,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    },
    {
      "name": "白马寺耳机",
      "price": 10,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    },
    {
      "name": "白马寺往返景交",
      "price": 10,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "开封府": [
    {
      "name": "开封府",
      "price": 55,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "中原福塔": [
    {
      "name": "中原福塔登塔",
      "price": 95,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "洛阳博物馆": [
    {
      "name": "洛阳博物馆讲解",
      "price": 400,
      "group": "extra",
      "mode": "perGroup",
      "selected": false
    }
  ],
  "赵公明文化景区": [
    {
      "name": "赵公明文化景区",
      "price": 60,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "秦岭四宝科学公园": [
    {
      "name": "秦岭四宝",
      "price": 30,
      "group": "ticket",
      "mode": "perPerson",
      "selected": true
    }
  ],
  "杨家岭革命旧址": [
    {
      "name": "杨家岭讲解",
      "price": 150,
      "group": "extra",
      "mode": "perGroup",
      "selected": false,
      "includedPeople": 30,
      "additionalPersonPrice": 5
    }
  ],
  "枣园革命旧址": [
    {
      "name": "枣园讲解",
      "price": 150,
      "group": "extra",
      "mode": "perGroup",
      "selected": false,
      "includedPeople": 30,
      "additionalPersonPrice": 5
    }
  ],
  "延安革命纪念馆": [
    {
      "name": "延安革命纪念馆讲解",
      "price": 150,
      "group": "extra",
      "mode": "perGroup",
      "selected": false,
      "includedPeople": 30,
      "additionalPersonPrice": 5
    }
  ],
  "宝塔山": [
    {
      "name": "宝塔山讲解",
      "price": 150,
      "group": "extra",
      "mode": "perGroup",
      "selected": false,
      "includedPeople": 30,
      "additionalPersonPrice": 5
    },
    {
      "name": "宝塔山景交",
      "price": 20,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ],
  "梁家河": [
    {
      "name": "梁家河讲解",
      "price": 150,
      "group": "extra",
      "mode": "perGroup",
      "selected": false,
      "includedPeople": 30,
      "additionalPersonPrice": 5
    },
    {
      "name": "梁家河景交",
      "price": 20,
      "group": "extra",
      "mode": "perPerson",
      "selected": false
    }
  ]
};

export function effectiveQuotePrice(item: Pick<QuotePriceItem, "price" | "mode" | "includedPeople" | "additionalPersonPrice">, travelers: number) {
  return item.price + (item.mode === "perGroup" && item.includedPeople !== undefined
    ? Math.max(0, travelers - item.includedPeople) * (item.additionalPersonPrice ?? 0) : 0);
}
