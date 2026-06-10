"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/cn";

function IconExpand({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("h-3.5 w-3.5", className)}
    >
      <path
        d="M9 3H5a2 2 0 0 0-2 2v4M15 3h4a2 2 0 0 1 2 2v4M9 21H5a2 2 0 0 1-2-2v-4M15 21h4a2 2 0 0 0 2-2v-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function NetworkMapPreview({
  src,
  alt,
  hint,
}: {
  src: string;
  alt: string;
  hint: string;
}) {
  const [open, setOpen] = useState(false);
  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        aria-label={hint}
        className={cn(
          "group relative h-[min(420px,72vw)] max-h-[520px] w-full cursor-pointer overflow-hidden rounded-3xl border border-[rgba(15,23,42,0.12)] bg-[#f8f5ef] shadow-soft transition-shadow duration-300 sm:h-[460px] lg:h-[520px]",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-900/30",
          "md:hover:shadow-[0_18px_48px_rgba(15,23,42,0.14)]"
        )}
      >
        <Media
          src={src}
          alt={alt}
          className="object-contain transition-transform duration-300 md:group-hover:scale-[1.02]"
        />
        <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full border border-[rgba(15,23,42,0.1)] bg-white/90 px-3 py-1.5 text-xs tracking-wide text-navy-900/65 shadow-sm backdrop-blur-sm">
          {hint}
          <IconExpand />
        </span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(0,0,0,0.82)]"
            onClick={onClose}
            aria-label="Close"
          />
          <div
            className="relative z-10 overflow-hidden rounded-[20px] border border-white/10 bg-[#f8f5ef] shadow-[0_24px_64px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/10 bg-white/95 text-navy-950 shadow-sm transition hover:bg-white"
              aria-label="Close"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
            <div className="relative h-[min(88vh,900px)] w-[min(94vw,1200px)]">
              <Image
                src={src}
                alt={alt}
                fill
                unoptimized
                className="object-contain p-4 sm:p-6"
                sizes="94vw"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
