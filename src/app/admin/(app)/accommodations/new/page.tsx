import { AdminPageHeader } from "@/components/admin/AdminUI";
import { AccommodationForm } from "@/components/admin/AccommodationForm";

export default function NewAccommodationPage() {
  return (
    <div>
      <AdminPageHeader title="新增住宿" />
      <AccommodationForm />
    </div>
  );
}
