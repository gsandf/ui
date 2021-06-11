import { Dispatch, SetStateAction, useState } from 'react';
import { isBrowser } from '../utils';

const hasLocalStorage = isBrowser && window.localStorage instanceof Storage;

type SetValue<Value> = Dispatch<SetStateAction<Value>>;

export function useLocalStorage<Value>(
  key: string,
  initialValue: Value
): [Value, SetValue<Value>] {
  const [storedValue, setStoredValue] = useState(() => {
    // Get from local storage then parse stored json or return initialValue
    if (!hasLocalStorage) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);

      if (item === null) {
        return initialValue;
      }

      return JSON.parse(item);
    } catch (error) {
      console.warn(
        `useLocalStorage: Fetching item from localStorage failed: ${key}`
      );
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: Value) => {
    try {
      // Allow value to be a function to keep the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (hasLocalStorage) {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.info(
        `useLocalStorage: Saving item to localStorage failed: ${key}`
      );
      console.error(error);
    }
  };

  return [storedValue, setValue];
}
