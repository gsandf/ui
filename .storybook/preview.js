import { ThemeProvider } from 'styled-components';
import { createTheme, defaultTheme } from '../src/theme';

const withThemeProvider = (Story, context) => {
  const theme = createTheme(defaultTheme);
  const GlobalStyles = theme.styles;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <Story {...context} />
    </ThemeProvider>
  );
};

export const decorators = [withThemeProvider];

const presetColors = Object.entries(defaultTheme.colors).map(
  ([title, color]) => ({ color, title })
);

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*'
  },
  controls: {
    hideNoControlsWarning: true,
    matchers: {
      color: /\$(bg|bgColor|color)$/i
    },
    presetColors
  }
};
