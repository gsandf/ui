import { RefObject, useEffect } from 'react';
import { useClickedOutside } from './useClickedOutside';

export interface Options {
  /** if a click or press event outside the modal ref should trigger a close */
  shouldCloseOnBackdropClick?: boolean;
  /** if pressing the Escape key should trigger a close */
  shouldCloseOnEscapePress?: boolean;
}

/**
 * Calls the given `onClose` function when a common event outside a modal
 * should trigger a close. For example, this can handle when the Escape key is
 * pressed and when the modal is clicked outside.
 */
export function useModalCloseEvent(
  /** a function called when the modal should close */
  onClose: () => void,
  /** an optional ref to the modal, used to detect outside clicks */
  modalRef: RefObject<HTMLElement> = null,
  options: Options = {}
) {
  const { shouldCloseOnBackdropClick = true, shouldCloseOnEscapePress = true } =
    options;

  // Close when clicking outside component
  useClickedOutside(modalRef, () => {
    if (shouldCloseOnBackdropClick) {
      onClose();
    }
  });

  // Close when Escape key pressed
  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      const isEscape =
        event?.key === 'Escape' ||
        event?.key === 'Esc' ||
        event?.keyCode === 27;

      if (isEscape && shouldCloseOnEscapePress) {
        onClose();
      }
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [shouldCloseOnEscapePress, onClose]);
}
