'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useMoveMouse } from '@/lib/utils/useMoveMouse';
import { useScrollByArrow } from '@/lib/utils/useScrollByArrow';
import DoorFormSectionLoading from './loading-components/door-form-section-loading';
import { useGetShape } from '@/hooks/modal/api-hooks/shape/useGetShape';
import { getImageSrc } from '@/lib/utils/useImageSrc';

export default function DoorFormSection() {
  const { data: forms, isLoading } = useGetShape();
  const [selected, setSelected] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isDragging, handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave } =
    useMoveMouse<HTMLDivElement>(scrollRef);
  const { canScrollLeft, canScrollRight, handleScrollLeft, handleScrollRight } =
    useScrollByArrow<HTMLDivElement>(scrollRef);

  if (isLoading) return <DoorFormSectionLoading />;

  return (
    <section className="h-[200px] w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-x-2">
        <h3 className="text-heading-sidebar mb-4 font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Форма дверей
        </h3>
        <div className="flex items-center justify-center gap-x-2">
          <button
            type="button"
            aria-label="Прокрутить влево"
            tabIndex={0}
            onClick={handleScrollLeft}
            disabled={!canScrollLeft}
            className={`focus-visible:ring-accent/60 hover:bg-accent/10 h-[25px] w-[25px] cursor-pointer rounded-none border border-gray-200 bg-white p-1 shadow-none transition-opacity duration-150 focus-visible:ring-2 disabled:cursor-default disabled:opacity-40`}
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          {/* Правая стрелка */}
          <button
            type="button"
            aria-label="Прокрутить вправо"
            tabIndex={0}
            onClick={handleScrollRight}
            disabled={!canScrollRight}
            className={`focus-visible:ring-accent/60 hover:bg-accent/10 h-[25px] w-[25px] cursor-pointer rounded-none border border-gray-200 bg-white p-1 shadow-none transition-opacity duration-150 focus-visible:ring-2 disabled:cursor-default disabled:opacity-40`}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
      <div className="h-[70%] w-full">
        <div
          ref={scrollRef}
          className={cn(
            'scrollbar-hide flex h-full w-full gap-x-2 overflow-x-auto',
            isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
          )}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          role="list"
          aria-label="Список форм дверей"
        >
          {forms?.map((item) => {
            const imageSrc = getImageSrc(item.image_svg);
            return (
              <Button
                key={item.id}
                type="button"
                aria-label={item.title}
                tabIndex={0}
                onClick={() => setSelected(Number(item.id))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelected(Number(item.id));
                }}
                className={`group relative flex aspect-[5/7] h-full min-w-[90px] flex-1 cursor-pointer items-center justify-center rounded-none border-none bg-white p-0 py-3 shadow-none transition-colors duration-100 hover:bg-white focus-visible:ring-2 focus-visible:outline-none lg:h-[70px] lg:w-[60px] ${selected === Number(item.id) ? 'border-accent' : 'border-transparent'} hover:border-accent/80 focus-visible:border-accent/80`}
              >
                <div className="relative h-[90px] w-full lg:h-[70px]">
                  <Image src={imageSrc} alt={item.title} fill className="object-contain" />
                </div>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
