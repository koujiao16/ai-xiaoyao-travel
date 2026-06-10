import Image from "next/image";
import { cn } from "@/lib/cn";

export function BrandCard({
  title,
  description,
  logoSrc,
  logoAlt,
}: {
  title: string;
  description: string;
  logoSrc: string;
  logoAlt: string;
}) {
  const isAdventureHat = logoSrc.includes("adventure-hat");

  return (
    <div className="flex h-full flex-col rounded-xl2 border border-navy-900/10 bg-white p-5 shadow-soft">
      <div className="relative flex min-h-[175px] flex-1 items-center justify-center rounded-lg border border-navy-900/6 bg-ivory-50 p-5 sm:min-h-[190px]">
        <div
          className={cn(
            "absolute flex items-center justify-center",
            isAdventureHat ? "inset-[11%]" : "inset-[6%]"
          )}
        >
          <div className="relative h-full w-full">
          <Image
            src={logoSrc}
            alt={logoAlt}
            fill
            unoptimized
            className="object-contain object-center"
            sizes="(max-width: 768px) 80vw, 280px"
          />
          </div>
        </div>
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-tightish text-navy-950">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{description}</p>
    </div>
  );
}
