import { AdminPageHeader } from "@/components/admin/AdminUI";
import { AttractionForm } from "@/components/admin/AttractionForm";

export default function NewAttractionPage() {
  return (
    <div>
      <AdminPageHeader title="新增景区" description="填写景区信息并上传图片，保存后前台刷新即可使用。" />
      <AttractionForm />
    </div>
  );
}
