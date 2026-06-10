import { DestinationProductsPageContent } from "@/components/products/DestinationProductsPageContent";
import { getDestinationProductsContent } from "@/lib/destination-products-content";

export const metadata = {
  title: getDestinationProductsContent("zh").metadataTitle,
};

export default function ZhDestinationProductsPage() {
  return <DestinationProductsPageContent locale="zh" />;
}
