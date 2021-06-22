import type {
  AnyStyledComponent,
  StyledComponentInnerComponent,
  StyledComponentInnerOtherProps,
  StyledComponentPropsWithRef
} from 'styled-components';

export * from './formatString';

/** If the current rendering environment is likely ReactDOMServer? */
export const isServer = typeof window === 'undefined';

/** If the current rendering environment is a browser */
export const isBrowser = !isServer;

/**
 * Makes sure a given value has a unit at the end. The default unit is `px`.
 */
export function ensureUnit(
  value: string | number | Array<string | number>,
  unit = 'px'
): string | string[] {
  if (Array.isArray(value)) {
    return value.flatMap(v => ensureUnit(v, unit));
  }

  if (typeof value === 'number') {
    return `${value}${unit}`;
  }

  if (Number.isFinite(Number(value))) {
    return `${value}${unit}`;
  }

  return value;
}

/** Do nothing */
export const noop = () => {};

/**
 * Simple function for returning a shallow copy of an object with a property
 * removed.
 */
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  key: K
): Omit<T, K> {
  if (key in obj) {
    const { [key]: _, ...rest } = obj;
    return rest;
  }
  return obj;
}

interface WithAsProp {
  as?: React.ElementType | keyof JSX.IntrinsicElements;
}

/**
 * Helper for extracting props from a Styled Component.
 */
export type StyledComponentProps<T extends AnyStyledComponent> =
  StyledComponentPropsWithRef<StyledComponentInnerComponent<T>> &
    StyledComponentInnerOtherProps<T> &
    WithAsProp;
