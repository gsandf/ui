import { useEffect } from 'react';

type PressEvent = MouseEvent | TouchEvent;

/**
 * Handles click events outside a DOM element, like a div. A handler function
 * is invoked when a click or touch event happens outside the referenced
 * element.
 */
export function useClickedOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (event: PressEvent) => void
) {
  useEffect(() => {
    // Call `handler()` for click/touch events outside `ref`
    function listener(event: PressEvent) {
      const element = ref?.current;

      const occurredOutside =
        element && !element.contains(event.target as Node);

      // Skip callback if ref or descendent elements were clicked
      if (occurredOutside) {
        handler(event);
      }
    }

    // Adds click/touch event listeners
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, ref]);
}
