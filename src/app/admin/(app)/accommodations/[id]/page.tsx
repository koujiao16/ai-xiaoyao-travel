import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { AccommodationForm } from "@/components/admin/AccommodationForm";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import type { AccommodationRecord } from "@/lib/xingcheng/types";

type Props = { params: Promise<{ id: string }> };

export default async function EditAccommodationPage({ params }: Props) {
  const { id } = await params;
  const supabase = await tryCreateServerSupabaseClient();
  if (!supabase) notFound();
  const { data, error } = await supabase.from("accommodations").select("*").eq("id", id).maybeSingle();
  if (error || !data) notFound();

  return (
    <div>
      <AdminPageHeader title="编辑住宿" description={(data as AccommodationRecord).name} />
      <AccommodationForm initial={data as AccommodationRecord} />
    </div>
  );
}
