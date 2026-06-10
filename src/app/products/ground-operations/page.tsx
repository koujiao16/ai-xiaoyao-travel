import { GroundOperationsPageContent } from "@/components/products/GroundOperationsPageContent";
import { getGroundOperationsContent } from "@/lib/ground-operations-content";

export const metadata = {
  title: getGroundOperationsContent("en").metadataTitle,
};

export default function GroundOperationsPage() {
  return <GroundOperationsPageContent locale="en" />;
}
