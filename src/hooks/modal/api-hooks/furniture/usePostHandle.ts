import { usePostCode } from '../use-post-code';
import { FurnitureSubitem } from '@/types';

export const usePostHandle = () => {
  const { mutate, isPending } = usePostCode();

  const updateHandle = (subitem: FurnitureSubitem, side: 'outside' | 'inside' = 'outside') => {
    mutate((decode) => {
      // Валидация конверсии в число
      const itemId = Number(subitem.item);
      if (isNaN(itemId)) {
        console.error('Invalid item ID:', subitem.item);
        return decode; // Возвращаем неизменные данные
      }

      const sizeId = subitem.size ? Number(subitem.size.id) : decode.handles[side].size;
      if (subitem.size && isNaN(sizeId)) {
        console.error('Invalid size ID:', subitem.size.id);
        return decode;
      }

      const colorId = subitem.color ? Number(subitem.color.id) : decode.handles[side].color;
      if (subitem.color && isNaN(colorId)) {
        console.error('Invalid color ID:', subitem.color.id);
        return decode;
      }

      return {
        handles: {
          ...decode.handles,
          [side]: {
            id: itemId,
            size: sizeId,
            color: colorId,
          },
        },
      };
    });
  };

  return {
    mutate: updateHandle,
    isPending,
  };
};
