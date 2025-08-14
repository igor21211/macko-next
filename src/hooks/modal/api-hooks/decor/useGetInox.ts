import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';

interface InoxApi {
  id: string;
  title: string;
  url: string;
  active: string;
  inox_type: string;
  inox_outside: string;
  inox_inside: string;
  image_png: string;
  ord: string;
  is_standard: string;
  code: string;
  is_translated: string;
  slot_type: string;
}

interface Inox {
  id: string;
  title: string;
  url: string;
  active: string;
  inox_type: string;
  inox_outside: string;
  inox_inside: string;
  image: string;
  ord: string;
  is_standard: string;
  code: string;
  is_translated: string;
  slot_type: string;
}

export const useGetInox = (modelId: number) => {
  return useQuery<Inox[], Error>({
    queryKey: ['inox', modelId],
    enabled: typeof modelId === 'number' && !Number.isNaN(modelId),
    queryFn: async () => {
      if (typeof modelId !== 'number' || Number.isNaN(modelId)) {
        return [];
      }
      const response = await api.get<InoxApi[]>(`/inox/?model=${modelId}`);
      return response.data.map(({ image_png, ...rest }) => ({
        ...rest,
        image: image_png,
      }));
    },
    staleTime: 1000 * 60 * 60 * 24,
  });
};
