import { DefaultTheme, useTheme } from 'styled-components';
import { useMediaQuery } from './useMediaQuery';

export type BreakpointKey = keyof DefaultTheme['breakpoints'] | 'base';
export type BreakPointFilter = (keyof DefaultTheme['breakpoints'])[];

export function useBreakpoint(
  breakpointFilter?: BreakPointFilter
): BreakpointKey {
  const { breakpoints } = useTheme();

  const givenBreakpointNames = breakpointFilter ?? Object.keys(breakpoints);

  // Get names/widths of breakpoints in descending order
  const breakpointNames = Object.keys(breakpoints)
    .filter(name => givenBreakpointNames.includes(name))
    .reverse();

  const breakpointWidths = Object.entries(breakpoints)
    .filter(([name]) => breakpointNames.includes(name))
    .map(bps => bps[1])
    .reverse();

  const listeners = breakpointWidths.map(v =>
    useMediaQuery(`(min-width: ${v}px)`)
  );

  // Return the first breakpoint that's active
  const activeIndex = listeners.findIndex(Boolean);
  return (breakpointNames[activeIndex] ?? 'base') as BreakpointKey;
}
