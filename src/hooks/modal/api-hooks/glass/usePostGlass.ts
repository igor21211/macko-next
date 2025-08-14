import { usePostCode } from '../use-post-code';
import { Glass } from '@/types';

export const usePostGlass = () => {
  const { mutate, isPending } = usePostCode();

  const updateGlass = (glass: Glass, opts?: { safeglass?: number | boolean }) => {
    const safeglass =
      typeof opts?.safeglass === 'boolean' ? (opts.safeglass ? 1 : 0) : opts?.safeglass;
    mutate((decode) => ({
      glass: {
        ...decode.glass,
        id: glass.id,
        ...(safeglass !== undefined ? { safeglass } : {}),
      },
    }));
  };

  return {
    mutate: updateGlass,
    isPending,
  };
};
