import { create } from "zustand";

interface useProModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useModal = create<useProModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
