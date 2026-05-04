"use client";

import { useState } from "react";
import { Download } from "lucide-react";

interface ExportButtonsProps {
  data: any[];
  type: "form" | "whatsapp";
}

export default function ExportButtons({ data, type }: ExportButtonsProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExcelExport = async () => {
    setIsExporting(true);
    try {
      const XLSX = await import("xlsx");

      let rows: any[] = [];

      if (type === "form") {
        rows = data.map((lead) => ({
          Date: new Date(lead.createdAt).toLocaleString("en-IN"),
          Name: lead.name || "",
          Phone: lead.phone || "",
          Email: lead.email || "",
          "Service Type": lead.serviceType || "",
          City: lead.city || "",
          Message: lead.message || "",
          Source: lead.source || "",
        }));
      } else {
        rows = data.map((lead) => ({
          Date: new Date(lead.createdAt).toLocaleString("en-IN"),
          "Request ID": lead.requestId || "",
          Source: lead.source || "",
        }));
      }

      const worksheet = XLSX.utils.json_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        type === "form" ? "Form Leads" : "WhatsApp Leads"
      );

      const filename =
        type === "form" ? "form-leads.xlsx" : "whatsapp-leads.xlsx";
      XLSX.writeFile(workbook, filename);
    } catch (error) {
      console.error("Excel export error:", error);
      alert("Failed to export to Excel");
    } finally {
      setIsExporting(false);
    }
  };

  const handlePdfExport = async () => {
    setIsExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      await import("jspdf-autotable");

      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();

      // Add title
      doc.setFontSize(16);
      doc.text(
        type === "form" ? "Form Leads Report" : "WhatsApp Leads Report",
        pageWidth / 2,
        15,
        { align: "center" }
      );

      // Add date
      doc.setFontSize(10);
      doc.text(
        `Generated: ${new Date().toLocaleString("en-IN")}`,
        pageWidth / 2,
        22,
        { align: "center" }
      );

      let head: string[][] = [];
      let body: (string | number)[][] = [];

      if (type === "form") {
        head = [
          ["Date", "Name", "Phone", "Email", "Service", "City", "Message"],
        ];
        body = data.map((lead) => [
          new Date(lead.createdAt).toLocaleString("en-IN"),
          lead.name || "",
          lead.phone || "",
          lead.email || "",
          lead.serviceType || "",
          lead.city || "",
          (lead.message || "").substring(0, 50),
        ]);
      } else {
        head = [["Date", "Request ID", "Source"]];
        body = data.map((lead) => [
          new Date(lead.createdAt).toLocaleString("en-IN"),
          lead.requestId || "",
          lead.source || "",
        ]);
      }

      (doc as any).autoTable({
        head,
        body,
        startY: 30,
        margin: { left: 10, right: 10 },
        headerStyles: {
          fillColor: [30, 58, 106],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [252, 249, 244],
        },
        styles: {
          fontSize: 9,
          cellPadding: 5,
        },
      });

      const filename =
        type === "form" ? "form-leads.pdf" : "whatsapp-leads.pdf";
      doc.save(filename);
    } catch (error) {
      console.error("PDF export error:", error);
      alert("Failed to export to PDF");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleExcelExport}
        disabled={isExporting || data.length === 0}
        className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
      >
        <Download size={16} />
        Excel
      </button>
      <button
        onClick={handlePdfExport}
        disabled={isExporting || data.length === 0}
        className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 border border-gray-300 rounded-lg text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 text-sm"
      >
        <Download size={16} />
        PDF
      </button>
    </div>
  );
}
