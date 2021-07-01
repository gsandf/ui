import styled, { css, DefaultTheme, ThemeProps } from 'styled-components';
import { ResponsiveProperty, ResponsiveRule } from '../../theme';
import { Flex } from './Flex';

export interface BasicGridProps extends ThemeProps<DefaultTheme> {
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
}

function getGridColumns(props: BasicGridProps) {
  const { mapResponsive } = props.theme.mixins;

  // Handle set number of columns
  if (props.columns !== undefined) {
    return mapResponsive(
      props.columns,
      columnCount =>
        css`
          grid-template-columns: repeat(${columnCount}, minmax(0, 1fr));
        `
    );
  }

  // Handle minimum child width
  if (props.minChildWidth !== undefined) {
    return mapResponsive(
      props.minChildWidth,
      minWidth =>
        css`
          grid-template-columns: repeat(auto-fit, minmax(${minWidth}, 1fr));
        `
    );
  }

  return css`
    grid-auto-columns: max-content;
  `;
}

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

  ${getGridColumns}
`;
