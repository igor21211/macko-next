import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';
import { Color } from '@/types';

export const useGetAluminum = () => {
  return useQuery<Color[], Error>({
    queryKey: ['aluminum'],
    queryFn: async () => {
      const response = await api.get<Color[]>('/color?category=aluminum');
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 часа
  });
};
