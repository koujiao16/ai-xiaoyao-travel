import { Suspense } from "react";
import AdminLoginPage from "./LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="login-wrap"><div className="login-card">加载中…</div></div>}>
      <AdminLoginPage />
    </Suspense>
  );
}
