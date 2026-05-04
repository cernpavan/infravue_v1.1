"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, FileText, MessageSquare } from "lucide-react";
import AdminLogoutButton from "./LogoutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/form-leads", label: "Form Leads", icon: FileText },
  { href: "/admin/whatsapp-leads", label: "WhatsApp Leads", icon: MessageSquare },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-white border-r border-gray-200 flex flex-col z-40">
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-white font-bold text-lg">
            I
          </div>
          <div>
            <p className="text-sm font-bold text-black">Infravue</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-black"
              }`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Section */}
      <div className="p-4 border-t border-gray-200">
        <AdminLogoutButton />
      </div>
    </aside>
  );
}
