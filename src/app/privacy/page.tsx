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

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Infravue Interiors and Constructions Private Limited collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 11, 2026";
const CONTACT_EMAIL = "info@infravueinteriors.com";
const CONTACT_PHONE = "+91 89788 71079";

const TOC = [
  { num: "01", id: "section-1", title: "What information do we collect?" },
  { num: "02", id: "section-2", title: "How do we process your information?" },
  {
    num: "03",
    id: "section-3",
    title: "When and with whom do we share your information?",
  },
  {
    num: "04",
    id: "section-4",
    title: "Do we use cookies and other tracking technologies?",
  },
  { num: "05", id: "section-5", title: "How long do we keep your information?" },
  { num: "06", id: "section-6", title: "How do we keep your information safe?" },
  { num: "07", id: "section-7", title: "Do we collect information from minors?" },
  { num: "08", id: "section-8", title: "What are your privacy rights?" },
  { num: "09", id: "section-9", title: "Controls for do-not-track features" },
  {
    num: "10",
    id: "section-10",
    title: "How can you review, update, or delete your data?",
  },
  { num: "11", id: "section-11", title: "Do we make updates to this notice?" },
  { num: "12", id: "section-12", title: "How can you contact us?" },
];

const KEY_POINTS = [
  {
    q: "What personal information do we process?",
    a: "When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us, the choices you make, and the products and features you use.",
  },
  {
    q: "Do we process sensitive personal information?",
    a: "No. We do not process sensitive personal information such as racial or ethnic origins, sexual orientation, or religious beliefs.",
  },
  {
    q: "Do we collect information from third parties?",
    a: "No. We do not collect information from third parties.",
  },
  {
    q: "How do we process your information?",
    a: "To provide, improve, and administer our Services, communicate with you, prevent fraud, maintain security, and comply with legal obligations. We may also process your information for other purposes with your consent.",
  },
  {
    q: "In what situations do we share personal information?",
    a: "We may share information with certain third-party service providers in specific situations, described in detail below.",
  },
  {
    q: "How do we keep your information safe?",
    a: "We use organizational and technical safeguards to protect your personal information, but no electronic transmission or storage system is guaranteed to be 100% secure.",
  },
  {
    q: "What are your rights?",
    a: "Depending on where you live, privacy laws may give you certain rights regarding your personal information.",
  },
  {
    q: "How can you exercise your rights?",
    a: "You can submit a data subject access request or contact us directly using the details at the bottom of this page.",
  },
];

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-navy/60 lg:text-lg">
            How Infravue Interiors and Constructions Private Limited collects,
            uses, and protects your personal information.
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
          This Privacy Notice for{" "}
          <span className="text-navy font-medium">
            Infravue Interiors and Constructions Private Limited
          </span>{" "}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) describes
          how and why we might access, collect, store, use, and/or share
          (&ldquo;process&rdquo;) your personal information when you use our
          services (&ldquo;Services&rdquo;), including when you:
        </p>

        <ul className="mt-6 space-y-3 pl-5 text-base leading-relaxed font-light text-navy/75 lg:text-lg [&>li]:relative [&>li]:before:absolute [&>li]:before:-left-5 [&>li]:before:top-[0.65em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-terracotta">
          <li>
            Visit our website at{" "}
            <a
              href="https://infravueinteriors.com"
              className="text-terracotta underline-offset-4 transition hover:underline"
            >
              https://infravueinteriors.com
            </a>{" "}
            or any website of ours that links to this Privacy Notice.
          </li>
          <li>Use our Interior Designing services.</li>
          <li>
            Engage with us in other related ways, including any marketing or
            events.
          </li>
        </ul>

        <div className="mt-10 rounded-2xl border border-navy/10 bg-cream-muted/70 p-6 sm:p-8">
          <p className="text-[12px] font-semibold tracking-[0.28em] uppercase text-terracotta">
            Questions or concerns?
          </p>
          <p className="mt-3 text-base font-light leading-relaxed text-navy/75">
            Reading this Privacy Notice will help you understand your privacy
            rights and choices. We are responsible for making decisions about
            how your personal information is processed. If you do not agree
            with our policies and practices, please do not use our Services. If
            you still have any questions or concerns, please contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-terracotta underline-offset-4 transition hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ─── Key Points ──────────────────────────────────────────────────── */}
      <section className="mx-auto mt-24 max-w-3xl px-6 sm:px-10 lg:mt-32">
        <SectionEyebrow>Summary</SectionEyebrow>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          Key points at a glance
        </h2>
        <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-navy/60">
          The high-level summary. Click any link in the table of contents below
          to jump to the full detail of any section.
        </p>

        <dl className="mt-10 divide-y divide-navy/10">
          {KEY_POINTS.map(({ q, a }) => (
            <div key={q} className="py-6 first:pt-0">
              <dt className="text-[15px] font-semibold text-navy">{q}</dt>
              <dd className="mt-2 text-[15px] font-light leading-relaxed text-navy/70">
                {a}
              </dd>
            </div>
          ))}
        </dl>
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
        <Section num="01" id="section-1" title="What information do we collect?">
          <Subhead>Personal information you disclose to us</Subhead>
          <Note>In short: We collect personal information that you provide to us.</Note>
          <p>
            We collect personal information that you voluntarily provide when
            you:
          </p>
          <Bullets
            items={[
              "Express interest in obtaining information about us or our services",
              "Participate in activities on our Services",
              "Contact us",
            ]}
          />
          <p>The personal information we collect may include:</p>
          <Bullets items={["Names", "Phone numbers", "Email addresses"]} />

          <Subhead>Sensitive Information</Subhead>
          <p>We do not process sensitive personal information.</p>
          <p>
            All personal information you provide must be true, complete, and
            accurate. You must notify us of any changes to your personal
            information.
          </p>

          <Subhead>Information automatically collected</Subhead>
          <p>
            Some information is collected automatically when you visit our
            Services. This may include:
          </p>
          <Bullets
            items={[
              "IP address",
              "Browser and device characteristics",
              "Operating system",
              "Language preferences",
              "Referring URLs",
              "Device name",
              "Country and location",
              "Usage activity on the website",
            ]}
          />
          <p>
            This information does not reveal your identity but helps maintain
            the security and operation of our Services. Like many businesses,
            we also collect information through cookies and similar
            technologies.
          </p>

          <Subhead>Log and usage data</Subhead>
          <p>
            This includes diagnostic, usage, and performance information
            automatically collected when you access our Services. It may
            include:
          </p>
          <Bullets
            items={[
              "IP address",
              "Device information",
              "Browser type and settings",
              "Pages viewed",
              "Search actions",
              "Date and time stamps",
              "System activity and error reports",
            ]}
          />

          <Subhead>Device data</Subhead>
          <p>
            We collect device data about the device you use to access our
            Services, including:
          </p>
          <Bullets
            items={[
              "Device and application identification numbers",
              "Location",
              "Browser type",
              "Hardware model",
              "Internet service provider",
              "Operating system",
            ]}
          />

          <Subhead>Location data</Subhead>
          <p>
            We may collect location data based on your IP address or GPS
            information. You may disable location access in your device
            settings.
          </p>

          <Subhead>Lead forms and customer inquiries</Subhead>
          <p>
            When you submit your information through a contact form, inquiry
            form, or lead form on our Website, you voluntarily provide personal
            information such as your name, phone number, and email address. We
            use this information to:
          </p>
          <Bullets
            items={[
              "Respond to your inquiries",
              "Provide information about our services",
              "Communicate with you regarding design consultations or service requests",
              "Send service-related updates",
              "Send marketing or promotional communications about our services",
            ]}
          />
          <p>
            By submitting your information through our Website forms, you
            consent to being contacted by Infravue Interiors and Constructions
            Private Limited via phone, email, SMS, or other communication
            methods regarding your inquiry or our services.
          </p>
          <p>
            You may opt out of receiving marketing communications from us at
            any time by contacting us or following unsubscribe instructions
            included in our communications.
          </p>

          <Subhead>Google API</Subhead>
          <p>
            Our use of information received from Google APIs will adhere to the{" "}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta underline-offset-4 transition hover:underline"
            >
              Google API Services User Data Policy
            </a>
            , including Limited Use requirements.
          </p>
        </Section>

        <Section
          num="02"
          id="section-2"
          title="How do we process your information?"
        >
          <p>We process your information to:</p>
          <Bullets
            items={[
              "Deliver and facilitate services to users",
              "Respond to inquiries and provide support",
              "Request feedback",
              "Send marketing and promotional communications",
              "Deliver targeted advertising",
              "Evaluate and improve our services, products, marketing, and user experience",
              "Measure the effectiveness of marketing campaigns",
            ]}
          />
        </Section>

        <Section
          num="03"
          id="section-3"
          title="When and with whom do we share your personal information?"
        >
          <p>We may share your information with:</p>

          <Subhead>Vendors and service providers</Subhead>
          <p>
            Third-party vendors or service providers who perform services for
            us. These third parties must:
          </p>
          <Bullets
            items={[
              "Follow our instructions regarding your data",
              "Protect your information",
              "Retain data only for the time required",
            ]}
          />
          <p>
            Examples include advertising and marketing partners such as Google
            AdSense and Facebook Audience Network.
          </p>

          <Subhead>Business transfers</Subhead>
          <p>
            Your information may be transferred in connection with mergers,
            asset sales, financing, or acquisition of our business.
          </p>

          <Subhead>Google Maps Platform APIs</Subhead>
          <p>
            We may share information with Google Maps APIs (such as Google Maps
            API or Places API) when location-specific services are requested.
            This may include:
          </p>
          <Bullets
            items={["Name", "Email address", "Phone number", "Location"]}
          />
          <p>
            Google uses GPS, Wi-Fi, and cell towers to estimate your location.
            You may revoke consent by contacting us.
          </p>

          <Subhead>Business partners</Subhead>
          <p>
            We may share your information with partners to offer products,
            services, or promotions.
          </p>
        </Section>

        <Section
          num="04"
          id="section-4"
          title="Do we use cookies and other tracking technologies?"
        >
          <Note>Yes.</Note>
          <p>
            We may use cookies, web beacons, and tracking pixels to collect and
            store information when you interact with our Services. These
            technologies help us:
          </p>
          <Bullets
            items={[
              "Maintain security",
              "Prevent crashes",
              "Fix bugs",
              "Save user preferences",
              "Enable core website functionality",
            ]}
          />
          <p>Third parties may also use tracking technologies for the following:</p>
          <Bullets items={["Analytics", "Advertising", "Personalized ads"]} />

          <Subhead>Google Analytics</Subhead>
          <p>
            We may share information with Google Analytics to analyze website
            usage. Features used may include:
          </p>
          <Bullets
            items={[
              "Remarketing with Google Analytics",
              "Google Analytics Demographics and Interests Reporting",
              "Google Display Network Impressions Reporting",
            ]}
          />
          <p>
            You can opt out using{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta underline-offset-4 transition hover:underline"
            >
              Google Analytics Opt-out
            </a>
            .
          </p>
        </Section>

        <Section
          num="05"
          id="section-5"
          title="How long do we keep your information?"
        >
          <p>
            We keep personal information only for as long as necessary to
            fulfill the purposes outlined in this Privacy Notice unless a
            longer retention period is required by law.
          </p>
          <p>When data is no longer needed, we will:</p>
          <Bullets
            items={[
              "Delete it, or",
              "Anonymize it, or",
              "Securely store it until deletion is possible.",
            ]}
          />
        </Section>

        <Section
          num="06"
          id="section-6"
          title="How do we keep your information safe?"
        >
          <p>
            We implement technical and organizational security measures to
            protect personal information. However, no system can guarantee
            complete security. Transmission of data over the internet is at
            your own risk.
          </p>
        </Section>

        <Section
          num="07"
          id="section-7"
          title="Do we collect information from minors?"
        >
          <Note>No.</Note>
          <p>
            We do not knowingly collect or market to individuals under 18 years
            of age. If we discover that we have collected personal information
            from minors under 18, we will delete it.
          </p>
          <p>
            If you believe we have collected such data, contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-terracotta underline-offset-4 transition hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section
          num="08"
          id="section-8"
          title="What are your privacy rights?"
        >
          <p>Depending on applicable law, you may have the right to:</p>
          <Bullets
            items={[
              "Access your personal data",
              "Correct inaccurate information",
              "Request deletion of your data",
              "Withdraw consent to data processing",
            ]}
          />
          <p>You can contact us to exercise these rights.</p>

          <Subhead>Opting out of marketing communications</Subhead>
          <p>You may unsubscribe from marketing emails by:</p>
          <Bullets
            items={[
              "Clicking the unsubscribe link in emails",
              "Replying STOP or UNSUBSCRIBE to SMS messages",
              "Contacting us directly",
            ]}
          />
        </Section>

        <Section
          num="09"
          id="section-9"
          title="Controls for do-not-track features"
        >
          <p>
            Some browsers include a Do-Not-Track (DNT) feature that signals
            your privacy preferences. Currently there is no uniform standard
            for responding to DNT signals, so we do not respond to them.
          </p>
          <p>If standards change in the future, we will update this Privacy Notice.</p>
        </Section>

        <Section
          num="10"
          id="section-10"
          title="How can you review, update, or delete the data we collect from you?"
        >
          <p>Depending on applicable laws, you may have the right to:</p>
          <Bullets
            items={[
              "Request access to your personal data",
              "Correct inaccurate data",
              "Request deletion of your data",
              "Withdraw consent to data processing",
            ]}
          />
          <p>To exercise these rights, submit a data subject access request.</p>
        </Section>

        <Section
          num="11"
          id="section-11"
          title="Do we make updates to this notice?"
        >
          <Note>Yes.</Note>
          <p>
            We may update this Privacy Notice to comply with relevant laws.
            Updated versions will include a revised date. We encourage users to
            review this policy regularly.
          </p>
        </Section>

        <Section
          num="12"
          id="section-12"
          title="How can you contact us about this notice?"
          last
        >
          <p>If you have questions or comments about this notice, contact us:</p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Email card */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group relative flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-12px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[0_4px_8px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.18)]"
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
              className="group relative flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-12px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-[0_4px_8px_rgba(15,23,42,0.04),0_20px_40px_-16px_rgba(15,23,42,0.18)]"
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

            {/* Address card — full width on sm+ */}
            <div className="flex items-start gap-4 rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_20px_-12px_rgba(15,23,42,0.08)] sm:col-span-2">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terracotta/10 text-terracotta">
                <MapPin size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-navy/45">
                  Postal Address
                </p>
                <address className="mt-1 not-italic text-sm font-light leading-relaxed text-navy/75">
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
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}

