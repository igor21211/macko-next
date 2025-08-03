'use client';

import { useSvg } from '@/hooks/modal/use-svg';
import { CSSProperties, useMemo, memo } from 'react';
import { cn } from '@/lib/utils';
import { TopBar } from './top-bar';
import { BottomBar } from './bottom-bar';
import { useMedia } from 'react-use';
import { useFullScreen } from '@/hooks/modal/use-full-screen';
import { useSideContext } from '@/providers/side-provider';
import { useDecodeContext } from '@/providers/decode-provider';
import { createDoorAssemblerConfig, configToUseSvgProps } from '@/lib/utils/svg-assembler';

const DoorPreview = memo(
  ({ isDoorReduced, side }: { isDoorReduced: boolean; side: 'inside' | 'outside' }) => {
    const { decodedData } = useDecodeContext();

    // Создаем конфигурацию для сборки двери используя SVG Assembler
    const assemblerConfig = useMemo(() => {
      if (!decodedData) return null;
      return createDoorAssemblerConfig(decodedData, side);
    }, [decodedData, side]);

    // Преобразуем конфигурацию для хукаuseSvg
    const svgProps = useMemo(() => {
      if (!assemblerConfig) return null;
      return configToUseSvgProps(assemblerConfig);
    }, [assemblerConfig]);

    const isDataReady = !!decodedData?.furniture && !!svgProps;

    const { containerRef } = useSvg(svgProps || { svgUrl: '/figma-images/modal/modal.svg' });

    const { inside, outside } = useSideContext();
    const isMobile = useMedia('(max-width: 1024px)', false);
    const { open } = useFullScreen();

    // Воспроизводим логику расчетов из проекта Vue
    const drawingCoefficient = 0.143;

    // Базовые размеры двери (мемоизируем объект)
    const dimensions = useMemo(
      () => ({
        width: 2200,
        height: 2000,
        topHeight: 400,
        leftWidth: 400,
        rightWidth: 400,
      }),
      []
    );

    // Форма двери (мемоизируем объект)
    const shape = useMemo(
      () => ({
        glass_left: false,
        glass_right: false,
        glass_top: false,
        double_door: false,
      }),
      []
    );

    // Вычисление размеров
    const doorWidth = useMemo(
      () => dimensions.width * drawingCoefficient,
      [dimensions.width, drawingCoefficient]
    );
    const doorHeight = useMemo(
      () => dimensions.height * drawingCoefficient,
      [dimensions.height, drawingCoefficient]
    );

    const doorLeftWidth = useMemo(
      () => (shape.glass_left ? dimensions.leftWidth * drawingCoefficient : 0),
      [shape.glass_left, dimensions.leftWidth, drawingCoefficient]
    );

    const doorRightWidth = useMemo(
      () => (shape.glass_right ? dimensions.rightWidth * drawingCoefficient : 0),
      [shape.glass_right, dimensions.rightWidth, drawingCoefficient]
    );

    const doorTopHeight = useMemo(
      () => (shape.glass_top ? dimensions.topHeight * drawingCoefficient : 0),
      [shape.glass_top, dimensions.topHeight, drawingCoefficient]
    );

    const doorTotalWidth = useMemo(
      () => doorWidth + doorLeftWidth + doorRightWidth,
      [doorWidth, doorLeftWidth, doorRightWidth]
    );

    const doorTotalHeight = useMemo(() => doorHeight + doorTopHeight, [doorHeight, doorTopHeight]);

    // Стили для позиционирования
    const doorStyle: CSSProperties = useMemo(
      () => ({
        width: ` ${isMobile && isDoorReduced ? (doorTotalWidth / 10) * 2 : isMobile ? (doorTotalWidth / 10) * 1.6 : doorTotalWidth / 23}vw`,
        height: ` ${isMobile && isDoorReduced ? (doorTotalHeight / 10) * 2 : isMobile ? (doorTotalHeight / 10) * 1.6 : doorTotalHeight / 10}vw`,
      }),
      [doorTotalWidth, doorTotalHeight, isMobile, isDoorReduced]
    );

    return (
      <div
        className={cn(
          'relative flex flex-1 flex-col pb-10',
          // Фон для всех разрешений (мобилки)
          isDoorReduced && isMobile && !open && 'mx-auto max-h-[500px] w-full',
          isDoorReduced && isMobile && open && 'mx-auto h-full w-full',
          inside && 'bg-[url("/figma-images/modal-view/inside.jpg")]',
          outside && 'bg-[url("/figma-images/modal-view/outside.jpg")]',
          'bg-[#e5e6e0] bg-[length:100%_auto] bg-[position:50%_100%] bg-no-repeat lg:bg-[position:50%_100%]'
        )}
      >
        <div className="relative h-full w-full xl:static xl:mt-0">
          <TopBar />
          {/* SVG-дверь */}
          <div
            className={cn(
              'absolute left-1/2 z-10 -translate-x-1/2 transform',
              open && isMobile
                ? 'bottom-0 -translate-y-[10%]'
                : isMobile
                  ? 'bottom-0 -translate-y-[2%] sm:-translate-y-[10%] md:-translate-y-[10%]'
                  : 'top-0',
              // На десктопе прижимаем к низу
              open && !isMobile
                ? 'bottom-[9.7vw] lg:top-auto'
                : !open
                  ? 'lg:top-auto lg:bottom-[2vw] xl:bottom-[6vw] 2xl:bottom-[7vw]'
                  : ''
            )}
            style={doorStyle}
          >
            {isDataReady ? (
              <div ref={containerRef} className="h-full w-full" />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"></div>
              </div>
            )}
          </div>
        </div>
        <BottomBar />
      </div>
    );
  }
);

DoorPreview.displayName = 'DoorPreview';

export { DoorPreview };
