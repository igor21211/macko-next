// Общие типы для всех компонентов двери
import type { FurnitureItem } from './furniture';

export interface Model {
  id: string;
  title: string;
  url: string;
  series: string;
  active: string;
  image_svg: string;
  code: string;
  is_mirrored: string;
  mirrored_code: string;
  min_model_width: string;
  min_model_height: string;
  ord: string;
  is_translated: string;
  is_standard: string;
  is_include_in_pricelist: string;
  paz_enabled: string;
  molding_enabled: string;
  price: string;
  molding: unknown[];
  mirrored: number;
  category: {
    id: string;
    classname: string;
    tabs: unknown[];
    title: string;
    url: string;
    active: string;
    ord: string;
    is_translated: string;
  };
}

export interface Shape {
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
  is_include_in_pricelist: string;
  code_right: string;
  code_left: string;
  code_left_inside: string;
  code_right_inside: string;
}

export interface View {
  id: string;
  title: string;
  url: string;
  active: string;
  view_type: string;
  ord: string;
  is_standard: string;
  is_include_in_pricelist: string;
  code: string;
  is_translated: string;
  image: string;
}

export interface Decor {
  id: string;
  title: string;
  url: string;
  active: string;
  inox_type: string;
  inox_outside: string;
  inox_inside: string;
  image_png: string;
  ord: string;
  is_standard: string;
  is_include_in_pricelist: string;
  code: string;
  is_translated: string;
  slot_type: string;
  slot_type_margin: string;
  black_design: string;
  black_design_margin: string;
  black: string;
  molding: number;
}

export interface ConstructionThickness {
  id: string;
  title: string;
  url: string;
  category: string;
  active: string;
  image_png: string;
  ord: string;
  is_translated: string;
  price: string;
  construction_type: string;
  construction_thikness: string;
  code: string;
  is_standard: string;
  is_include_in_pricelist: string;
}

export interface Construction {
  title: string;
  ord: string;
  construction_type: string;
  image_png: string;
  construction_thikness: ConstructionThickness[];
}

export interface OptionsKonstruktsiya {
  title: string;
  ord: string;
  construction_type: string;
  image_png: string;
  construction_thikness: ConstructionThickness[];
}

export interface Options {
  konstruktsiya: OptionsKonstruktsiya[];
}

export interface Handle {
  id: string;
  title: string;
  url: string;
  active: string;
  ord: string;
  is_translated: string;
  items: FurnitureItem[];
  size: number;
  color: number;
}

export interface HandleColor {
  id: string;
  group: string;
  subgroup: string;
  numerical: string;
  category: string;
  producer: string;
  title: string;
  h1: string;
  url: string;
  image: string;
  value: string;
  active: string;
  description: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  changefreq: string;
  ord: string;
  lastmod: string;
  visible: string;
  is_translated: string;
  code: string;
}

export interface HandleSize {
  id: string;
  group: string;
  subgroup: string;
  numerical: string;
  category: string;
  producer: string;
  title: string;
  h1: string;
  url: string;
  image: string;
  value: string;
  active: string;
  description: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  changefreq: string;
  ord: string;
  lastmod: string;
  visible: string;
  is_translated: string;
  code: string;
}
