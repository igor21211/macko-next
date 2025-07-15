import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';

export interface ColorSubitem {
  id: string;
  item: string;
  title: string;
  price: string;
  start_width: string;
  stop_width: string;
}

export interface Color {
  id: string;
  title: string;
  colour: string;
  stroke: string;
  pattern_svg: string;
  pattern_width: string;
  pattern_height: string;
  pattern_image: string;
  colour_name: string;
  url: string;
  category: string;
  active: string;
  ord: string;
  code: string;
  code_3mm: string;
  is_alu_3mm: string;
  is_standard: string;
  is_translated: string;
  is_default: string;
  is_hpl: string;
  is_alu: string;
  is_black: string;
  subitems: ColorSubitem[];
}

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
