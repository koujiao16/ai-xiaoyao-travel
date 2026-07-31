import type { SiteLocale } from "@/lib/locale-paths";
import { henanProducts } from "@/data/henan-products";
import { northeastProducts } from "@/data/northeast-products";
import { shaanxiProducts } from "@/data/shaanxi-products";

export type ProductCategory =
  | "Regular Product"
  | "Private Tour"
  | "Study Tour"
  | "Special Interest";

export type ProductHighlight = {
  titleCN: string;
  titleEN: string;
  descriptionCN: string;
  descriptionEN: string;
};

export type ProductItineraryDay = {
  day: number;
  titleCN: string;
  titleEN: string;
  descriptionCN: string;
  descriptionEN: string;
  mealsCN?: string;
  mealsEN?: string;
  lodgingCN?: string;
  lodgingEN?: string;
};

export type QualityCommitmentItem = {
  titleCN: string;
  titleEN: string;
  descriptionCN: string;
  descriptionEN: string;
};

export type ProductTag = {
  cn: string;
  en: string;
};

export type Product = {
  id: string;
  titleCN: string;
  titleEN: string;
  region: string;
  destination: "northeast" | "shaanxi" | "henan";
  days: number;
  groupSize: string;
  groupSizeCN: string;
  route: string;
  routeCN: string;
  category: ProductCategory;
  categoryCN: string;
  tags: ProductTag[];
  coverImage: string;
  pdfFile: string;
  /** Optional visual highlight in product library cards. */
  featured?: boolean;
  /** Listing-only products skip dedicated detail pages for now. */
  listingOnly?: boolean;
  highlights: ProductHighlight[];
  itinerary: ProductItineraryDay[];
  included: { cn: string[]; en: string[] };
  excluded: { cn: string[]; en: string[] };
  qualityCommitment: QualityCommitmentItem[];
};

export const products: Product[] = [
  ...northeastProducts,
  ...shaanxiProducts,
  ...henanProducts,
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByDestination(
  destination: Product["destination"],
  category?: ProductCategory
): Product[] {
  return products.filter(
    (product) =>
      product.destination === destination &&
      (category ? product.category === category : true)
  );
}

export function getProductTitle(product: Product, locale: SiteLocale): string {
  return locale === "zh" ? product.titleCN : product.titleEN;
}

export function getProductRoute(product: Product, locale: SiteLocale): string {
  return locale === "zh" ? product.routeCN : product.route;
}

export function getProductGroupSize(product: Product, locale: SiteLocale): string {
  return locale === "zh" ? product.groupSizeCN : product.groupSize;
}

export function getProductCategory(product: Product, locale: SiteLocale): string {
  if (locale === "zh") return product.categoryCN;
  if (product.destination === "northeast") {
    const northeastCategoryEn: Record<string, string> = {
      吉林常规产品: "Jilin Programs",
      东北跨区域联线: "Northeast Multi-Destination",
      黑龙江常规产品: "Heilongjiang Programs",
      东北常规产品: "Northeast Regular Products",
    };
    return northeastCategoryEn[product.categoryCN] ?? "Northeast Regular Products";
  }
  if (product.destination === "shaanxi") {
    if (product.category === "Private Tour") return "Shaanxi Private Tours";
    if (product.category === "Regular Product") return "Shaanxi Regular Products";
  }
  if (product.destination === "henan" && product.category === "Regular Product") {
    return "Henan Regular Products";
  }
  return product.category;
}

export function getProductDuration(product: Product, locale: SiteLocale): string {
  return locale === "zh" ? `${product.days} 天` : `${product.days} Days`;
}

export function getProductTags(product: Product, locale: SiteLocale): string[] {
  return product.tags.map((tag) => (locale === "zh" ? tag.cn : tag.en));
}

export const PRODUCT_IDS = products.map((product) => product.id);
