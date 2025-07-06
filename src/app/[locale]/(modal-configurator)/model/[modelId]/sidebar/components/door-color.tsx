'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
//import { useTranslations } from "next-intl";

const colors = [
  { id: 1, name: 'ALUMINIUM', price: 1000 },
  { id: 2, name: 'HPL', price: 2000 },
];

const insideColors = [
  { id: 1, image: '/figma-images/side-bar-colors/color-1.png' },
  { id: 2, image: '/figma-images/side-bar-colors/color-2.png' },
  { id: 3, image: '/figma-images/side-bar-colors/color-3.png' },
  { id: 4, image: '/figma-images/side-bar-colors/color-4.png' },
  { id: 5, image: '/figma-images/side-bar-colors/color-5.png' },
  { id: 6, image: '/figma-images/side-bar-colors/color-6.png' },
  { id: 7, image: '/figma-images/side-bar-colors/color-7.png' },
  { id: 8, image: '/figma-images/side-bar-colors/color-8.png' },
  { id: 9, image: '/figma-images/side-bar-colors/color-9.png' },
  { id: 10, image: '/figma-images/side-bar-colors/color-10.png' },
  { id: 11, image: '/figma-images/side-bar-colors/color-11.png' },
  { id: 12, image: '/figma-images/side-bar-colors/color-12.png' },
  { id: 13, image: '/figma-images/side-bar-colors/color-13.png' },
  { id: 14, image: '/figma-images/side-bar-colors/color-14.png' },
  { id: 15, image: '/figma-images/side-bar-colors/color-15.png' },
  { id: 16, image: '/figma-images/side-bar-colors/color-16.png' },
  { id: 17, image: '/figma-images/side-bar-colors/color-17.png' },
  { id: 18, image: '/figma-images/side-bar-colors/color-18.png' },
  { id: 19, image: '/figma-images/side-bar-colors/color-19.png' },
  { id: 20, image: '/figma-images/side-bar-colors/color-20.png' },
];

const outsideColors = [
  { id: 1, image: '/figma-images/side-bar-colors/color-1.png' },
  { id: 2, image: '/figma-images/side-bar-colors/color-2.png' },
  { id: 3, image: '/figma-images/side-bar-colors/color-3.png' },
  { id: 4, image: '/figma-images/side-bar-colors/color-4.png' },
  { id: 5, image: '/figma-images/side-bar-colors/color-5.png' },
  { id: 6, image: '/figma-images/side-bar-colors/color-6.png' },
  { id: 7, image: '/figma-images/side-bar-colors/color-7.png' },
  { id: 8, image: '/figma-images/side-bar-colors/color-8.png' },
  { id: 9, image: '/figma-images/side-bar-colors/color-9.png' },
  { id: 10, image: '/figma-images/side-bar-colors/color-10.png' },
  { id: 11, image: '/figma-images/side-bar-colors/color-11.png' },
  { id: 12, image: '/figma-images/side-bar-colors/color-12.png' },
  { id: 13, image: '/figma-images/side-bar-colors/color-13.png' },
  { id: 14, image: '/figma-images/side-bar-colors/color-14.png' },
  { id: 15, image: '/figma-images/side-bar-colors/color-15.png' },
  { id: 16, image: '/figma-images/side-bar-colors/color-16.png' },
  { id: 17, image: '/figma-images/side-bar-colors/color-17.png' },
  { id: 18, image: '/figma-images/side-bar-colors/color-18.png' },
  { id: 19, image: '/figma-images/side-bar-colors/color-19.png' },
  { id: 20, image: '/figma-images/side-bar-colors/color-20.png' },
];

export default function DoorColor() {
  const [selected, setSelected] = useState(1);
  const [selectedInside, setSelectedInside] = useState(1);
  const [selectedOutside, setSelectedOutside] = useState(1);
  //const t = useTranslations('Sidebar');

  const handleSelect = (id: number) => {
    setSelected(id);
  };

  const handleSelectInside = (id: number) => {
    setSelectedInside(id);
  };

  const handleSelectOutside = (id: number) => {
    setSelectedOutside(id);
  };

  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
            Колір
          </h3>
          <Button
            type="button"
            variant="ghost"
            className="text-accent hover:text-none h-auto cursor-pointer px-0 py-0 font-sans shadow-none hover:bg-transparent"
          >
            Розширені налаштування
          </Button>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <Label htmlFor="black-edition" className="text-primary font-sans text-[14px] font-medium">
            Black Edition
          </Label>
          <Switch id="black-edition" />
        </div>
      </div>
      <div className="mb-4 grid min-h-[50px] grid-cols-2 gap-x-2">
        {colors.map((color) => (
          <Button
            variant="sidebar"
            key={color.id}
            className={cn('h-full w-full', selected === color.id && 'border-accent border-2')}
            onClick={() => handleSelect(color.id)}
          >
            {color.name}
          </Button>
        ))}
      </div>
      <h3 className="text-heading-sidebar text-textDark mb-4 font-sans font-medium tracking-[0.06em] uppercase">
        Внутрішній колір
      </h3>
      <div className="mb-4 flex flex-wrap gap-x-2 gap-y-2">
        {insideColors.map((color) => (
          <div
            key={color.id}
            className={cn(
              'relative h-[60px] w-[60px] cursor-pointer',
              selectedInside === color.id && 'border-accent border-2'
            )}
            onClick={() => handleSelectInside(color.id)}
          >
            <Image
              key={color.id}
              src={color.image}
              alt={color.id.toString()}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <h3 className="text-heading-sidebar text-textDark mb-4 font-sans font-medium tracking-[0.06em] uppercase">
        Зовнішній колір
      </h3>
      <div className="mb-4 flex flex-wrap gap-x-2 gap-y-2">
        {outsideColors.map((color) => (
          <div
            key={color.id}
            className={cn(
              'relative h-[60px] w-[60px] cursor-pointer',
              selectedOutside === color.id && 'border-accent border-2'
            )}
            onClick={() => handleSelectOutside(color.id)}
          >
            <Image
              key={color.id}
              src={color.image}
              alt={color.id.toString()}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
