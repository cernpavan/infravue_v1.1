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
    setIsSubmitting(true);
    setError(null);

    try {
      const requestId = getRequestId();
      if (!requestId) {
        throw new Error("Session not initialized");
      }

      const response = await fetch("/api/leads/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          name: data.name,
          phone: data.phone,
          serviceType: data.serviceType,
          message: data.message || null,
          // Sending null for removed fields to maintain API compatibility if needed
          email: null,
          city: null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save lead");
      }

      setShowSuccess(true);

      setTimeout(() => {
        const msg = encodeURIComponent(
          `Hi! I'm interested in Infravue interior design services.\nRequest ID: ${requestId}`
        );
        window.open(`https://wa.me/919010709994?text=${msg}`, "_blank");
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      console.error("Form submission error:", err);
      setError("Failed to submit form. Please try again.");
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
            className="bg-white p-6 sm:p-8 space-y-4"
          >
            <div className="text-center mb-2">
              <h2 className="text-xl font-bold text-navy">Free Consultation</h2>
              <p className="text-[10px] text-navy/40 uppercase tracking-widest mt-1">Get your dream space designed</p>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-[10px] font-medium">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="space-y-1">
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                {...register("name")}
                className="w-full px-5 py-4 bg-white border border-navy/15 rounded-xl text-sm text-navy placeholder:text-navy/40 placeholder:font-normal hover:border-navy/30 focus:outline-none focus:border-navy/70 focus:ring-4 focus:ring-navy/10 focus:bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out shadow-[0_1px_2px_rgba(30,58,106,0.04)]"
              />
              {errors.name && <p className="text-[9px] font-bold text-red-500 ml-2 uppercase">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                {...register("phone")}
                className="w-full px-5 py-4 bg-white border border-navy/15 rounded-xl text-sm text-navy placeholder:text-navy/40 placeholder:font-normal hover:border-navy/30 focus:outline-none focus:border-navy/70 focus:ring-4 focus:ring-navy/10 focus:bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out shadow-[0_1px_2px_rgba(30,58,106,0.04)]"
              />
              {errors.phone && <p className="text-[9px] font-bold text-red-500 ml-2 uppercase">{errors.phone.message}</p>}
            </div>

            {/* Service Type */}
            <div className="space-y-1">
              <div className="relative">
                <select
                  id="serviceType"
                  {...register("serviceType")}
                  defaultValue=""
                  className="w-full px-5 py-4 bg-white border border-navy/15 rounded-xl text-sm text-navy hover:border-navy/30 focus:outline-none focus:border-navy/70 focus:ring-4 focus:ring-navy/10 focus:bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out appearance-none cursor-pointer shadow-[0_1px_2px_rgba(30,58,106,0.04)] [&:has(option[value='']:checked)]:text-navy/40"
                >
                  <option value="">Select Service Type</option>
                  <option value="Residential">Residential Design</option>
                  <option value="Commercial">Commercial Design</option>
                  <option value="Hospitality">Hospitality Design</option>
                  <option value="Design & Planning">Design & Planning</option>
                  <option value="Finishing & Decor">Finishing & Decor</option>
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-navy/40">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              {errors.serviceType && (
                <p className="text-[9px] font-bold text-red-500 ml-2 uppercase">{errors.serviceType.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1">
              <textarea
                id="message"
                placeholder="Briefly describe your project (Optional)"
                rows={2}
                {...register("message")}
                className="w-full px-5 py-4 bg-white border border-navy/15 rounded-xl text-sm text-navy placeholder:text-navy/40 placeholder:font-normal hover:border-navy/30 focus:outline-none focus:border-navy/70 focus:ring-4 focus:ring-navy/10 focus:bg-white transition-[border-color,box-shadow,background-color] duration-200 ease-out resize-none shadow-[0_1px_2px_rgba(30,58,106,0.04)]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative mt-2 w-full flex items-center justify-center px-8 py-4 bg-gradient-to-b from-navy to-navy-dark text-white text-[13px] font-bold tracking-[0.06em] uppercase rounded-xl shadow-[0_10px_30px_-10px_rgba(30,58,106,0.55)] hover:shadow-[0_18px_42px_-10px_rgba(30,58,106,0.7)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-[0_10px_30px_-10px_rgba(30,58,106,0.55)] transition-[transform,box-shadow] duration-300 ease-out"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                "Get Free Consultation"
              )}
            </button>

            <p className="text-[9px] text-navy/40 text-center uppercase tracking-widest mt-2">
              Instant Response via WhatsApp
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
