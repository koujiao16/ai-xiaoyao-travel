import { CustomChinaRoutesPageContent } from "@/components/products/CustomChinaRoutesPageContent";
import { getCustomChinaRoutesContent } from "@/lib/custom-china-routes-content";

export const metadata = {
  title: getCustomChinaRoutesContent("en").metadataTitle,
};

export default function CustomChinaRoutesPage() {
  return <CustomChinaRoutesPageContent locale="en" />;
}
