"use client";
import { useEffect, useState } from "react";
export function ReviewDot() {
  const [pending, setPending] = useState(false);
  useEffect(() => {
    const check = () => { void fetch("/api/attraction-submissions", { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(d => { if (d) setPending(d.pending); }).catch(() => {}); };
    check(); const timer = setInterval(check, 30000);
    window.addEventListener("focus", check); window.addEventListener("reviews-changed", check);
    return () => { clearInterval(timer); window.removeEventListener("focus", check); window.removeEventListener("reviews-changed", check); };
  }, []);
  return pending ? <span aria-label="有待审核申请" title="有待审核申请" style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: "#dc4b40", marginLeft: 5, verticalAlign: "middle" }} /> : null;
}
