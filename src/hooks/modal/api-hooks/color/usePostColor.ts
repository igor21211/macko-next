import { usePostCode } from '../use-post-code';
import { Color } from '@/types';

export const usePostColor = () => {
  const { mutate, isPending } = usePostCode();

  const updateColor = (color: Color, type: 'outside' | 'inside') => {
    mutate((decode) => ({
      colors: {
        ...decode.colors,
        [type]: {
          ...decode.colors[type],
          id: color.id,
        },
      },
    }));
  };

  return {
    mutate: updateColor,
    isPending,
  };
};
