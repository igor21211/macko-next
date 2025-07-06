'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';

const side = [
  { id: 1, name: 'Ззовні' },
  { id: 2, name: 'Зсередини' },
];
const decor = [
  { id: 1, image: '/figma-images/decor-sidebar/decor-inox.png' },
  { id: 2, image: '/figma-images/decor-sidebar/decor-molding.png' },
  { id: 3, image: '/figma-images/decor-sidebar/decor-paz.png' },
  { id: 4, image: '/figma-images/decor-sidebar/decor-none.png' },
];

export default function DoorDecor() {
  const [selected, setSelected] = useState(1);
  const [selectedDecor, setSelectedDecor] = useState(1);

  const handleSelect = (id: number) => {
    setSelected(id);
  };

  const handleSelectDecor = (id: number) => {
    setSelectedDecor(id);
  };

  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Декор
        </h3>
        <Button
          type="button"
          variant="ghost"
          className="text-accent hover:text-none h-auto cursor-pointer px-0 py-0 font-sans shadow-none hover:bg-transparent"
        >
          У чому різниця?
        </Button>
      </div>
      <div className="mb-5 grid min-h-[50px] grid-cols-2 gap-x-2">
        {side.map((item) => (
          <Button
            variant="sidebar"
            key={item.id}
            className={cn(`h-full w-full ${selected === item.id && 'border-accent border-2'}`)}
            onClick={() => handleSelect(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="grid min-h-[128px] grid-cols-4 gap-x-2">
        {decor.map((item) => (
          <div
            key={item.id}
            className={cn(
              `relative h-full w-full cursor-pointer ${selectedDecor === item.id && 'border-accent border-2'}`
            )}
            onClick={() => handleSelectDecor(item.id)}
          >
            <Image src={item.image} alt={item.id.toString()} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
