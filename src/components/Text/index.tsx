import { splitAtIndices } from '@blakek/array-split';
import { ellipsis } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';
import { ThemeMixinProps } from '../../theme';

export interface TextProps extends ThemeMixinProps {
  maxLineCount: number;
}

export const Text = styled.span<TextProps>`
  color: inherit;
  text-overflow: ellipsis;
  white-space: pre-line;

  ${p => ellipsis(p.$maxWidth as string, p.maxLineCount)}

  /* HACK: fix browser issue where display: inline-block adds extra padding */
  ${p =>
    p.maxLineCount === 1 &&
    css`
      display: block;
    `}

  ${p => p.theme.mixins.themeMixin}
`;

export type MailToProps = TextProps;

export const MailTo = ({ children, ...props }: MailToProps) => (
  <Text as="a" href={`mailto:${children}`} {...props}>
    {children}
  </Text>
);

export interface TelProps extends TextProps {
  getFormatted?: (phoneNumber: string) => string;
}

/**
 * Formats a 10-digit format to the traditional U.S. style:
 * (555) 555-5555
 *
 * If the input isn't 10 digits, it is retunred unmodified.
 */
export function simpleUSTelephoneFormat(telephoneNumber: string) {
  const digits = Array.from(telephoneNumber.matchAll(/\d/g)).join('');

  if (digits.length !== 10) {
    return telephoneNumber;
  }

  const [areaCode, prefix, lineNumber] = splitAtIndices([3, 6], digits);

  const postFixMatches = /[^\d]*$/.exec(telephoneNumber);
  const postFix = postFixMatches ? postFixMatches[0] : '';

  return `(${areaCode}) ${prefix}-${lineNumber}${postFix}`;
}

export const Tel = ({ children, getFormatted, ...props }: TelProps) => (
  <Text as="a" href={`tel:${children}`} {...props}>
    {getFormatted ? getFormatted(children as string) : children}
  </Text>
);
