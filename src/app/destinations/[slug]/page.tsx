import { notFound } from "next/navigation";
import {
  DestinationDetailPageContent,
  getDestinationDetailPageContent,
} from "@/components/destinations/DestinationDetailPageContent";
import { destinationSlugs } from "@/lib/destination-detail-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return destinationSlugs.map((slug) => ({ slug }));
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const content = getDestinationDetailPageContent(slug, "en");
  if (!content) return notFound();

  return <DestinationDetailPageContent locale="en" content={content} />;
}
