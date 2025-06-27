import { create } from 'zustand';

interface CostConfigurationStore {
  openCostConfiguration: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCostConfiguration = create<CostConfigurationStore>((set) => ({
  openCostConfiguration: false,
  onOpen: () => set({ openCostConfiguration: true }),
  onClose: () => set({ openCostConfiguration: false }),
}));
