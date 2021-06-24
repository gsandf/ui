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
  readonly borders?: Record<string, CSSProperties['border']>;
  readonly breakpoints?: Record<string, number>;
  readonly colors?: Record<string, CSSProperties['backgroundColor']>;
  readonly components?: ComponentStyles;
  readonly fonts?: Record<string, CSSProperties['fontFamily']>;
  readonly fontSizes?: CSSProperties['fontSize'][];
  readonly fontWeights?: Record<string, CSSProperties['fontWeight']>;
  readonly lineHeights?: Record<string, CSSProperties['lineHeight']>;
  readonly radii?: Record<string, CSSProperties['borderRadius']>;
  readonly shadows?: Record<string, CSSProperties['boxShadow']>;
  readonly sizes?: Record<string | number, string>;
  readonly space?: (string | number)[] | Record<string | number, string>;
  readonly styles?:
    | GlobalStyleComponent<unknown, unknown>
    | (() => ReactElement);
  readonly transitions?: GlobalStyleComponent<
    unknown,
    CSSProperties['transition']
  >;
  readonly zIndices?: Record<string, CSSProperties['zIndex']>;
  [x: string]: unknown;
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
