import { get, getOr } from '@blakek/deep';
import { css, CSSProp } from 'styled-components';
import type { CreatedTheme } from '.';
import { omit } from '../utils';
import { ResponsiveRule } from './types';

export function createMixins(media: CreatedTheme<unknown>['media']) {
  const mediaQueries = Object.values(omit(media.up, 'from'));

  function mapResponsive<T>(
    styles: ResponsiveRule<T>,
    mapper: (val: T) => CSSProp
  ) {
    if (styles === undefined || styles === null) {
      return;
    }

    if (!Array.isArray(styles)) {
      return mapper(styles);
    }

    const [defaultStyle, ...otherStyles] = styles;

    const breakpointStyles = otherStyles.flatMap((style, index) => {
      const styleRules = mapper(style);

      if (!styleRules) return [];

      return css`
        ${mediaQueries[index]} {
          ${styleRules}
        }
      `;
    });

    return css`
      ${mapper(defaultStyle)}
      ${breakpointStyles}
    `;
  }

  function createRuleForProp(
    ruleName: string,
    themePath: string,
    prop: string
  ) {
    function createRule(props: any): CSSProp {
      const propValue = get(prop, props) as unknown;

      // Don't create any rules if no value was supplied
      if (propValue === undefined || propValue === null) return '';

      // An array means create breakpoints
      if (Array.isArray(propValue)) {
        const [defaultStyle, ...otherStyles] = propValue;

        const breakpointStyles = otherStyles.flatMap((style, index) => {
          const styles = createRule({ ...props, [prop]: style });

          if (!styles) return [];

          return css`
            ${mediaQueries[index]} {
              ${styles}
            }
          `;
        });

        return css`
          ${createRule({ ...props, [prop]: defaultStyle })}
          ${breakpointStyles}
        `;
      }

      // Try and get a value from the theme to apply. Otherwise, use the value
      // supplied directly.
      const value = getOr(propValue, `${themePath}.${propValue}`, props);

      return `${ruleName}: ${value};`;
    }

    return createRule;
  }

  // TODO: Consider extracting these out and creating an wrapper for
  // `createRuleForProps` that acccepts an array of objects containing the CSS
  // rule, prop name, and theme fallback
  const boxMixins = css`
    ${createRuleForProp('display', '', '$display')}
    ${createRuleForProp('position', '', '$position')}
  `;

  const flexChildMixin = css`
    ${createRuleForProp('align-self', '', '$alignSelf')}
    ${createRuleForProp('flex-basis', 'theme.sizes', '$basis')}
    ${createRuleForProp('flex-grow', '', '$grow')}
    ${createRuleForProp('flex-shrink', '', '$shrink')}
    ${createRuleForProp('flex', '', '$flex')}
    ${createRuleForProp('justify-self', '', '$justifySelf')}
  `;

  const flexContainerMixin = css`
    ${createRuleForProp('align-items', '', '$alignItems')}
    ${createRuleForProp('flex-direction', '', '$direction')}
    ${createRuleForProp('flex-direction', '', '$flexDirection')}
    ${createRuleForProp('flex-wrap', '', '$wrap')}
    ${createRuleForProp('justify-content', '', '$justifyContent')}
  `;

  const themeBordersMixin = css`
    ${createRuleForProp('border', 'theme.borders', '$border')}
    ${createRuleForProp('border-radius', 'theme.radii', '$borderRadius')}
  `;

  const themeColorsMixin = css`
    ${createRuleForProp('background', 'theme.colors', '$bg')}
    ${createRuleForProp('background-attachment', '', '$bgAttachment')}
    ${createRuleForProp('background-clip', '', '$bgClip')}
    ${createRuleForProp('background-color', 'theme.colors', '$bgColor')}
    ${createRuleForProp('background-image', '', '$bgImage')}
    ${createRuleForProp('background-origin', '', '$bgOrigin')}
    ${createRuleForProp('background-position', '', '$bgPosition')}
    ${createRuleForProp('background-repeat', '', '$bgRepeat')}
    ${createRuleForProp('background-size', '', '$bgSize')}
    ${createRuleForProp('color', 'theme.colors', '$color')}
  `;

  const themeFontsMixin = css`
    ${createRuleForProp('font-family', 'theme.fonts', '$font')}
    ${createRuleForProp('font-size', 'theme.fontSizes', '$fontSize')}
    ${createRuleForProp('font-style', '', '$fontStyle')}
    ${createRuleForProp('font-weight', 'theme.fontWeights', '$fontWeight')}
    ${createRuleForProp('line-height', 'theme.lineHeights', '$lineHeight')}
    ${createRuleForProp('text-align', '', '$textAlign')}
    ${createRuleForProp('text-transform', '', '$textTransform')}
  `;

  const themeShadowsMixin = css`
    ${createRuleForProp('box-shadow', 'theme.shadows', '$shadow')}
    ${createRuleForProp('text-shadow', 'theme.shadows', '$textShadow')}
  `;

  const themeSizeMixin = css`
    ${createRuleForProp('flex-basis', 'theme.sizes', '$flexBasis')}
    ${createRuleForProp('height', 'theme.sizes', '$height')}
    ${createRuleForProp('max-height', 'theme.sizes', '$maxHeight')}
    ${createRuleForProp('max-width', 'theme.sizes', '$maxWidth')}
    ${createRuleForProp('min-height', 'theme.sizes', '$minHeight')}
    ${createRuleForProp('min-width', 'theme.sizes', '$minWidth')}
    ${createRuleForProp('width', 'theme.sizes', '$width')}

    ${createRuleForProp('flex-basis', 'theme.space', '$flexBasis')}
    ${createRuleForProp('height', 'theme.space', '$height')}
    ${createRuleForProp('max-height', 'theme.space', '$maxHeight')}
    ${createRuleForProp('max-width', 'theme.space', '$maxWidth')}
    ${createRuleForProp('min-height', 'theme.space', '$minHeight')}
    ${createRuleForProp('min-width', 'theme.space', '$minWidth')}
    ${createRuleForProp('width', 'theme.space', '$width')}
  `;

  const themeSpaceMixin = css`
    ${createRuleForProp('margin-bottom', 'theme.space', '$mb')}
    ${createRuleForProp('margin-bottom', 'theme.space', '$my')}
    ${createRuleForProp('margin-left', 'theme.space', '$ml')}
    ${createRuleForProp('margin-left', 'theme.space', '$mx')}
    ${createRuleForProp('margin-right', 'theme.space', '$mr')}
    ${createRuleForProp('margin-right', 'theme.space', '$mx')}
    ${createRuleForProp('margin-top', 'theme.space', '$mt')}
    ${createRuleForProp('margin-top', 'theme.space', '$my')}
    ${createRuleForProp('margin', 'theme.space', '$m')}
    ${createRuleForProp('padding-bottom', 'theme.space', '$pb')}
    ${createRuleForProp('padding-bottom', 'theme.space', '$py')}
    ${createRuleForProp('padding-left', 'theme.space', '$pl')}
    ${createRuleForProp('padding-left', 'theme.space', '$px')}
    ${createRuleForProp('padding-right', 'theme.space', '$pr')}
    ${createRuleForProp('padding-right', 'theme.space', '$px')}
    ${createRuleForProp('padding-top', 'theme.space', '$pt')}
    ${createRuleForProp('padding-top', 'theme.space', '$py')}
    ${createRuleForProp('padding', 'theme.space', '$p')}
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
