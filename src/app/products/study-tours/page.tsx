import { StudyToursPageContent } from "@/components/products/StudyToursPageContent";
import { getStudyToursContent } from "@/lib/study-tours-content";

export const metadata = {
  title: getStudyToursContent("en").metadataTitle,
};

export default function StudyToursPage() {
  return <StudyToursPageContent locale="en" />;
}
