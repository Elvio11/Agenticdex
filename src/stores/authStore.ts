import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';
import { User } from '../types/user';

interface AuthState {
  user: User | null;
  session: Session | null;
  permissionState: 1 | 2 | 3 | 4 | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  permissionState: null,
  setUser: (user: User | null) =>
    set(() => {
      let state: 1 | 2 | 3 | 4 | null = null;
      if (user) {
        if (user.subscription_tier === 'paid') {
          state = user.wa_connected ? 4 : 3;
        } else {
          state = user.wa_connected ? 2 : 1;
        }
      }
      return { user, permissionState: state };
    }),
  setSession: (session: Session | null) => set({ session }),
}));
