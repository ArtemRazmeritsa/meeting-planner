import { useEffect } from 'react';
import { useAuthStore } from './use-auth-store';

function AuthInit() {
  const subscribeToAuth = useAuthStore((state) => state.subscribeToAuth);

  useEffect(() => {
    const unsubscribe = subscribeToAuth();
    return () => unsubscribe();
  }, [subscribeToAuth]);
  return null;
}

export default AuthInit;
