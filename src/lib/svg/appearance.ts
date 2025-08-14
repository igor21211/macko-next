import { DecodeResponse } from '@/types/decode';
import { getImageSrc } from '@/lib/utils/useImageSrc';

export type DoorSide = 'inside' | 'outside';

export interface DoorAppearance {
  fillColor: string;
  strokeColor?: string;
  lamination?: { id: string; href: string; w: number; h: number };
  glass?: { id: string; href: string; w: number; h: number };
}

export const buildDoorAppearance = (decoded: DecodeResponse, side: DoorSide): DoorAppearance => {
  const color = decoded.colors[side];
  const isBlack = (decoded.black ?? 0) > 0;

  const fillColor = isBlack ? '#000' : color.colour_prevailing || color.colour || '#000';

  const laminationSrc = color.pattern_svg || color.pattern_image;
  const lamination = laminationSrc
    ? {
        id: `${side}_lamination`,
        href: getImageSrc(laminationSrc),
        w: Number(color.pattern_width || 400),
        h: Number(color.pattern_height || 400),
      }
    : undefined;

  const glass = decoded.glass?.image_pattern
    ? {
        id: `${side}_glass`,
        href: getImageSrc(decoded.glass.image_pattern),
        w: Number(decoded.glass.pattern_width || 400),
        h: Number(decoded.glass.pattern_height || 400),
      }
    : undefined;

  return {
    fillColor,
    strokeColor: color.stroke,
    lamination,
    glass,
  };
};
