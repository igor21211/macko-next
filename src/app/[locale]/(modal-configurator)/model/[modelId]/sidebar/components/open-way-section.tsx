'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';
import { useMedia } from 'react-use';
import { cn } from '@/lib/utils';
import { useGetView } from '@/hooks/modal/api-hooks/view/useGetView';
import OpenWaySectionSkeleton from './loading-components/open-way-section-loading';
import { getImageSrc } from '@/lib/utils/useImageSrc';

export default function OpenWaySection() {
  const { data: view, isLoading } = useGetView();
  const [id, setId] = useState(1);
  const isMobile = useMedia('(max-width: 580px)');
  const handleClick = (id: number) => {
    setId(id);
  };

  if (isLoading) return <OpenWaySectionSkeleton />;

  return (
    <section className="w-full border-b border-b-gray-200 px-6 py-4 shadow-sm">
      <h3 className="font-inter mb-4 text-[18px] leading-[1.21] font-medium tracking-[0.06em] text-[#1A202C] uppercase">
        Напрямок відкривання
      </h3>
      <div
        className={cn(
          'flex w-full gap-2',
          isMobile
            ? 'scrollbar-hide h-[60px] max-w-[600px] overflow-x-auto px-2'
            : 'mx-auto max-w-[537px] justify-center px-6'
        )}
        style={isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
      >
        {view?.map((item, idx) => (
          <Button
            key={idx}
            className={cn(
              'hover:bg-accent/10 focus-visible:ring-accent/60 flex h-[60px] w-[128px] flex-shrink-0 cursor-pointer flex-col items-center justify-center rounded-none border bg-white shadow-none transition-colors focus-visible:ring-2 focus-visible:outline-none',
              id === item.id ? 'border-accent border-2' : 'border-[#E2E7ED]'
            )}
            onClick={() => handleClick(item.id)}
          >
            <div className="flex h-full w-full flex-row items-center gap-2">
              <div className="relative flex h-[40px] w-[40px] items-center justify-center">
                <Image
                  src={getImageSrc(item.image)}
                  alt="direction"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="font-inter flex flex-1 items-center text-left text-[12px] leading-[1.21] font-medium text-[#718096]">
                {item.title}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
}
