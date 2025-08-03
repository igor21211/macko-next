import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';
import { Color } from '@/types';

export const useGetColor = () => {
  return useQuery<Color[], Error>({
    queryKey: ['color'],
    queryFn: async () => {
      const response = await api.get<Color[]>('/color');
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 часа (86400000 мс)
  });
};
