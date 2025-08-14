'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Svg, Dom } from '@svgdotjs/svg.js';

interface UseSvgProps {
  svgString?: string;
  svgUrl?: string;
  additionalSvgs?: {
    id: string;
    svgString?: string;
    svgUrl?: string;
    targetSelector: string;
    // Позиционирование и размеры
    positionX?: string;
    positionY?: string;
    width?: string;
    height?: string;
  }[];
}

export const useSvg = ({ svgString, svgUrl, additionalSvgs = [] }: UseSvgProps) => {
  const [svgDoc, setSvgDoc] = useState<Svg | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Функция для вставки дополнительных SVG (мемоизируем)
  const insertAdditionalSvgs = useCallback(
    async (doc: Svg) => {
      for (const { svgString, svgUrl, targetSelector, positionX, positionY } of additionalSvgs) {
        try {
          // debug
          console.info('[useSvg] insertAdditionalSvg:start', {
            targetSelector,
            hasString: !!svgString,
            svgUrl,
            positionX,
            positionY,
          });
        } catch {}
        try {
          const targetElement = doc.findOne(targetSelector) as Dom;
          if (!targetElement) continue;

          // Очищаем содержимое целевого элемента
          targetElement.clear();

          let finalSvgString = svgString;

          // Если передан URL, загружаем SVG
          if (!finalSvgString && svgUrl) {
            const response = await fetch(svgUrl);
            console.info('[useSvg] fetch additional svg', svgUrl, response.ok, response.status);
            finalSvgString = await response.text();
          }

          if (!finalSvgString) continue;

          // Парсим SVG строку
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = finalSvgString;
          const svgElement = tempDiv.querySelector('svg');

          if (svgElement) {
            // Удаляем возможные глобальные стили из дополнительного SVG, чтобы не сбивались заливки основной двери
            try {
              svgElement.querySelectorAll('style').forEach((s) => s.parentNode?.removeChild(s));
            } catch {}
            // Применяем позиционирование к rect элементу перед вставкой
            const handleElement = svgElement.querySelector('#handle_1000_mm');
            if (handleElement && (positionX || positionY)) {
              const originalX = parseFloat(handleElement.getAttribute('x') || '0');
              const originalY = parseFloat(handleElement.getAttribute('y') || '0');

              const newX = positionX ? parseFloat(positionX) : originalX;
              const newY = positionY ? parseFloat(positionY) : originalY;

              const deltaX = newX - originalX;
              const deltaY = newY - originalY;

              // Обновляем позицию rect
              handleElement.setAttribute('x', newX.toString());
              handleElement.setAttribute('y', newY.toString());

              // Находим и обновляем градиент
              const gradientElement = svgElement.querySelector('#linear-gradient');
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

            // Вставляем содержимое SVG в целевой элемент
            targetElement.svg(svgElement.innerHTML);
            try {
              const node = (targetElement as unknown as { node?: SVGElement }).node;
              const childCount = node ? node.children?.length : 'n/a';
              console.info('[useSvg] insertAdditionalSvg:done', { targetSelector, childCount });
            } catch {}
          }
        } catch (error) {
          console.error('Error inserting additional SVG:', error);
          setError(
            `Ошибка вставки дополнительного SVG: ${error instanceof Error ? error.message : String(error)}`
          );
        }
      }
    },
    [additionalSvgs]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    if (!svgString && !svgUrl) return; // Must have either string or URL

    const container = containerRef.current;

    // Более агрессивная очистка контейнера
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    setSvgDoc(null);

    const loadAndSetupSvg = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let finalSvgString = svgString;

        // Если передан URL, загружаем SVG
        if (!finalSvgString && svgUrl) {
          const response = await fetch(svgUrl);
          console.info(
            '[useSvg] fetch main svg',
            svgUrl,
            response.ok,
            response.status,
            response.headers.get('content-type')
          );
          if (!response.ok) {
            throw new Error(`Не удалось загрузить SVG: ${response.status} ${response.statusText}`);
          }
          finalSvgString = await response.text();
        }

        if (!finalSvgString) {
          setError('Отсутствует SVG контент');
          return;
        }

        // Создаем временный div для инъекции SVG
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = finalSvgString;
        const svgElement = tempDiv.querySelector('svg');

        if (svgElement && container && !container.firstChild) {
          // Добавляем атрибуты для правильного масштабирования SVG
          svgElement.setAttribute('width', '100%');
          svgElement.setAttribute('height', '100%');
          svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

          // Убеждаемся, что есть <defs> и базовый градиент BG-gradient (как во Vue)
          try {
            const rootSvg = svgElement as unknown as SVGSVGElement;
            let defs = rootSvg.querySelector('defs');
            if (!defs) {
              defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
              rootSvg.insertBefore(defs, rootSvg.firstChild);
            }
            let bgGrad = defs.querySelector('#BG-gradient') as SVGLinearGradientElement | null;
            if (!bgGrad) {
              bgGrad = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'linearGradient'
              ) as SVGLinearGradientElement;
              bgGrad.setAttribute('id', 'BG-gradient');
              bgGrad.setAttribute('x1', '0');
              bgGrad.setAttribute('y1', '0');
              bgGrad.setAttribute('x2', '100%');
              bgGrad.setAttribute('y2', '100%');
              const stops: Array<{ offset: string; color: string }> = [
                { offset: '25%', color: '#f9f9f9' },
                { offset: '67%', color: '#e8e8e8' },
                { offset: '79%', color: '#e2e2e2' },
              ];
              stops.forEach(({ offset, color }) => {
                const stop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                stop.setAttribute('offset', offset);
                stop.setAttribute('stop-color', color);
                bgGrad!.appendChild(stop);
              });
              defs.appendChild(bgGrad);
            }
          } catch {}

          // Прикрепляем SVG к контейнеру и создаем экземпляр SVG.js
          container.appendChild(svgElement);
          const doc = new Svg(svgElement);
          setSvgDoc(doc);

          // Фолбэк-заливка: если основные элементы без fill, задаём BG-gradient
          try {
            const root = svgElement as unknown as SVGSVGElement;
            const baseSelectors = [
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
            for (const sel of baseSelectors) {
              const nodes = root.querySelectorAll(sel);
              nodes.forEach((el) => {
                const current = (el as SVGElement).getAttribute('fill');
                if (!current || current === 'none') {
                  (el as SVGElement).setAttribute('fill', 'url(#BG-gradient)');
                }
              });
              try {
                console.info('[useSvg] fallbackFill:applied', baseSelectors.join(','));
              } catch {}
            }
          } catch {}

          // Вставляем дополнительные SVG
          await insertAdditionalSvgs(doc);

          // Повторная фолбэк-заливка после вставки доп. SVG
          try {
            const root = (doc as unknown as { node: SVGSVGElement }).node;
            const baseSelectors = [
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
            for (const sel of baseSelectors) {
              const nodes = root.querySelectorAll(sel);
              nodes.forEach((el: Element) => {
                const current = (el as SVGElement).getAttribute('fill');
                if (!current || current === 'none') {
                  (el as SVGElement).setAttribute('fill', 'url(#BG-gradient)');
                }
              });
            }
            console.info('[useSvg] fallbackFill:reapplied', baseSelectors.join(','));
          } catch {}

          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading SVG:', error);
        setError(`Ошибка загрузки SVG: ${error instanceof Error ? error.message : String(error)}`);
        setIsLoading(false);
      }
    };

    loadAndSetupSvg();

    // Функция очистки
    return () => {
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      setSvgDoc(null);
    };
  }, [svgString, svgUrl, insertAdditionalSvgs]);

  const select = <T extends Dom>(selector: string): T | null => {
    if (!svgDoc) return null;
    const element = svgDoc.findOne(selector);
    return element as T | null;
  };

  // Функция для вставки SVG строки в элемент по селектору
  const insertSvgString = (newSvgString: string, targetSelector: string) => {
    if (!svgDoc) return false;

    const targetElement = svgDoc.findOne(targetSelector) as Dom;
    if (!targetElement) return false;

    try {
      // Очищаем содержимое целевого элемента
      targetElement.clear();

      // Парсим SVG строку
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = newSvgString;
      const svgElement = tempDiv.querySelector('svg');

      if (svgElement) {
        // Вставляем содержимое SVG в целевой элемент
        targetElement.svg(svgElement.innerHTML);
        return true;
      }
    } catch (error) {
      console.error('Error inserting SVG string:', error);
      setError(`Ошибка вставки SVG: ${error instanceof Error ? error.message : String(error)}`);
    }

    return false;
  };

  return { containerRef, svgDoc, select, insertSvgString, error, isLoading };
};
