"use client";

import { useFullScreen } from "@/hooks/modal/use-full-screen";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { useMedia } from "react-use";

export const BottomBar = () => {
  const t = useTranslations('ModalView.bottom_bar');
  const [isActiveSide, setIsActiveSide] = useState(true);
  const [isActiveSizes, setIsActiveSizes] = useState(false);
  const { open, onOpen, onClose } = useFullScreen();
  const isMobile = useMedia('(max-width: 1234px)');

  const handleActiveSide = () => {
    setIsActiveSide(!isActiveSide);
  };

  const handleActiveSizes = () => {
    setIsActiveSizes(!isActiveSizes);
  };

  const handleOpenFullScreen = () => {
    if(open) {
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
    <div className="w-full absolute bottom-0 left-0  p-[45px] lg:p-[30px] flex justify-between">
      {/* Кнопки навигации */}
      <div className="flex lg:flex-row flex-col gap-2 z-50">
        <button className={cn("bg-primary/80 rounded-full flex items-center justify-center cursor-pointer", isActiveSide && 'bg-accent text-primary', isMobile ? 'w-[50px] h-[50px]' : 'w-[69px] h-[69px]')} onClick={handleActiveSide}>
          <Image src="/figma-images/modal-view/outside-view.svg" alt={t('outside_view')} width={isMobile ? 20 : 28} height={isMobile ? 20 : 36} />
        </button>
        <button className={cn("bg-primary/80 rounded-full flex items-center justify-center cursor-pointer", !isActiveSide && 'bg-accent', isMobile ? 'w-[50px] h-[50px]' : 'w-[69px] h-[69px]')} onClick={handleActiveSide}>
          <Image src="/figma-images/modal-view/inside-view.svg"  alt={t('inside_view')} width={isMobile ? 20 : 28} height={isMobile ? 20 : 36} />
        </button>
      </div>

      {/* Инструменты */}
      <div className="flex lg:flex-row flex-col gap-2 z-50">
        <button className={cn("bg-primary/80  rounded-full flex items-center justify-center hover:bg-accent/80 transition-all duration-300 cursor-pointer", isActiveSizes && 'bg-accent', isMobile ? 'w-[50px] h-[50px]' : 'w-[69px] h-[69px]')} onClick={handleActiveSizes}>
          <Image src="/figma-images/modal-view/show-sizes.svg" alt={t('show_sizes')} width= {isMobile ? 20 : 25} height={isMobile ? 20 :  26} />
        </button>
        <button className={cn("bg-primary/80  rounded-full flex items-center justify-center hover:bg-accent/80 transition-all duration-300 cursor-pointer", open && 'bg-accent', isMobile ? 'w-[50px] h-[50px]' : 'w-[69px] h-[69px]')} onClick={handleOpenFullScreen}>
          <Image src="/figma-images/modal-view/full-screen.svg" alt={t('full_screen')} width={isMobile ? 20 : 24} height={isMobile ? 20 :   24} />
        </button>
      </div>
    </div>
  );
}; 