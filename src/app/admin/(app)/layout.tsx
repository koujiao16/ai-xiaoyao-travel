import { AdminShell } from "@/components/admin/AdminShell";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminAppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await tryCreateServerSupabaseClient();
  let email: string | null = null;
  if (supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    email = user?.email ?? null;
  }

  return <AdminShell email={email}>{children}</AdminShell>;
}
