import { useState, useEffect, RefObject } from 'react';

export const useScrollByArrow = <T extends HTMLElement>(scrollRef: RefObject<T | null>) => {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollButtons();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollRef.current]);

  const handleScrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.offsetWidth / 2;
    el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.offsetWidth / 2;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return {
    canScrollLeft,
    canScrollRight,
    handleScrollLeft,
    handleScrollRight,
  };
};
