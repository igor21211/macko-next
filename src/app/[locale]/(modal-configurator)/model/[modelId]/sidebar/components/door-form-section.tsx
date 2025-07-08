'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const forms = [
  { id: 1, img: '/figma-images/form-1.svg', alt: 'Форма 1' },
  { id: 2, img: '/figma-images/form-2.svg', alt: 'Форма 2' },
  { id: 3, img: '/figma-images/form-3.svg', alt: 'Форма 3' },
  { id: 4, img: '/figma-images/form-4.svg', alt: 'Форма 4' },
  { id: 5, img: '/figma-images/form-5.svg', alt: 'Форма 5' },
  { id: 6, img: '/figma-images/form-6.svg', alt: 'Форма 6' },
  { id: 7, img: '/figma-images/form-7.svg', alt: 'Форма 7' },
  { id: 8, img: '/figma-images/form-8.svg', alt: 'Форма 8' },
];

export default function DoorFormSection() {
  const [selected, setSelected] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, []);

  const handleScroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.offsetWidth / 2;
    el.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="h-[180px] w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-x-2">
        <h3 className="text-heading-sidebar mb-4 font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Форма дверей
        </h3>
        <div className="flex items-center justify-center gap-x-2">
          <button
            type="button"
            aria-label="Прокрутить влево"
            tabIndex={0}
            onClick={() => handleScroll('left')}
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
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            className={`focus-visible:ring-accent/60 h-[25px] w-[25px] cursor-pointer rounded-none border border-gray-200 bg-white p-1 shadow-none transition-opacity duration-150 focus-visible:ring-2 disabled:cursor-default disabled:opacity-40`}
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      </div>
      <div className="h-[240px] w-full">
        <div
          ref={scrollRef}
          className={cn('scrollbar-hide flex w-full gap-x-2 overflow-x-auto')}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {forms.map((item) => (
            <Button
              key={item.id}
              type="button"
              aria-label={item.alt}
              tabIndex={0}
              onClick={() => setSelected(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setSelected(item.id);
              }}
              className={`group relative flex aspect-[5/7] h-[200px] min-w-[90px] flex-1 cursor-pointer items-center justify-center rounded-none border-2 bg-white p-0 py-3 shadow-none transition-colors duration-100 hover:bg-white focus-visible:ring-2 focus-visible:outline-none lg:h-[70px] lg:w-[60px] ${selected === item.id ? 'border-accent' : 'border-transparent'} hover:border-accent/80 focus-visible:border-accent/80`}
            >
              <div className="relative h-[70px] w-full">
                <Image src={item.img} alt={item.alt} fill className="object-contain" />
              </div>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
