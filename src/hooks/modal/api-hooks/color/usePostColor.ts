import { usePostCode } from '../use-post-code';
import { Color } from '@/types';

export const usePostColor = () => {
  const { mutate, isPending } = usePostCode();

  const updateColor = (color: Color) => {
    mutate((decode) => ({
      colors: {
        outside: { ...decode.colors.outside, id: color.id },
        inside: { ...decode.colors.inside, id: color.id },
      },
    }));
  };

  return {
    mutate: updateColor,
    isPending,
  };
};
