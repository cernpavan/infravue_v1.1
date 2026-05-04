"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface DateRangeFilterProps {
  onFilterChange: (range: DateRange | null, label: string) => void;
  currentLabel: string;
}

export default function DateRangeFilter({
  onFilterChange,
  currentLabel,
}: DateRangeFilterProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const getDateRange = (label: string): DateRange => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (label) {
      case "today": {
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        return { startDate: today, endDate: tomorrow };
      }
      case "week": {
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        return { startDate: weekAgo, endDate: tomorrow };
      }
      case "month": {
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        const tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);
        return { startDate: monthAgo, endDate: tomorrow };
      }
      case "all":
      default:
        return { startDate: new Date(0), endDate: new Date() };
    }
  };

  const handlePreset = (label: string) => {
    setShowCustom(false);
    setStartDate("");
    setEndDate("");
    const range = getDateRange(label);
    onFilterChange(range, label);
  };

  const handleCustom = () => {
    if (startDate && endDate) {
      const range = {
        startDate: new Date(startDate),
        endDate: new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000),
      };
      onFilterChange(range, "custom");
      setShowCustom(false);
    }
  };

  const handleClear = () => {
    setShowCustom(false);
    setStartDate("");
    setEndDate("");
    onFilterChange(null, "all");
  };

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handlePreset("today")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentLabel === "today"
              ? "bg-black text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          Today
        </button>
        <button
          onClick={() => handlePreset("week")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentLabel === "week"
              ? "bg-black text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => handlePreset("month")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentLabel === "month"
              ? "bg-black text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          This Month
        </button>
        <button
          onClick={() => handlePreset("all")}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentLabel === "all"
              ? "bg-black text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          All Time
        </button>
        <button
          onClick={() => setShowCustom(!showCustom)}
          className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
            currentLabel === "custom"
              ? "bg-black text-white"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          <Calendar size={16} />
          Custom
        </button>
      </div>

      {/* Custom Date Range */}
      {showCustom && (
        <div className="bg-gray-100 rounded-lg p-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleCustom}
              disabled={!startDate || !endDate}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-900 disabled:opacity-50 transition-colors"
            >
              Apply
            </button>
            <button
              onClick={() => setShowCustom(false)}
              className="flex-1 px-4 py-2 bg-white border border-gray-300 text-black rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Clear Filter */}
      {currentLabel !== "all" && (
        <button
          onClick={handleClear}
          className="text-sm text-gray-600 hover:text-black underline"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}
