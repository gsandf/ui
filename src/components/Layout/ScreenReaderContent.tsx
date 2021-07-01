import { hideVisually } from 'polished';
import styled from 'styled-components';
import { Box } from './Box';

/** Hides content visually but remains accessible to screen readers. */
export const ScreenReaderContent = styled(Box)`
  ${hideVisually()}
`;
