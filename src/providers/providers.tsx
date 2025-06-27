import { QueryProvider } from './query-provider';
import { ModalProviders } from './modal-providers';
import { SheetProviders } from './sheet-providers';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <ModalProviders />
      <SheetProviders />
      {children}
    </QueryProvider>
  );
}
