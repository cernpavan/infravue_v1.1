"use client";
import { getRequestId } from "@/store/leadStore";

const WHATSAPP_PHONE = "917478075444";

export default function WhatsAppButton() {
  const handleClick = async () => {
    const id = getRequestId();
    if (id) {
      fetch("/api/leads/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id }),
      }).catch(() => {});
    }
    const msg = encodeURIComponent(
      `Hi! I'm interested in Infravue interior design services.\nRequest ID: ${id ?? "N/A"}`
    );
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${msg}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-all duration-200"
    >
      {/* WhatsApp SVG icon */}
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.914 15.914 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.312 22.594c-.39 1.1-1.932 2.014-3.168 2.282-.846.18-1.95.324-5.668-1.218-4.762-1.974-7.826-6.81-8.064-7.124-.23-.314-1.932-2.574-1.932-4.908 0-2.334 1.222-3.48 1.656-3.956.39-.432.926-.618 1.264-.618.154 0 .292.008.416.014.434.02.65.044 .936.724.358.85 1.228 2.998 1.336 3.216.108.218.218.508.072.804-.138.302-.262.488-.48.752-.218.264-.45.468-.668.754-.198.252-.42.52-.178.952.242.432 1.076 1.776 2.312 2.878 1.59 1.416 2.93 1.854 3.346 2.058.416.204.66.172.902-.098.252-.28 1.076-1.254 1.364-1.686.28-.432.568-.36.954-.216.39.144 2.468 1.164 2.89 1.376.424.212.704.318.808.496.108.18.108 1.028-.282 2.118z" />
      </svg>

      {/* Pulse ring animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 pointer-events-none" />
    </button>
  );
}
