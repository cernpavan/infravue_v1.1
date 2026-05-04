"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2 } from "lucide-react";

const formLeadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Invalid Indian phone number"),
  email: z.string().email().optional().or(z.literal("")),
  serviceType: z.enum(["Residential", "Commercial", "Hospitality"]),
  city: z.string().min(2).optional(),
  message: z.string().optional(),
});

type FormLeadInput = z.infer<typeof formLeadSchema>;

interface FormLead extends FormLeadInput {
  id: string;
  requestId: string | null;
  source: string;
  createdAt: string;
  updatedAt: string;
}

interface EditFormLeadModalProps {
  lead: FormLead;
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: FormLead) => void;
}

export default function EditFormLeadModal({
  lead,
  isOpen,
  onClose,
  onSave,
}: EditFormLeadModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormLeadInput>({
    resolver: zodResolver(formLeadSchema),
    defaultValues: {
      name: lead.name,
      phone: lead.phone,
      email: lead.email || "",
      serviceType: lead.serviceType as "Residential" | "Commercial" | "Hospitality",
      city: lead.city || "",
      message: lead.message || "",
    },
  });

  const onSubmit = async (data: FormLeadInput) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/form-leads/${lead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update lead");
      }

      const updatedLead = await response.json();
      onSave({
        id: updatedLead.id,
        requestId: updatedLead.requestId,
        name: updatedLead.name,
        phone: updatedLead.phone,
        email: updatedLead.email || null,
        serviceType: updatedLead.serviceType,
        city: updatedLead.city || null,
        message: updatedLead.message || null,
        source: updatedLead.source,
        createdAt: lead.createdAt,
        updatedAt: new Date().toISOString(),
      } as any);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-sand/20 px-6 py-4 bg-white">
          <div>
            <h2 className="text-xl font-bold text-navy">Edit Lead</h2>
            <p className="text-sm text-navy/60 mt-1">{lead.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-navy/10 rounded transition-colors"
          >
            <X size={20} className="text-navy" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full px-4 py-2.5 border border-sand/30 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Phone
              </label>
              <input
                {...register("phone")}
                type="tel"
                className="w-full px-4 py-2.5 border border-sand/30 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
              />
              {errors.phone && (
                <p className="text-red-600 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Email (Optional)
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-2.5 border border-sand/30 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Service Type
              </label>
              <select
                {...register("serviceType")}
                className="w-full px-4 py-2.5 border border-sand/30 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Hospitality">Hospitality</option>
              </select>
              {errors.serviceType && (
                <p className="text-red-600 text-xs mt-1">{errors.serviceType.message}</p>
              )}
            </div>

            {/* City */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-navy mb-2">
                City (Optional)
              </label>
              <input
                {...register("city")}
                type="text"
                className="w-full px-4 py-2.5 border border-sand/30 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
              />
              {errors.city && (
                <p className="text-red-600 text-xs mt-1">{errors.city.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-navy mb-2">
                Message (Optional)
              </label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full px-4 py-2.5 border border-sand/30 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10 resize-none"
              />
              {errors.message && (
                <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>
          </div>

          {/* Metadata (readonly) */}
          <div className="bg-navy/5 rounded-lg p-4 space-y-2 text-xs text-navy/70">
            <p>
              <strong>Request ID:</strong> {lead.requestId || "—"}
            </p>
            <p>
              <strong>Created:</strong> {new Date(lead.createdAt).toLocaleString("en-IN")}
            </p>
            <p>
              <strong>Last Updated:</strong> {new Date(lead.updatedAt).toLocaleString("en-IN")}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t border-sand/20">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-6 py-2.5 border border-sand/30 rounded-lg text-navy font-medium hover:bg-navy/5 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-navy text-white rounded-lg font-medium hover:bg-navy/90 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSaving && <Loader2 size={16} className="animate-spin" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
