import { ReactNode } from 'react';
import styled, { css, DefaultTheme } from 'styled-components';
import { Box } from './Box';

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
