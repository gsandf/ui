export interface Breakpoints {
  [x: string]: number;
}

type CustomMediaQuery = {
  from: (x: number) => string;
};

type MediaQuerySet<B extends Breakpoints> = Record<keyof B, string> &
  CustomMediaQuery;

export interface MediaQueries<B extends Breakpoints> {
  down: MediaQuerySet<B>;
  up: MediaQuerySet<B>;
}

const createMaxWidthQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;

const createMinWidthQuery = (minWidth: number) =>
  `@media (min-width: ${minWidth}px)`;

export function createMediaQueries<B extends Breakpoints>(
  breakpoints: B
): MediaQueries<B> {
  const customBreakpoints = {
    down: { from: createMaxWidthQuery },
    up: { from: createMinWidthQuery }
  };

  return sortBreakpointsAscending(breakpoints).reduce(
    (breakpointList, [name, width]) => {
      return {
        down: {
          ...breakpointList.down,
          [name]: createMaxWidthQuery(width - 1)
        },
        up: {
          ...breakpointList.up,
          [name]: createMinWidthQuery(width)
        }
      };
    },
    customBreakpoints
  ) as MediaQueries<B>;
}

export function sortBreakpointsAscending<B extends Breakpoints>(
  breakpoints: B
): [keyof B, number][] {
  return Object.entries(breakpoints).sort(([, a], [, b]) => {
    if (a === b) return 0;
    if (a > b) return 1;
    return -1;
  });
}
