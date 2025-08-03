// Базовые типы для цветов
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

// Расширенные типы для decode ответа
export interface ColorWithSubitems extends Color {
  selectedSubitem: unknown[];
  colour_price_oneside_change?: string;
  colour_price_twoside_change?: string;
  is_include_in_pricelist?: string;
  colour_prevailing?: string;
  color_text?: string;
}
