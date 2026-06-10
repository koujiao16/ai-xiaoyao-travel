"use client";

import Image from "next/image";
import { useState } from "react";
import { QrLightbox } from "@/components/contact/QrLightbox";
import { cn } from "@/lib/cn";

export function ContactQrCard({
  id,
  label,
  imageSrc,
  imageAlt,
  idLine,
  tapToEnlarge = "Tap to enlarge",
  className,
}: {
  id?: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  idLine?: string;
  tapToEnlarge?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        id={id}
        className={cn(
          "scroll-mt-24 rounded-xl2 border border-navy-900/10 bg-white p-5 shadow-soft",
          className
        )}
      >
        <div className="text-sm font-semibold text-navy-950">{label}</div>
        {idLine ? (
          <p className="mt-1 text-sm text-navy-900/70">{idLine}</p>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="group mt-4 flex w-full flex-col items-center rounded-lg border border-navy-900/8 bg-ivory-50/80 p-4 transition hover:border-gold-400/40 hover:bg-ivory-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50"
          aria-label={`Enlarge ${label}`}
        >
          <span className="relative block aspect-square w-full max-w-[200px] sm:max-w-[220px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              unoptimized
              className="object-contain"
              sizes="220px"
            />
          </span>
          <span className="mt-3 text-xs text-navy-900/55 transition group-hover:text-navy-900/70">
            {tapToEnlarge}
          </span>
        </button>
      </div>
      <QrLightbox
        open={open}
        onClose={() => setOpen(false)}
        src={imageSrc}
        alt={imageAlt}
        label={label}
      />
    </>
  );
}
