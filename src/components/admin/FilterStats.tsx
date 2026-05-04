"use client";

import { TrendingUp } from "lucide-react";

interface FilterStatsProps {
  todayCount: number;
  weekCount: number;
  monthCount: number;
  totalCount: number;
  currentFilterLabel: string;
  currentFilterCount: number;
}

export default function FilterStats({
  todayCount,
  weekCount,
  monthCount,
  totalCount,
  currentFilterLabel,
  currentFilterCount,
}: FilterStatsProps) {
  const stats = [
    { label: "Today", value: todayCount, color: "terracotta" },
    { label: "This Week", value: weekCount, color: "navy" },
    { label: "This Month", value: monthCount, color: "navy" },
    { label: "All Time", value: totalCount, color: "sand" },
  ];

  return (
    <div className="space-y-4">
      {/* Current Filter Info */}
      {currentFilterLabel !== "all" && (
        <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-1">Viewing:</p>
          <p className="text-lg font-bold text-black capitalize">
            {currentFilterLabel === "custom"
              ? "Custom Date Range"
              : currentFilterLabel.replace("_", " ")}
          </p>
          <p className="text-2xl font-bold text-black mt-2">{currentFilterCount}</p>
          <p className="text-xs text-gray-500">leads found</p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((stat) => {
          return (
            <div
              key={stat.label}
              className="bg-white rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {stat.value}
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-gray-100 text-black">
                  <TrendingUp size={16} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
