import { create } from 'zustand';

interface OpenSearchModalStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useOpenSearchModal = create<OpenSearchModalStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
