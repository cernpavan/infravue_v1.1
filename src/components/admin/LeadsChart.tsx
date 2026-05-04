"use client";

import dynamic from "next/dynamic";

interface ChartData {
  date: string;
  form: number;
  whatsapp: number;
}

interface LeadsChartProps {
  data: ChartData[];
}

const ChartContent = dynamic(
  async () => {
    const {
      BarChart,
      Bar,
      XAxis,
      YAxis,
      CartesianGrid,
      Tooltip,
      Legend,
      ResponsiveContainer,
    } = await import("recharts");

    return function Chart({ data }: LeadsChartProps) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E8E0D5" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#1E3A6A", fontSize: 12 }}
              stroke="#E8E0D5"
            />
            <YAxis tick={{ fill: "#1E3A6A", fontSize: 12 }} stroke="#E8E0D5" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FCF9F4",
                border: "1px solid #D8C4AD",
                borderRadius: "6px",
              }}
              labelStyle={{ color: "#1E3A6A" }}
            />
            <Legend />
            <Bar dataKey="form" fill="#1E3A6A" name="Form Leads" radius={[4, 4, 0, 0]} />
            <Bar
              dataKey="whatsapp"
              fill="#A1622C"
              name="WhatsApp Leads"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    };
  },
  { ssr: false, loading: () => <div className="h-80 animate-pulse bg-navy/10 rounded" /> }
);

export default function LeadsChart({ data }: LeadsChartProps) {
  return (
    <div className="bg-white rounded-lg border border-sand/30 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-navy mb-6">Leads Trend (Last 30 Days)</h2>
      <ChartContent data={data} />
    </div>
  );
}
