export interface Glass {
  id: string;
  title: string;
  url: string;
  category: string;
  active: boolean;
  image_png: string;
  image_pattern: string;
  pattern_width: number;
  pattern_height: number;
  repeat_pattern: string;
  sandblasting: string;
  ord: number;
  is_translated: boolean;
  price: number;
  code: string;
  is_canbesafe: boolean;
  safe_price: number;
  safe_code: string;
  is_standard: boolean;
  is_include_in_pricelist: boolean;
  is_empty: boolean;
  safeglass: number;
}
