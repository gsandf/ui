import styled from 'styled-components';
import type { ThemeMixinProps } from '../../theme';

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
