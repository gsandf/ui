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

type DefaultTheme = typeof defaultTheme;

export interface Theme extends CreatedTheme<DefaultTheme> {}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

export function createTheme<T extends CustomTheme>(
  theme: T
): CreatedTheme<DefaultTheme & T> {
  const media = createMediaQueries(
    theme?.breakpoints ?? defaultTheme.breakpoints
  );

  const mixins = createMixins(media);

  return {
    ...defaultTheme,
    ...theme,
    media,
    mixins
  };
}
