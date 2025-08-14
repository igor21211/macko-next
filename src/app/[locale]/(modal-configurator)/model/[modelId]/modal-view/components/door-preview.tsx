'use client';

import { useSvg } from '@/hooks/modal/use-svg';
import { CSSProperties, useMemo, memo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { TopBar } from './top-bar';
import { BottomBar } from './bottom-bar';
import { useMedia } from 'react-use';
import { useFullScreen } from '@/hooks/modal/use-full-screen';
import { useSideContext } from '@/providers/side-provider';
import { useDecodeContext } from '@/providers/decode-provider';
import { createDoorAssemblerConfig, configToUseSvgProps } from '@/lib/utils/svg-assembler';
import { useSvgRegistry } from '@/providers/svg-provider';
import { buildDoorAppearance } from '@/lib/svg/appearance';
import {
  ensureDefs,
  createPatternImage,
  setFillFor,
  setStrokeFor,
  setPatternPosition,
  setPatternImageOffset,
  setInlineFillFor,
  setInlineStrokeFor,
} from '@/lib/svg/postprocess';
import { computeGlassOffsets } from '@/lib/svg/glassOffsets';

// Выносим статические объекты из компонента
const DOOR_DIMENSIONS = {
  width: 2200,
  height: 2000,
  topHeight: 400,
  leftWidth: 400,
  rightWidth: 400,
};

const DOOR_SHAPE = {
  glass_left: false,
  glass_right: false,
  glass_top: false,
  double_door: false,
};

const DoorPreview = memo(
  ({ isDoorReduced, side }: { isDoorReduced: boolean; side: 'inside' | 'outside' }) => {
    const { decodedData } = useDecodeContext();
    const mainSvgUrl = useMemo<string | undefined>(() => {
      const url = decodedData?.model?.image_svg;
      if (!url) return undefined;
      return `/api/proxy-svg?url=${encodeURIComponent(url)}`;
    }, [decodedData?.model?.image_svg]);

    // Создаем конфигурацию для сборки двери используя SVG Assembler
    const assemblerConfig = useMemo(() => {
      if (!decodedData || !mainSvgUrl) return null;
      return createDoorAssemblerConfig(decodedData, side, mainSvgUrl);
    }, [decodedData, side, mainSvgUrl]);

    // Преобразуем конфигурацию для хукаuseSvg
    const svgProps = useMemo(() => {
      if (!assemblerConfig) return null;
      return configToUseSvgProps(assemblerConfig);
    }, [assemblerConfig]);

    const isDataReady = !!decodedData?.furniture && !!svgProps;
    const isDecodeReady = !!decodedData;
    const isMissingMainSvg = isDecodeReady && !decodedData?.model?.image_svg;

    const { containerRef, error: svgError, svgDoc } = useSvg(svgProps || { svgUrl: mainSvgUrl });
    const { registerSvg } = useSvgRegistry();

    const { inside, outside } = useSideContext();
    const isMobile = useMedia('(max-width: 1024px)', false);
    const { open } = useFullScreen();

    // Воспроизводим логику расчетов из проекта Vue
    const drawingCoefficient = 0.143;

    // Вычисление размеров
    const doorWidth = useMemo(
      () => DOOR_DIMENSIONS.width * drawingCoefficient,
      [drawingCoefficient]
    );
    const doorHeight = useMemo(
      () => DOOR_DIMENSIONS.height * drawingCoefficient,
      [drawingCoefficient]
    );

    const doorLeftWidth = useMemo(
      () => (DOOR_SHAPE.glass_left ? DOOR_DIMENSIONS.leftWidth * drawingCoefficient : 0),
      [drawingCoefficient]
    );

    const doorRightWidth = useMemo(
      () => (DOOR_SHAPE.glass_right ? DOOR_DIMENSIONS.rightWidth * drawingCoefficient : 0),
      [drawingCoefficient]
    );

    const doorTopHeight = useMemo(
      () => (DOOR_SHAPE.glass_top ? DOOR_DIMENSIONS.topHeight * drawingCoefficient : 0),
      [drawingCoefficient]
    );

    const doorTotalWidth = useMemo(
      () => doorWidth + doorLeftWidth + doorRightWidth,
      [doorWidth, doorLeftWidth, doorRightWidth]
    );

    const doorTotalHeight = useMemo(() => doorHeight + doorTopHeight, [doorHeight, doorTopHeight]);
    useEffect(() => {
      if (!svgDoc) return;
      const svgEl = (svgDoc as unknown as { node: SVGSVGElement }).node;
      registerSvg(side, svgEl || null);

      const applyAppearance = () => {
        try {
          if (!decodedData || !svgEl) return;
          const app = buildDoorAppearance(decodedData, side);
          try {
            console.groupCollapsed('[door-preview] applyAppearance');
            console.info('side', side);
            console.info('decode.black', decodedData.black);
            console.info('color', decodedData.colors?.[side]);
            console.info('appearance', app);
          } catch {}
          const defs = ensureDefs(svgEl);
          const bgSelectors = [
            '.doorbackground',
            '.doorleaf',
            '.frame',
            '.top-frame',
            '.left-frame',
            '.right-frame',
            '#BG',
            '#frame',
            '#doorleaf',
          ];
          const glassSelectors = ['.glass', '#Top-Glass', '#Left-Glass', '#Right-Glass'];

          // Пробиваем inline-стилями, т.к. в модельном SVG есть style с .doorBG/.Solid
          setFillFor(svgEl, bgSelectors, app.fillColor);
          setInlineFillFor(svgEl, ['.doorBG', '.Solid'], app.fillColor);
          if (app.lamination) {
            console.info('[door-preview] lamination -> pattern', app.lamination.id);
            let lamW = app.lamination.w;
            let lamH = app.lamination.h;
            try {
              const target =
                (svgEl.querySelector('#BG') as SVGGraphicsElement | null) ||
                (svgEl.querySelector('.doorBG') as SVGGraphicsElement | null);
              if (target && typeof target.getBBox === 'function') {
                const { width, height } = target.getBBox();
                if (width > 0 && height > 0) {
                  lamW = width;
                  lamH = height;
                }
                console.info('[door-preview] lamination bbox', { width, height });
              }
            } catch {}
            createPatternImage(defs, app.lamination.id, app.lamination.href, lamW, lamH);
            setFillFor(svgEl, bgSelectors, `url(#${app.lamination.id})`);
            setInlineFillFor(svgEl, ['.doorBG', '.Solid'], `url(#${app.lamination.id})`);
          }
          if (app.glass) {
            console.info('[door-preview] glass -> pattern', app.glass.id);
            const pattern = createPatternImage(
              defs,
              app.glass.id,
              app.glass.href,
              app.glass.w,
              app.glass.h
            );
            const offsets = computeGlassOffsets({
              modelCode: (decodedData.model.url || decodedData.model.title || '').toLowerCase(),
              doorWidth,
              doorHeight,
              doorLeftWidth,
              doorRightWidth,
              doorTopHeight,
              glassW: app.glass.w,
              glassH: app.glass.h,
            });
            setPatternPosition(pattern, offsets.patternX, 0);
            setPatternImageOffset(pattern, offsets.imageX, offsets.imageY);
            setFillFor(svgEl, glassSelectors, `url(#${app.glass.id})`);
            console.info('[door-preview] glass offsets', offsets);
          }
          if (app.strokeColor) {
            setStrokeFor(svgEl, bgSelectors, app.strokeColor);
            setInlineStrokeFor(svgEl, ['.doorBG', '.doorstroke', '.Solid'], app.strokeColor);
          }
          try {
            const count = (sel: string) => svgEl.querySelectorAll(sel).length;
            const bgEl = svgEl.querySelector('#BG') as SVGElement | null;
            const solidEl = svgEl.querySelector('.Solid') as SVGElement | null;
            console.info('[door-preview] targets', {
              bgCount: count(bgSelectors.join(',')),
              glassCount: count(glassSelectors.join(',')),
            });
            console.info('[door-preview] sample fills', {
              BG_fill: bgEl?.getAttribute('fill'),
              BG_style: bgEl?.getAttribute('style'),
              Solid_fill: solidEl?.getAttribute('fill'),
              Solid_style: solidEl?.getAttribute('style'),
            });
            console.groupEnd();
          } catch {}
        } catch (e) {
          console.error('SVG appearance apply failed', e);
        }
      };

      // Деферим на кадр, затем повторяем через микрозадержку — при смене decode и перерисовке SVG
      requestAnimationFrame(applyAppearance);
      const t = setTimeout(applyAppearance, 50);

      return () => {
        clearTimeout(t);
        registerSvg(side, null);
      };
    }, [
      svgDoc,
      registerSvg,
      side,
      decodedData,
      doorWidth,
      doorHeight,
      doorLeftWidth,
      doorRightWidth,
      doorTopHeight,
      mainSvgUrl,
    ]);

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
            ) : svgError ? (
              <div className="flex h-full w-full items-center justify-center text-center text-sm text-red-600">
                Ошибка загрузки SVG: {svgError}
              </div>
            ) : isMissingMainSvg ? (
              <div className="flex h-full w-full items-center justify-center text-center text-sm text-red-600">
                Не найден основной SVG модели. Обратитесь в поддержку или проверьте конфигурацию
                модели.
              </div>
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
