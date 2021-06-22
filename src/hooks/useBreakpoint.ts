import { DefaultTheme, useTheme } from 'styled-components';
import { useMediaQuery } from './useMediaQuery';

type BreakpointKey = keyof DefaultTheme['breakpoints'] | 'base';

export function useBreakpoint() {
  const { breakpoints } = useTheme();

  // Get names/widths of breakpoints in descending order
  const breakpointNames = Object.keys(breakpoints).reverse();
  const breakpointWidths = Object.values(breakpoints).reverse();

  const listeners = breakpointWidths.map(v =>
    useMediaQuery(`(min-width: ${v}px)`)
  );

  // Return the first breakpoint that's active
  const activeIndex = listeners.findIndex(Boolean);

  return (breakpointNames[activeIndex] ?? 'base') as BreakpointKey;
}
