'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useGetGlass } from '@/hooks/modal/api-hooks/glass/useGetGlass';
import DoorGlassSectionLoading from './loading-components/door-glass-section-loading';
import { getImageSrc } from '@/lib/utils/useImageSrc';

const types = [
  { id: 1, name: 'Звичайне' },
  { id: 2, name: 'з малюнком' },
];

export default function DoorGlass() {
  const [selectedGlass, setSelectedGlass] = useState(1);
  const [selectedType, setSelectedType] = useState(1);
  const { data: glass, isLoading } = useGetGlass();

  const handleSelectType = (id: number) => {
    setSelectedType(id);
  };

  const handleSelectGlass = (id: number) => {
    setSelectedGlass(id);
  };

  if (isLoading) return <DoorGlassSectionLoading />;

  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
            Скло
          </h3>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <Label htmlFor="safe-glass" className="text-primary font-sans text-[14px] font-medium">
            Безпечне скло
          </Label>
          <Switch id="safe-glass" />
        </div>
      </div>
      <div className="mb-5 grid min-h-[50px] grid-cols-2 gap-x-2">
        {types.map((item) => (
          <Button
            variant="sidebar"
            key={item.id}
            className={cn(`h-full w-full ${selectedType === item.id && 'border-accent border-2'}`)}
            onClick={() => handleSelectType(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="mb-4 grid min-h-[128px] [grid-auto-rows:128px] grid-cols-4 gap-x-2 gap-y-2 pb-4">
        {glass?.map((image) => (
          <div
            key={image.id}
            className={cn(
              'relative h-full w-full cursor-pointer',
              selectedGlass === Number(image.id) && 'border-accent border-3'
            )}
            onClick={() => handleSelectGlass(Number(image.id))}
          >
            <Image
              key={image.id}
              src={getImageSrc(image.image_png)}
              alt={image.title}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
