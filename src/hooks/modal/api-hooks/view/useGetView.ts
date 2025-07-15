import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';

interface View {
  id: number;
  title: string;
  url: string;
  active: number;
  view_type: string;
  ord: number;
  is_standard: number;
  code: string;
  is_translated: number;
  image: string;
}

export const useGetView = () =>
  useQuery<View[], Error>({
    queryKey: ['view'],
    queryFn: async () => {
      const response = await api.get<View[]>('/view/');
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 часа (86400000 мс)
  });
