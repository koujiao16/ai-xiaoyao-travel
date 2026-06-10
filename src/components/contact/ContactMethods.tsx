import { ContactQrCard } from "@/components/contact/ContactQrCard";
import { ButtonLink } from "@/components/ui/Button";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_DISPLAY,
  CONTACT_WHATSAPP_URL,
  WECHAT_QR_SRC,
  XIAOHONGSHU_ID,
  XIAOHONGSHU_QR_SRC,
} from "@/lib/contact";

function ContactLinkCard({
  id,
  title,
  description,
  detail,
  href,
  actionLabel,
  external,
}: {
  id: string;
  title: string;
  description: string;
  detail: string;
  href: string;
  actionLabel: string;
  external?: boolean;
}) {
  return (
    <div
      id={id}
      className="scroll-mt-24 flex flex-col rounded-xl2 border border-navy-900/10 bg-white p-5 shadow-soft"
    >
      <div className="text-sm font-semibold text-navy-950">{title}</div>
      <p className="mt-1 text-sm text-navy-900/70">{description}</p>
      <p className="mt-3 text-sm font-medium text-navy-950">{detail}</p>
      <ButtonLink
        href={href}
        variant="secondaryDark"
        external={external}
        className="mt-4 w-full sm:w-auto"
      >
        {actionLabel}
      </ButtonLink>
    </div>
  );
}

export function ContactMethods() {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      <ContactLinkCard
        id="whatsapp"
        title="WhatsApp"
        description="Share group profile, dates and destination."
        detail={CONTACT_WHATSAPP_DISPLAY}
        href={CONTACT_WHATSAPP_URL}
        actionLabel="Message on WhatsApp"
        external
      />
      <ContactLinkCard
        id="email"
        title="Email"
        description="Send requirements and preferred response format."
        detail={CONTACT_EMAIL}
        href={CONTACT_EMAIL_MAILTO}
        actionLabel="Send email"
      />
      <ContactQrCard
        id="wechat"
        label="WeChat QR"
        imageSrc={WECHAT_QR_SRC}
        imageAlt="WeChat QR code for Xiaoyao Travel"
      />
      <ContactQrCard
        id="xiaohongshu"
        label="Xiaohongshu"
        idLine={`ID: ${XIAOHONGSHU_ID}`}
        imageSrc={XIAOHONGSHU_QR_SRC}
        imageAlt="Xiaohongshu QR code for Xiaoyao Travel"
      />
    </div>
  );
}
