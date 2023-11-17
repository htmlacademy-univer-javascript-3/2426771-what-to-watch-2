import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useHash<T extends string = string>() {
  const location = useLocation();
  const hashElement = useMemo(() => location.hash, [location]);

  return hashElement.split('#')[1] as T;
}
