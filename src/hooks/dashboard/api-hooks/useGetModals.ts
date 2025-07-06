import { useQuery } from '@tanstack/react-query';
import { api } from '../../../lib/axios';

export type Modal = {
  id: number;
  category: number;
  title: string;
  url: string;
  price: string;
  old_price: string;
  code: string;
  image: string;
  active: number;
  ord: number;
};

export type Modals = Modal[];

export const useGetModals = () =>
  useQuery<Modals, Error>({
    queryKey: ['modals'],
    queryFn: async () => {
      const response = await api.get<Modals>('/main_doors/?category=1');
      return response.data;
    },
    staleTime: 1000 * 60,
  });
