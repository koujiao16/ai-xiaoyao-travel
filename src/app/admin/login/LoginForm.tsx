"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (!isSupabaseConfigured()) {
      setError("未配置 Supabase 环境变量，请先按 ADMIN_SETUP.md 完成配置。");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: signError } = await supabase.auth.signInWithPassword({ email, password });
      if (signError) throw signError;

      const { data: profile } = await supabase
        .from("admin_profiles")
        .select("id")
        .eq("id", data.user.id)
        .eq("published", true)
        .maybeSingle();

      if (!profile) {
        await supabase.auth.signOut();
        throw new Error("该账号不在管理员白名单中");
      }

      router.replace(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={onSubmit}>
        <p className="mb-1 text-xs uppercase tracking-[0.18em] text-[#8b3e2f]">Admin</p>
        <h1 className="text-2xl font-semibold">管理员登录</h1>
        <p className="mt-2 text-sm text-[#7a7168]">仅白名单邮箱可登录，不开放注册。</p>

        <div className="mt-6 space-y-3">
          <label>
            <span>邮箱</span>
            <input
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </label>
          <label>
            <span>密码</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>
        </div>

        {error ? <p className="mt-3 text-sm text-[#9b2c2c]">{error}</p> : null}

        <button type="submit" className="primary-btn mt-5 w-full" disabled={loading}>
          {loading ? "登录中…" : "登录"}
        </button>
      </form>
    </div>
  );
}
