import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';

interface Molding {
  id: string;
  title: string;
  url: string;
  active: string;
  image: string;
  ord: string;
  is_translated: string;
  price: string;
  code: string;
}

export const useGetMolding = (modelId: number) => {
  return useQuery<Molding[], Error>({
    queryKey: ['molding', modelId],
    enabled: typeof modelId === 'number' && !Number.isNaN(modelId),
    queryFn: async () => {
      if (typeof modelId !== 'number' || Number.isNaN(modelId)) {
        return [];
      }
      const response = await api.get<Molding[]>(`/molding/?model=${modelId}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 часа (86400000 мс)
  });
};
