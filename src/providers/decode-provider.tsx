'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useDecode } from '@/hooks/modal/api-hooks/use-decode';
import { DecodeResponse } from '@/types';

interface DecodeContextType {
  decodedData: DecodeResponse | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const DecodeContext = createContext<DecodeContextType | undefined>(undefined);

interface DecodeProviderProps {
  children: ReactNode;
}

export const DecodeProvider = ({ children }: DecodeProviderProps) => {
  const { data: decodedData, isLoading, error, refetch } = useDecode();

  const value: DecodeContextType = {
    decodedData,
    isLoading,
    error: error as Error | null,
    refetch,
  };

  return <DecodeContext.Provider value={value}>{children}</DecodeContext.Provider>;
};

export const useDecodeContext = () => {
  const context = useContext(DecodeContext);
  if (context === undefined) {
    throw new Error('useDecodeContext must be used within a DecodeProvider');
  }
  return context;
};
