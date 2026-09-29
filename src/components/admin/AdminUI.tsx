import Link from "next/link";

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-[#2e2924]">{title}</h1>
        {description ? <p className="mt-1 text-sm text-[#7a7168]">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}

export function AdminButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const cls =
    variant === "primary"
      ? "inline-flex items-center justify-center rounded-md bg-[#8b3e2f] px-3 py-2 text-sm font-medium text-white"
      : "inline-flex items-center justify-center rounded-md border border-[#d9cbb8] bg-white px-3 py-2 text-sm font-medium text-[#2e2924]";
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-[#e2d6c6] bg-white p-4 shadow-sm">
      <p className="text-xs uppercase tracking-wide text-[#8a8076]">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-[#2e2924]">{value}</p>
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-[#d9cbb8] bg-white/70 px-4 py-10 text-center text-sm text-[#7a7168]">
      {text}
    </div>
  );
}
