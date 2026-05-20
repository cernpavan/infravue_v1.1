"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getRequestId } from "@/store/leadStore";
import { CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  // Validates only when a value is entered; empty string passes as-is
  email: z
    .string()
    .refine(
      (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
      "Please enter a valid email address"
    )
    .optional(),
  serviceType: z
    .enum(["Residential", "Commercial", "Hospitality", "Design & Planning", "Finishing & Decor"])
    .refine((val) => val, "Please select a service type"),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    // Guard against double-submit even if React re-fires the handler.
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError(null);

    // requestId is best-effort — the backend accepts null. Don't block the
    // submission just because sessionStorage is unavailable (Safari ITP,
    // incognito, third-party-cookies blocked, etc.).
    const requestId = getRequestId();

    try {
      const response = await fetch("/api/leads/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          serviceType: data.serviceType,
          message: data.message || null,
          city: null,
        }),
      });

      if (!response.ok) {
        const errorData: { error?: string; issues?: Array<{ message: string }> } =
          await response.json().catch(() => ({}));
        const fieldMessage = errorData.issues?.[0]?.message;
        throw new Error(
          fieldMessage ||
            errorData.error ||
            `Submission failed (${response.status}). Please try again.`
        );
      }

      setShowSuccess(true);

      setTimeout(() => {
        const idForMessage = requestId ?? "n/a";
        const msg = encodeURIComponent(
          `Hi! I'm interested in Infravue interior design services.\nRequest ID: ${idForMessage}`
        );
        window.open(`https://wa.me/919010709994?text=${msg}`, "_blank");
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      console.error("Form submission error:", err);
      const message =
        err instanceof Error && err.message
          ? err.message
          : "Failed to submit form. Please try again.";
      setError(message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[450px] mx-auto">
      <AnimatePresence mode="wait">
        {showSuccess ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-xl shadow-navy/5"
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle size={32} className="text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-navy mb-3">Thank You!</h2>
            <p className="text-navy/60 px-8">
              We're opening WhatsApp to connect you with a designer...
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white px-6 sm:px-8 pt-7 sm:pt-8 pb-7 sm:pb-8 space-y-[18px]"
          >
            <div className="text-center mb-3">
              <h2 className="text-[1.5rem] sm:text-[1.625rem] font-bold text-navy tracking-[-0.015em] leading-tight">
                Free Consultation
              </h2>
              <div className="mx-auto mt-2.5 h-px w-10 bg-gradient-to-r from-transparent via-terracotta/60 to-transparent" aria-hidden="true" />
              <p className="text-[10px] font-semibold text-navy/45 uppercase tracking-[0.22em] mt-2.5">
                Get your dream space designed
              </p>
            </div>

            {error && (
              <div role="alert" className="px-3.5 py-2.5 bg-red-50/80 border border-red-200/80 rounded-lg text-red-700 text-[12px] font-medium leading-relaxed">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="space-y-[7px]">
              <label
                htmlFor="name"
                className="block text-[12px] font-semibold text-navy/85 tracking-[0.02em] pl-0.5"
              >
                Full Name{" "}
                <span className="text-terracotta" aria-hidden="true">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Pavan Kumar"
                autoComplete="name"
                {...register("name")}
                className="w-full px-[18px] py-[14px] bg-white border border-navy/15 rounded-[12px] text-[15px] font-medium text-navy tracking-[0.005em] caret-navy placeholder:text-navy/35 placeholder:font-normal placeholder:tracking-normal hover:border-navy/30 focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/12 focus:bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out shadow-[0_1px_2px_rgba(30,58,106,0.04),inset_0_1px_0_rgba(255,255,255,0.6)]"
              />
              {errors.name && (
                <p role="alert" className="text-[11.5px] font-medium text-red-500/95 tracking-[0.005em] mt-1 pl-0.5">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-[7px]">
              <label
                htmlFor="phone"
                className="block text-[12px] font-semibold text-navy/85 tracking-[0.02em] pl-0.5"
              >
                Phone Number{" "}
                <span className="text-terracotta" aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="10-digit mobile number"
                autoComplete="tel"
                inputMode="numeric"
                maxLength={10}
                {...register("phone")}
                className="w-full px-[18px] py-[14px] bg-white border border-navy/15 rounded-[12px] text-[15px] font-medium text-navy tracking-[0.04em] tabular-nums caret-navy placeholder:text-navy/35 placeholder:font-normal placeholder:tracking-normal hover:border-navy/30 focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/12 focus:bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out shadow-[0_1px_2px_rgba(30,58,106,0.04),inset_0_1px_0_rgba(255,255,255,0.6)]"
              />
              {errors.phone && (
                <p role="alert" className="text-[11.5px] font-medium text-red-500/95 tracking-[0.005em] mt-1 pl-0.5">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-[7px]">
              <label
                htmlFor="email"
                className="flex items-baseline gap-1.5 text-[12px] font-semibold text-navy/85 tracking-[0.02em] pl-0.5"
              >
                Email Address
                <span className="text-[10px] font-normal text-navy/35 tracking-[0.01em]">(Optional)</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                inputMode="email"
                {...register("email")}
                className="w-full px-[18px] py-[14px] bg-white border border-navy/15 rounded-[12px] text-[15px] font-medium text-navy tracking-[0.005em] caret-navy placeholder:text-navy/35 placeholder:font-normal placeholder:tracking-normal hover:border-navy/30 focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/12 focus:bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out shadow-[0_1px_2px_rgba(30,58,106,0.04),inset_0_1px_0_rgba(255,255,255,0.6)]"
              />
              {errors.email && (
                <p role="alert" className="text-[11.5px] font-medium text-red-500/95 tracking-[0.005em] mt-1 pl-0.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Service Type */}
            <div className="space-y-[7px]">
              <label
                htmlFor="serviceType"
                className="block text-[12px] font-semibold text-navy/85 tracking-[0.02em] pl-0.5"
              >
                Service Type{" "}
                <span className="text-terracotta" aria-hidden="true">*</span>
              </label>
              <div className="relative group">
                <select
                  id="serviceType"
                  {...register("serviceType")}
                  defaultValue=""
                  className="w-full pl-[18px] pr-12 py-[14px] bg-white border border-navy/15 rounded-[12px] text-[15px] font-medium text-navy tracking-[0.005em] hover:border-navy/30 focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/12 focus:bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out appearance-none cursor-pointer shadow-[0_1px_2px_rgba(30,58,106,0.04),inset_0_1px_0_rgba(255,255,255,0.6)] [&:has(option[value='']:checked)]:text-navy/40 [&:has(option[value='']:checked)]:font-normal"
                >
                  <option value="" disabled>Choose your service</option>
                  <option value="Residential">Residential Design</option>
                  <option value="Commercial">Commercial Design</option>
                  <option value="Hospitality">Hospitality Design</option>
                  <option value="Design & Planning">Design &amp; Planning</option>
                  <option value="Finishing & Decor">Finishing &amp; Decor</option>
                </select>
                <div className="absolute right-[14px] top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center w-6 h-6 rounded-md text-navy/55 group-hover:text-navy/75 group-focus-within:text-navy transition-colors duration-200">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {errors.serviceType && (
                <p role="alert" className="text-[11.5px] font-medium text-red-500/95 tracking-[0.005em] mt-1 pl-0.5">
                  {errors.serviceType.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-[7px]">
              <label
                htmlFor="message"
                className="flex items-baseline gap-1.5 text-[12px] font-semibold text-navy/85 tracking-[0.02em] pl-0.5"
              >
                Project Description
                <span className="text-[10px] font-normal text-navy/35 tracking-[0.01em]">(Optional)</span>
              </label>
              <textarea
                id="message"
                placeholder="Briefly describe your space, budget range, or any specific requirements…"
                rows={2}
                {...register("message")}
                className="w-full px-[18px] py-[14px] bg-white border border-navy/15 rounded-[12px] text-[15px] font-medium text-navy tracking-[0.005em] leading-relaxed caret-navy placeholder:text-navy/35 placeholder:font-normal placeholder:tracking-normal placeholder:leading-relaxed hover:border-navy/30 focus:outline-none focus:border-navy focus:ring-4 focus:ring-navy/12 focus:bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out resize-none shadow-[0_1px_2px_rgba(30,58,106,0.04),inset_0_1px_0_rgba(255,255,255,0.6)]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-3 w-full flex items-center justify-center overflow-hidden px-8 py-[15px] bg-gradient-to-b from-navy-light/95 via-navy to-navy-dark text-white text-[13px] font-bold tracking-[0.08em] uppercase rounded-[12px] shadow-[0_10px_30px_-10px_rgba(30,58,106,0.55),inset_0_1px_0_rgba(255,255,255,0.22)] hover:shadow-[0_20px_44px_-12px_rgba(30,58,106,0.75),inset_0_1px_0_rgba(255,255,255,0.28)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_10px_30px_-10px_rgba(30,58,106,0.55),inset_0_1px_0_rgba(255,255,255,0.22)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-navy/25 transition-[transform,box-shadow] duration-300 ease-out"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden="true" />
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending…</span>
                </span>
              ) : (
                <span>Get Free Consultation</span>
              )}
            </button>

            <p className="text-[10px] font-semibold text-navy/45 text-center uppercase tracking-[0.22em] mt-2">
              Instant Response via WhatsApp
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
