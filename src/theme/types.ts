import React, { CSSProperties, ReactElement } from 'react';
import { CSSProp, DefaultTheme, GlobalStyleComponent } from 'styled-components';

export type ResponsiveRule<T> = T | T[];

/**
 * Creates a property that can be a standard CSS value, found within the
 * theme, or an array of either/both.
 */
export type ResponsiveProperty<
  CSSProperty extends keyof CSSProperties = never,
  ThemeProperty extends keyof DefaultTheme = never
> = ResponsiveRule<
  CSSProperties[CSSProperty] | keyof DefaultTheme[ThemeProperty]
>;

export interface BoxMixinProps {
  $display?: ResponsiveProperty<'display'>;
  $position?: ResponsiveProperty<'position'>;
}

export interface FlexChildProps {
  $alignSelf?: ResponsiveProperty<'alignSelf'>;
  $basis?: ResponsiveProperty<'flexBasis', 'sizes'>;
  $flex?: ResponsiveProperty<'flex'>;
  $grow?: ResponsiveProperty<'flexGrow'>;
  $justifySelf?: ResponsiveProperty<'justifySelf'>;
  $shrink?: ResponsiveProperty<'flexShrink'>;
}

export interface FlexContainerProps {
  $alignItems?: ResponsiveProperty<'alignItems'>;
  $justifyContent?: ResponsiveProperty<'justifyContent'>;
  $direction?: ResponsiveProperty<'flexDirection'>;
  $wrap?: ResponsiveProperty<'flexWrap'>;
}

export interface ThemeBordersMixinProps {
  $border?: ResponsiveProperty<'border', 'borders'>;
  $borderRadius?: ResponsiveProperty<'borderRadius', 'radii'>;
}

export interface ThemeColorsMixinProps {
  $bg?: ResponsiveProperty<'background', 'colors'>;
  $bgAttachment?: ResponsiveProperty<'backgroundAttachment'>;
  $bgClip?: ResponsiveProperty<'backgroundClip'>;
  $bgColor?: ResponsiveProperty<'backgroundColor', 'colors'>;
  $bgImage?: ResponsiveProperty<'backgroundImage'>;
  $bgOrigin?: ResponsiveProperty<'backgroundOrigin'>;
  $bgPosition?: ResponsiveProperty<'backgroundPosition'>;
  $bgRepeat?: ResponsiveProperty<'backgroundRepeat'>;
  $bgSize?: ResponsiveProperty<'backgroundSize'>;
  $color?: ResponsiveProperty<'color', 'colors'>;
}

export interface ThemeFontsMixinProps {
  $font?: ResponsiveProperty<'fontFamily', 'fonts'>;
  $fontSize?: ResponsiveProperty<'fontSize', 'fontSizes'>;
  $fontStyle?: ResponsiveProperty<'fontStyle'>;
  $fontWeight?: ResponsiveProperty<'fontWeight', 'fontWeights'>;
  $lineHeight?: ResponsiveProperty<'lineHeight', 'lineHeights'>;
  $textAlign?: ResponsiveProperty<'textAlign'>;
  $textTransform?: ResponsiveProperty<'textTransform'>;
}

export interface ThemeShadowsMixinProps {
  $shadow?: ResponsiveProperty<'boxShadow', 'shadows'>;
  $textShadow?: ResponsiveProperty<'textShadow', 'shadows'>;
}

export interface ThemeSizeMixinProps {
  $flexBasis?: ResponsiveProperty<'flexBasis', 'sizes'>;
  $height?: ResponsiveProperty<'height', 'sizes'>;
  $maxHeight?: ResponsiveProperty<'maxHeight', 'sizes'>;
  $maxWidth?: ResponsiveProperty<'maxWidth', 'sizes'>;
  $minHeight?: ResponsiveProperty<'minHeight', 'sizes'>;
  $minWidth?: ResponsiveProperty<'minWidth', 'sizes'>;
  $width?: ResponsiveProperty<'width', 'sizes'>;
}

export interface ThemeSpaceMixinProps {
  $m?: ResponsiveProperty<'margin', 'space'>;
  $mb?: ResponsiveProperty<'marginBottom', 'space'>;
  $ml?: ResponsiveProperty<'marginLeft', 'space'>;
  $mr?: ResponsiveProperty<'marginRight', 'space'>;
  $mt?: ResponsiveProperty<'marginTop', 'space'>;
  $mx?: ResponsiveProperty<'marginLeft', 'space'>;
  $my?: ResponsiveProperty<'marginTop', 'space'>;
  $p?: ResponsiveProperty<'padding', 'space'>;
  $pb?: ResponsiveProperty<'paddingBottom', 'space'>;
  $pl?: ResponsiveProperty<'paddingLeft', 'space'>;
  $pr?: ResponsiveProperty<'paddingRight', 'space'>;
  $pt?: ResponsiveProperty<'paddingTop', 'space'>;
  $px?: ResponsiveProperty<'paddingLeft', 'space'>;
  $py?: ResponsiveProperty<'paddingTop', 'space'>;
}

export interface BaseComponentProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export type ComponentStyles = Record<
  string,
  {
    baseStyle?: CSSProp<unknown>;
    variants?: Record<string, CSSProp<unknown>>;
  }
>;

export interface CustomTheme {
  borders?: Record<string, CSSProperties['border']>;
  breakpoints?: Record<string, number>;
  colors?: Record<string, CSSProperties['backgroundColor']>;
  components?: ComponentStyles;
  fonts?: Record<string, CSSProperties['fontFamily']>;
  fontSizes?: CSSProperties['fontSize'][];
  fontWeights?: Record<string, CSSProperties['fontWeight']>;
  lineHeights?: Record<string, CSSProperties['lineHeight']>;
  radii?: Record<string, CSSProperties['borderRadius']>;
  shadows?: Record<string, CSSProperties['boxShadow']>;
  sizes?: Record<string | number, string>;
  space?: (string | number)[] | Record<string | number, string>;
  styles?: GlobalStyleComponent<unknown, unknown> | (() => ReactElement);
  transitions?: GlobalStyleComponent<unknown, CSSProperties['transition']>;
  zIndices?: Record<string, CSSProperties['zIndex']>;
}

export interface ThemeMixinProps
  extends BoxMixinProps,
    BaseComponentProps,
    FlexChildProps,
    FlexContainerProps,
    ThemeBordersMixinProps,
    ThemeColorsMixinProps,
    ThemeFontsMixinProps,
    ThemeShadowsMixinProps,
    ThemeSizeMixinProps,
    ThemeSpaceMixinProps {}
