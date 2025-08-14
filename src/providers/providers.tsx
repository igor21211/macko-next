'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProviders } from './modal-providers';
import { SheetProviders } from './sheet-providers';
import { ReactNode, useState } from 'react';
import { Toaster } from 'sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SideProvider } from './side-provider';
import { DecodeProvider } from './decode-provider';
import { SvgProvider } from './svg-provider';

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <SideProvider>
        <DecodeProvider>
          <SvgProvider>
            <ModalProviders />
            <SheetProviders />
            <Toaster />
            <ReactQueryDevtools initialIsOpen={true} />
            {children}
          </SvgProvider>
        </DecodeProvider>
      </SideProvider>
    </QueryClientProvider>
  );
}
