import { usePostCode } from '../use-post-code';

export const usePostFurniture = () => {
  const { mutate, isPending } = usePostCode();

  const updateFurniture = (subitemId: string, side: 'outside' | 'inside' = 'outside') => {
    mutate((decode) => {
      const otherSide = side === 'outside' ? 'inside' : 'outside';
      const furniture = {
        ...decode.furniture,
        [otherSide]: {
          ...decode.furniture[otherSide],
          id: decode.furniture[otherSide].items[0].subitems[0].id,
        },
        [side]: {
          ...decode.furniture[side],
          id: subitemId,
        },
      };
      console.log('furniture', furniture);
      return { furniture };
    });
  };

  return {
    mutate: updateFurniture,
    isPending,
  };
};
