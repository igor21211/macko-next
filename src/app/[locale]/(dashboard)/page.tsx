import { Suspense } from 'react';
import MainPageContent from './MainPageContent';

export default function MainPage() {
  return (
    <Suspense>
      <MainPageContent />
    </Suspense>
  );
}
