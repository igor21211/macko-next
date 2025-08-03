import { useSide } from '@/hooks/modal/use-side';
import { createContext, useContext, ReactNode } from 'react';

interface SideStore {
  inside: boolean;
  outside: boolean;
  onOpenInside: () => void;
  onOpenOutside: () => void;
}

const SideContext = createContext<SideStore | undefined>(undefined);

export const SideProvider = ({ children }: { children: ReactNode }) => {
  const { inside, outside, onOpenInside, onOpenOutside } = useSide();
  return (
    <SideContext.Provider value={{ inside, outside, onOpenInside, onOpenOutside }}>
      {children}
    </SideContext.Provider>
  );
};

export const useSideContext = () => {
  const context = useContext(SideContext);
  if (!context) {
    throw new Error('useSideContext must be used within a SideProvider');
  }
  return context;
};
