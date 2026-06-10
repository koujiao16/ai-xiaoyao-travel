import { Container } from "@/components/ui/Container";
import { Media } from "@/components/ui/Media";

export function PageHero({
  eyebrow,
  title,
  description,
  imageSrc = "/images/hero-xian-wall.svg",
}: {
  eyebrow: string;
  title: string;
  description: string;
  imageSrc?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <Media
          src={imageSrc}
          alt={title}
          priority
          className="h-full w-full object-cover opacity-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/75 to-navy-950" />
      </div>
      <Container className="relative py-14 sm:py-18">
        <div className="max-w-3xl py-4 sm:py-8">
          <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold-300/90">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tightish text-ivory-50 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-ivory-100/75 sm:text-lg">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}

