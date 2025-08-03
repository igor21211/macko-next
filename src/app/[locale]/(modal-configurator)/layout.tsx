import Header from '@/components/header';
import { Suspense } from 'react';
import { Providers } from '@/providers/providers';

export default function ModelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex h-full min-h-0 w-full flex-1">
        <Suspense>
          <Providers>{children}</Providers>
        </Suspense>
      </div>
    </div>
  );
}
