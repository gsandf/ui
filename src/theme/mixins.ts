import { getOr } from '@blakek/deep';
import { css, CSSProp, DefaultTheme } from 'styled-components';
import { omit } from '../utils';
import type { Breakpoints, MediaQueries, ResponsiveRule } from './types';

export function createMixins(media: MediaQueries<Breakpoints>) {
  const mediaQueries = Object.entries(omit(media.up, 'from'));

  function mapResponsive<T>(
    styles: ResponsiveRule<T>,
    mapper: (val: T, breakpointName: string) => CSSProp
  ) {
    if (styles === undefined || styles === null) {
      return;
    }

    if (!Array.isArray(styles)) {
      return mapper(styles, 'base');
    }

    const [defaultStyle, ...otherStyles] = styles;

    const baseStyle = mapper(defaultStyle, 'base');

    const breakpointStyles = otherStyles.flatMap((style, index) => {
      const styleRules = mapper(style, mediaQueries[index][0]);

      if (!styleRules) return [];

      return css`
        ${mediaQueries[index][1]} {
          ${styleRules}
        }
      `;
    });

    return css`
      ${baseStyle}
      ${breakpointStyles}
    `;
  }

  function createRuleForProp(
    prop: string,
    ruleName: string | string[],
    themePath?: keyof DefaultTheme | (keyof DefaultTheme)[]
  ) {
    const ruleNames = Array.isArray(ruleName) ? ruleName : [ruleName];
    const themePaths = Array.isArray(themePath) ? themePath : [themePath];

    return function (props: Record<string, unknown> & { theme: DefaultTheme }) {
      const styles = props[prop];

      return mapResponsive(styles, (inputValue: string | number) => {
        // Try and get a value from the theme to apply. Otherwise, use the value
        // supplied directly.
        const value = themePaths.reduceRight<string | number>(
          (currentValue, path) => {
            return getOr(currentValue, ['theme', path, inputValue], props);
          },
          inputValue
        );

        return ruleNames.map(name =>
          css({
            [name]: value
          })
        );
      });
    };
  }

  const boxMixins = css`
    ${createRuleForProp('$display', 'display')}
    ${createRuleForProp('$position', 'position')}
  `;

  const flexChildMixin = css`
    ${createRuleForProp('$alignSelf', 'align-self')}
    ${createRuleForProp('$basis', 'flex-basis', 'sizes')}
    ${createRuleForProp('$grow', 'flex-grow')}
    ${createRuleForProp('$shrink', 'flex-shrink')}
    ${createRuleForProp('$flex', 'flex')}
    ${createRuleForProp('$justifySelf', 'justify-self')}
  `;

  const flexContainerMixin = css`
    ${createRuleForProp('$alignItems', 'align-items')}
    ${createRuleForProp('$direction', 'flex-direction')}
    ${createRuleForProp('$flexDirection', 'flex-direction')}
    ${createRuleForProp('$wrap', 'flex-wrap')}
    ${createRuleForProp('$justifyContent', 'justify-content')}
  `;

  const themeBordersMixin = css`
    ${createRuleForProp('$border', 'border', 'borders')}
    ${createRuleForProp('$borderRadius', 'border-radius', 'radii')}
  `;

  const themeColorsMixin = css`
    ${createRuleForProp('$bg', 'background', 'colors')}
    ${createRuleForProp('$bgAttachment', 'background-attachment')}
    ${createRuleForProp('$bgClip', 'background-clip')}
    ${createRuleForProp('$bgColor', 'background-color', 'colors')}
    ${createRuleForProp('$bgImage', 'background-image')}
    ${createRuleForProp('$bgOrigin', 'background-origin')}
    ${createRuleForProp('$bgPosition', 'background-position')}
    ${createRuleForProp('$bgRepeat', 'background-repeat')}
    ${createRuleForProp('$bgSize', 'background-size')}
    ${createRuleForProp('$color', 'color', 'colors')}
  `;

  const themeFontsMixin = css`
    ${createRuleForProp('$font', 'font-family', 'fonts')}
    ${createRuleForProp('$fontSize', 'font-size', 'fontSizes')}
    ${createRuleForProp('$fontStyle', 'font-style')}
    ${createRuleForProp('$fontWeight', 'font-weight', 'fontWeights')}
    ${createRuleForProp('$lineHeight', 'line-height', 'lineHeights')}
    ${createRuleForProp('$textAlign', 'text-align')}
    ${createRuleForProp('$textTransform', 'text-transform')}
  `;

  const themeShadowsMixin = css`
    ${createRuleForProp('$shadow', 'box-shadow', 'shadows')}
    ${createRuleForProp('$textShadow', 'text-shadow', 'shadows')}
  `;

  const themeSizeMixin = css`
    ${createRuleForProp('$flexBasis', 'flex-basis', ['sizes', 'space'])}
    ${createRuleForProp('$height', 'height', ['sizes', 'space'])}
    ${createRuleForProp('$maxHeight', 'max-height', ['sizes', 'space'])}
    ${createRuleForProp('$maxWidth', 'max-width', ['sizes', 'space'])}
    ${createRuleForProp('$minHeight', 'min-height', ['sizes', 'space'])}
    ${createRuleForProp('$minWidth', 'min-width', ['sizes', 'space'])}
    ${createRuleForProp('$width', 'width', ['sizes', 'space'])}
  `;

  const themeSpaceMixin = css`
    ${createRuleForProp('$m', 'margin', 'space')}

    ${createRuleForProp('$mx', ['margin-right', 'margin-left'], 'space')}
    ${createRuleForProp('$my', ['margin-top', 'margin-bottom'], 'space')}

    ${createRuleForProp('$mt', 'margin-top', 'space')}
    ${createRuleForProp('$mr', 'margin-right', 'space')}
    ${createRuleForProp('$mb', 'margin-bottom', 'space')}
    ${createRuleForProp('$ml', 'margin-left', 'space')}

    ${createRuleForProp('$p', 'padding', 'space')}

    ${createRuleForProp('$px', ['padding-right', 'padding-left'], 'space')}
    ${createRuleForProp('$py', ['padding-top', 'padding-bottom'], 'space')}

    ${createRuleForProp('$pt', 'padding-top', 'space')}
    ${createRuleForProp('$pr', 'padding-right', 'space')}
    ${createRuleForProp('$pb', 'padding-bottom', 'space')}
    ${createRuleForProp('$pl', 'padding-left', 'space')}
  `;

  const themeMixin = css`
    ${boxMixins}
    ${flexChildMixin}
    ${flexContainerMixin}
    ${themeBordersMixin}
    ${themeColorsMixin}
    ${themeFontsMixin}
    ${themeShadowsMixin}
    ${themeSizeMixin}
    ${themeSpaceMixin}
  `;

  return {
    boxMixins,
    createRuleForProp,
    flexChildMixin,
    flexContainerMixin,
    mapResponsive,
    themeBordersMixin,
    themeColorsMixin,
    themeFontsMixin,
    themeShadowsMixin,
    themeSizeMixin,
    themeSpaceMixin,
    themeMixin
  };
}
