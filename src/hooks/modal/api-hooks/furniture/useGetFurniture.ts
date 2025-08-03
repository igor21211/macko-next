import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';
import { Furniture } from '@/types';

export const useGetFurniture = () =>
  useQuery<Furniture[], Error>({
    queryKey: ['furniture'],
    queryFn: async () => {
      const response = await api.get<Furniture[]>('/furniture/');
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 часа (86400000 мс)
  });
