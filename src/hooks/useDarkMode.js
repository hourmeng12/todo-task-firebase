import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

const useDarkMode = (lightModeColor, darkModeColor) => {
  const [enabled, setEnabled] = useLocalStorage('dark-theme');

  useEffect(() => {
    const preferColorScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    if (enabled === undefined && preferColorScheme) {
      setEnabled(true);
    }
    if (enabled === undefined && !preferColorScheme) {
      setEnabled(false);
    }
  }, [enabled, setEnabled]);

  useEffect(() => {
    const className = 'dark';
    const htmlClass = window.document.documentElement.classList;
    const themeColor =
      window.document.getElementsByTagName('meta')['theme-color'];

    if (enabled) {
      htmlClass.add(className);
      themeColor.content = darkModeColor;
    } else {
      htmlClass.remove(className);
      themeColor.content = lightModeColor;
    }
  }, [enabled, lightModeColor, darkModeColor]);

  return [enabled, setEnabled];
};

export default useDarkMode;
