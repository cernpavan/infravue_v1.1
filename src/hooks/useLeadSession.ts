"use client";
import { useEffect } from "react";
import { generateRequestId, useLeadStore } from "@/store/leadStore";

export function useLeadSession() {
  const { requestId, setRequestId } = useLeadStore();

  useEffect(() => {
    if (requestId) return;

    const existing = sessionStorage.getItem("infravue_req_id");
    if (existing) {
      setRequestId(existing);
      return;
    }

    const id = generateRequestId();
    sessionStorage.setItem("infravue_req_id", id);
    setRequestId(id);
  }, [requestId, setRequestId]);
}
