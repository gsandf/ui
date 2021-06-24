import { normalize } from 'polished';
import {
  createGlobalStyle,
  css,
  GlobalStyleComponent
} from 'styled-components';
import { ComponentStyles } from './types';

const palette = {
  red: '#e45b66',
  tan: '#e2c58c',
  transparent: 'transparent',
  white: '#ffffff',
  gray100: '#050000',
  gray200: '#0a0808',
  gray300: '#404040',
  gray400: '#646464',
  gray500: '#8e8e8e',
  gray600: '#aeaeae',
  gray700: '#d6d6d6',
  gray800: '#ebebeb',
  gray900: '#f2f2f2'
};

export const colors = {
  ...palette,
  primary: palette.gray200,
  onPrimary: palette.white,
  accent: palette.tan,
  onAccent: palette.gray200,
  background: palette.white,
  dark: palette.gray300,
  onDark: palette.white,
  darken: palette.gray800,
  onDarken: palette.gray100,
  textDark: palette.gray200,
  textDarker: palette.gray100,
  textLight: palette.white
};

export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440
};

export const borders = {
  card: `1px solid ${colors.gray800}`,
  control: `1px solid ${colors.gray700}`,
  controlActive: `2px solid ${colors.primary}`,
  thick: `8px solid ${colors.dark}`
};

export const fonts = {
  body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  heading:
    'Roboto Condensed, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  monospace: 'IBM Plex Mono, Menlo, monospace'
};

export const fontSizes = [
  '0.64rem',
  '0.78rem',
  '1rem',
  '1.25rem',
  '1.333rem',
  '2rem',
  '2.667rem',
  '3.05rem',
  '3.815rem'
];

export const fontWeights = {
  body: 400,
  button: 700,
  heading: 700,
  display: 700
};

export const lineHeights = {
  body: 1.89,
  control: 1.15,
  heading: 1.3
};

export const radii = {
  none: '0',
  sm: '4px',
  md: '8px'
};

export const sizes = {
  '0': '0',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '2/6': '33.333333%',
  '3/6': '50%',
  '4/6': '66.666667%',
  '5/6': '83.333333%',
  '1/12': '8.333333%',
  '2/12': '16.666667%',
  '3/12': '25%',
  '4/12': '33.333333%',
  '5/12': '41.666667%',
  '6/12': '50%',
  '7/12': '58.333333%',
  '8/12': '66.666667%',
  '9/12': '75%',
  '10/12': '83.333333%',
  '11/12': '91.666667%',
  xs: '2rem',
  sm: '4rem',
  md: '8rem',
  lg: '16rem',
  xl: '32rem',
  full: '100%',
  screenHeight: '100vh',
  screenWidth: '100vw'
};

export const space = {
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem',
  128: '32rem'
};

export const shadows = {
  default: `0 2px 10px 0 rgba(0,0,0,0.13);`,
  nav: `0 1px 0 0 ${colors.gray800}`,
  none: 'none',
  outline: `0 0 0 2px ${colors.primary}`,
  thinOutline: `0 0 0 1px ${colors.gray700}`
};

export const textStyles = {
  default: {
    fontFamily: fonts.body,
    fontSize: fontSizes[2],
    fontWeight: fontWeights.body,
    lineHeight: lineHeights.body
  },
  heading: {
    fontFamily: fonts.heading,
    fontWeight: fontWeights.heading,
    lineHeight: lineHeights.heading
  }
};

export const zIndices = {
  lower: -1,
  higher: 1,
  dialog: 100,
  menu: 90
};

export const styles = createGlobalStyle`
  ${normalize()}

  *, *::after, *::before {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  body {
    background-color: ${colors.background};
    color: ${colors.textDark};
    margin: 0;
    padding: 0;
    ${textStyles.default}
  }

  h1, h2, h3, h4, h5, h6 {
    ${textStyles.heading};
    margin: 0;

    > p:not([class]) {
      margin: 0;
    }
  }

  h1 {
    font-size: ${fontSizes[6]};
  }

  h2 {
    font-size: ${fontSizes[5]};
  }

  h3 {
    font-size: ${fontSizes[4]};
  }

  h4 {
    font-size: ${fontSizes[3]};
  }

  label:not([class]){
    padding-bottom: ${space[2]};
  }

  input:not([class]) {
    border: ${borders.control};
    border-radius: ${radii.sm};
    display: block;
    outline: none;
    padding-bottom: ${space[2]};
    padding-left: ${space[3]};
    padding-right: ${space[3]};
    padding-top: ${space[2]};
    width: 100%;

    :focus {
      border-color: transparent;
      box-shadow: ${shadows.outline};
    }
  }

  code, pre {
    font-family: ${fonts.monospace};
  }
`;

export const components: ComponentStyles = {
  Button: {
    baseStyle: css`
      border: ${borders.control};
      border-radius: ${radii.md};
      font-weight: 700;
      line-height: 1.2;
      padding: ${space[2]} ${space[3]};
      transition: all 250ms;

      :disabled {
        cursor: not-allowed;
        opacity: 0.4;
      }

      :focus:not(:disabled) {
        box-shadow: ${shadows.default};
      }
    `,
    variants: {
      small: {
        padding: `${space[1]} ${space[2]}`,
        fontSize: fontSizes[1]
      }
    }
  }
};

export const theme = {
  borders,
  breakpoints,
  colors,
  components,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  radii,
  shadows,
  sizes,
  space,
  styles,
  zIndices
} as const;
