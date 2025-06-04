import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { create } from 'zustand';
import { auth } from '../../firebase';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
  subscribeToAuth: () => () => void;
}

export const useAuthStore = create<AuthContextType>((set) => ({
  user: null,
  isLoading: true,
  logout: async () => {
    await signOut(auth);
    set({ user: null });
  },
  subscribeToAuth: () => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      set({ user: firebaseUser, isLoading: false });
    });
    return unsubscribe;
  },
}));
