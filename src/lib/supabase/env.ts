/**
 * Supabase env helpers — use new API key names only.
 * Publishable key: browser / SSR with user session
 * Secret key: local scripts / privileged server ops (never NEXT_PUBLIC_)
 */

export function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || "";
}

/** New publishable key (sb_publishable_…) for client & cookie-based SSR */
export function getSupabasePublishableKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() || "";
}

/** New secret key (sb_secret_…) — server/scripts only, never expose to client */
export function getSupabaseSecretKey() {
  return process.env.SUPABASE_SECRET_KEY?.trim() || "";
}

export function isSupabaseConfigured() {
  return Boolean(getSupabaseUrl() && getSupabasePublishableKey());
}

export function isSupabaseSecretConfigured() {
  return Boolean(getSupabaseUrl() && getSupabaseSecretKey());
}
