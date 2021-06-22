import { hideVisually } from 'polished';
import { ReactNode } from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import type {
  ResponsiveProperty,
  ResponsiveRule,
  ThemeMixinProps
} from '../../theme';
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

export type HideProps = {
  above?: keyof DefaultTheme['breakpoints'];
  below?: keyof DefaultTheme['breakpoints'];
  children: ReactNode;
  query?: string;
};

export const Hide = styled(Box)<HideProps>`
  ${p =>
    p.above &&
    css`
      ${p.theme.media.up[p.above]} {
        display: none;
      }
    `}

  ${p =>
    p.below &&
    css`
      ${p.theme.media.down[p.below]} {
        display: none;
      }
    `}

  ${p =>
    p.query &&
    css`
      @media ${p.query} {
        display: none;
      }
    `}
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

export type BasicGridProps = {
  /** Set the number of columns directly */
  columns?: ResponsiveRule<number>;
  /** Set the number of columns based on a required width for children */
  minChildWidth?: ResponsiveProperty<'width', 'space'>;
  /** The gap between children both horizontally and vertically */
  spacing?: ResponsiveProperty<'gap', 'space'>;
  /** The gap between children only in the horizontal direction */
  spacingX?: ResponsiveProperty<'columnGap', 'space'>;
  /** The gap between children only in the vertical direction */
  spacingY?: ResponsiveProperty<'rowGap', 'space'>;
};

/**
 * A basic grid component that distributes its children evenly.
 *
 * Either `columns` or `minChildWidth` can be used to set the number of
 * columns. `columns` sets the column count to a set number while
 * `minChildWidth` sets the column count based on a minimum width the child
 * components need.
 */
export const BasicGrid = styled(Flex)<BasicGridProps>`
  display: grid;

  ${p => {
    const { createRuleForProp } = p.theme.mixins;

    return css`
      ${createRuleForProp('gap', 'theme.space', 'spacing')}
      ${createRuleForProp('column-gap', 'theme.space', 'spacingX')}
      ${createRuleForProp('row-gap', 'theme.space', 'spacingY')}
    `;
  }}

  ${p => {
    const { mapResponsive } = p.theme.mixins;

    if (p.columns) {
      return mapResponsive(
        p.columns,
        columnCount =>
          css`
            grid-template-columns: repeat(${columnCount}, minmax(0, 1fr));
          `
      );
    }

    return mapResponsive(
      p.minChildWidth,
      minChildWidth =>
        css`
          grid-template-columns: repeat(
            auto-fit,
            minmax(${minChildWidth}, 1fr)
          );
        `
    );
  }}
`;
