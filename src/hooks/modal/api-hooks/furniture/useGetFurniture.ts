import { useQuery } from '@tanstack/react-query';
import { api } from '../../../../lib/axios';

export interface FurnitureSubitem {
  id: string;
  item: string;
  title: string;
  is_translated: string;
  price: string;
  code: string;
  image_svg: string;
  height: string;
  width: string;
  positionX: string;
  positionY: string;
  is_standard: string;
}

export interface FurnitureItem {
  id: string;
  title: string;
  url: string;
  category: string;
  active: string;
  image_png: string;
  ord: string;
  subitems: FurnitureSubitem[];
}

export interface Furniture {
  id: string;
  title: string;
  url: string;
  active: string;
  ord: string;
  is_translated: string;
  items: FurnitureItem[];
}

export const useGetFurniture = () =>
  useQuery<Furniture[], Error>({
    queryKey: ['furniture'],
    queryFn: async () => {
      const response = await api.get<Furniture[]>('/furniture/');
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 часа (86400000 мс)
  });
