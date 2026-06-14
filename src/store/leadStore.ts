import { create } from "zustand";

interface LeadState {
  requestId: string | null;
  setRequestId: (id: string) => void;
}

export const useLeadStore = create<LeadState>()((set) => ({
  requestId: null,
  setRequestId: (requestId) => set({ requestId }),
}));

const SESSION_KEY = "infravue_req_id";

export function generateRequestId(): string {
  return (
    "REQ-" +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).substring(2, 6).toUpperCase()
  );
}

export function getRequestId(): string | null {
  const fromStore = useLeadStore.getState().requestId;
  if (fromStore) return fromStore;
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_KEY);
}

// Synchronous get-or-create. Use this in event handlers where we MUST have an
// ID right now (e.g. WhatsApp click tracking) — never gate tracking on the
// async LeadSessionInit effect having run, that race silently drops clicks.
export function ensureRequestId(): string {
  if (typeof window === "undefined") {
    // Server-side fallback — caller should not actually use this.
    return generateRequestId();
  }

  const fromStore = useLeadStore.getState().requestId;
  if (fromStore) return fromStore;

  const fromSession = sessionStorage.getItem(SESSION_KEY);
  if (fromSession) {
    useLeadStore.getState().setRequestId(fromSession);
    return fromSession;
  }

  const fresh = generateRequestId();
  sessionStorage.setItem(SESSION_KEY, fresh);
  useLeadStore.getState().setRequestId(fresh);
  return fresh;
}
