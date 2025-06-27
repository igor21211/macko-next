"use client";

import { useEffect, useState, useRef } from 'react';
import { Svg, Dom } from '@svgdotjs/svg.js';

interface UseSvgProps {
  url: string;
}

export const useSvg = ({ url }: UseSvgProps) => {
  const [svgDoc, setSvgDoc] = useState<Svg | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !url) return;

    const container = containerRef.current;
    let isActive = true; // Флаг для предотвращения утечек памяти

    // Очищаем контейнер перед загрузкой нового SVG
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const loadSvg = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch SVG: ${response.statusText}`);
        }
        const svgText = await response.text();
        
        if (!isActive) return;

        // Создаем временный div для инъекции SVG
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = svgText;
        const svgElement = tempDiv.querySelector('svg');

        if (svgElement && container) {
            // Добавляем атрибуты для правильного масштабирования SVG
            svgElement.setAttribute('width', '100%');
            svgElement.setAttribute('height', '100%');
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            
            // Прикрепляем SVG к контейнеру и создаем экземпляр SVG.js
            container.appendChild(svgElement);
            const doc = new Svg(svgElement);
            setSvgDoc(doc);
        }

      } catch (error) {
        console.error("Error loading SVG:", error);
      }
    };

    loadSvg();
    
    // Функция очистки
    return () => {
      isActive = false;
      if (container) {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      }
      setSvgDoc(null);
    };
  }, [url]);

  const select = <T extends Dom>(selector: string): T | null => {
    if (!svgDoc) return null;
    const element = svgDoc.findOne(selector);
    return element as T | null;
  };

  return { containerRef, svgDoc, select };
}; 