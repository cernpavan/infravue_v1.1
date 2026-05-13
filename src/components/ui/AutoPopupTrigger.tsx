"use client";

import { useEffect, useRef } from "react";
import { useConsultationModal } from "@/context/ModalContext";

const POPUP_KEY = "infravue_popup_shown";
const DELAY_MS = 30_000;

/**
 * Mounts once inside ConsultationModalProvider.
 * Fires openModal() after 30 s if the popup hasn't been shown this session.
 * Marks as shown immediately when the user manually opens the modal too,
 * so the timer never fires a second time.
 */
export function AutoPopupTrigger() {
  const { openModal, isOpen } = useConsultationModal();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // If user manually opens the modal before the timer fires, mark shown
  useEffect(() => {
    if (isOpen) sessionStorage.setItem(POPUP_KEY, "1");
  }, [isOpen]);

  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem(POPUP_KEY)) return;

    timerRef.current = setTimeout(() => {
      // Double-check — user may have opened manually during the wait
      if (!sessionStorage.getItem(POPUP_KEY)) {
        sessionStorage.setItem(POPUP_KEY, "1");
        openModal();
      }
    }, DELAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [openModal]);

  return null;
}
