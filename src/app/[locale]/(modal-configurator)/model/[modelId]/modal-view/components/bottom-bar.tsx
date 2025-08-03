'use client';

import { useFullScreen } from '@/hooks/modal/use-full-screen';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useMedia } from 'react-use';
import { useSideContext } from '@/providers/side-provider';
import { useState } from 'react';

export const BottomBar = () => {
  const t = useTranslations('ModalView.bottom_bar');
  const { inside, outside, onOpenInside, onOpenOutside } = useSideContext();
  const [isActiveSizes, setIsActiveSizes] = useState(false);
  const { open, onOpen, onClose } = useFullScreen();
  const isMobile = useMedia('(max-width: 1234px)');

  const handleOpenFullScreen = () => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }

    // Добавляем небольшую задержку для обновления состояния
    setTimeout(() => {
      // Вызываем событие resize для принудительного обновления компонентов
      window.dispatchEvent(new Event('resize'));
    }, 50);
  };

  return (
    <div className="absolute bottom-0 left-0 flex w-full justify-between p-[45px] lg:p-[30px]">
      {/* Кнопки навигации */}
      <div className="z-50 flex flex-col gap-2 lg:flex-row">
        <button
          className={cn(
            'bg-primary/80 flex cursor-pointer items-center justify-center rounded-full',
            outside && 'bg-accent text-primary',
            isMobile ? 'h-[50px] w-[50px]' : 'h-[69px] w-[69px]'
          )}
          onClick={onOpenOutside}
        >
          <Image
            src="/figma-images/modal-view/outside-view.svg"
            alt={t('outside_view')}
            width={isMobile ? 20 : 28}
            height={isMobile ? 20 : 36}
          />
        </button>
        <button
          className={cn(
            'bg-primary/80 flex cursor-pointer items-center justify-center rounded-full',
            inside && 'bg-accent',
            isMobile ? 'h-[50px] w-[50px]' : 'h-[69px] w-[69px]'
          )}
          onClick={onOpenInside}
        >
          <Image
            src="/figma-images/modal-view/inside-view.svg"
            alt={t('inside_view')}
            width={isMobile ? 20 : 28}
            height={isMobile ? 20 : 36}
          />
        </button>
      </div>

      {/* Инструменты */}
      <div className="z-50 flex flex-col gap-2 lg:flex-row">
        <button
          className={cn(
            'bg-primary/80 hover:bg-accent/80 flex cursor-pointer items-center justify-center rounded-full transition-all duration-300',
            isActiveSizes && 'bg-accent',
            isMobile ? 'h-[50px] w-[50px]' : 'h-[69px] w-[69px]'
          )}
          onClick={() => setIsActiveSizes(!isActiveSizes)}
        >
          <Image
            src="/figma-images/modal-view/show-sizes.svg"
            alt={t('show_sizes')}
            width={isMobile ? 20 : 25}
            height={isMobile ? 20 : 26}
          />
        </button>
        <button
          className={cn(
            'bg-primary/80 hover:bg-accent/80 flex cursor-pointer items-center justify-center rounded-full transition-all duration-300',
            open && 'bg-accent',
            isMobile ? 'h-[50px] w-[50px]' : 'h-[69px] w-[69px]'
          )}
          onClick={handleOpenFullScreen}
        >
          <Image
            src="/figma-images/modal-view/full-screen.svg"
            alt={t('full_screen')}
            width={isMobile ? 20 : 24}
            height={isMobile ? 20 : 24}
          />
        </button>
      </div>
    </div>
  );
};
