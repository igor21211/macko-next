'use client';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useMedia } from 'react-use';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export default function DoorSize() {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [touched, setTouched] = useState({ width: false, height: false });
  const isMobile = useMedia('(max-width: 580px)');
  const t = useTranslations('Sidebar');

  // Мок-валидация
  const widthNum = Number(width);
  const heightNum = Number(height);
  const widthError =
    touched.width && (!width || isNaN(widthNum) || widthNum <= 0 || widthNum > 1200)
      ? t('door_size.widthError')
      : '';
  const heightError =
    touched.height && (!height || isNaN(heightNum) || heightNum <= 0 || heightNum > 2300)
      ? t('door_size.heightError')
      : '';

  return (
    <section className="w-full border-b border-b-gray-200 px-6 pt-6 pb-10 shadow-sm">
      <div className="mb-4 flex flex-row items-center justify-between">
        <h3 className="text-heading-sidebar font-sans font-medium tracking-[0.06em] text-[#1A202C] uppercase">
          Розміри
        </h3>
        <Button
          type="button"
          variant="ghost"
          className="text-accent hover:text-none h-auto cursor-pointer px-0 py-0 font-sans shadow-none hover:bg-transparent"
        >
          Як виміряти?
        </Button>
      </div>
      <div
        className={cn(
          'flex min-h-[60px] w-full bg-white py-2 lg:w-[538px]',
          isMobile ? 'flex-col gap-y-6 px-6' : 'flex-row gap-x-4'
        )}
      >
        <div className="flex w-full flex-row items-center gap-x-2">
          <div className="relative min-h-[20px] min-w-[20px]">
            <Image
              src="/figma-images/height-form.svg"
              alt="width"
              fill
              className="object-contain"
            />
          </div>
          <label
            htmlFor="door-width"
            className="text-textDark font-inter mr-2 text-[14px] whitespace-nowrap"
          >
            Ширина:
          </label>
          <div
            className={cn(
              'relative flex flex-col',
              isMobile ? 'ml-auto w-[250px]' : 'max-w-[150px]'
            )}
          >
            <div className="flex flex-row items-center gap-x-2">
              <Input
                id="door-width"
                type="number"
                min={0}
                placeholder="1500"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, width: true }))}
                className="bg-background text-primary min-h-[36px] rounded-none !border-[#E6EAEF] text-base"
                aria-invalid={!!widthError}
              />
              <span className="text-textDark font-inter text-[14px]">mm</span>
            </div>

            {widthError && (
              <span className="text-danger absolute top-full left-0 mt-1 text-xs">
                {widthError}
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full flex-row items-center gap-x-2">
          <div className="relative min-h-[18px] min-w-[9px]">
            <Image
              src="/figma-images/width-form.svg"
              alt="height"
              fill
              className="object-contain"
            />
          </div>
          <label
            htmlFor="door-height"
            className="text-textDark font-inter mr-2 text-[14px] whitespace-nowrap"
          >
            Висота:
          </label>
          <div
            className={cn(
              'relative flex flex-col',
              isMobile ? 'ml-auto w-[250px]' : 'max-w-[150px]'
            )}
          >
            <div className="flex flex-row items-center gap-x-2">
              <Input
                id="door-height"
                type="number"
                min={0}
                placeholder="2100"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, height: true }))}
                className="bg-background text-primary min-h-[36px] rounded-none !border-[#E6EAEF] text-base"
                aria-invalid={!!heightError}
              />
              <span className="text-textDark font-inter text-[14px]">mm</span>
            </div>

            {heightError && (
              <span className="text-danger absolute top-full left-0 mt-1 text-xs">
                {heightError}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
