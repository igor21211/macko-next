import { usePostCode } from '../use-post-code';

export const usePostFurniture = () => {
  const { mutate, isPending } = usePostCode();

  const updateFurniture = (subitemId: string, side: 'outside' | 'inside' = 'outside') => {
    mutate((decode) => ({
      furniture: {
        ...decode.furniture,
        [side]: { ...decode.furniture[side], id: subitemId },
      },
    }));
  };

  return {
    mutate: updateFurniture,
    isPending,
  };
};
