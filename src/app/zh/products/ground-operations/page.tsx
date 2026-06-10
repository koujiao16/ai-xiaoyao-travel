import { GroundOperationsPageContent } from "@/components/products/GroundOperationsPageContent";
import { getGroundOperationsContent } from "@/lib/ground-operations-content";

export const metadata = {
  title: getGroundOperationsContent("zh").metadataTitle,
};

export default function ZhGroundOperationsPage() {
  return <GroundOperationsPageContent locale="zh" />;
}
