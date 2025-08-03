import { HandleColor, HandleSize } from './common';

export interface FurnitureSubitem {
  id: string;
  item: string;
  title: string;
  price: string;
  code: string;
  is_standard: string;
  is_include_in_pricelist: string;
  is_empty: string;
  ord: string;
  is_inside_default: string;
  image_svg: string;
  height: string;
  width: string;
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
  active: string;
  image_png: string;
  ord: string;
  is_translated: string;
  subitems: FurnitureSubitem[];
}

export interface FurnitureWithOptions {
  id: string;
  title: string;
  url: string;
  active: string;
  ord: string;
  is_translated: string;
  items: FurnitureItem[];
}

// Алиас для обратной совместимости
export type Furniture = FurnitureWithOptions;
