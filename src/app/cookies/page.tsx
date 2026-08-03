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
  title: "Cookie Policy",
  description:
    "How Infravue Interiors and Constructions Private Limited uses cookies and similar tracking technologies on its website.",
  alternates: { canonical: "/cookies" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 11, 2026";
const CONTACT_EMAIL = "info@infravueinteriors.com";
const CONTACT_PHONE = "+91 93462 45082";

const TOC = [
  { num: "01", id: "section-1", title: "What are cookies?" },
  { num: "02", id: "section-2", title: "Why we use cookies" },
  { num: "03", id: "section-3", title: "Information collected through cookies" },
  { num: "04", id: "section-4", title: "Other tracking technologies" },
  { num: "05", id: "section-5", title: "Third-party cookies and services" },
  { num: "06", id: "section-6", title: "Managing and controlling cookies" },
  { num: "07", id: "section-7", title: "Advertising opt-out options" },
  { num: "08", id: "section-8", title: "Changes to this Cookie Policy" },
  { num: "09", id: "section-9", title: "Contact information" },
];

export default function CookiePolicyPage() {
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
            Cookie Policy
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base font-light leading-relaxed text-navy/60 lg:text-lg">
            How Infravue Interiors uses cookies and similar tracking
            technologies on its website, and the choices you have.
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
          This Cookie Policy explains how{" "}
          <span className="text-navy font-medium">
            Infravue Interiors and Constructions Private Limited
          </span>{" "}
          (&ldquo;Company&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) uses cookies and similar technologies when you
          visit our website{" "}
          <a
            href="https://infravueinteriors.com"
            className="text-terracotta underline-offset-4 transition hover:underline"
          >
            https://infravueinteriors.com
          </a>{" "}
          (the &ldquo;Website&rdquo;).
        </p>

        <p className="mt-5 text-base leading-[1.85] font-light text-navy/75 lg:text-lg">
          This policy explains what cookies are, how we use them, the types of
          cookies we use, and the choices you have regarding cookies.
        </p>

        <div className="mt-10 rounded-2xl border border-navy/10 bg-cream-muted/70 p-6 sm:p-8">
          <p className="text-[12px] font-semibold tracking-[0.28em] uppercase text-terracotta">
            Your consent
          </p>
          <p className="mt-3 text-base font-light leading-relaxed text-navy/75">
            By continuing to use our Website, you agree to the use of cookies
            in accordance with this Cookie Policy.
          </p>
        </div>
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
        <Section num="01" id="section-1" title="What are cookies?">
          <p>
            Cookies are small text files that are stored on your computer,
            mobile device, or other internet-enabled device when you visit a
            website. Cookies allow websites to recognize a user&apos;s device
            and store certain information about preferences or past actions.
          </p>
          <p>
            Cookies are widely used to make websites function efficiently,
            improve user experience, and provide information to website owners.
          </p>
          <p>Cookies may be classified as:</p>

          <Subhead>First-party cookies</Subhead>
          <p>These cookies are set directly by our Website.</p>

          <Subhead>Third-party cookies</Subhead>
          <p>
            These cookies are set by external service providers such as
            analytics companies, advertising networks, and social media
            platforms.
          </p>
        </Section>

        <Section num="02" id="section-2" title="Why we use cookies">
          <p>
            We use cookies and similar tracking technologies for several
            purposes, including:
          </p>

          <Subhead>Essential cookies</Subhead>
          <p>
            These cookies are necessary for the Website to function properly.
            They enable core functionalities such as security, network
            management, and accessibility.
          </p>
          <p>
            Without these cookies, certain services or features of the Website
            may not be available.
          </p>

          <Subhead>Performance and analytics cookies</Subhead>
          <p>
            These cookies collect information about how visitors use our
            Website. They help us understand:
          </p>
          <Bullets
            items={[
              "Which pages are visited most frequently",
              "How users navigate through the Website",
              "Website performance and loading times",
              "Errors encountered during browsing",
              "Sources of website traffic",
            ]}
          />
          <p>
            This information helps us improve the functionality, usability, and
            performance of the Website.
          </p>
          <p>
            Analytics services such as Google Analytics or similar tools may
            use cookies to collect this information.
          </p>

          <Subhead>Functionality cookies</Subhead>
          <p>
            These cookies allow the Website to remember choices that you make,
            such as:
          </p>
          <Bullets
            items={[
              "Language preferences",
              "Region",
              "Browser settings",
              "Previously entered information",
            ]}
          />
          <p>
            These cookies provide enhanced and more personalized features.
          </p>

          <Subhead>Advertising and marketing cookies</Subhead>
          <p>Advertising cookies may be used to:</p>
          <Bullets
            items={[
              "Deliver relevant advertisements to users",
              "Measure advertising campaign performance",
              "Track interactions with advertisements",
              "Limit the number of times an advertisement is displayed",
            ]}
          />
          <p>
            These cookies may be placed by advertising partners such as Google
            Ads or other advertising platforms.
          </p>
          <p>
            They may track browsing behavior across different websites and
            build profiles based on user interests.
          </p>
        </Section>

        <Section
          num="03"
          id="section-3"
          title="Information collected through cookies"
        >
          <p>
            Cookies and similar technologies may automatically collect certain
            technical and usage information when you visit the Website,
            including:
          </p>
          <Bullets
            items={[
              "Internet Protocol (IP) address",
              "Browser type and browser version",
              "Device type and device identifiers",
              "Operating system",
              "Internet service provider",
              "Referring and exit pages",
              "Date and time of visits",
              "Pages viewed and interactions",
              "Website navigation patterns",
              "Approximate geographic location",
            ]}
          />
          <p>This information is used primarily for:</p>
          <Bullets
            items={[
              "Website operation",
              "Analytics and performance monitoring",
              "Advertising measurement",
              "Security and fraud prevention",
            ]}
          />
          <Note>
            In most cases, the information collected does not directly identify
            individual users.
          </Note>
        </Section>

        <Section num="04" id="section-4" title="Other tracking technologies">
          <p>
            In addition to cookies, we may use other tracking technologies such
            as:
          </p>

          <Subhead>Web beacons</Subhead>
          <p>
            Web beacons (also known as tracking pixels, clear GIFs, or pixel
            tags) are small graphic images embedded in web pages or emails.
          </p>
          <p>They allow us to:</p>
          <Bullets
            items={[
              "Track user interactions",
              "Monitor website traffic patterns",
              "Measure marketing campaign effectiveness",
              "Understand email engagement",
            ]}
          />
          <p>Web beacons often work together with cookies to collect usage data.</p>

          <Subhead>Local storage technologies</Subhead>
          <p>
            Some websites may use Local Shared Objects (Flash Cookies) or
            similar technologies to store information related to preferences
            or usage.
          </p>
          <p>
            These technologies help support features such as fraud prevention,
            website functionality, and analytics.
          </p>
          <p>
            Users can control Flash Cookies through the settings in the Adobe
            Flash Player or similar software.
          </p>
        </Section>

        <Section
          num="05"
          id="section-5"
          title="Third-party cookies and services"
        >
          <p>
            Our Website may allow third-party service providers to place
            cookies or tracking technologies on your device.
          </p>
          <p>These third parties may include:</p>
          <Bullets
            items={[
              "Analytics providers",
              "Advertising networks",
              "Marketing and performance measurement tools",
              "Social media platforms",
              "Embedded content providers",
            ]}
          />
          <p>
            These third parties may collect information about your browsing
            activities across different websites and over time.
          </p>
          <p>
            We do not control the cookies set by these third parties. Their use
            of cookies is governed by their own privacy policies.
          </p>
        </Section>

        <Section
          num="06"
          id="section-6"
          title="Managing and controlling cookies"
        >
          <Note>You have the right to accept or reject cookies.</Note>
          <p>
            Most web browsers allow you to manage cookie preferences through
            browser settings. You can typically choose to:
          </p>
          <Bullets
            items={[
              "Accept all cookies",
              "Block cookies",
              "Delete existing cookies",
              "Receive notifications when cookies are placed",
            ]}
          />
          <p>
            Please note that disabling or blocking certain cookies may affect
            the functionality and performance of the Website.
          </p>

          <Subhead>Managing cookies in your browser</Subhead>
          <p>
            Instructions for managing cookies can be found in the help section
            of your browser. Common browsers include:
          </p>
          <Bullets
            items={[
              "Google Chrome",
              "Mozilla Firefox",
              "Microsoft Edge",
              "Safari",
              "Opera",
            ]}
          />
          <p>Each browser provides its own method for managing cookies.</p>
        </Section>

        <Section num="07" id="section-7" title="Advertising opt-out options">
          <p>
            Users may opt out of certain targeted advertising programs provided
            by participating advertising networks.
          </p>
          <p>More information can be found at:</p>
          <ul className="space-y-2.5 pl-5 [&>li]:relative [&>li]:before:absolute [&>li]:before:-left-5 [&>li]:before:top-[0.65em] [&>li]:before:h-1 [&>li]:before:w-1 [&>li]:before:rounded-full [&>li]:before:bg-terracotta/70">
            <li>
              <a
                href="https://www.networkadvertising.org/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta underline-offset-4 transition hover:underline"
              >
                Network Advertising Initiative (NAI)
              </a>
            </li>
            <li>
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta underline-offset-4 transition hover:underline"
              >
                Digital Advertising Alliance (DAA)
              </a>
            </li>
            <li>
              <a
                href="https://www.youronlinechoices.eu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-terracotta underline-offset-4 transition hover:underline"
              >
                European Interactive Digital Advertising Alliance (EDAA)
              </a>
            </li>
          </ul>
          <p>
            These organizations provide tools to control interest-based
            advertising.
          </p>
        </Section>

        <Section
          num="08"
          id="section-8"
          title="Changes to this Cookie Policy"
        >
          <p>We may update this Cookie Policy from time to time to reflect:</p>
          <Bullets
            items={[
              "Changes in legal requirements",
              "Updates to our technologies",
              "Changes in how cookies are used on our Website",
            ]}
          />
          <p>
            When we update this policy, the &ldquo;Last updated&rdquo; date at
            the top of the page will be revised.
          </p>
          <p>We encourage users to review this Cookie Policy periodically.</p>
        </Section>

        <Section num="09" id="section-9" title="Contact information" last>
          <p>
            If you have any questions about this Cookie Policy or our use of
            cookies and tracking technologies, you may contact us:
          </p>

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
