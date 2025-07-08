'use client';
import { Switch } from '@/components/ui/switch';
import { useInfoEquipmentDoor } from '@/hooks/modal/use-info-equipmet-door';
import { useState } from 'react';

const equipmentOptions = [
  {
    id: 1,
    name: 'Зламостійкість RC2',
    price: 200,
    currency: '€',
  },
  {
    id: 2,
    name: 'Чорний дизайн',
    price: 200,
    currency: '€',
  },
  {
    id: 3,
    name: 'Smart рішення',
    price: 200,
    currency: '€',
  },
  {
    id: 4,
    name: 'Мотажний комплект',
    price: 200,
    currency: '€',
  },
];

export default function DoorEquipment() {
  const [selected, setSelected] = useState(1);
  const { onOpen } = useInfoEquipmentDoor();

  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center">
        <h3 className="text-heading-sidebar font-inter font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Комплектація
        </h3>
      </div>
      <div className="mb-4 flex flex-col gap-4">
        {equipmentOptions.map((item) => (
          <div
            key={item.id}
            className="flex h-[52px] w-full items-center justify-between rounded-none border-none bg-white p-4"
          >
            <div className="flex flex-row items-center gap-x-2">
              <div
                className="border-accent flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border bg-white"
                onClick={() => onOpen()}
              >
                <span className="text-textDark font-inter font-bold">?</span>
              </div>
              <span className="font-inter text-textDark text-[14px] font-medium uppercase">
                {item.name}
              </span>
            </div>
            <div className="flex flex-row items-center gap-x-4">
              <span className="text-textDark text-base font-semibold">
                {item.currency}
                {item.price}
              </span>
              <Switch
                checked={selected === item.id}
                onCheckedChange={() => setSelected(item.id)}
                aria-label={`Выбрать комплектацию: ${item.name}`}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
