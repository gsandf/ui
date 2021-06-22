import {
  BreakPointFilter,
  BreakpointKey,
  useBreakpoint
} from './useBreakpoint';

/**
 * Returns a value based on the current window size.
 */
export function useBreakpointValue<T>(
  breakpointValues: Partial<Record<BreakpointKey, T>>
): T {
  const activeBreakpoint = useBreakpoint(
    Object.keys(breakpointValues) as BreakPointFilter
  );

  return breakpointValues[activeBreakpoint] ?? breakpointValues.base;
}
