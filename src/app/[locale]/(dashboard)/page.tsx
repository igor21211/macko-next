import { Suspense } from 'react';
import MainPageContent from './MainPageContent';
import { Providers } from '@/providers/providers';

export default function MainPage() {
  return (
    <Suspense>
      <Providers>
        <MainPageContent />
      </Providers>
    </Suspense>
  );
}
