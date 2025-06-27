import { create } from 'zustand';

interface OpenModalFiltersStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useOpenModalFilters = create<OpenModalFiltersStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
