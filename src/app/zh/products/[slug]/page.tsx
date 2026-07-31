import { notFound } from "next/navigation";
import { ProductDetailPageContent } from "@/components/products/ProductDetailPageContent";
import {
  getProductById,
  getProductTitle,
  PRODUCT_IDS,
} from "@/data/products";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PRODUCT_IDS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) return { title: "产品详情" };
  return { title: getProductTitle(product, "zh") };
}

export default async function ZhProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) return notFound();

  return <ProductDetailPageContent product={product} locale="zh" />;
}
