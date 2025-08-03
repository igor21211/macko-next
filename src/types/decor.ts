// Базовый интерфейс для декора
export interface BaseDecor {
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

// Наследующие интерфейсы
export interface DecorItem extends BaseDecor {}

export interface DecorSide extends BaseDecor {}

export interface DecorResponse {
  outside: DecorSide;
  inside: DecorSide;
}

export interface DecorApiResponse {
  json: DecorResponse;
}
