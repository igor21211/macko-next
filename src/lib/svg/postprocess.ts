export const ensureDefs = (svg: SVGSVGElement): SVGDefsElement => {
  let defs = svg.querySelector('defs');
  if (!defs) {
    defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.insertBefore(defs, svg.firstChild);
  }
  return defs as SVGDefsElement;
};

export const createPatternImage = (
  defs: SVGDefsElement,
  id: string,
  href: string,
  w: number,
  h: number
) => {
  let p = defs.querySelector(`#${id}`) as SVGPatternElement | null;
  if (!p) {
    p = document.createElementNS('http://www.w3.org/2000/svg', 'pattern') as SVGPatternElement;
    p.setAttribute('id', id);
    p.setAttribute('patternUnits', 'userSpaceOnUse');
    defs.appendChild(p);
  }
  p.setAttribute('x', '0');
  p.setAttribute('y', '0');
  p.setAttribute('width', String(w));
  p.setAttribute('height', String(h));

  let img = p.querySelector('image') as SVGImageElement | null;
  if (!img) {
    img = document.createElementNS('http://www.w3.org/2000/svg', 'image') as SVGImageElement;
    p.appendChild(img);
  }
  img.setAttribute('x', '0');
  img.setAttribute('y', '0');
  img.setAttribute('width', String(w));
  img.setAttribute('height', String(h));
  img.setAttributeNS('http://www.w3.org/1999/xlink', 'href', href);
  return p;
};

export const setFillFor = (root: SVGSVGElement, selectors: string[], fill: string) => {
  selectors.forEach((sel) =>
    root.querySelectorAll(sel).forEach((el) => (el as SVGElement).setAttribute('fill', fill))
  );
};

export const setStrokeFor = (root: SVGSVGElement, selectors: string[], stroke: string) => {
  selectors.forEach((sel) =>
    root.querySelectorAll(sel).forEach((el) => (el as SVGElement).setAttribute('stroke', stroke))
  );
};

export const setInlineFillFor = (root: SVGSVGElement, selectors: string[], fill: string) => {
  selectors.forEach((sel) => {
    root.querySelectorAll(sel).forEach((el) => {
      const svgEl = el as SVGElement;
      const prev = svgEl.getAttribute('style') || '';
      const next = `${prev}${prev && !prev.trim().endsWith(';') ? ';' : ''} fill: ${fill} !important;`;
      svgEl.setAttribute('style', next);
    });
  });
};

export const setInlineStrokeFor = (root: SVGSVGElement, selectors: string[], stroke: string) => {
  selectors.forEach((sel) => {
    root.querySelectorAll(sel).forEach((el) => {
      const svgEl = el as SVGElement;
      const prev = svgEl.getAttribute('style') || '';
      const next = `${prev}${prev && !prev.trim().endsWith(';') ? ';' : ''} stroke: ${stroke} !important;`;
      svgEl.setAttribute('style', next);
    });
  });
};

export const setPatternPosition = (
  pattern: SVGPatternElement,
  x: string | number,
  y: string | number = 0
) => {
  pattern.setAttribute('x', String(x));
  pattern.setAttribute('y', String(y));
};

export const setPatternImageOffset = (pattern: SVGPatternElement, x: number, y: number) => {
  const img = pattern.querySelector('image') as SVGImageElement | null;
  if (!img) return;
  img.setAttribute('x', String(x));
  img.setAttribute('y', String(y));
};
