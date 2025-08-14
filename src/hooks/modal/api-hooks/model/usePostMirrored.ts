import { usePostCode } from '../use-post-code';

export const usePostMirrored = () => {
  const { mutate, isPending } = usePostCode();

  const setMirrored = (mirrored: boolean | number) => {
    const value = typeof mirrored === 'boolean' ? (mirrored ? 1 : 0) : Number(mirrored);
    mutate((decode) => ({
      model: {
        ...decode.model,
        mirrored: value,
      },
    }));
  };

  const toggleMirrored = () => {
    mutate((decode) => ({
      model: {
        ...decode.model,
        mirrored: decode.model?.mirrored === 1 ? 0 : 1,
      },
    }));
  };

  return { setMirrored, toggleMirrored, isPending };
};
