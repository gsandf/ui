import styled, { css } from 'styled-components';
import { ResponsiveProperty, ResponsiveRule } from '../../theme';
import { Flex } from './common';

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
