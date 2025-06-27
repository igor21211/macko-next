"use client"
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
    <section className="w-full px-6 pt-6 pb-4">
      <h3 className="font-sans text-heading-sidebar font-medium text-[#1A202C] uppercase mb-4 tracking-[0.06em]">
        Форма дверей
      </h3>
      <div
        className={cn(
          "flex gap-x-2 w-full",
          isMobile ? "overflow-x-auto flex-nowrap h-[60px]" : "flex-row"
        )}
      >
        {forms.map((item) => (
          <Button
            key={item.id}
            type="button"
            onClick={() => setSelected(item.id)}
            className={`w-[60px] h-[60px] flex-1 min-w-[60px] p-1 lg:p-2 bg-white rounded-none flex items-center justify-center border-2 transition-colors hover:bg-accent/10 duration-100 shadow-none relative cursor-pointer ${selected === item.id ? 'border-accent' : 'border-transparent'}`}
          >
            <div className="relative w-full h-full">
              <Image src={item.img} alt={item.alt} fill className="object-contain" />
            </div>
          </Button>
        ))}
      </div>
    </section>
  );
}