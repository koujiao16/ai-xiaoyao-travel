import { notFound } from "next/navigation";
import { NortheastProductDetailContent } from "@/components/products/NortheastProductDetailContent";
import {
  getNortheastDetailLabels,
  getNortheastProduct,
  isNortheastProductSlug,
  NORTHEAST_PRODUCT_SLUGS,
} from "@/lib/northeast-products-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return NORTHEAST_PRODUCT_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = getNortheastProduct("en", slug);
  if (!product) return { title: "Northeast Program" };
  return { title: product.title };
}

export default async function NortheastProductDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!isNortheastProductSlug(slug)) return notFound();

  const product = getNortheastProduct("en", slug);
  if (!product) return notFound();

  const labels = getNortheastDetailLabels("en");

  return (
    <NortheastProductDetailContent product={product} labels={labels} locale="en" />
  );
}
