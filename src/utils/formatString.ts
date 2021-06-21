import { splitAtIndices } from '@blakek/array-split';

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
