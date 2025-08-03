export interface DecorItem {
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

export interface DecorSide {
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

export interface DecorResponse {
  outside: DecorSide;
  inside: DecorSide;
}

export interface DecorApiResponse {
  json: DecorResponse;
}
