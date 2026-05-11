export type Faq = {
  question: string;
  answer: string;
};

/**
 * Public-facing FAQ. Used by `FaqSection` to render the accordion and by the
 * homepage to emit FAQPage JSON-LD for Google rich results.
 */
export const FAQS: ReadonlyArray<Faq> = [
  {
    question: "What interior design services does Infravue Interiors provide?",
    answer:
      "Infravue Interiors provides home interiors, office interior design, modular kitchen design, luxury interiors, commercial interior design, and customized interior solutions for residential and corporate spaces.",
  },
  {
    question: "Does Infravue offer turnkey interior solutions in Hyderabad?",
    answer:
      "Yes, Infravue offers end-to-end turnkey interior solutions in Hyderabad, covering design planning, material selection, execution, and final installation for homes, offices, and commercial spaces.",
  },
  {
    question: "Does Infravue design corporate spaces, commercial interiors, and homes?",
    answer:
      "Yes, Infravue specializes in corporate interior design, commercial interior design, and modern home interiors tailored to functionality, aesthetics, and space requirements.",
  },
  {
    question: "What makes Infravue one of the best interior designers in Hyderabad?",
    answer:
      "Infravue combines modern interior design, customized interior solutions, quality materials, and timely project execution to create affordable interiors and luxury interiors in Hyderabad.",
  },
  {
    question: "Does Infravue provide office interior design and modular kitchen solutions?",
    answer:
      "Yes, Infravue provides office interior design, modular kitchen solutions, home interiors, and customized residential interior design services.",
  },
  {
    question: "Can Infravue handle large-scale commercial interior design projects?",
    answer:
      "Yes, Infravue handles large-scale commercial interior design and corporate interior projects with complete turnkey execution and customized space planning solutions.",
  },
  {
    question: "Do you offer customized interior solutions for homes and offices?",
    answer:
      "Yes, we offer customized interior solutions for modern home interiors, office interiors, commercial spaces, and residential interior projects based on your style, functionality, and budget.",
  },
  {
    question: "How can I contact Infravue Interiors for a free consultation?",
    answer:
      "You can contact Infravue Interiors through our website, phone, or inquiry form to book a free consultation for home interiors, office interior design, luxury interiors, and turnkey interior solutions in Hyderabad.",
  },
];
