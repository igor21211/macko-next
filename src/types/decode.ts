import { ColorWithSubitems } from './color';
import { Glass } from './glass';
import { FurnitureWithOptions } from './furniture';
import { Model, Shape, View, Decor, Options, Construction, Handle } from './common';

export interface DecodeResponse {
  model: Model;
  shape: Shape;
  colors: {
    outside: ColorWithSubitems;
    inside: ColorWithSubitems;
  };
  colors_frame: {
    outside: ColorWithSubitems;
    inside: ColorWithSubitems;
  };
  glass: Glass;
  decor: {
    outside: Decor;
    inside: Decor;
  };
  furniture: {
    outside: FurnitureWithOptions;
    inside: FurnitureWithOptions;
  };
  view: View;
  handles: {
    outside: Handle;
    inside: Handle;
  };
  options: Options;
  black: number;
  construction: Construction;
  messages: unknown[];
}

export interface DecodeApiResponse {
  json: DecodeResponse;
}
