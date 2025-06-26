import { onAuthStateChanged, User } from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../../firebase';
import { logout } from '@/shared/api/auth';

export interface AuthStoreType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  subscribeToAuth: () => () => void;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  isLoading: true,
  logout: async () => {
    await logout();
    set({ user: null });
  },
  subscribeToAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({ user: user, isLoading: false });
    });
    return unsubscribe;
  },
}));
