import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';
import { Glass } from '@/types';

export const useGetGlass = (modelId?: number) =>
  useQuery<Glass[], Error>({
    queryKey: ['glass', modelId],
    enabled: typeof modelId === 'number' && !Number.isNaN(modelId),
    queryFn: async () => {
      if (typeof modelId !== 'number' || Number.isNaN(modelId)) {
        return [];
      }
      const response = await api.get<Glass[]>(`/glass/?model= ${modelId}`);
      return response.data;
    },
  });
