import { supabase } from "../api/supabaseClient";
import { useAuthStore } from "../stores/authStore";

export const initializeAuthListener = () => {
  supabase.auth.onAuthStateChange((_event, session) => {
    const setUser = useAuthStore.getState().setUser;
    const clearUser = useAuthStore.getState().clearUser;

    if (session?.user) {
      setUser(session.user);
    } else {
      clearUser();
    }
  });
};
