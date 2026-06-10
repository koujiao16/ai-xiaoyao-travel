"use client";

import Image from "next/image";
import { useState } from "react";
import { QrLightbox } from "@/components/contact/QrLightbox";
import { ButtonLink } from "@/components/ui/Button";
import { IconMail, IconMessage } from "@/components/ui/Icons";
import {
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_URL,
  WECHAT_QR_SRC,
  XIAOHONGSHU_ID,
  XIAOHONGSHU_QR_SRC,
} from "@/lib/contact";
import { cn } from "@/lib/cn";

function HomeQrPreview({
  label,
  tapToEnlarge,
  imageSrc,
  imageAlt,
  idLine,
  variant = "default",
}: {
  label: string;
  tapToEnlarge: string;
  imageSrc: string;
  imageAlt: string;
  idLine?: string;
  variant?: "default" | "closing";
}) {
  const [open, setOpen] = useState(false);
  const isClosing = variant === "closing";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "group flex w-full flex-col transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50",
          isClosing
            ? "h-full items-center rounded-2xl border border-navy-900/[0.08] bg-[#fffaf0] px-3 py-3.5 text-center hover:border-gold-400/35 hover:bg-[#fffdf7] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            : "rounded-2xl border border-white/10 bg-ivory-50 p-3 text-left hover:border-gold-400/35 hover:bg-white"
        )}
        aria-label={`Open ${label}`}
      >
        <span
          className={cn(
            "font-semibold text-navy-950",
            isClosing ? "text-[11px] leading-tight tracking-wide" : "text-xs"
          )}
        >
          {label}
        </span>
        {isClosing ? (
          <span
            className={cn(
              "mt-0.5 min-h-[2rem] text-[10px] leading-snug text-navy-900/55",
              !idLine && "invisible"
            )}
            aria-hidden={!idLine}
          >
            {idLine || "ID placeholder"}
          </span>
        ) : idLine ? (
          <span className="mt-0.5 text-[10px] leading-snug text-navy-900/55">{idLine}</span>
        ) : null}
        <span
          className={cn(
            "relative mt-2 block aspect-square rounded-lg bg-white p-1.5",
            isClosing ? "mx-auto w-[5.35rem]" : "w-full max-w-[92px]"
          )}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            unoptimized
            className="object-contain"
            sizes={isClosing ? "86px" : "92px"}
          />
        </span>
        <span
          className={cn(
            "mt-2 text-[10px] text-navy-900/45 transition group-hover:text-navy-900/65",
            isClosing && "text-center"
          )}
        >
          {tapToEnlarge}
        </span>
      </button>
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

export type HomeContactLabels = {
  getProposal?: string;
  whatsapp: string;
  email: string;
  wechat: string;
  xiaohongshu: string;
  tapToEnlarge: string;
};

const defaultLabels: HomeContactLabels = {
  getProposal: "Get a Proposal",
  whatsapp: "WhatsApp",
  email: "Email",
  wechat: "WeChat",
  xiaohongshu: "Xiaohongshu",
  tapToEnlarge: "Tap to enlarge",
};

export function HomeContactActions({
  className,
  labels: labelsProp,
  contactHref = "/contact",
  showProposal = true,
  variant = "default",
}: {
  className?: string;
  labels?: HomeContactLabels;
  contactHref?: string;
  showProposal?: boolean;
  variant?: "default" | "closing";
}) {
  const labels = { ...defaultLabels, ...labelsProp };
  const isClosing = variant === "closing";

  return (
    <div
      className={cn(
        "grid gap-3",
        isClosing && "mx-auto w-full max-w-sm items-center",
        className
      )}
    >
      {showProposal && labels.getProposal ? (
        <ButtonLink href={contactHref} variant="primary" className="w-full">
          {labels.getProposal}
        </ButtonLink>
      ) : null}

      <div className="grid w-full grid-cols-2 gap-2.5 sm:gap-3">
        <ButtonLink
          href={CONTACT_WHATSAPP_URL}
          variant="secondary"
          external
          className={cn(
            "w-full",
            isClosing &&
              "!border-white/15 !bg-white/[0.07] !py-2.5 !px-5 text-sm !text-ivory-50 hover:!bg-white/[0.11] sm:justify-center"
          )}
        >
          <IconMessage className="mr-1.5 h-4 w-4 shrink-0" /> {labels.whatsapp}
        </ButtonLink>
        <ButtonLink
          href={CONTACT_EMAIL_MAILTO}
          variant="secondary"
          className={cn(
            "w-full",
            isClosing &&
              "!border-white/15 !bg-white/[0.07] !py-2.5 !px-5 text-sm !text-ivory-50 hover:!bg-white/[0.11] sm:justify-center"
          )}
        >
          <IconMail className="mr-1.5 h-4 w-4 shrink-0" /> {labels.email}
        </ButtonLink>
      </div>

      <div className="grid w-full grid-cols-2 items-stretch gap-2.5 sm:gap-3">
        <HomeQrPreview
          label={labels.wechat}
          tapToEnlarge={labels.tapToEnlarge}
          imageSrc={WECHAT_QR_SRC}
          imageAlt="WeChat QR code for Xiaoyao Travel"
          variant={variant}
        />
        <HomeQrPreview
          label={labels.xiaohongshu}
          tapToEnlarge={labels.tapToEnlarge}
          idLine={`ID: ${XIAOHONGSHU_ID}`}
          imageSrc={XIAOHONGSHU_QR_SRC}
          imageAlt="Xiaohongshu QR code for Xiaoyao Travel"
          variant={variant}
        />
      </div>
    </div>
  );
}
