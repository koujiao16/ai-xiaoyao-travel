import { createClient } from "@supabase/supabase-js";
import {
  getSupabasePublishableKey,
  getSupabaseSecretKey,
  getSupabaseUrl,
  isSupabaseConfigured,
  isSupabaseSecretConfigured,
} from "@/lib/supabase/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export function createServiceSupabaseClient() {
  if (!isSupabaseSecretConfigured()) {
    throw new Error("SUPABASE_SECRET_KEY is not configured on the server");
  }
  return createClient(getSupabaseUrl(), getSupabaseSecretKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export async function requireAdminUser(request?: Request) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured");
  }

  const authHeader = request?.headers.get("authorization") || "";
  let userId: string | null = null;
  let email: string | null = null;

  if (authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice(7).trim();
    const supabase = createClient(getSupabaseUrl(), getSupabasePublishableKey(), {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);
    if (error || !user) throw new Error("请先登录管理员账号");
    userId = user.id;
    email = user.email ?? null;

    const { data: profile, error: profileError } = await supabase
      .from("admin_profiles")
      .select("id, email")
      .eq("id", user.id)
      .eq("published", true)
      .maybeSingle();
    if (profileError || !profile) throw new Error("当前账号不是管理员");
    return { user, profile, supabase };
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("请先登录管理员账号");
  }
  userId = user.id;
  email = user.email ?? null;
  const { data: profile, error: profileError } = await supabase
    .from("admin_profiles")
    .select("id, email")
    .eq("id", user.id)
    .eq("published", true)
    .maybeSingle();
  if (profileError || !profile) {
    throw new Error("当前账号不是管理员");
  }
  return { user, profile, supabase, email, userId };
}

export function storagePublicUrl(path: string) {
  const base = getSupabaseUrl().replace(/\/$/, "");
  return `${base}/storage/v1/object/public/media/${path}`;
}

export function pathFromPublicUrl(publicUrl: string | null | undefined): string | null {
  if (!publicUrl) return null;
  const marker = "/storage/v1/object/public/media/";
  const idx = publicUrl.indexOf(marker);
  if (idx < 0) return null;
  return decodeURIComponent(publicUrl.slice(idx + marker.length));
}

export async function ensureMediaBucket() {
  const service = createServiceSupabaseClient();
  const { data: buckets, error } = await service.storage.listBuckets();
  if (error) throw error;
  if ((buckets || []).some((b) => b.name === "media")) return;
  const { error: createError } = await service.storage.createBucket("media", {
    public: true,
    fileSizeLimit: 10 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });
  if (createError && !/already exists/i.test(createError.message)) {
    throw createError;
  }
}
