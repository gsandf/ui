import { cover } from 'polished';
import { ReactChild } from 'react';
import styled, { css } from 'styled-components';
import type { ResponsiveRule, ThemeMixinProps } from '../../theme';
import { Box } from './Box';

export interface AspectRatioProps extends ThemeMixinProps {
  children: ReactChild;
  /**
   * The aspect ratio of the Box as `width / height`. Common values are:
   *
   * `1`, `16/9`, `4/3`, `1.85/1`, `21/9`
   */
  ratio: ResponsiveRule<number>;
}

export const AspectRatio = styled(Box)<AspectRatioProps>`
  position: relative;

  ::before {
    height: 0;
    content: '';
    display: block;

    ${p =>
      p.theme.mixins.mapResponsive(
        p.ratio,
        ratio => css`
          padding-bottom: ${(1 / ratio) * 100}%;
        `
      )}
  }

  & > * {
    ${cover()}
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: center;
    overflow: hidden;
    width: 100%;
  }

  & > img,
  & > video {
    object-fit: cover;
  }
`;
