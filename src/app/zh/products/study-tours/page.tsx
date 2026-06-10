import { StudyToursPageContent } from "@/components/products/StudyToursPageContent";
import { getStudyToursContent } from "@/lib/study-tours-content";

export const metadata = {
  title: getStudyToursContent("zh").metadataTitle,
};

export default function ZhStudyToursPage() {
  return <StudyToursPageContent locale="zh" />;
}
