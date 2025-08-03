'use client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Image from 'next/image';
import SelectCustom from '@/components/select-custom';
import { useGetColor } from '@/hooks/modal/api-hooks/color/useGetColor';
import { usePostColor } from '@/hooks/modal/api-hooks/color/usePostColor';
import DoorColorLoading from './loading-components/door-color-loading';
import { getImageSrc } from '@/lib/utils/useImageSrc';
import { useDecode } from '@/hooks/modal/api-hooks/use-decode';
//import { useTranslations } from "next-intl";

const colors = [
  { id: 1, name: 'HPL', price: 2000 },
  { id: 2, name: 'ALUMINIUM', price: 1000 },
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
  const { data: decode } = useDecode();
  const activeColorInside = decode?.colors.inside.id;
  const activeColorOutside = decode?.colors.outside.id;
  const selectAluminium = decode?.colors.inside.is_alu === '1' ? 2 : 1;

  const [selectedTypeColor, setSelectedTypeColor] = useState('');
  const { data: furnitureColors, isLoading } = useGetColor();
  const { mutate: updateColor, isPending } = usePostColor();

  const loading = isPending || isLoading;
  const handleSelectColor = (id: number) => {
    const selectedColor = furnitureColors?.find((color) => color.id === id.toString());
    if (selectedColor) {
      updateColor(selectedColor);
    }
  };

  if (loading) return <DoorColorLoading />;

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
              selectAluminium === color.id ? 'border-accent border-2' : 'border-transparent'
            )}
            onClick={() => {}}
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
        {furnitureColors?.map((color) => {
          const src = getImageSrc(color.pattern_image);
          return (
            <div
              key={color.id}
              className={cn(
                'relative h-[60px] w-[60px] cursor-pointer',
                activeColorInside === color.id && 'border-accent border-2'
              )}
              onClick={() => handleSelectColor(Number(color.id))}
              tabIndex={0}
              aria-label={`Выбрать цвет изнутри: ${color.id}`}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleSelectColor(Number(color.id));
              }}
            >
              {src ? (
                <Image
                  key={color.id}
                  src={src}
                  alt={`Цвет изнутри ${color.id}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                  Нет изображения
                </div>
              )}
            </div>
          );
        })}
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
        {furnitureColors?.map((color) => {
          const src = getImageSrc(color.pattern_image);
          return (
            <div
              key={color.id}
              className={cn(
                'relative h-[60px] w-[60px] cursor-pointer',
                activeColorOutside === color.id && 'border-accent border-2'
              )}
              onClick={() => handleSelectColor(Number(color.id))}
              tabIndex={0}
              aria-label={`Выбрать цвет снаружи: ${color.id}`}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleSelectColor(Number(color.id));
              }}
            >
              {src ? (
                <Image
                  key={color.id}
                  src={src}
                  alt={`Цвет снаружи ${color.id}`}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                  Нет изображения
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
