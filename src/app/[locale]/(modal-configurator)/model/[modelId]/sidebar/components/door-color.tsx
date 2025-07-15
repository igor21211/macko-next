'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import SelectCustom from '@/components/select-custom';
import { useGetColor } from '@/hooks/modal/api-hooks/color/useGetColor';
import DoorColorLoading from './loading-components/door-color-loading';
import { getImageSrc } from '@/lib/utils/useImageSrc';
//import { useTranslations } from "next-intl";

const colors = [
  { id: 1, name: 'ALUMINIUM', price: 1000 },
  { id: 2, name: 'HPL', price: 2000 },
];

const typeColors = [
  {
    value: 'grey',
    label: 'Сірий',
  },
  {
    value: 'white',
    label: 'Білий',
  },
  {
    value: 'black',
    label: 'Чорний',
  },
  {
    value: 'brown',
    label: 'Коричневий',
  },
  {
    value: 'red',
    label: 'Червоний',
  },
];

export default function DoorColor() {
  const [selected, setSelected] = useState(1);
  const [selectedInside, setSelectedInside] = useState(1);
  const [selectedOutside, setSelectedOutside] = useState(1);
  const [selectedTypeColor, setSelectedTypeColor] = useState('');
  const { data: furnitureColors, isLoading } = useGetColor();

  const handleSelect = (id: number) => {
    setSelected(id);
  };

  const handleSelectInside = (id: number) => {
    setSelectedInside(id);
  };

  const handleSelectOutside = (id: number) => {
    setSelectedOutside(id);
  };

  if (isLoading) return <DoorColorLoading />;

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
          <Button
            type="button"
            variant="ghost"
            className="text-accent hover:text-none h-auto cursor-pointer px-0 py-0 font-sans shadow-none hover:bg-transparent"
            onClick={() => {}}
          >
            У чому різниця?
          </Button>
        </div>
      </div>
      <div className="mb-4 grid min-h-[50px] grid-cols-2 gap-x-2">
        {colors.map((color) => (
          <Button
            variant="sidebar"
            key={color.id}
            className={cn(
              'h-full w-full',
              selected === Number(color.id) && 'border-accent border-2'
            )}
            onClick={() => handleSelect(Number(color.id))}
          >
            {color.name}
          </Button>
        ))}
      </div>
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <h3 className="text-textDark font-inter text-[14px] font-medium tracking-[0.06em] uppercase">
          Зсередини
        </h3>
        <SelectCustom
          value={selectedTypeColor}
          onChange={setSelectedTypeColor}
          content={typeColors}
          placeholder="Назва кольору"
          className="max-h-[31px] w-[170px] rounded-none border border-[#E2E7ED] text-[14px] font-normal focus:outline-none lg:w-[270px]"
          classNameContent="text-[14px] font-normal font-inter text-textDark lg:w-[270px] w-[170px] rounded-none border border-[#E2E7ED] bg-white p-0"
        />
      </div>

      <div className="mb-4 flex flex-wrap gap-x-2 gap-y-2">
        {furnitureColors?.map((color) => (
          <div
            key={color.id}
            className={cn(
              'relative h-[60px] w-[60px] cursor-pointer',
              selectedInside === Number(color.id) && 'border-accent border-2'
            )}
            onClick={() => handleSelectInside(Number(color.id))}
          >
            <Image
              key={color.id}
              src={getImageSrc(color.pattern_image)}
              alt={color.id.toString()}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <div className="mb-4 flex w-full flex-row items-center justify-between">
        <h3 className="text-textDark font-inter text-[14px] font-medium tracking-[0.06em] uppercase">
          Ззовні
        </h3>
        <SelectCustom
          value={selectedTypeColor}
          onChange={setSelectedTypeColor}
          content={typeColors}
          placeholder="Назва кольору"
          className="max-h-[31px] w-[170px] rounded-none border border-[#E2E7ED] text-[14px] font-normal focus:outline-none lg:w-[270px]"
          classNameContent="text-[14px] font-normal font-inter text-textDark lg:w-[270px] w-[170px] rounded-none border border-[#E2E7ED] bg-white p-0"
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-x-2 gap-y-2">
        {furnitureColors?.map((color) => (
          <div
            key={color.id}
            className={cn(
              'relative h-[60px] w-[60px] cursor-pointer',
              selectedOutside === Number(color.id) && 'border-accent border-2'
            )}
            onClick={() => handleSelectOutside(Number(color.id))}
          >
            <Image
              key={color.id}
              src={getImageSrc(color.pattern_image)}
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
