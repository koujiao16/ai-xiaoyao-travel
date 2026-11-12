export type QuotePriceGroup = "ticket" | "extra";
export type QuotePriceMode = "perPerson" | "perGroup";

export type QuotePriceItem = {
  name: string;
  price: number;
  group: QuotePriceGroup;
  mode: QuotePriceMode;
  selected: boolean;
};

/**
 * Standard prices transcribed from the historical quotations supplied by the team.
 * They remain editable on every individual quote because date, guest type, and season can vary.
 */
export const quotePriceCatalog: Record<string, QuotePriceItem[]> = {
  "西安明城墙": [{ name: "城墙", price: 44, group: "ticket", mode: "perPerson", selected: true }],
  "秦始皇兵马俑博物馆": [
    { name: "兵马俑", price: 120, group: "ticket", mode: "perPerson", selected: true },
    { name: "兵马俑景交", price: 5, group: "extra", mode: "perPerson", selected: false },
    { name: "兵马俑耳机", price: 5, group: "extra", mode: "perPerson", selected: false },
    { name: "兵马俑讲解", price: 100, group: "extra", mode: "perGroup", selected: false },
  ],
  "华清宫": [{ name: "华清宫", price: 85, group: "ticket", mode: "perPerson", selected: true }],
  "《西安千古情》": [{ name: "西安千古情", price: 60, group: "ticket", mode: "perPerson", selected: true }],
  "乾陵": [{ name: "乾陵", price: 80, group: "ticket", mode: "perPerson", selected: true }],
  "法门文化景区": [
    { name: "法门寺", price: 65, group: "ticket", mode: "perPerson", selected: true },
    { name: "法门寺景交", price: 16, group: "extra", mode: "perPerson", selected: false },
  ],
  "白鹿原影视城": [{ name: "白鹿原影视城", price: 60, group: "ticket", mode: "perPerson", selected: true }],
  "汉城湖景区": [{ name: "汉城湖", price: 45, group: "ticket", mode: "perPerson", selected: true }],
  "大慈恩寺": [{ name: "大慈恩寺", price: 10, group: "ticket", mode: "perPerson", selected: true }],
  "西安碑林博物馆": [
    { name: "碑林博物馆", price: 72, group: "ticket", mode: "perPerson", selected: true },
    { name: "碑林拓印", price: 30, group: "extra", mode: "perPerson", selected: false },
  ],
  "陕西历史博物馆": [{ name: "陕西历史博物馆", price: 30, group: "ticket", mode: "perPerson", selected: true }],
  "长安十二时辰主题街区": [{ name: "长安十二时辰", price: 68, group: "ticket", mode: "perPerson", selected: true }],
  "大明宫国家遗址公园": [{ name: "大明宫国家遗址公园", price: 80, group: "ticket", mode: "perPerson", selected: true }],
  "西安九号宇宙航天科普馆": [{ name: "西安九号宇宙航天科普馆", price: 70, group: "ticket", mode: "perPerson", selected: true }],
  "汉阳陵": [{ name: "汉阳陵", price: 40, group: "ticket", mode: "perPerson", selected: true }],
  "黄河壶口瀑布（陕西侧）": [
    { name: "壶口瀑布", price: 60, group: "ticket", mode: "perPerson", selected: true },
    { name: "壶口景交", price: 16, group: "extra", mode: "perPerson", selected: false },
  ],
  "甘泉大峡谷（雨岔大峡谷）": [
    { name: "甘泉大峡谷", price: 50, group: "ticket", mode: "perPerson", selected: true },
    { name: "甘泉大峡谷景交", price: 70, group: "extra", mode: "perPerson", selected: false },
  ],
  "延安大学": [{ name: "延安大学", price: 20, group: "ticket", mode: "perPerson", selected: true }],
  "《再回延安》": [{ name: "再回延安", price: 65, group: "ticket", mode: "perPerson", selected: true }],
  "宝塔山": [{ name: "宝塔山景交", price: 20, group: "extra", mode: "perPerson", selected: false }],
  "黄鹤楼": [{ name: "黄鹤楼", price: 65, group: "ticket", mode: "perPerson", selected: true }],
  "武当山": [
    { name: "武当山", price: 248, group: "ticket", mode: "perPerson", selected: true },
    { name: "武当山索道", price: 150, group: "extra", mode: "perPerson", selected: false },
  ],
  "龙门石窟": [
    { name: "龙门石窟", price: 90, group: "ticket", mode: "perPerson", selected: true },
    { name: "龙门景交", price: 20, group: "extra", mode: "perPerson", selected: false },
  ],
  "少林寺": [
    { name: "少林寺", price: 80, group: "ticket", mode: "perPerson", selected: true },
    { name: "少林寺景交", price: 25, group: "extra", mode: "perPerson", selected: false },
  ],
  "赵公明文化景区": [{ name: "赵公明文化景区", price: 60, group: "ticket", mode: "perPerson", selected: true }],
  "秦岭四宝科学公园": [{ name: "秦岭四宝", price: 30, group: "ticket", mode: "perPerson", selected: true }],
};
