import {
  BreakPointFilter,
  BreakpointKey,
  useBreakpoint
} from './useBreakpoint';

export function useBreakpointValue<T>(
  breakpointValues: Partial<Record<BreakpointKey, T>>
): T {
  const activeBreakpoint = useBreakpoint(
    Object.keys(breakpointValues) as BreakPointFilter
  );

  return breakpointValues[activeBreakpoint] ?? breakpointValues.base;
}
