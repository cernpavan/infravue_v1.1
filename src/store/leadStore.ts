import { create } from "zustand";

interface LeadState {
  requestId: string | null;
  setRequestId: (id: string) => void;
}

export const useLeadStore = create<LeadState>()((set) => ({
  requestId: null,
  setRequestId: (requestId) => set({ requestId }),
}));

export function getRequestId(): string | null {
  const fromStore = useLeadStore.getState().requestId;
  if (fromStore) return fromStore;
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("infravue_req_id");
}
