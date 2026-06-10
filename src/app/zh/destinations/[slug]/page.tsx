import { notFound } from "next/navigation";
import { DestinationDetailPageContent } from "@/components/destinations/DestinationDetailPageContent";
import {
  destinationSlugs,
  getDestinationDetail,
} from "@/lib/destination-detail-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinationSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const d = getDestinationDetail(slug, "zh");
  if (!d) return {};
  return { title: d.title };
}

export default async function ZhDestinationSlugPage({ params }: Props) {
  const { slug } = await params;
  const content = getDestinationDetail(slug, "zh");
  if (!content) return notFound();

  return <DestinationDetailPageContent locale="zh" content={content} />;
}
