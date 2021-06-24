import { hideVisually } from 'polished';
import styled, { css } from 'styled-components';
import type { ResponsiveProperty, ThemeMixinProps } from '../../theme';
import { ensureUnit } from '../../utils';

/**
 * A simple box. By default, it renders a `<div />`. It can be useful as a base
 * to create other components from as it accepts all theme mixins as props.
 */
export const Box = styled.div<ThemeMixinProps>`
  display: block;
  flex-grow: 0;
  margin: 0;
  min-width: 0;
  ${p => p.theme.mixins.themeMixin}
`;

/** Constrains content width with a default max size (override with `$maxWidth`). */
export const Container = styled(Box)`
  margin: 0 auto;
  max-width: ${p => ensureUnit(p.$maxWidth ?? p.theme.breakpoints.xl)};
  width: 100%;
`;

/** A box with `display: flex` */
export const Flex = styled(Box)`
  display: flex;
`;

/** A Flex with flex properties set to center content. */
export const Center = styled(Flex)`
  align-items: center;
  justify-content: center;
`;

/** Hides content visually but remains accessible to screen readers. */
export const ScreenReaderContent = styled(Box)`
  ${hideVisually()}
`;

export interface StackProps extends ThemeMixinProps {
  align?: ResponsiveProperty<'alignItems'>;
  direction?: ResponsiveProperty<'flexDirection'>;
  gap?: ResponsiveProperty<'margin', 'space'>;
  justify?: ResponsiveProperty<'justifyContent'>;
  wrap?: ResponsiveProperty<'flexWrap'>;
}

/**
 * `Stack` is a `Flex` with helpers to add spacing between elements. The
 * default direction is a column.
 */
export const Stack = styled(Flex)<StackProps>`
  flex-direction: column;

  ${p =>
    p.gap !== undefined &&
    css`
      > * {
        ${p.theme.mixins.createRuleForProp('margin', '', 'gap')};
      }
    `}

  ${p => {
    const createRuleForProp = p.theme.mixins.createRuleForProp;
    return css`
      ${createRuleForProp('align-items', '', 'align')};
      ${createRuleForProp('flex-direction', '', 'direction')};
      ${createRuleForProp('justify-content', '', 'justify')};
      ${createRuleForProp('flex-wrap', '', 'wrap')};
    `;
  }};
`;

/**
 * `HStack` is a `Flex` with helpers to add spacing between elements. It lays
 * out its children horizontally and centers them vertically.
 */
export const HStack = styled(Stack)`
  align-items: center;
  flex-direction: row;
`;

/**
 * `VStack` is a `Flex` with helpers to add spacing between elements. It lays
 * out its children vertically and centers them horizontally.
 */
export const VStack = styled(Stack)`
  align-items: center;
`;
