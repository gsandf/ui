import { ellipsis } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';
import { ThemeMixinProps } from '../../theme';
import { StyledComponentProps } from '../../utils';

interface _TextProps extends ThemeMixinProps {
  maxLineCount?: number;
}

/**
 * Render text. By default, it renders a `<span />`; this can be controlled
 * using the `as` prop.
 *
 * This is useful because it:
 * - accepts all theme mixins as props
 * - has helpers for truncating text to a set line count
 * - by default, retains newlines (for rendering text from an API response)
 */
export const Text = styled.span<_TextProps>`
  color: inherit;

  ${p => ellipsis(p.$maxWidth as string, p.maxLineCount)}

  /* HACK: fix browser issue where display: inline-block adds extra padding */
  ${p =>
    p.maxLineCount === 1
      ? css`
          display: block;
        `
      : css`
          white-space: pre-line;
        `}

  ${p => p.theme.mixins.themeMixin}
`;

export type TextProps = StyledComponentProps<typeof Text>;

export type MailToProps = TextProps;

export const MailTo = ({ children, ...props }: MailToProps) => (
  <Text as="a" href={`mailto:${children}`} {...props}>
    {children}
  </Text>
);

export interface TelProps extends TextProps {
  getFormatted?: (phoneNumber: string) => string;
}

export const Tel = ({ children, getFormatted, ...props }: TelProps) => (
  <Text as="a" href={`tel:${children}`} {...props}>
    {getFormatted ? getFormatted(children as string) : children}
  </Text>
);
