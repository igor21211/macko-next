import { HandleColor, HandleSize } from './common';

export interface FurnitureSubitem {
  id: string;
  item: string;
  title: string;
  price: number;
  code: string;
  is_standard: boolean;
  is_include_in_pricelist: boolean;
  is_empty: boolean;
  ord: number;
  is_inside_default: boolean;
  image_svg: string;
  height: number;
  width: number;
  positionX: string;
  positionY: string;
  image_black_svg: string;
  color: HandleColor | false;
  size: HandleSize | false;
}

export interface FurnitureItem {
  id: string;
  title: string;
  url: string;
  category: string;
  active: boolean;
  image_png: string;
  ord: number;
  is_translated: boolean;
  subitems: FurnitureSubitem[];
}

export interface FurnitureWithOptions {
  id: string;
  title: string;
  url: string;
  active: boolean;
  ord: number;
  is_translated: boolean;
  items: FurnitureItem[];
}

// Алиас для обратной совместимости
export type Furniture = FurnitureWithOptions;
