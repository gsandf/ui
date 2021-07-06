import test from 'ava';
import { css, CSSProp, DefaultTheme } from 'styled-components';
import { defaultTheme } from '.';
import { createMediaQueries } from './breakpoints';
import { createMixins } from './mixins';

const getDefaultMedia = () => createMediaQueries(defaultTheme.breakpoints);

function createProps(props: Record<string, unknown>) {
  return {
    ...props,
    theme: defaultTheme as DefaultTheme
  };
}

function getStyleString(input: CSSProp): string {
  if (typeof input === 'string') {
    return input.trim();
  }

  if (Array.isArray(input)) {
    return input
      .join('')
      .replace(/[\n]/g, '')
      .replace(/\s{2,}/g, '')
      .trim();
  }

  return Object.entries(input).reduce((styleString, [key, value]) => {
    return `${styleString}${key}: ${value as string}\n`;
  }, '');
}

test('creates mixins using breakpoints', t => {
  const media = getDefaultMedia();
  const mixins = createMixins(media);

  t.is(typeof mixins.boxMixins[0], 'string');
  t.is(typeof mixins.createRuleForProp, 'function');
  t.is(typeof mixins.flexChildMixin[0], 'string');
  t.is(typeof mixins.flexContainerMixin[0], 'string');
  t.is(typeof mixins.mapResponsive, 'function');
  t.is(typeof mixins.themeBordersMixin[0], 'string');
  t.is(typeof mixins.themeColorsMixin[0], 'string');
  t.is(typeof mixins.themeFontsMixin[0], 'string');
  t.is(typeof mixins.themeShadowsMixin[0], 'string');
  t.is(typeof mixins.themeSizeMixin[0], 'string');
  t.is(typeof mixins.themeSpaceMixin[0], 'string');
  t.is(typeof mixins.themeMixin[0], 'string');
});

test('creates mixin to create responsive styles', t => {
  const media = getDefaultMedia();
  const mixins = createMixins(media);
  const { mapResponsive } = mixins;

  const widthMapper = (width: string | string[]) =>
    css`
      width: ${width};
    `;

  t.is(getStyleString(mapResponsive('3px', widthMapper)), 'width: 3px;');
  t.is(getStyleString(mapResponsive(['3px'], widthMapper)), 'width: 3px;');

  t.is(
    getStyleString(mapResponsive(['1px', '2px'], widthMapper)),
    getStyleString(css`
      width: 1px;
      ${media.up.sm} {
        width: 2px;
      }
    `)
  );
  t.is(
    getStyleString(mapResponsive(['1px', '2px', '3px'], widthMapper)),
    getStyleString(css`
      width: 1px;

      ${media.up.sm} {
        width: 2px;
      }

      ${media.up.md} {
        width: 3px;
      }
    `)
  );

  t.is(
    getStyleString(
      mapResponsive(['1px', '2px', '3px', '4px', '5px', '6px'], widthMapper)
    ),
    getStyleString(css`
      width: 1px;

      ${media.up.sm} {
        width: 2px;
      }

      ${media.up.md} {
        width: 3px;
      }

      ${media.up.lg} {
        width: 4px;
      }

      ${media.up.xl} {
        width: 5px;
      }

      ${media.up.xxl} {
        width: 6px;
      }
    `)
  );

  t.is(
    getStyleString(mapResponsive(['1px', , , '4px', , '6px'], widthMapper)),
    getStyleString(css`
      width: 1px;

      ${media.up.lg} {
        width: 4px;
      }

      ${media.up.xxl} {
        width: 6px;
      }
    `)
  );

  t.is(
    getStyleString(
      mapResponsive(['1px', '2px', '3px'], (width, breakpoint) => {
        if (breakpoint === 'sm') {
          return null;
        }

        return css`
          width: ${width};
        `;
      })
    ),
    getStyleString(css`
      width: 1px;

      ${media.up.md} {
        width: 3px;
      }
    `)
  );
});

test('passes breakpoint name to `mapResponsive` callback', t => {
  const media = getDefaultMedia();
  const mixins = createMixins(media);
  const { mapResponsive } = mixins;

  const result1 = [];
  mapResponsive('3px', (width, breakpoint) => {
    result1.push(breakpoint);
    return `width: ${width}`;
  });
  t.deepEqual(result1, ['base']);

  const result2 = [];
  mapResponsive(['3px'], (width, breakpoint) => {
    result2.push(breakpoint);
    return `width: ${width}`;
  });
  t.deepEqual(result2, ['base']);

  const result3 = [];
  mapResponsive(['1px', '2px', '3px'], (width, breakpoint) => {
    result3.push(breakpoint);
    return `width: ${width}`;
  });

  t.deepEqual(result3, ['base', 'sm', 'md']);

  const result4 = [];
  mapResponsive(['1px', , '3px'], (width, breakpoint) => {
    result4.push(breakpoint);
    return `width: ${width}`;
  });
  t.deepEqual(result4, ['base', 'md']);
});

test('creates mixin to easily add style props', t => {
  const media = getDefaultMedia();
  const mixins = createMixins(media);
  const { createRuleForProp } = mixins;

  t.is(
    getStyleString(createRuleForProp('w', 'width')(createProps({ w: '5px' }))),
    getStyleString(css`
      width: 5px;
    `)
  );

  t.is(
    getStyleString(
      createRuleForProp(
        'w',
        'width'
      )(createProps({ w: ['1px', '2px', , '4px'] }))
    ),
    getStyleString(css`
      width: 1px;

      ${media.up.sm} {
        width: 2px;
      }

      ${media.up.lg} {
        width: 4px;
      }
    `)
  );

  t.is(
    getStyleString(
      createRuleForProp('px', ['padding-left', 'padding-right'])(
        createProps({ px: ['1px', , '4px'] })
      )
    ),
    getStyleString(css`
      padding-left: 1px;
      padding-right: 1px;

      ${media.up.md} {
        padding-left: 4px;
        padding-right: 4px;
      }
    `)
  );
});

test('`createRuleForProp` uses themed values', t => {
  const media = getDefaultMedia();
  const mixins = createMixins(media);
  const { createRuleForProp } = mixins;

  t.is(
    getStyleString(
      createRuleForProp(
        'w',
        'width',
        'sizes'
      )(
        createProps({
          w: '1/2'
        })
      )
    ),
    getStyleString(css`
      width: 50%;
    `)
  );

  t.is(
    getStyleString(
      createRuleForProp('w', 'width', ['space', 'sizes'])(
        createProps({ w: '5' })
      )
    ),
    getStyleString(css`
      width: 1.25rem;
    `)
  );

  t.is(
    getStyleString(
      createRuleForProp('w', 'width', ['space', 'sizes'])(
        createProps({ w: '1/2' })
      )
    ),
    getStyleString(css`
      width: 50%;
    `)
  );

  t.is(
    getStyleString(
      createRuleForProp(
        'gap',
        ['margin-top', 'margin-right', 'margin-bottom', 'margin-left'],
        ['space', 'sizes']
      )(createProps({ gap: 'sm' }))
    ),
    getStyleString(css`
      margin-top: 4rem;
      margin-right: 4rem;
      margin-bottom: 4rem;
      margin-left: 4rem;
    `)
  );

  t.is(
    getStyleString(
      createRuleForProp('br', 'border-radius', ['radii', 'sizes'])(
        createProps({ br: 'sm' })
      )
    ),
    getStyleString(css`
      border-radius: 4px;
    `)
  );
});
