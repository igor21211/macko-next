import { usePostCode } from '../use-post-code';
import { FurnitureSubitem } from '@/types';

export const usePostHandle = () => {
  const { mutate, isPending } = usePostCode();

  const updateHandle = (subitem: FurnitureSubitem, side: 'outside' | 'inside' = 'outside') => {
    mutate((decode) => ({
      handles: {
        ...decode.handles,
        [side]: {
          id: Number(subitem.item), // ID furniture item
          size: subitem.size ? Number(subitem.size.id) : decode.handles[side].size,
          color: subitem.color ? Number(subitem.color.id) : decode.handles[side].color,
        },
      },
    }));
  };

  return {
    mutate: updateHandle,
    isPending,
  };
};
