import Header from '@/components/header';
import { Suspense } from 'react';

export default function ModelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
       <Header />
      <div className="flex flex-1 min-h-0 w-full h-full">
        <Suspense>
          {children}
        </Suspense>
      </div>
    </div>
  );
}
