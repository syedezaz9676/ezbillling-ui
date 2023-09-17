import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get the stored value from localStorage or use the initialValue
  const [storedValue, setStoredValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  // Create a function to set a new value in localStorage and update the state
  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    // Define a handler to update the state when the storage changes
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setStoredValue(JSON.parse(e.newValue));
      }
    };

    // Listen for storage change events
    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
