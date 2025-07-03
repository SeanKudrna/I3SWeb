/**
 * Custom hook for responsive design media queries
 */

import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '../utils/constants';

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
};

export const useIsMobile = () => useMediaQuery(`(max-width: ${BREAKPOINTS.mobile}px)`);
export const useIsTablet = () => useMediaQuery(`(max-width: ${BREAKPOINTS.tablet}px)`);
export const useIsDesktop = () => useMediaQuery(`(min-width: ${BREAKPOINTS.desktop}px)`);
export const useIsWide = () => useMediaQuery(`(min-width: ${BREAKPOINTS.wide}px)`);