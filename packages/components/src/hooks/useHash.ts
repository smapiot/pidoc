import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useHash(current: HTMLElement) {
  const { hash } = useLocation();

  useEffect(() => {
    const tid = setTimeout(() => {
      const id = hash.substring(1);

      if (id) {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth', inline: 'nearest' });
      }
    }, 10);
    return () => clearTimeout(tid);
  }, [hash, current]);

  return hash;
}
