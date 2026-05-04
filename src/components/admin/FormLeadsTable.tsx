"use client";

import { useState, useMemo } from "react";
import { Search, Edit2, Trash2 } from "lucide-react";
import EditFormLeadModal from "./EditFormLeadModal";
import ExportButtons from "./ExportButtons";
import DateRangeFilter from "./DateRangeFilter";
import FilterStats from "./FilterStats";

interface FormLead {
  id: string;
  requestId: string | null;
  name: string;
  phone: string;
  email: string | null;
  serviceType: string;
  city: string | null;
  message: string | null;
  source: string;
  createdAt: string;
  updatedAt: string;
}

interface FormLeadsTableProps {
  initialLeads: FormLead[];
}

interface DateRange {
  startDate: Date;
  endDate: Date;
}

export default function FormLeadsTable({ initialLeads }: FormLeadsTableProps) {
  const [leads, setLeads] = useState<FormLead[]>(initialLeads);
  const [search, setSearch] = useState("");
  const [selectedLead, setSelectedLead] = useState<FormLead | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [filterLabel, setFilterLabel] = useState("all");

  // Calculate stats for each time period
  const getCountByPeriod = (leads: FormLead[], days?: number) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startDate = days
      ? new Date(today.getTime() - days * 24 * 60 * 60 * 1000)
      : new Date(0);

    return leads.filter((lead) => {
      const leadDate = new Date(lead.createdAt);
      return leadDate >= startDate;
    }).length;
  };

  const todayCount = getCountByPeriod(leads, 0);
  const weekCount = getCountByPeriod(leads, 7);
  const monthCount = getCountByPeriod(leads, 30);
  const totalCount = leads.length;

  // Filter leads based on search and date range
  const filteredLeads = useMemo(() => {
    let filtered = leads.filter((lead) => {
      const searchLower = search.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(searchLower) ||
        lead.phone.includes(search) ||
        lead.email?.toLowerCase().includes(searchLower) ||
        lead.serviceType.toLowerCase().includes(searchLower) ||
        lead.city?.toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;

      if (!dateRange) return true;

      const leadDate = new Date(lead.createdAt);
      return leadDate >= dateRange.startDate && leadDate <= dateRange.endDate;
    });

    return filtered;
  }, [leads, search, dateRange]);

  const handleFilterChange = (range: DateRange | null, label: string) => {
    setDateRange(range);
    setFilterLabel(label);
  };

  const handleEdit = (lead: FormLead) => {
    setSelectedLead(lead);
    setIsEditOpen(true);
  };

  const handleSave = (updatedLead: FormLead) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === updatedLead.id ? updatedLead : l))
    );
    setIsEditOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;

    setDeletingId(id);
    try {
      const response = await fetch(`/api/admin/form-leads/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete lead");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Date Range Filter */}
      <DateRangeFilter
        onFilterChange={handleFilterChange}
        currentLabel={filterLabel}
      />

      {/* Filter Stats */}
      <FilterStats
        todayCount={todayCount}
        weekCount={weekCount}
        monthCount={monthCount}
        totalCount={totalCount}
        currentFilterLabel={filterLabel}
        currentFilterCount={filteredLeads.length}
      />

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, phone, email, service, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-black placeholder:text-gray-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10"
          />
        </div>

        {/* Export */}
        <ExportButtons data={filteredLeads} type="form" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-black">Date</th>
                <th className="px-6 py-4 text-left font-semibold text-black">Name</th>
                <th className="px-6 py-4 text-left font-semibold text-black">Phone</th>
                <th className="px-6 py-4 text-left font-semibold text-black">Email</th>
                <th className="px-6 py-4 text-left font-semibold text-black">Service</th>
                <th className="px-6 py-4 text-left font-semibold text-black">City</th>
                <th className="px-6 py-4 text-right font-semibold text-black">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-600 text-xs">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-medium text-black">{lead.name}</td>
                    <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                      {lead.phone}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-xs">
                      {lead.email || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-black font-medium rounded text-xs">
                        {lead.serviceType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{lead.city || "—"}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(lead)}
                          className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-black transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(lead.id)}
                          disabled={deletingId === lead.id}
                          className="p-2 hover:bg-gray-100 rounded text-gray-600 hover:text-black transition-colors disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-navy/50">
                    {search ? "No leads match your search" : "No form leads yet"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {filteredLeads.length > 0 && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
            Showing {filteredLeads.length} of {leads.length} leads
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {selectedLead && (
        <EditFormLeadModal
          lead={selectedLead as any}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSave={(lead: any) => handleSave(lead)}
        />
      )}
    </div>
  );
}
