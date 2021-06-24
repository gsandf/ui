import { createMediaQueries } from './breakpoints';
import { theme as defaultTheme } from './default-theme';
import { createMixins } from './mixins';
import type { CustomTheme } from './types';

export * from './types';
export { defaultTheme };
export const DefaultGlobalStyles = defaultTheme.styles;

export type CreatedTheme<T extends CustomTheme> = Readonly<
  T & {
    media: ReturnType<typeof createMediaQueries>;
    mixins: ReturnType<typeof createMixins>;
  }
>;

export interface Theme extends CreatedTheme<typeof defaultTheme> {}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export function createTheme<T extends CustomTheme>(theme: T): CreatedTheme<T> {
  const media = createMediaQueries(theme.breakpoints);
  const mixins = createMixins(media);

  const createdTheme = {
    ...defaultTheme,
    media,
    mixins
  } as Partial<CustomTheme>;

  for (const prop in theme) {
    createdTheme[prop as keyof CustomTheme] = {
      ...defaultTheme[prop as keyof CustomTheme],
      ...theme[prop]
    };
  }

  return createdTheme as CreatedTheme<T>;
}
