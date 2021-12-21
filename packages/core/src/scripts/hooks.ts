import { useEffect, useState } from 'react';

function isDarkMode() {
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
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return res;
}
