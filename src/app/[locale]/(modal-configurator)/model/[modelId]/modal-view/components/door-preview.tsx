"use client";

import { useSvg } from '@/hooks/modal/use-svg';
import { CSSProperties, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { TopBar } from './top-bar';
import { BottomBar } from './bottom-bar';
import { useMedia } from 'react-use';
import { useFullScreen } from '@/hooks/modal/use-full-screen';

export const DoorPreview = () => {
  const { containerRef } = useSvg({ url: '/figma-images/modal/modal.svg' });
  const isMobile = useMedia('(max-width: 1024px)', false);
   const {open} = useFullScreen();
  


  // Воспроизводим логику расчетов из проекта Vue
  const drawingCoefficient = 0.143;
  
  // Базовые размеры двери
  const dimensions = {
    width: 2200,
    height: 2000,
    topHeight: 400,
    leftWidth: 400,
    rightWidth: 400
  };

  // Форма двери (как в Vue проекте)
  const shape = {
    glass_left: false,
    glass_right: false,
    glass_top: false,
    double_door: false
  };

  // Вычисление размеров
  const doorWidth = useMemo(() => dimensions.width * drawingCoefficient, [dimensions.width, drawingCoefficient]);
  const doorHeight = useMemo(() => dimensions.height * drawingCoefficient, [dimensions.height, drawingCoefficient]);
  
  const doorLeftWidth = useMemo(() => 
    shape.glass_left ? dimensions.leftWidth * drawingCoefficient : 0,
    [shape.glass_left, dimensions.leftWidth, drawingCoefficient]
  );

  const doorRightWidth = useMemo(() => 
    shape.glass_right ? dimensions.rightWidth * drawingCoefficient : 0,
    [shape.glass_right, dimensions.rightWidth, drawingCoefficient]
  );

  const doorTopHeight = useMemo(() => 
    shape.glass_top ? dimensions.topHeight * drawingCoefficient : 0,
    [shape.glass_top, dimensions.topHeight, drawingCoefficient]
  );

  const doorTotalWidth = useMemo(() => 
    doorWidth + doorLeftWidth + doorRightWidth,
    [doorWidth, doorLeftWidth, doorRightWidth]
  );

  const doorTotalHeight = useMemo(() => 
    doorHeight + doorTopHeight,
    [doorHeight, doorTopHeight]
  );

  // Стили для позиционирования
  const doorStyle: CSSProperties = useMemo(() => ({
    width: `${(doorTotalWidth / 10)}vw`,
    height: `${(doorTotalHeight / 10)}vw`,

  }), [doorTotalWidth, doorTotalHeight]);

  return (
    <div
      className={cn(
        "flex flex-col flex-1 pb-10 relative",
        // Фон для всех разрешений (мобилки)
        "bg-[url('/figma-images/modal-view/door_notree_and_windows.jpg')] bg-no-repeat bg-[length:100%_auto] bg-[position:50%_100%] lg:bg-[position:50%_100%] bg-[#e5e6e0]"
      )}
    >
      <div className="relative w-full h-full xl:static xl:mt-0">
        <TopBar />
        {/* SVG-дверь */}
        <div
          ref={containerRef}
          className={cn(
            "absolute left-1/2 z-10 transform -translate-x-1/2",
            open && isMobile
              ? "bottom-0 -translate-y-[10%]"
              : isMobile
                ? "bottom-0 md:-translate-y-[19%] sm:-translate-y-[14%] -translate-y-[10%]"
                : "top-0",
            // На десктопе прижимаем к низу
            open && !isMobile
              ? "bottom-[9.7vw] lg:top-auto"
              : !open
                ? "lg:top-auto  lg:bottom-[2vw] xl:bottom-[6vw] 2xl:bottom-[7vw]"
                : ""
          )}
          style={doorStyle}
        />
      </div>
      <BottomBar />
    </div>
  );
};