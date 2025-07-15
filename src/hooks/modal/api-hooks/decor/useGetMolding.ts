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

export const useGetMolding = () => {
  return useQuery<Molding[], Error>({
    queryKey: ['molding'],
    queryFn: async () => {
      const response = await api.get<Molding[]>('/molding');
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 часа (86400000 мс)
  });
};