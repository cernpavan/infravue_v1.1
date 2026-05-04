"use client";
import { useLeadSession } from "@/hooks/useLeadSession";

export function LeadSessionInit() {
  useLeadSession();
  return null;
}
