export type Faq = {
  question: string;
  answer: string;
};

/**
 * Public-facing FAQ. Used by `FaqSection` to render the accordion and by the
 * homepage to emit FAQPage JSON-LD for Google rich results.
 *
 * Answers are written for users first; keywords are folded in naturally.
 */
export const FAQS: ReadonlyArray<Faq> = [
  {
    question: "What services does Infravue Interiors provide?",
    answer:
      "Infravue Interiors offers end-to-end interior design solutions in Hyderabad — including residential interiors, modular kitchens, commercial offices, hospitality spaces, and complete design + execution services tailored to your needs.",
  },
  {
    question: "Which areas does Infravue Interiors serve?",
    answer:
      "We are headquartered in Hyderabad and serve clients across Hyderabad, Secunderabad, Bengaluru, Mumbai, Pune, and Chennai. We are continuously expanding to support new regions.",
  },
  {
    question: "What makes Infravue stand out among interior designers in Hyderabad?",
    answer:
      "Our focus on premium materials, considered design, transparent pricing, on-time delivery, and a customer-centric approach is what positions Infravue among the best interior designers in Hyderabad.",
  },
  {
    question: "How can I get in touch with Infravue Interiors?",
    answer:
      "You can reach out through our website's booking form, WhatsApp, or by booking a free consultation directly. Our team typically responds within one business day.",
  },
  {
    question: "Does Infravue handle full project execution or only design?",
    answer:
      "We provide complete end-to-end services — from initial design concepts and 3D visualisation to procurement, on-site execution, and final delivery.",
  },
  {
    question: "Can Infravue manage large-scale commercial interior projects?",
    answer:
      "Yes. With an experienced team and a proven track record across corporate HQs, tech workspaces, and hospitality interiors, we deliver projects of any scale — premium quality, on time and within budget.",
  },
];
