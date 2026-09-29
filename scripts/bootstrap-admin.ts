/**
 * Create / update allowlisted admin Auth user + admin_profiles.
 *
 * Requires .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SECRET_KEY
 *
 * Password: set env ADMIN_INITIAL_PASSWORD for this one run only
 * (do not commit it). Email defaults to ADMIN_EMAIL or yuch.gao@travelxiaoyao.com
 *
 * Usage:
 *   ADMIN_INITIAL_PASSWORD='…' npm run bootstrap:admin
 */

import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { resolve } from "node:path";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const secretKey = process.env.SUPABASE_SECRET_KEY?.trim();
const email = (process.env.ADMIN_EMAIL || "yuch.gao@travelxiaoyao.com").trim().toLowerCase();
const password = process.env.ADMIN_INITIAL_PASSWORD;

if (!url || !secretKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in .env.local");
  process.exit(1);
}

if (secretKey.startsWith("eyJ")) {
  console.error("Refusing Legacy JWT key. Use SUPABASE_SECRET_KEY (sb_secret_…).");
  process.exit(1);
}

if (!password || password.length < 6) {
  console.error("Set ADMIN_INITIAL_PASSWORD (min 6 chars) for this run only. Do not commit it.");
  process.exit(1);
}

const supabase = createClient(url, secretKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function main() {
  const { error: allowError } = await supabase.from("admin_email_allowlist").upsert(
    { email, published: true, sort_order: 0 },
    { onConflict: "email" },
  );
  if (allowError) throw allowError;
  console.log("Allowlist upserted for admin email.");

  const { data: listed, error: listError } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 200,
  });
  if (listError) throw listError;

  const existing = listed.users.find((u) => (u.email || "").toLowerCase() === email);
  let userId = existing?.id;

  if (existing) {
    const { data, error } = await supabase.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
      user_metadata: { display_name: email.split("@")[0], role: "admin" },
    });
    if (error) throw error;
    userId = data.user.id;
    console.log("Auth user updated (email confirmed).");
  } else {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { display_name: email.split("@")[0], role: "admin" },
    });
    if (error) throw error;
    userId = data.user.id;
    console.log("Auth user created (email confirmed).");
  }

  if (!userId) throw new Error("Missing user id");

  const { error: profileError } = await supabase.from("admin_profiles").upsert(
    {
      id: userId,
      email,
      display_name: email.split("@")[0],
      published: true,
      sort_order: 0,
    },
    { onConflict: "id" },
  );
  if (profileError) throw profileError;
  console.log("admin_profiles upserted.");
  console.log("Bootstrap complete. Change the initial password immediately after first login.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
