'use client';

import { useCallback } from 'react';
import { useDecodeContext } from '@/providers/decode-provider';
import { createDoorAssemblerConfig, configToUseSvgProps } from '@/lib/utils/svg-assembler';
import DOMPurify from 'dompurify';

interface ExportOptions {
  format?: 'png' | 'jpeg';
  quality?: number; // 0.1 - 1.0 для JPEG
  width?: number;
  height?: number;
}

interface ExportResult {
  inside: string;
  outside: string;
}

export const useExportDoor = () => {
  const { decodedData } = useDecodeContext();

  /**
   * Создает SVG элемент из конфигурации
   */
  const createSvgElement = useCallback(
    async (side: 'inside' | 'outside'): Promise<SVGElement | null> => {
      if (!decodedData) return null;

      try {
        // Создаем конфигурацию для сборки двери
        const assemblerConfig = createDoorAssemblerConfig(decodedData, side);
        const svgProps = configToUseSvgProps(assemblerConfig);

        // Загружаем главный SVG
        const mainSvgResponse = await fetch(svgProps.svgUrl);
        const mainSvgText = await mainSvgResponse.text();

        // Создаем временный div для парсинга
        const tempDiv = document.createElement('div');
        // Санитизируем SVG контент
        tempDiv.innerHTML = DOMPurify.sanitize(mainSvgText, {
          USE_PROFILES: { svg: true, svgFilters: true },
        });
        const svgElement = tempDiv.querySelector('svg');

        if (!svgElement) return null;

        // Клонируем SVG для безопасности
        const clonedSvg = svgElement.cloneNode(true) as SVGElement;

        // Добавляем дополнительные SVG компоненты
        for (const additionalSvg of svgProps.additionalSvgs || []) {
          try {
            let svgContent = additionalSvg.svgString;

            // Если передан URL, загружаем SVG
            if (!svgContent && additionalSvg.svgUrl) {
              const response = await fetch(additionalSvg.svgUrl);
              svgContent = await response.text();
            }

            if (!svgContent) continue;

            // Находим целевой элемент
            const targetElement = clonedSvg.querySelector(additionalSvg.targetSelector);
            if (!targetElement) continue;

            // Парсим и санитизируем SVG строку
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = DOMPurify.sanitize(svgContent, {
              USE_PROFILES: { svg: true, svgFilters: true },
            });
            const additionalSvgElement = tempDiv.querySelector('svg');

            if (additionalSvgElement) {
              // Применяем позиционирование если есть
              if (additionalSvg.positionX || additionalSvg.positionY) {
                const handleElement = additionalSvgElement.querySelector('#handle_1000_mm');
                if (handleElement) {
                  const originalX = parseFloat(handleElement.getAttribute('x') || '0');
                  const originalY = parseFloat(handleElement.getAttribute('y') || '0');

                  const newX = additionalSvg.positionX
                    ? parseFloat(additionalSvg.positionX)
                    : originalX;
                  const newY = additionalSvg.positionY
                    ? parseFloat(additionalSvg.positionY)
                    : originalY;

                  const deltaX = newX - originalX;
                  const deltaY = newY - originalY;

                  // Обновляем позицию rect
                  handleElement.setAttribute('x', newX.toString());
                  handleElement.setAttribute('y', newY.toString());

                  // Находим и обновляем градиент
                  const gradientElement = additionalSvgElement.querySelector('#linear-gradient');
                  if (gradientElement && (deltaX !== 0 || deltaY !== 0)) {
                    const x1 = parseFloat(gradientElement.getAttribute('x1') || '0') + deltaX;
                    const y1 = parseFloat(gradientElement.getAttribute('y1') || '0') + deltaY;
                    const x2 = parseFloat(gradientElement.getAttribute('x2') || '0') + deltaX;
                    const y2 = parseFloat(gradientElement.getAttribute('y2') || '0') + deltaY;

                    gradientElement.setAttribute('x1', x1.toString());
                    gradientElement.setAttribute('y1', y1.toString());
                    gradientElement.setAttribute('x2', x2.toString());
                    gradientElement.setAttribute('y2', y2.toString());
                  }
                }
              }

              // Очищаем целевой элемент и вставляем санитизированное содержимое
              targetElement.innerHTML = '';
              const sanitizedContent = DOMPurify.sanitize(additionalSvgElement.innerHTML, {
                USE_PROFILES: { svg: true, svgFilters: true },
              });
              targetElement.innerHTML = sanitizedContent;
            }
          } catch (error) {
            console.error('Error processing additional SVG:', error);
          }
        }

        return clonedSvg;
      } catch (error) {
        console.error('Error creating SVG element:', error);
        return null;
      }
    },
    [decodedData]
  );

  /**
   * Конвертирует SVG элемент в base64 изображение
   */
  const svgToBase64 = useCallback(
    async (svgElement: SVGElement, options: ExportOptions = {}): Promise<string> => {
      const { format = 'png', quality = 0.9, width = 800, height = 600 } = options;

      return new Promise((resolve, reject) => {
        try {
          // Клонируем SVG для безопасности
          const clonedSvg = svgElement.cloneNode(true) as SVGElement;

          // Получаем оригинальный viewBox
          const originalViewBox = clonedSvg.getAttribute('viewBox');

          let svgWidth = width;
          let svgHeight = height;

          // Если есть viewBox, рассчитываем правильные пропорции
          if (originalViewBox) {
            const [, , vbWidth, vbHeight] = originalViewBox.split(' ').map(Number);
            const aspectRatio = vbWidth / vbHeight;

            // Подгоняем размеры canvas под пропорции SVG
            if (width / height > aspectRatio) {
              // Canvas шире чем нужно, уменьшаем ширину
              svgWidth = height * aspectRatio;
            } else {
              // Canvas выше чем нужно, уменьшаем высоту
              svgHeight = width / aspectRatio;
            }
          }

          // Устанавливаем размеры для экспорта
          clonedSvg.setAttribute('width', svgWidth.toString());
          clonedSvg.setAttribute('height', svgHeight.toString());

          // Сохраняем оригинальный viewBox или создаем если его нет
          if (!originalViewBox) {
            clonedSvg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
          }

          // Добавляем xmlns для корректного отображения
          clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

          // Сериализуем SVG в строку
          const svgData = new XMLSerializer().serializeToString(clonedSvg);

          // Отладка: выводим SVG содержимое

          // Создаем data URL напрямую для SVG
          const svgDataUrl =
            'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));

          // Создаем canvas с точными размерами SVG (без лишнего фона)
          const canvas = document.createElement('canvas');
          canvas.width = svgWidth;
          canvas.height = svgHeight;
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }

          // Создаем изображение из SVG
          const img = new Image();
          img.crossOrigin = 'anonymous';

          img.onload = () => {
            try {
              // НЕ заполняем фон - оставляем прозрачным
              // ctx.fillStyle = '#ffffff';
              // ctx.fillRect(0, 0, svgWidth, svgHeight);

              // Рисуем изображение на canvas точно по размеру
              ctx.drawImage(img, 0, 0, svgWidth, svgHeight);

              // Конвертируем в base64
              const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
              const base64Data = canvas.toDataURL(mimeType, quality);

              resolve(base64Data);
            } catch (error) {
              console.error('❌ Canvas conversion error:', error);
              reject(error);
            }
          };

          img.onerror = (error) => {
            console.error('❌ Image load error:', error);
            reject(error);
          };

          img.src = svgDataUrl;
        } catch (error) {
          console.error('❌ SVG processing error:', error);
          reject(error);
        }
      });
    },
    []
  );

  /**
   * Экспортирует двери для обеих сторон в base64
   */
  const exportDoors = useCallback(
    async (options?: ExportOptions): Promise<ExportResult | null> => {
      if (!decodedData) return null;

      try {
        // Создаем SVG для обеих сторон
        const [insideSvg, outsideSvg] = await Promise.all([
          createSvgElement('inside'),
          createSvgElement('outside'),
        ]);

        if (!insideSvg || !outsideSvg) {
          throw new Error('Failed to create SVG elements');
        }

        // Конвертируем в base64
        const [insideBase64, outsideBase64] = await Promise.all([
          svgToBase64(insideSvg, options),
          svgToBase64(outsideSvg, options),
        ]);

        return {
          inside: insideBase64,
          outside: outsideBase64,
        };
      } catch (error) {
        console.error('Error exporting doors:', error);
        return null;
      }
    },
    [decodedData, createSvgElement, svgToBase64]
  );

  /**
   * Экспортирует одну сторону двери в base64
   */
  const exportSingleDoor = useCallback(
    async (side: 'inside' | 'outside', options?: ExportOptions): Promise<string | null> => {
      try {
        const svgElement = await createSvgElement(side);
        if (!svgElement) return null;

        return await svgToBase64(svgElement, options);
      } catch (error) {
        console.error('Error exporting single door:', error);
        return null;
      }
    },
    [createSvgElement, svgToBase64]
  );

  return {
    exportDoors,
    exportSingleDoor,
    isReady: !!decodedData,
  };
};
