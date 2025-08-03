import { usePostCode } from '../use-post-code';
import { Glass } from '@/types';

export const usePostGlass = () => {
  const { mutate, isPending } = usePostCode();

  const updateGlass = (glass: Glass) => {
    mutate((decode) => ({
      glass: { ...decode.glass, id: glass.id },
    }));
  };

  return {
    mutate: updateGlass,
    isPending,
  };
};
