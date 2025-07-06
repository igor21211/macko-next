'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useMedia } from 'react-use';
import { cn } from '@/lib/utils';

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
  const isMobile = useMedia('(max-width: 580px)');
  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <h3 className="text-heading-sidebar mb-4 font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
        Форма дверей
      </h3>
      <div
        className={cn(
          'flex w-full gap-x-2',
          isMobile ? 'scrollbar-hide h-[60px] flex-nowrap overflow-x-auto px-2' : 'flex-row'
        )}
        style={isMobile ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}}
      >
        {forms.map((item) => (
          <Button
            key={item.id}
            type="button"
            onClick={() => setSelected(item.id)}
            className={`hover:bg-accent/10 relative flex h-[60px] w-[60px] min-w-[60px] flex-1 cursor-pointer items-center justify-center rounded-none border-2 bg-white p-1 shadow-none transition-colors duration-100 lg:p-2 ${selected === item.id ? 'border-accent' : 'border-transparent'}`}
          >
            <div className="relative h-full w-full">
              <Image src={item.img} alt={item.alt} fill className="object-contain" />
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
}
