import { useCallback, useEffect, useState } from 'react';
import { isBrowser, noop } from '../utils';

const isSupported = isBrowser && 'matchMedia' in window;

/**
 * Detects when a media query matches the current window.
 */
export function useMediaQuery(query: string): boolean {
  const [doesMatch, setDoesMatch] = useState(
    isSupported ? matchMedia(query).matches : false
  );

  const changeListener = useCallback((event: MediaQueryListEvent) => {
    setDoesMatch(event.matches);
  }, []);

  useEffect(() => {
    if (!isSupported) return noop;

    const media = matchMedia(query);
    media.addEventListener('change', changeListener);

    return () => {
      media.removeEventListener('change', changeListener);
    };
  });

  return doesMatch;
}
