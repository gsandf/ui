import { createMediaQueries } from './breakpoints';
import { theme as defaultTheme } from './default-theme';
import { createMixins } from './mixins';
import type { CustomTheme } from './types';

export * from './types';
export { defaultTheme };

export type CreatedTheme<T extends CustomTheme> = T & {
  media: ReturnType<typeof createMediaQueries>;
  mixins: ReturnType<typeof createMixins>;
};

export interface Theme extends CreatedTheme<typeof defaultTheme> {}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export function createTheme<T extends CustomTheme>(theme: T): CreatedTheme<T> {
  const media = createMediaQueries(theme.breakpoints);
  const mixins = createMixins(media);

  return {
    ...theme,
    media,
    mixins
  };
}
