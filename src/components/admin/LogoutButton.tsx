"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
    >
      <LogOut size={18} />
      Logout
    </button>
  );
}
