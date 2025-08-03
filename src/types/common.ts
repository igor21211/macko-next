// Общие типы для всех компонентов двери
import type { FurnitureItem } from './furniture';

// Интерфейс для табов модели
export interface ModelTab {
  id: string;
  title: string;
  active: boolean;
  ord: number;
}

// Интерфейс для молдинга модели
export interface ModelMolding {
  id: string;
  title: string;
  active: boolean;
  ord: number;
}

export interface Model {
  id: string;
  title: string;
  url: string;
  series: string;
  active: boolean;
  image_svg: string;
  code: string;
  is_mirrored: boolean;
  mirrored_code: string;
  min_model_width: number;
  min_model_height: number;
  ord: number;
  is_translated: boolean;
  is_standard: boolean;
  is_include_in_pricelist: boolean;
  paz_enabled: boolean;
  molding_enabled: boolean;
  price: number;
  molding: ModelMolding[];
  mirrored: number;
  category: {
    id: string;
    classname: string;
    tabs: ModelTab[];
    title: string;
    url: string;
    active: boolean;
    ord: number;
    is_translated: boolean;
  };
}

export interface Shape {
  id: string;
  title: string;
  url: string;
  active: boolean;
  image_svg: string;
  ord: number;
  double_door: boolean;
  glass_left: boolean;
  glass_right: boolean;
  glass_top: boolean;
  is_translated: boolean;
  is_standard: boolean;
  is_include_in_pricelist: boolean;
  code_right: string;
  code_left: string;
  code_left_inside: string;
  code_right_inside: string;
}

export interface View {
  id: string;
  title: string;
  url: string;
  active: boolean;
  view_type: string;
  ord: number;
  is_standard: boolean;
  is_include_in_pricelist: boolean;
  code: string;
  is_translated: boolean;
  image: string;
}

export interface Decor {
  id: string;
  title: string;
  url: string;
  active: boolean;
  inox_type: string;
  inox_outside: string;
  inox_inside: string;
  image_png: string;
  ord: number;
  is_standard: boolean;
  is_include_in_pricelist: boolean;
  code: string;
  is_translated: boolean;
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
  active: boolean;
  image_png: string;
  ord: number;
  is_translated: boolean;
  price: number;
  construction_type: string;
  construction_thikness: number;
  code: string;
  is_standard: boolean;
  is_include_in_pricelist: boolean;
}

export interface Construction {
  title: string;
  ord: number;
  construction_type: string;
  image_png: string;
  construction_thikness: ConstructionThickness[];
}

export interface OptionsKonstruktsiya {
  title: string;
  ord: number;
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
  active: boolean;
  ord: number;
  is_translated: boolean;
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
  active: boolean;
  description: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  changefreq: string;
  ord: number;
  lastmod: string;
  visible: boolean;
  is_translated: boolean;
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
  active: boolean;
  description: string;
  short_description: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  changefreq: string;
  ord: number;
  lastmod: string;
  visible: boolean;
  is_translated: boolean;
  code: string;
}
