import { create } from 'zustand';

interface SideStore {
  inside: boolean;
  outside: boolean;
  onOpenInside: () => void;
  onOpenOutside: () => void;
}

export const useSide = create<SideStore>((set) => ({
  inside: false,
  outside: true,
  onOpenInside: () => set({ inside: true, outside: false }),
  onOpenOutside: () => set({ outside: true, inside: false }),
}));
