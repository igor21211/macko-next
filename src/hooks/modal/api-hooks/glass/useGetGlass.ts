import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';

export interface Glass {
  id: string;
  title: string;
  url: string;
  category: string;
  active: string;
  image_png: string;
  image_pattern: string;
  pattern_width: string;
  pattern_height: string;
  repeat_pattern: string;
  sandblasting: string;
  ord: string;
  is_translated: string;
  price: string;
  code: string;
  is_canbesafe: string;
  safe_price: string;
  safe_code: string;
  is_standard: string;
}

export const useGetGlass = () =>
  useQuery<Glass[], Error>({
    queryKey: ['glass'],
    queryFn: async () => {
      const response = await api.get<Glass[]>('/glass/');
      return response.data;
    },
  });
