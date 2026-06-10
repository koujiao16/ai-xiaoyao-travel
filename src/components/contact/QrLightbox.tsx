"use client";

import Image from "next/image";
import { useEffect } from "react";
import { cn } from "@/lib/cn";

export function QrLightbox({
  open,
  onClose,
  src,
  alt,
  label,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  label: string;
}) {
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy-950/85 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-md rounded-xl2 border border-navy-900/10 bg-white p-6 shadow-card",
          "max-h-[min(90vh,640px)] overflow-y-auto"
        )}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/10 bg-ivory-50 text-navy-950 transition hover:bg-ivory-100"
          aria-label="Close"
        >
          <span className="text-lg leading-none">&times;</span>
        </button>
        <p className="pr-10 text-sm font-semibold text-navy-950">{label}</p>
        <div className="relative mt-5 aspect-square w-full min-h-[240px] rounded-lg bg-ivory-50 p-4">
          <Image src={src} alt={alt} fill unoptimized className="object-contain" sizes="(max-width: 768px) 90vw, 400px" />
        </div>
      </div>
    </div>
  );
}
