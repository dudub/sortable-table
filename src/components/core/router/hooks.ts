import { useContext } from 'react';
import type { RouterState } from './types';
import { RouterContext } from './context';

export function useRouter(): RouterState {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router component');
  }
  return context;
}
