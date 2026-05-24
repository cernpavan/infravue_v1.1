import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import BookingForm from "./BookingForm";

export const metadata: Metadata = pageMetadata({
  title: "Book Free Consultation",
  description:
    "Book a free interior design consultation with Infravue Interiors, a premium Hyderabad-based studio. Tell us about your space and we'll connect you with the right designer.",
  path: "/book",
  ogTitle: "Book a Free Consultation · Infravue Interiors",
  ogDescription:
    "Free, no-obligation interior design consultation with our Hyderabad studio.",
});

export default function BookPage() {
  return (
    <>
      {/* Hero band */}
      <section className="bg-navy pt-36 pb-16 px-6 lg:px-20 text-center">
        <p className="text-sand text-xs font-semibold tracking-[0.18em] uppercase mb-4">
          Free Consultation
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
          Let's Design Your Dream Space
        </h1>
        <p className="text-white/60 text-base max-w-lg mx-auto">
          Fill in your details and we'll connect you with the right designer instantly.
        </p>
      </section>

      {/* Form card */}
      <section className="bg-white py-14 lg:py-20 px-6 lg:px-20">
        <div className="max-w-2xl mx-auto">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
