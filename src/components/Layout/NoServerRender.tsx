import React, { SuspenseProps } from 'react';
import { isServer } from '../../utils';

/**
 * `NoServerRender` renders its children only on the client after hydration.
 *
 * This can be useful where otherwise the initial render would be different
 * between server and client.
 */
export function NoServerRender(props: Partial<SuspenseProps>) {
  if (isServer) {
    return props.fallback;
  }

  return <React.Suspense fallback={props.fallback} {...props} />;
}
