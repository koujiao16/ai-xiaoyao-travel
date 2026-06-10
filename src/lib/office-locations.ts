import type { SiteLocale } from "@/lib/locale-paths";

type OfficeCopy = {
  typeLabel: string;
  name: string;
  address: string;
};

export type OfficeLocationEntry = {
  slug: string;
  en: OfficeCopy;
  zh: OfficeCopy;
};

export const officeLocationsSectionCopy: Record<
  SiteLocale,
  { title: string; description: string }
> = {
  en: {
    title: "Office Locations",
    description:
      "Self-operated destination offices and sales support across our China operation network.",
  },
  zh: {
    title: "办公地点",
    description: "四大自营目的地办公室与外办公司，覆盖逍遥旅游中国运营网络。",
  },
};

export const OFFICE_LOCATIONS: OfficeLocationEntry[] = [
  {
    slug: "xian",
    en: {
      typeLabel: "Self-operated Destination Office",
      name: "Xi'an",
      address:
        "Room 1005-1, Mingfeng International Plaza, Fengcheng 7th Road, Economic and Technological Development Zone, Xi'an, Shaanxi, China",
    },
    zh: {
      typeLabel: "自营目的地办公室",
      name: "西安",
      address: "西安市经开区凤城七路明丰国际广场1005-1号",
    },
  },
  {
    slug: "zhengzhou",
    en: {
      typeLabel: "Self-operated Destination Office",
      name: "Zhengzhou Office",
      address:
        "Room 2203, 22F, Jinxiu City Commercial East Plaza, Zhongyuan District, Zhengzhou, Henan, China",
    },
    zh: {
      typeLabel: "自营目的地办公室",
      name: "郑州办公室",
      address: "河南省郑州市中原区锦绣城商业东广场22层2203",
    },
  },
  {
    slug: "harbin",
    en: {
      typeLabel: "Self-operated Destination Office",
      name: "Harbin",
      address:
        "Room 413, Mengkehui, No. 157 Changjiang Road, Nangang District, Harbin, Heilongjiang, China",
    },
    zh: {
      typeLabel: "自营目的地办公室",
      name: "哈尔滨",
      address: "哈尔滨市南岗区长江路157号盟科汇413",
    },
  },
  {
    slug: "changchun",
    en: {
      typeLabel: "Self-operated Destination Office",
      name: "Changchun",
      address:
        "Room 22146, Apartment Building 4, Kuancheng Wanda Plaza, Kuancheng District, Changchun, Jilin, China",
    },
    zh: {
      typeLabel: "自营目的地办公室",
      name: "长春",
      address: "吉林省长春市宽城区宽城万达4号公寓22146",
    },
  },
  {
    slug: "hangzhou",
    en: {
      typeLabel: "Sales Office",
      name: "Hangzhou",
      address:
        "Room 402, Unit 1, Building 76, Guangze Community, Xiaoshan District, Hangzhou, Zhejiang, China",
    },
    zh: {
      typeLabel: "外办公司",
      name: "杭州",
      address: "杭州市萧山区广泽小区76栋1单元402",
    },
  },
];

export type HomeOfficeLocation = {
  city: string;
  address: string;
};

export type HomeOfficeLocationCategory = {
  label: string;
  offices: HomeOfficeLocation[];
};

export type HomeOfficeLocationsContent = {
  title: string;
  categories: HomeOfficeLocationCategory[];
};

const HOME_DESTINATION_OFFICE_SLUGS = ["xian", "zhengzhou", "harbin", "changchun"] as const;
const HOME_SALES_OFFICE_SLUGS = ["hangzhou"] as const;

function mapOffices(
  slugs: readonly string[],
  locale: "en" | "zh"
): HomeOfficeLocation[] {
  return OFFICE_LOCATIONS.filter((office) => slugs.includes(office.slug)).map(
    (office) => ({
      city: office[locale].name,
      address: office[locale].address,
    })
  );
}

export const homeOfficeLocationsEn: HomeOfficeLocationsContent = {
  title: "Office Locations",
  categories: [
    {
      label: "Self-operated Destination Offices",
      offices: mapOffices(HOME_DESTINATION_OFFICE_SLUGS, "en"),
    },
    {
      label: "Sales Office",
      offices: mapOffices(HOME_SALES_OFFICE_SLUGS, "en"),
    },
  ],
};

export const homeOfficeLocationsZh: HomeOfficeLocationsContent = {
  title: "办公地点",
  categories: [
    {
      label: "四大自营目的地办公室",
      offices: mapOffices(HOME_DESTINATION_OFFICE_SLUGS, "zh"),
    },
    {
      label: "外办公司",
      offices: mapOffices(HOME_SALES_OFFICE_SLUGS, "zh"),
    },
  ],
};

export function getHomeOfficeLocations(locale: SiteLocale): HomeOfficeLocationsContent {
  return locale === "zh" ? homeOfficeLocationsZh : homeOfficeLocationsEn;
}
