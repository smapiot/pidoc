import { useEffect, useState } from 'react';

const localStorageKey = 'pidoc-theme';

function isDarkMode() {
  if (typeof localStorage !== 'undefined') {
    const value = localStorage.getItem(localStorageKey);

    if (value) {
      return value === 'dark';
    }
  }

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    const { matches } = window.matchMedia('(prefers-color-scheme: dark)');
    return matches;
  }

  return false;
}

export function useDarkMode() {
  const res = useState(isDarkMode);
  const [isDark] = res;

  useEffect(() => {
    if (isDark) {
      localStorage.setItem(localStorageKey, 'dark');
      document.body.classList.add('dark');
    } else {
      localStorage.setItem(localStorageKey, 'light');
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return res;
}
