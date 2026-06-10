import { ContactMethods } from "@/components/contact/ContactMethods";
import { OfficeLocationsSection } from "@/components/contact/OfficeLocationsSection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ButtonLink } from "@/components/ui/Button";
import { CONTACT_EMAIL_MAILTO, CONTACT_WHATSAPP_URL } from "@/lib/contact";

export const metadata = {
  title: "Contact Us",
};

const fields = [
  { label: "Name", name: "name", placeholder: "Your name" },
  { label: "Company / Organization", name: "company", placeholder: "Company or organization" },
  { label: "Country / Region", name: "region", placeholder: "Country / region" },
  { label: "Contact Method", name: "contactMethod", placeholder: "Email / WhatsApp / WeChat" },
  { label: "Destination", name: "destination", placeholder: "Shaanxi / Heilongjiang / Henan / Jilin / Multi-city" },
  { label: "Group Type", name: "groupType", placeholder: "Inbound group / Study tour / Corporate / Cruise / Custom" },
  { label: "Estimated Group Size", name: "groupSize", placeholder: "e.g. 40–60" },
  { label: "Travel Dates", name: "dates", placeholder: "e.g. Oct 2026, 6D5N" },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact"
        title="Contact Us"
        description="Send your destination, group type, travel dates, group size and key requirements. We will provide route suggestions, product ideas and ground operation support."
      />

      <Section tone="ivory">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Title
                eyebrow="Channels"
                title="Contact methods"
                description="Use whichever channel is easiest for your team."
              />
              <ContactMethods />
            </div>

            <div className="lg:col-span-7">
              <div id="proposal" className="rounded-xl2 border border-navy-900/10 bg-white p-7 shadow-soft">
                <Title
                  eyebrow="Proposal"
                  title="Get a proposal"
                  description="This is a static first version (no submission yet). We’ll connect email/CRM later."
                />

                <form className="mt-8 grid gap-4 sm:grid-cols-2">
                  {fields.map((f) => (
                    <label key={f.name} className="grid gap-2">
                      <span className="text-xs tracking-[0.18em] uppercase text-navy-900/60">
                        {f.label}
                      </span>
                      <input
                        name={f.name}
                        placeholder={f.placeholder}
                        className="h-11 rounded-xl border border-navy-900/10 bg-ivory-50 px-4 text-sm text-navy-950 outline-none transition focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20"
                      />
                    </label>
                  ))}

                  <label className="grid gap-2 sm:col-span-2">
                    <span className="text-xs tracking-[0.18em] uppercase text-navy-900/60">
                      Message
                    </span>
                    <textarea
                      name="message"
                      placeholder="Group profile, priorities, pace preference, hotel standard, any must-see items, constraints."
                      rows={6}
                      className="rounded-xl border border-navy-900/10 bg-ivory-50 px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20"
                    />
                  </label>

                  <div className="mt-2 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-navy-900/60">
                      Copy your message and reach us via WhatsApp, email, WeChat or Xiaohongshu.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <ButtonLink href={CONTACT_WHATSAPP_URL} variant="secondaryDark" external>
                        WhatsApp
                      </ButtonLink>
                      <ButtonLink href={CONTACT_EMAIL_MAILTO} variant="secondaryDark">
                        Email
                      </ButtonLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <OfficeLocationsSection locale="en" />
        </Container>
      </Section>
    </main>
  );
}
