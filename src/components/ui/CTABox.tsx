export function CTABox({
  title,
  description,
  actions,
}: {
  title: string;
  description: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl2 border border-white/10 bg-gradient-to-b from-white/8 to-white/4 p-7 shadow-card">
      <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-tightish text-ivory-50">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ivory-100/75">
        {description}
      </p>
      {actions}
    </div>
  );
}

