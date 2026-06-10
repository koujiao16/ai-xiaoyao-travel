import { DestinationProductsPageContent } from "@/components/products/DestinationProductsPageContent";
import { getDestinationProductsContent } from "@/lib/destination-products-content";

export const metadata = {
  title: getDestinationProductsContent("en").metadataTitle,
};

export default function DestinationProductsPage() {
  return <DestinationProductsPageContent locale="en" />;
}
