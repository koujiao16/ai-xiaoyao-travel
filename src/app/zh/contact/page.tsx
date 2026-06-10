import { ZhContactMethods } from "@/components/zh/ZhContactMethods";
import { OfficeLocationsSection } from "@/components/contact/OfficeLocationsSection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ButtonLink } from "@/components/ui/Button";
import { CONTACT_EMAIL_MAILTO, CONTACT_WHATSAPP_URL } from "@/lib/contact";
import { zhContact } from "@/lib/zh/contact";

export const metadata = { title: "联系我们" };

export default function ZhContactPage() {
  return (
    <main>
      <PageHero
        eyebrow={zhContact.eyebrow}
        title={zhContact.title}
        description={zhContact.description}
      />

      <Section tone="ivory">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Title
                eyebrow={zhContact.channelsEyebrow}
                title={zhContact.channelsTitle}
                description={zhContact.channelsDescription}
              />
              <ZhContactMethods />
            </div>

            <div className="lg:col-span-7">
              <div
                id="proposal"
                className="rounded-xl2 border border-navy-900/10 bg-white p-7 shadow-soft"
              >
                <Title
                  eyebrow={zhContact.formEyebrow}
                  title={zhContact.formTitle}
                  description={zhContact.formDescription}
                />

                <form className="mt-8 grid gap-4 sm:grid-cols-2">
                  {zhContact.fields.map((f) => (
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
                      {zhContact.messageLabel}
                    </span>
                    <textarea
                      name="message"
                      placeholder={zhContact.messagePlaceholder}
                      rows={6}
                      className="rounded-xl border border-navy-900/10 bg-ivory-50 px-4 py-3 text-sm text-navy-950 outline-none transition focus:border-gold-400/60 focus:ring-2 focus:ring-gold-400/20"
                    />
                  </label>

                  <div className="mt-2 flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-navy-900/60">{zhContact.formNote}</p>
                    <div className="flex flex-wrap gap-3">
                      <ButtonLink href={CONTACT_WHATSAPP_URL} variant="secondaryDark" external>
                        {zhContact.whatsappAction}
                      </ButtonLink>
                      <ButtonLink href={CONTACT_EMAIL_MAILTO} variant="secondaryDark">
                        {zhContact.emailAction}
                      </ButtonLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <OfficeLocationsSection locale="zh" />
        </Container>
      </Section>
    </main>
  );
}
