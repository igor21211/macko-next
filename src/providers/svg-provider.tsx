'use client';

import { createContext, useCallback, useContext, useMemo, useRef } from 'react';

type DoorSide = 'inside' | 'outside';

interface SvgRegistryContextValue {
  registerSvg: (side: DoorSide, element: SVGSVGElement | null) => void;
  getSvg: (side: DoorSide) => SVGSVGElement | null;
  getSerializedSvg: (side: DoorSide) => string | null;
}

const SvgRegistryContext = createContext<SvgRegistryContextValue | null>(null);

export const SvgProvider = ({ children }: { children: React.ReactNode }) => {
  const insideRef = useRef<SVGSVGElement | null>(null);
  const outsideRef = useRef<SVGSVGElement | null>(null);
  const insideStrRef = useRef<string | null>(null);
  const outsideStrRef = useRef<string | null>(null);

  const registerSvg = useCallback((side: DoorSide, element: SVGSVGElement | null) => {
    if (side === 'inside') {
      insideRef.current = element;
      insideStrRef.current = element ? element.outerHTML : null;
      return;
    }
    outsideRef.current = element;
    outsideStrRef.current = element ? element.outerHTML : null;
  }, []);

  const getSvg = useCallback((side: DoorSide) => {
    return side === 'inside' ? insideRef.current : outsideRef.current;
  }, []);

  const getSerializedSvg = useCallback((side: DoorSide) => {
    return side === 'inside' ? insideStrRef.current : outsideStrRef.current;
  }, []);

  const value = useMemo(
    () => ({ registerSvg, getSvg, getSerializedSvg }),
    [registerSvg, getSvg, getSerializedSvg]
  );

  return <SvgRegistryContext.Provider value={value}>{children}</SvgRegistryContext.Provider>;
};

export const useSvgRegistry = () => {
  const ctx = useContext(SvgRegistryContext);
  if (!ctx) throw new Error('useSvgRegistry must be used within SvgProvider');
  return ctx;
};
