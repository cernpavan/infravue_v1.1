"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface ModalContextValue {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
});

export function useConsultationModal() {
  return useContext(ModalContext);
}

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}
