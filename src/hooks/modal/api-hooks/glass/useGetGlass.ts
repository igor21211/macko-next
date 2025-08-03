import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';
import { Glass } from '@/types';

export const useGetGlass = () =>
  useQuery<Glass[], Error>({
    queryKey: ['glass'],
    queryFn: async () => {
      const response = await api.get<Glass[]>('/glass/');
      return response.data;
    },
  });
