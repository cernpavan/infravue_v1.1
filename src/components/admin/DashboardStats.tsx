"use client";

import { TrendingUp } from "lucide-react";

interface StatsProps {
  todayForm: number;
  todayWhatsapp: number;
  weekForm: number;
  weekWhatsapp: number;
  monthForm: number;
  monthWhatsapp: number;
  totalForm: number;
  totalWhatsapp: number;
}

export default function DashboardStats({
  todayForm,
  todayWhatsapp,
  weekForm,
  weekWhatsapp,
  monthForm,
  monthWhatsapp,
  totalForm,
  totalWhatsapp,
}: StatsProps) {
  const stats = [
    {
      label: "Today's Leads",
      value: todayForm + todayWhatsapp,
      subLabel: `${todayForm} form, ${todayWhatsapp} WhatsApp`,
    },
    {
      label: "This Week",
      value: weekForm + weekWhatsapp,
      subLabel: `${weekForm} form, ${weekWhatsapp} WhatsApp`,
    },
    {
      label: "This Month",
      value: monthForm + monthWhatsapp,
      subLabel: `${monthForm} form, ${monthWhatsapp} WhatsApp`,
    },
    {
      label: "All-Time Total",
      value: totalForm + totalWhatsapp,
      subLabel: `${totalForm} form, ${totalWhatsapp} WhatsApp`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-black mb-2">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.subLabel}</p>
            </div>
            <div className="p-2 rounded-lg bg-gray-100 text-black">
              <TrendingUp size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
