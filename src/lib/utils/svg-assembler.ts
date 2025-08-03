/**
 * SVG Assembler - утилита для динамической сборки SVG компонентов
 * Управляет загрузкой и вставкой различных частей двери (фурнитура, декор, стекло и т.д.)
 */

import { DecodeResponse } from '@/types/decode';

export interface SvgComponent {
  id: string;
  type: 'furniture' | 'decor' | 'glass' | 'molding' | 'color' | 'custom';
  svgString?: string;
  svgUrl?: string;
  targetSelector: string;
  position?: 'inside' | 'outside';
  priority?: number; // Порядок вставки (меньше число = раньше вставляется)
  // Позиционирование и размеры
  positionX?: string;
  positionY?: string;
  width?: string;
  height?: string;
}

export interface AssemblerConfig {
  mainSvgUrl: string;
  components: SvgComponent[];
  side: 'inside' | 'outside';
}

/**
 * Создает конфигурацию для сборки двери
 */
export const createDoorAssemblerConfig = (
  decodedData: DecodeResponse,
  side: 'inside' | 'outside'
): AssemblerConfig => {
  const components: SvgComponent[] = [];

  // Добавляем фурнитуру если есть
  if (decodedData?.furniture?.[side]?.items?.[0]?.subitems?.[0]?.image_svg) {
    const furnitureSubitem = decodedData.furniture[side].items[0].subitems[0];
    components.push({
      id: 'furniture-handle',
      type: 'furniture',
      svgUrl: `/api/proxy-svg?url=${encodeURIComponent(furnitureSubitem.image_svg)}`,
      targetSelector: '#handle',
      position: side,
      priority: 1,
      // Добавляем позиционирование и размеры
      positionX: furnitureSubitem.positionX,
      positionY: furnitureSubitem.positionY,
      width: furnitureSubitem.width,
      height: furnitureSubitem.height,
    });
  }

  // Добавляем дополнительные ручки если есть
  if (decodedData?.handles?.[side]?.items?.[0]?.subitems?.[0]?.image_svg) {
    const handleSubitem = decodedData.handles[side].items[0].subitems[0];
    components.push({
      id: 'handle-additional',
      type: 'furniture',
      svgUrl: `/api/proxy-svg?url=${encodeURIComponent(handleSubitem.image_svg)}`,
      targetSelector: '#handle_additional',
      position: side,
      priority: 1,
      // Добавляем позиционирование и размеры
      positionX: handleSubitem.positionX,
      positionY: handleSubitem.positionY,
      width: handleSubitem.width,
      height: handleSubitem.height,
    });
  }

  // Добавляем декор если есть
  if (decodedData?.decor?.[side]) {
    const decorItem = decodedData.decor[side];
    if (decorItem.image_png) {
      components.push({
        id: `decor-${side}`,
        type: 'decor',
        svgUrl: `/api/proxy-svg?url=${encodeURIComponent(decorItem.image_png)}`,
        targetSelector: '#decor',
        position: side,
        priority: 2,
      });
    }
  }

  // TODO: Добавить поддержку стекла когда будет определена структура Glass

  // TODO: Добавить поддержку молдинга когда будет добавлен в DecodeResponse

  // Сортируем по приоритету
  components.sort((a, b) => (a.priority || 999) - (b.priority || 999));

  return {
    mainSvgUrl: '/figma-images/modal/modal.svg',
    components: components.filter((comp) => comp.position === side),
    side,
  };
};

/**
 * Преобразует конфигурацию для хука useSvg
 */
export const configToUseSvgProps = (config: AssemblerConfig) => {
  return {
    svgUrl: config.mainSvgUrl,
    additionalSvgs: config.components.map((comp) => ({
      id: comp.id,
      svgString: comp.svgString,
      svgUrl: comp.svgUrl,
      targetSelector: comp.targetSelector,
      // Передаем позиционирование и размеры
      positionX: comp.positionX,
      positionY: comp.positionY,
      width: comp.width,
      height: comp.height,
    })),
  };
};

/**
 * Добавляет новый компонент в конфигурацию
 */
export const addComponent = (config: AssemblerConfig, component: SvgComponent): AssemblerConfig => {
  const newComponents = [...config.components, component];
  newComponents.sort((a, b) => (a.priority || 999) - (b.priority || 999));

  return {
    ...config,
    components: newComponents,
  };
};

/**
 * Удаляет компонент из конфигурации по ID
 */
export const removeComponent = (config: AssemblerConfig, componentId: string): AssemblerConfig => {
  return {
    ...config,
    components: config.components.filter((comp) => comp.id !== componentId),
  };
};

/**
 * Обновляет компонент в конфигурации
 */
export const updateComponent = (
  config: AssemblerConfig,
  componentId: string,
  updates: Partial<SvgComponent>
): AssemblerConfig => {
  const newComponents = config.components.map((comp) =>
    comp.id === componentId ? { ...comp, ...updates } : comp
  );
  newComponents.sort((a, b) => (a.priority || 999) - (b.priority || 999));

  return {
    ...config,
    components: newComponents,
  };
};

/**
 * Получает компонент по ID
 */
export const getComponent = (
  config: AssemblerConfig,
  componentId: string
): SvgComponent | undefined => {
  return config.components.find((comp) => comp.id === componentId);
};

/**
 * Получает все компоненты определенного типа
 */
export const getComponentsByType = (
  config: AssemblerConfig,
  type: SvgComponent['type']
): SvgComponent[] => {
  return config.components.filter((comp) => comp.type === type);
};
