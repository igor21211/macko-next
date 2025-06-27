import { create } from 'zustand';

interface FullScreenStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useFullScreen = create<FullScreenStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));
