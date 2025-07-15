import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';

interface ShapeSubitem {
  id: string;
  item: string;
  title: string;
  price: string;
  start_width: string;
  stop_width: string;
}

interface Shape {
  id: string;
  title: string;
  url: string;
  active: string;
  image_svg: string;
  ord: string;
  double_door: boolean;
  glass_left: boolean;
  glass_right: boolean;
  glass_top: boolean;
  is_translated: string;
  is_standard: string;
  code_right: string;
  code_left: string;
  subitems: ShapeSubitem[];
}

export const useGetShape = () =>
  useQuery<Shape[], Error>({
    queryKey: ['shape'],
    queryFn: async () => {
      const response = await api.get<Shape[]>('/shape/');
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 часа (86400000 мс)
  });
