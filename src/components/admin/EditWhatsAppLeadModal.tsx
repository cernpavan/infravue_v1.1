"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2 } from "lucide-react";

const editWhatsAppLeadSchema = z.object({
  source: z.string().min(1, "Source is required"),
});

type EditWhatsAppLeadInput = z.infer<typeof editWhatsAppLeadSchema>;

interface WhatsAppLead extends EditWhatsAppLeadInput {
  id: string;
  requestId: string;
  createdAt: string;
}

interface EditWhatsAppLeadModalProps {
  lead: WhatsAppLead;
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: WhatsAppLead) => void;
}

export default function EditWhatsAppLeadModal({
  lead,
  isOpen,
  onClose,
  onSave,
}: EditWhatsAppLeadModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditWhatsAppLeadInput>({
    resolver: zodResolver(editWhatsAppLeadSchema),
    defaultValues: {
      source: lead.source,
    },
  });

  const onSubmit = async (data: EditWhatsAppLeadInput) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/whatsapp-leads/${lead.id}`, {
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
        ...updatedLead,
        createdAt: lead.createdAt,
      });
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
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sand/20 px-6 py-4 bg-white">
          <div>
            <h2 className="text-xl font-bold text-navy">Edit WhatsApp Lead</h2>
            <p className="text-sm text-navy/60 mt-1">{lead.requestId}</p>
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

          <div>
            <label className="block text-sm font-semibold text-navy mb-2">
              Source
            </label>
            <input
              {...register("source")}
              type="text"
              className="w-full px-4 py-2.5 border border-sand/30 rounded-lg focus:outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
            />
            {errors.source && (
              <p className="text-red-600 text-xs mt-1">{errors.source.message}</p>
            )}
          </div>

          {/* Metadata (readonly) */}
          <div className="bg-navy/5 rounded-lg p-4 space-y-2 text-xs text-navy/70">
            <p>
              <strong>Request ID:</strong> {lead.requestId}
            </p>
            <p>
              <strong>Created:</strong> {new Date(lead.createdAt).toLocaleString("en-IN")}
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
