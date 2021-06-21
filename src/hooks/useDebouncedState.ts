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
    [initialValue, delay]
  );

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, [initialValue, delay]);

  return [value, eventuallySetValue];
}

export default useDebouncedState;
