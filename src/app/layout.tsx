import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { LeadSessionInit } from "@/components/LeadSessionInit";
import Providers from "./Providers";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Infravue — Premium Interior Design",
    template: "%s | Infravue",
  },
  description:
    "Premium interior design for homes, offices, and hospitality spaces. Transform your space with Infravue.",
  keywords: ["interior design", "home design", "office design", "premium interiors", "India"],
};

import { RootLayoutWrapper } from "./RootLayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-foreground">
        <Providers>
          <LeadSessionInit />
          <RootLayoutWrapper>{children}</RootLayoutWrapper>
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
