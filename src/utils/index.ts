/** If the current rendering environment is likely ReactDOMServer? */
export const isServer = typeof window === 'undefined';

/** If the current rendering environment is a browser */
export const isBrowser = !isServer;

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
