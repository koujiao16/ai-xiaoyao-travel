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
  if (!product) return { title: "Product" };
  return { title: getProductTitle(product, "en") };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductById(slug);
  if (!product) return notFound();

  return <ProductDetailPageContent product={product} locale="en" />;
}
