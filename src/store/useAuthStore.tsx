import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  user: User | null;
  setUser: (u: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (u) => set({ user: u }),
}));
