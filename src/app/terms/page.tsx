import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import {
  SectionEyebrow,
  Section,
  Subhead,
  Note,
  Bullets,
} from "@/components/legal/LegalBlocks";
import { MAPS_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions governing the use of the Infravue Interiors and Constructions Private Limited website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 11, 2026";
const CONTACT_EMAIL = "info@infravueinteriors.com";
const CONTACT_PHONE = "+91 93462 45082";

const TOC = [
  { num: "01", id: "section-1", title: "Use of the Website" },
  { num: "02", id: "section-2", title: "Intellectual Property" },
  { num: "03", id: "section-3", title: "Website Information Disclaimer" },
  { num: "04", id: "section-4", title: "Lead Forms and Customer Inquiries" },
  { num: "05", id: "section-5", title: "Information Accuracy" },
  { num: "06", id: "section-6", title: "Third-Party Links" },
  { num: "07", id: "section-7", title: "Portfolio and Project Documentation" },
  { num: "08", id: "section-8", title: "Data Storage and Loss" },
  { num: "09", id: "section-9", title: "Electronic Communications" },
  { num: "10", id: "section-10", title: "SMS Text Messaging" },
  { num: "11", id: "section-11", title: "Limitation of Liability" },
  { num: "12", id: "section-12", title: "Modification of Terms" },
  { num: "13", id: "section-13", title: "Governing Law" },
  { num: "14", id: "section-14", title: "Miscellaneous" },
  { num: "15", id: "section-15", title: "Contact Information" },
];

export default function TermsPage() {
  return (
    <div className="bg-white text-navy">
      {/* ─── Hero ────────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-cream-muted">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-terracotta/40 to-transparent" />

        <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-32 text-center sm:px-10 lg:pt-40">
          <p className="text-terracotta text-[14px] font-bold tracking-[0.28em] uppercase">
            Legal
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Terms &amp; Conditions
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-navy/60 lg:text-lg">
            The terms governing your access to and use of the Infravue
            Interiors website and related services.
          </p>
          <div className="mt-10 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.32em] uppercase text-navy/45">
            <span className="h-px w-8 bg-navy/20" />
            <span>Last updated · {LAST_UPDATED}</span>
            <span className="h-px w-8 bg-navy/20" />
          </div>
        </div>
      </header>

      {/* ─── Intro ───────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 pt-20 sm:px-10 lg:pt-28">
        <p className="text-base leading-[1.85] font-light text-navy/75 lg:text-lg">
          These Terms and Conditions govern your use of the website operated by{" "}
          <span className="text-navy font-medium">
            Infravue Interiors and Constructions Private Limited
          </span>{" "}
          (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or
          &ldquo;us&rdquo;).
        </p>

        <p className="mt-5 text-base leading-[1.85] font-light text-navy/75 lg:text-lg">
          By accessing or using this website, you agree to comply with and be
          bound by these Terms and Conditions. If you do not agree with these
          terms, you should not use the website.
        </p>
      </section>

      {/* ─── Table of Contents ───────────────────────────────────────────── */}
      <section className="mx-auto mt-24 max-w-3xl px-6 sm:px-10 lg:mt-32">
        <SectionEyebrow>Contents</SectionEyebrow>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          Table of contents
        </h2>

        <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
          {TOC.map((item) => (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className="group flex items-baseline gap-4 rounded-md py-3 transition hover:text-terracotta"
              >
                <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-navy/40 group-hover:text-terracotta">
                  {item.num}
                </span>
                <span className="text-[15px] font-light leading-relaxed text-navy/75 group-hover:text-terracotta">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── Sections ────────────────────────────────────────────────────── */}
      <div className="mx-auto mt-24 max-w-3xl px-6 pb-24 sm:px-10 lg:mt-32 lg:pb-32">
        <Section num="01" id="section-1" title="Use of the Website">
          <p>
            This website provides information about interior design services
            offered by Infravue Interiors and Constructions Private Limited.
          </p>
          <p>
            Users agree to use the website only for lawful purposes and in
            accordance with these Terms.
          </p>
          <p>You agree not to:</p>
          <Bullets
            items={[
              "Use the website in any way that violates applicable laws or regulations",
              "Attempt to gain unauthorized access to any part of the website",
              "Interfere with the proper functioning of the website",
              "Misuse information obtained from the website",
            ]}
          />
        </Section>

        <Section num="02" id="section-2" title="Intellectual Property">
          <p>All content on this website, including but not limited to:</p>
          <Bullets
            items={[
              "Text",
              "Images",
              "Designs",
              "Graphics",
              "Logos",
              "Layout and visual elements",
            ]}
          />
          <p>
            is the property of Infravue Interiors and Constructions Private
            Limited unless otherwise stated.
          </p>
          <p>
            The content may not be copied, reproduced, distributed, or used
            without prior written permission from the company.
          </p>
        </Section>

        <Section num="03" id="section-3" title="Website Information Disclaimer">
          <p>
            The information provided on this website is for general
            informational purposes only.
          </p>
          <p>
            While we strive to ensure that information is accurate and up to
            date, Infravue Interiors and Constructions Private Limited makes no
            guarantees regarding the completeness, accuracy, reliability, or
            availability of any information on the website.
          </p>
          <p>
            Website content does not constitute professional advice or a
            binding service agreement.
          </p>
        </Section>

        <Section
          num="04"
          id="section-4"
          title="Lead Forms and Customer Inquiries"
        >
          <p>
            The website may include inquiry forms, consultation request forms,
            or contact forms.
          </p>
          <p>
            By submitting information through these forms, users agree to
            provide accurate and complete information.
          </p>
          <p>Submitting a form:</p>
          <Bullets
            items={[
              "Does not create a contractual relationship",
              "Does not guarantee services",
              "Does not obligate the company to accept the request",
            ]}
          />
          <p>
            Infravue Interiors and Constructions Private Limited reserves the
            right to respond to inquiries at its discretion.
          </p>
        </Section>

        <Section num="05" id="section-5" title="Information Accuracy">
          <p>
            Users agree that all information provided through forms or
            inquiries is accurate, complete, and up to date.
          </p>
          <p>
            The company shall not be responsible for issues or communication
            failures resulting from incorrect or incomplete information
            submitted by the user.
          </p>
        </Section>

        <Section num="06" id="section-6" title="Third-Party Links">
          <p>
            This website may contain links to third-party websites or external
            services.
          </p>
          <p>These links are provided for convenience only.</p>
          <p>
            Infravue Interiors and Constructions Private Limited does not
            control or assume responsibility for the content, policies, or
            practices of any third-party websites.
          </p>
          <Note>Users access third-party sites at their own risk.</Note>
        </Section>

        <Section
          num="07"
          id="section-7"
          title="Portfolio and Project Documentation"
        >
          <p>
            In the course of providing interior design services, Infravue
            Interiors and Constructions Private Limited may create photographs,
            videos, renderings, design concepts, or other visual documentation
            of completed or ongoing projects.
          </p>
          <p>
            Unless otherwise agreed in writing, the Company reserves the right
            to use such materials for the following purposes:
          </p>
          <Bullets
            items={[
              "Portfolio presentations",
              "Website content",
              "Marketing and promotional materials",
              "Social media posts",
              "Advertising and branding activities",
            ]}
          />
          <p>
            The Company will make reasonable efforts to ensure that any project
            documentation used for promotional purposes does not disclose
            sensitive personal information of clients.
          </p>
          <p>
            Clients who wish to restrict the use of project images or
            documentation must notify the Company in writing before project
            completion.
          </p>
          <p>
            All design concepts, renderings, drawings, and visual materials
            created by Infravue Interiors and Constructions Private Limited
            remain the intellectual property of the Company unless otherwise
            specified in a written agreement.
          </p>
        </Section>

        <Section num="08" id="section-8" title="Data Storage and Loss">
          <p>
            We may maintain certain data transmitted to the website for the
            purpose of managing performance and improving services.
          </p>
          <p>
            Although regular backups may be performed, users are responsible
            for the information they submit.
          </p>
          <p>
            The company shall not be liable for any loss or corruption of data
            transmitted through the website.
          </p>
        </Section>

        <Section num="09" id="section-9" title="Electronic Communications">
          <p>
            By visiting the website, sending emails, or submitting forms, you
            agree to receive electronic communications from us.
          </p>
          <p>
            You consent that all agreements, notices, disclosures, and
            communications provided electronically satisfy any legal
            requirement that such communications be in writing.
          </p>
          <p>You agree to the use of:</p>
          <Bullets
            items={[
              "Electronic signatures",
              "Electronic records",
              "Electronic delivery of notices and policies",
            ]}
          />
        </Section>

        <Section num="10" id="section-10" title="SMS Text Messaging">
          <p>
            If you provide your phone number through the website, you may
            receive SMS communications related to:
          </p>
          <Bullets
            items={[
              "Responses to inquiries",
              "Appointment confirmations",
              "Service updates",
              "Promotional offers",
              "Account notifications",
            ]}
          />
          <p>
            By providing your mobile number, you consent to receiving SMS
            messages from Infravue Interiors and Constructions Private Limited.
          </p>

          <Subhead>Opt-out</Subhead>
          <p>
            You may opt out of receiving SMS messages at any time by replying{" "}
            <span className="font-medium text-navy">STOP</span> to any message
            received. Once you opt out, you will no longer receive SMS
            communications unless you choose to opt in again.
          </p>

          <Subhead>Message and data rates</Subhead>
          <p>
            Message and data rates may apply depending on your mobile carrier
            and service plan. Carriers are not responsible for delayed or
            undelivered messages.
          </p>

          <Subhead>Support</Subhead>
          <p>
            For assistance regarding SMS communications, you may reply{" "}
            <span className="font-medium text-navy">HELP</span> to a message or
            contact us using the information listed below.
          </p>
        </Section>

        <Section num="11" id="section-11" title="Limitation of Liability">
          <p>
            To the maximum extent permitted by law, Infravue Interiors and
            Constructions Private Limited shall not be liable for any direct,
            indirect, incidental, or consequential damages resulting from:
          </p>
          <Bullets
            items={[
              "Use of the website",
              "Inability to use the website",
              "Errors or omissions in website content",
              "Interruptions or technical issues",
            ]}
          />
        </Section>

        <Section num="12" id="section-12" title="Modification of Terms">
          <p>
            We reserve the right to update or modify these Terms and Conditions
            at any time.
          </p>
          <p>
            Changes will become effective immediately upon posting on the
            website.
          </p>
          <p>Users are encouraged to review these Terms periodically.</p>
        </Section>

        <Section num="13" id="section-13" title="Governing Law">
          <p>
            These Terms and Conditions shall be governed by and interpreted in
            accordance with the laws of India.
          </p>
          <p>
            Any disputes arising from the use of this website shall be subject
            to the jurisdiction of the courts located in Hyderabad, Telangana.
          </p>
        </Section>

        <Section num="14" id="section-14" title="Miscellaneous">
          <p>
            These Terms and Conditions constitute the entire agreement between
            users and Infravue Interiors and Constructions Private Limited
            regarding the use of the website.
          </p>
          <p>
            If any provision of these Terms is found to be unlawful or
            unenforceable, the remaining provisions will remain in full force
            and effect.
          </p>
          <p>
            Failure by the company to enforce any right or provision of these
            Terms shall not constitute a waiver of such rights.
          </p>
        </Section>

        <Section num="15" id="section-15" title="Contact Information" last>
          <p>
            If you have any questions about these Terms and Conditions, you may
            contact us:
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Email card */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={`Email Infravue Interiors at ${CONTACT_EMAIL}`}
              data-gtm="email-click"
              data-event="email_open"
              data-contact-source="terms"
              className="group relative flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-12px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[0_4px_8px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/55 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                <Mail size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-navy/45">
                  Email
                </p>
                <p className="mt-1 break-all text-sm font-medium text-navy group-hover:text-terracotta">
                  {CONTACT_EMAIL}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-navy/30 transition group-hover:text-terracotta group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            {/* Phone card */}
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
              aria-label={`Call Infravue Interiors at ${CONTACT_PHONE}`}
              data-gtm="phone-click"
              data-event="phone_call"
              data-contact-source="terms"
              className="group relative flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-12px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[0_4px_8px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/55 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                <Phone size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-navy/45">
                  Phone
                </p>
                <p className="mt-1 text-sm font-medium text-navy group-hover:text-terracotta">
                  {CONTACT_PHONE}
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-navy/30 transition group-hover:text-terracotta group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            {/* Address card — clickable, opens Google Maps in a new tab */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Infravue Interiors studio in Google Maps — Abhyudaya Nagar Colony, Bandlaguda Jagir, Hyderabad 500086"
              data-gtm="address-click"
              data-event="maps_open"
              data-contact-source="terms"
              className="group relative flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-12px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[0_4px_8px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/55 focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:col-span-2"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                <MapPin size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-navy/45">
                  Postal Address
                </p>
                <address className="mt-1 not-italic text-sm font-light leading-relaxed text-navy/75 group-hover:text-navy transition-colors">
                  Infravue Interiors and Constructions Private Limited
                  <br />
                  Abhyudaya nagar colony, Bandlaguda Jagir
                  <br />
                  Ranga Reddy District
                  <br />
                  Hyderabad, Telangana 500086
                  <br />
                  India
                </address>
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-terracotta/85 group-hover:text-terracotta">
                  View on Google Maps
                </p>
              </div>
              <ArrowUpRight
                size={16}
                className="mt-1 shrink-0 text-navy/30 transition group-hover:text-terracotta group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </Section>
      </div>
    </div>
  );
}
