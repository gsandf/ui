import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';

const DEFAULT_DEBOUNCE_TIME = 60;

type SetValue<Value> = Dispatch<SetStateAction<Value>>;

/**
 * Saves a value like `useState`, but delays setting the value until `delay`
 * milliseconds has passed.
 */
export function useDebouncedState<Value>(
  initialValue: Value,
  delay: number = DEFAULT_DEBOUNCE_TIME
): [Value, SetValue<Value>] {
  const [value, setValue] = useState<Value>(initialValue);
  const timer = useRef(null);

  const eventuallySetValue = useCallback(
    (value: Value) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }

      timer.current = setTimeout(() => {
        setValue(value);
      }, delay);
    },
    [delay]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, [initialValue, delay]);

  return [value, eventuallySetValue];
}

export default useDebouncedState;
