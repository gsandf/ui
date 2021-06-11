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

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*'
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
