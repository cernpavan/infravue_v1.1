import { prisma } from "@/lib/prisma";
import DashboardStats from "@/components/admin/DashboardStats";
import LeadsChart from "@/components/admin/LeadsChart";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin Dashboard - Infravue" };

interface ChartData {
  date: string;
  form: number;
  whatsapp: number;
}

export default async function DashboardPage() {
  // Fetch all leads
  const [formLeads, whatsappLeads] = await Promise.all([
    prisma.formLead.findMany(),
    prisma.whatsAppLead.findMany(),
  ]);

  // Calculate date ranges
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Filter by time periods
  const todayForm = formLeads.filter((l) => l.createdAt >= today).length;
  const todayWhatsapp = whatsappLeads.filter((l) => l.createdAt >= today).length;

  const weekForm = formLeads.filter((l) => l.createdAt >= weekAgo).length;
  const weekWhatsapp = whatsappLeads.filter((l) => l.createdAt >= weekAgo).length;

  const monthForm = formLeads.filter((l) => l.createdAt >= monthAgo).length;
  const monthWhatsapp = whatsappLeads.filter((l) => l.createdAt >= monthAgo).length;

  const totalForm = formLeads.length;
  const totalWhatsapp = whatsappLeads.length;

  // Build daily series for last 30 days
  const dailySeries: Record<string, { date: string; form: number; whatsapp: number }> = {};

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split("T")[0];
    dailySeries[dateStr] = {
      date: dateStr,
      form: 0,
      whatsapp: 0,
    };
  }

  // Aggregate leads into daily buckets
  formLeads.forEach((lead) => {
    const dateStr = lead.createdAt.toISOString().split("T")[0];
    if (dailySeries[dateStr]) {
      dailySeries[dateStr].form++;
    }
  });

  whatsappLeads.forEach((lead) => {
    const dateStr = lead.createdAt.toISOString().split("T")[0];
    if (dailySeries[dateStr]) {
      dailySeries[dateStr].whatsapp++;
    }
  });

  const chartData = Object.values(dailySeries);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-black mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your lead overview.</p>
      </div>

      {/* Stats Cards */}
      <DashboardStats
        todayForm={todayForm}
        todayWhatsapp={todayWhatsapp}
        weekForm={weekForm}
        weekWhatsapp={weekWhatsapp}
        monthForm={monthForm}
        monthWhatsapp={monthWhatsapp}
        totalForm={totalForm}
        totalWhatsapp={totalWhatsapp}
      />

      {/* Chart */}
      <LeadsChart data={chartData} />

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-sm font-medium mb-2">Conversion Rate (Form → WhatsApp)</p>
          <p className="text-2xl font-bold text-black">
            {totalForm > 0 ? ((totalWhatsapp / totalForm) * 100).toFixed(1) : 0}%
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {totalWhatsapp} WhatsApp of {totalForm} form submissions
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-sm font-medium mb-2">Avg Daily Leads</p>
          <p className="text-2xl font-bold text-black">
            {((totalForm + totalWhatsapp) / 30).toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Over the last 30 days
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <p className="text-gray-600 text-sm font-medium mb-2">Most Popular Service</p>
          <p className="text-2xl font-bold text-black">
            {(() => {
              const serviceCount: Record<string, number> = {};
              formLeads.forEach((lead) => {
                serviceCount[lead.serviceType] = (serviceCount[lead.serviceType] || 0) + 1;
              });
              const sorted = Object.entries(serviceCount).sort((a, b) => b[1] - a[1]);
              return sorted.length > 0 ? sorted[0][0] : "N/A";
            })()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Among form submissions
          </p>
        </div>
      </div>
    </div>
  );
}
