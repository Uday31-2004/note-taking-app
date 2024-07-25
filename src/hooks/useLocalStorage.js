import { useState } from 'react';

/**
 * Custom hook to manage local storage.
 * @param {string} key - The key for local storage.
 * @param {any} initialValue - The initial value if key is not found in local storage.
 * @returns {[any, Function]} - Returns the stored value and a function to update it.
 */
const useLocalStorage = (key, initialValue) => {
  // Get the item from local storage
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Set the item to local storage
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
