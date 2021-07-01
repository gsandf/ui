import styled from 'styled-components';
import { ensureUnit } from '../../utils';
import { Box } from './Box';

/** Constrains content width with a default max size (override with `$maxWidth`). */
export const Container = styled(Box)`
  margin: 0 auto;
  max-width: ${p => ensureUnit(p.$maxWidth ?? p.theme.breakpoints.xl)};
  width: 100%;
`;
