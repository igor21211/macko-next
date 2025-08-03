'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useScrollByArrow } from '@/lib/utils/useScrollByArrow';
import { useGetFurniture } from '@/hooks/modal/api-hooks/furniture/useGetFurniture';
import DoorFurnitureSectionLoading from './loading-components/door-furniture-section-loading';
import { getImageSrc } from '@/lib/utils/useImageSrc';
import { useSideContext } from '@/providers/side-provider';
import { useDecodeContext } from '@/providers/decode-provider';
import { usePostFurniture } from '@/hooks/modal/api-hooks/furniture/usePostFurniture';
import { useTranslations } from 'next-intl';

const furnitureColors = [
  { id: '1', image: '/figma-images/side-bar-colors/color-1.png' },
  { id: '2', image: '/figma-images/side-bar-colors/color-2.png' },
  { id: '3', image: '/figma-images/side-bar-colors/color-3.png' },
  { id: '4', image: '/figma-images/side-bar-colors/color-4.png' },
  { id: '5', image: '/figma-images/side-bar-colors/color-5.png' },
  { id: '6', image: '/figma-images/side-bar-colors/color-6.png' },
  { id: '7', image: '/figma-images/side-bar-colors/color-7.png' },
  { id: '8', image: '/figma-images/side-bar-colors/color-8.png' },
  { id: '9', image: '/figma-images/side-bar-colors/color-9.png' },
  { id: '10', image: '/figma-images/side-bar-colors/color-10.png' },
  { id: '11', image: '/figma-images/side-bar-colors/color-11.png' },
  { id: '12', image: '/figma-images/side-bar-colors/color-12.png' },
  { id: '13', image: '/figma-images/side-bar-colors/color-13.png' },
  { id: '14', image: '/figma-images/side-bar-colors/color-14.png' },
  { id: '15', image: '/figma-images/side-bar-colors/color-15.png' },
  { id: '16', image: '/figma-images/side-bar-colors/color-16.png' },
  { id: '17', image: '/figma-images/side-bar-colors/color-17.png' },
  { id: '18', image: '/figma-images/side-bar-colors/color-18.png' },
  { id: '19', image: '/figma-images/side-bar-colors/color-19.png' },
  { id: '20', image: '/figma-images/side-bar-colors/color-20.png' },
];

