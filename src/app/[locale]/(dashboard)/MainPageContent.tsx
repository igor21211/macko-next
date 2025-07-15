'use client';
import HeaderDashboard from './components/header-dashboard';
import DoorList from './components/door-list';
//import { useSearchParams } from 'next/navigation';
import { useGetModals } from '@/hooks/dashboard/api-hooks/useGetModals';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function MainPageContent() {
  const { data: cards, isLoading, error } = useGetModals();
  console.log(error);
  useEffect(() => {
    if (error) {
      toast.error('Ошибка загрузки данных: ' + error.message);
    }
  }, [error]);


  return (
    <div className="bg-background flex min-h-screen flex-col">
      <HeaderDashboard />
      <div className="relative w-full flex-1">
        <div
          className="pointer-events-none absolute inset-0 select-none"
          style={{
            backgroundImage: 'url(/figma-images/backgrounded.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.8,
            zIndex: 0,
          }}
        />
        <div className="relative z-10">
          <main className="flex flex-col items-center justify-center py-12">
            <DoorList cards={cards!} isLoading={isLoading} />
          </main>
        </div>
      </div>
    </div>
  );
}
