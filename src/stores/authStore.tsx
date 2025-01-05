import { create } from "zustand";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthState {
  user: SupabaseUser | null;
  setUser: (user: SupabaseUser | null) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
