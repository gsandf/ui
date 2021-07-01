import styled, { css } from 'styled-components';
import type { ResponsiveProperty, ThemeMixinProps } from '../../theme';
import { Flex } from './Flex';

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
