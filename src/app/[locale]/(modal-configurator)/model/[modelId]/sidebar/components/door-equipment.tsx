'use client';
import { Button } from '@/components/ui/button';
import { useInfoEquipmentDoor } from '@/hooks/modal/use-info-equipmet-door';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const equipment = [
  { id: 1, name: 'Економ', price: 1000 },
  { id: 2, name: 'Стандарт', price: 2000 },
  { id: 3, name: 'Супер', price: 3000 },
];

export default function DoorEquipment() {
  const [selected, setSelected] = useState(1);
  const { onOpen } = useInfoEquipmentDoor();

  const handleSelect = (id: number) => {
    setSelected(id);
  };

  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Комплектація
        </h3>
        <Button
          type="button"
          variant="ghost"
          className="text-accent hover:text-none h-auto cursor-pointer px-0 py-0 font-sans shadow-none hover:bg-transparent"
          onClick={() => onOpen()}
        >
          У чому різниця?
        </Button>
      </div>
      <div className="grid min-h-[50px] grid-cols-3 gap-x-2">
        {equipment.map((item) => (
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
    </section>
  );
}
