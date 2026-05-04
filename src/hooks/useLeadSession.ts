"use client";
import { useEffect } from "react";
import { useLeadStore } from "@/store/leadStore";

function generateRequestId() {
  return (
    "REQ-" +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).substring(2, 6).toUpperCase()
  );
}

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
