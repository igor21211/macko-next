// Базовые типы для цветов
export interface ColorSubitem {
  id: string;
  item: string;
  title: string;
  price: number;
  start_width: number;
  stop_width: number;
}

export interface Color {
  id: string;
  title: string;
  colour: string;
  stroke: string;
  pattern_svg: string;
  pattern_width: number;
  pattern_height: number;
  pattern_image: string;
  colour_name: string;
  url: string;
  category: string;
  active: boolean;
  ord: number;
  code: string;
  code_3mm: string;
  is_alu_3mm: boolean;
  is_standard: boolean;
  is_translated: boolean;
  is_default: boolean;
  is_hpl: boolean;
  is_alu: boolean;
  is_black: boolean;
  subitems: ColorSubitem[];
}

// Расширенные типы для decode ответа
export interface ColorWithSubitems extends Color {
  selectedSubitem: ColorSubitem[];
  colour_price_oneside_change?: number;
  colour_price_twoside_change?: number;
  is_include_in_pricelist?: boolean;
  colour_prevailing?: string;
  color_text?: string;
}
