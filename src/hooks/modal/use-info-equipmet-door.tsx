import { create } from 'zustand';

interface InfoEquipmentDoorStore {
  openInfoEquipmentDoor: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useInfoEquipmentDoor = create<InfoEquipmentDoorStore>((set) => ({
  openInfoEquipmentDoor: false,
  onOpen: () => set({ openInfoEquipmentDoor: true }),
  onClose: () => set({ openInfoEquipmentDoor: false }),
}));