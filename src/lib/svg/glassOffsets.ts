export interface GlassOffsetsInput {
  modelCode: string;
  doorWidth: number;
  doorHeight: number;
  doorLeftWidth: number;
  doorRightWidth: number;
  doorTopHeight: number;
  glassW: number;
  glassH: number;
}

export interface GlassOffsetsResult {
  patternX: number | '50%' | '100%';
  imageX: number;
  imageY: number;
}

export const computeGlassOffsets = (input: GlassOffsetsInput): GlassOffsetsResult => {
  const {
    modelCode,
    doorWidth,
    doorHeight,
    doorLeftWidth,
    doorRightWidth,
    doorTopHeight,
    glassW,
    glassH,
  } = input;

  // patternX — логика как во Vue (model-glass.vue)
  let patternX: number | '50%' | '100%' = 0;
  const model = modelCode;
  if (model.startsWith('c')) {
    if (model === 'c04') patternX = '100%';
    if (doorTopHeight === 0 && doorLeftWidth === 0 && doorRightWidth === 0) {
      patternX = model === 'c07' ? 0 : '50%';
    }
    if (doorTopHeight === 0 && doorLeftWidth === 0 && doorRightWidth > 0) {
      patternX = model === 'c03' || model === 'c08' ? '50%' : 0;
    }
    if (doorTopHeight > 0 && doorLeftWidth === 0 && doorRightWidth > 0) {
      patternX = model === 'c03' ? '100%' : 0;
    }
    if (doorTopHeight > 0 && doorLeftWidth > 0 && doorRightWidth > 0) {
      patternX = '100%';
    }
  }
  if (model === 'c20n') patternX = 0;

  // imageX, imageY — логика как во Vue (центрирование, если не 400)
  const imageX = parseInt(String(glassW), 10) === 400 ? 0 : (doorWidth - glassW) / 2;
  const imageY = parseInt(String(glassH), 10) === 400 ? 0 : (doorHeight - glassH) / 2;

  return { patternX, imageX, imageY };
};
