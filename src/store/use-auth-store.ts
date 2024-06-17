import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase-client';

type AuthState = {
  user: User | null;
};

type AuthActions = {
  setUser: (user: User | null) => void;
  signout: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  signout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
}));
