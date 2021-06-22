import styled, { DefaultTheme } from 'styled-components';
import { ThemeMixinProps } from '../../theme';
import { StyledComponentProps } from '../../utils';

interface _ButtonProps extends ThemeMixinProps {
  disabled?: boolean;
  isFullWidth?: boolean;
  variant?: keyof DefaultTheme['components']['Button']['variants'];
  type?: 'button' | 'reset' | 'submit';
}

export type ButtonProps = StyledComponentProps<typeof Button>;

/** A simple button component with basic default styles. */
export const Button = styled.button<_ButtonProps>`
  align-items: center;
  appearance: none;
  background-color: transparent;
  border-width: 0;
  color: inherit;
  display: inline-flex;
  justify-content: center;
  outline: none;
  position: relative;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  width: ${p => (p.isFullWidth ? '100%' : 'auto')};

  ${p => p.theme.components?.Button.baseStyle ?? ''};
  ${p => p.variant && p.theme.components?.Button.variants[p.variant]};
  ${p => p.theme.mixins.themeMixin};
`;