export default function DoorFurniture() {
  const t = useTranslations('DoorFurniture');
  const { data: furniture, isLoading } = useGetFurniture();
  const { mutate: updateFurniture } = usePostFurniture();
  const { decodedData } = useDecodeContext();
  const { inside, onOpenInside, onOpenOutside } = useSideContext();
  const activeSide = inside ? 2 : 1;
  const activeFurniture = decodedData?.furniture[inside ? 'inside' : 'outside'];

  const side = [
    { id: 1, name: t('outside'), side: 'outside' },
    { id: 2, name: t('inside'), side: 'inside' },
  ];

  const [selectedColor, setSelectedColor] = useState<string>('1');
  const sizeScrollRef = useRef<HTMLDivElement>(null);
  const colorScrollRef = useRef<HTMLDivElement>(null);
  const {
    canScrollLeft: canScrollLeftSize,
    canScrollRight: canScrollRightSize,
    handleScrollLeft: handleSizeScrollLeft,
    handleScrollRight: handleSizeScrollRight,
  } = useScrollByArrow<HTMLDivElement>(sizeScrollRef);

  const {
    canScrollLeft: canScrollLeftColor,
    canScrollRight: canScrollRightColor,
    handleScrollLeft: handleColorScrollLeft,
    handleScrollRight: handleColorScrollRight,
  } = useScrollByArrow<HTMLDivElement>(colorScrollRef);

  const handleSelectColor = (id: string) => {
    setSelectedColor(id);
  };

  const furnitureItems = useMemo(() => {
    return furniture?.flatMap((item) =>
      item.items.map((furn) => ({
        id: String(furn.id),
        image: furn.image_png,
        name: furn.title,
        items: furn.subitems,
      }))
    );
  }, [furniture]);

  const activeFurnitureItem = useMemo(() => {
    return furnitureItems?.find((item) => item.id === activeFurniture?.items[0].id);
  }, [furnitureItems, activeFurniture]);

  // Получить размеры только для выбранной ручки
  const allFurnitureSizes: { id: string; title: string }[] = useMemo(() => {
    if (!activeFurnitureItem) return [];
    return (
      activeFurnitureItem?.items
        .filter((sub) => String(sub.title) !== 'Push')
        .map((sub) => {
          let title = String(sub.title);
          if (title.includes('mm')) {
            title = title.slice(0, title.indexOf('mm') + 2).trim();
          }
          return { id: String(sub.id), title };
        }) || []
    );
  }, [activeFurnitureItem]);
  const selectedFurnitureSize = useMemo(() => {
    return allFurnitureSizes.find((item) => item.id === activeFurniture?.items[0].subitems[0].id);
  }, [allFurnitureSizes, activeFurniture]);

  if (isLoading) return <DoorFurnitureSectionLoading />;

  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-4 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between lg:mb-6">
        <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Фурнітура
        </h3>
      </div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-col items-start">
          <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
            Ручка
          </h3>
        </div>
        <div className="flex flex-row items-center gap-x-2">
          <Label
            htmlFor="black-edition-furniture"
            className="text-primary font-sans text-[14px] font-medium"
          >
            Black Edition
          </Label>
          <Switch id="black-edition-furniture" />
        </div>
      </div>
      <div className="mb-5 grid min-h-[50px] grid-cols-2 gap-x-2">
        {side.map((item) => (
          <Button
            variant="sidebar"
            key={item.id}
            className={cn('h-full w-full', activeSide === item.id && 'border-accent border-2')}
            onClick={() => {
              if (item.id === 1) {
                onOpenOutside();
              } else {
                onOpenInside();
              }
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className="mb-4 grid min-h-[100px] [grid-auto-rows:130px] grid-cols-5 gap-x-2 gap-y-2">
        {furnitureItems?.map((item) => (
          <div
            key={item.id}
            className="flex h-full w-full cursor-pointer flex-col items-center"
            onClick={() => updateFurniture(item.items[0].id, inside ? 'inside' : 'outside')}
          >
            <div
              className={cn(
                'relative aspect-square h-full w-full',
                String(activeFurniture?.items[0].id) === item.id && 'border-accent border-2'
              )}
            >
              <Image
                src={getImageSrc(item.image)}
                alt={item.id.toString()}
                fill
                className="object-cover"
              />
            </div>
            <Label className="text-textLight mt-2 w-full justify-center text-center font-sans">
              {item.name}
            </Label>
          </div>
        ))}
      </div>
      {/* Размеры */}
      {allFurnitureSizes.length > 0 && (
        <>
          <div className="mb-4 flex flex-row items-center justify-between">
            <h3 className="text-primary font-sans text-[14px] font-medium">Розмір</h3>
            <div className="flex flex-row items-center gap-x-2">
              <ChevronLeftIcon
                size={25}
                className="text-primary cursor-pointer"
                onClick={handleSizeScrollLeft}
                style={{ color: canScrollLeftSize ? 'var(--accent)' : '#D1D5DB' }}
                aria-label="Скролл влево"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSizeScrollLeft();
                }}
              />
              <ChevronRightIcon
                size={25}
                className="cursor-pointer"
                style={{ color: canScrollRightSize ? 'var(--accent)' : '#D1D5DB' }}
                onClick={handleSizeScrollRight}
                aria-label="Скролл вправо"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleSizeScrollRight();
                }}
              />
            </div>
          </div>
          <div
            ref={sizeScrollRef}
            className="scrollbar-hide min-w-[600px] overflow-x-auto overflow-y-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            <div className="mb-4 grid auto-cols-[100px] grid-flow-col gap-x-3">
              {allFurnitureSizes.map((item) => {
                const idStr = String(item.id);

                return (
                  <div
                    key={idStr}
                    className={cn(
                      'flex h-full w-full min-w-[100px] flex-col items-center',
                      selectedFurnitureSize?.id === idStr && 'border-accent border-3'
                    )}
                    onClick={() => updateFurniture(item.id, inside ? 'inside' : 'outside')}
                  >
                    <Label className="text-primary w-full cursor-pointer justify-center border-none bg-white pt-2 pb-2 text-center font-sans text-[14px] font-medium">
                      {item.title}
                    </Label>
                  </div>
                );
              })}
              <div className="min-w-[4px]" aria-hidden="true" />
            </div>
          </div>
        </>
      )}
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-primary font-sans text-[14px] font-medium">Колір</h3>
        <div className="flex flex-row items-center gap-x-2">
          <ChevronLeftIcon
            size={25}
            className="text-primary cursor-pointer"
            onClick={handleColorScrollLeft}
            style={{ color: canScrollLeftColor ? 'var(--accent)' : '#D1D5DB' }}
            aria-label="Скролл влево"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleColorScrollLeft();
            }}
          />
          <ChevronRightIcon
            size={25}
            className="cursor-pointer"
            style={{ color: canScrollRightColor ? 'var(--accent)' : '#D1D5DB' }}
            onClick={handleColorScrollRight}
            aria-label="Скролл вправо"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleColorScrollRight();
            }}
          />
        </div>
      </div>
      <div
        ref={colorScrollRef}
        className="scrollbar-hide min-w-[600px] overflow-x-auto overflow-y-hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="mb-4 grid min-h-[60px] auto-cols-[60px] grid-flow-col gap-x-2">
          {furnitureColors.map((item) => (
            <div
              key={item.id}
              className={cn(
                'relative flex h-full w-full min-w-[60px] cursor-pointer flex-col items-center',
                selectedColor === item.id && 'border-accent border-3'
              )}
              onClick={() => handleSelectColor(item.id)}
            >
              <Image src={item.image} alt={item.id.toString()} fill className="object-cover" />
            </div>
          ))}
          <div className="min-w-[4px]" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
