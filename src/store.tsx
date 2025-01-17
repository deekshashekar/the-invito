import { create } from "zustand";
import { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthState {
  user: SupabaseUser | null;
  setUser: (user: SupabaseUser | null) => void;
  clearUser: () => void;
}

interface Event {
  id: string;
  event_name: string;
  event_date: string;
  event_description:string;
  location: string;
}

interface EventsStore {
  events: Event[];
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
}


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

const useEventsStore = create<EventsStore>((set) => ({
  events: [],
  addEvent: (event: any) => set((state: { events: any; }) => ({ events: [...state.events, event] })),
  setEvents: (newEvents: any) => set({ events: newEvents }),
}));

export default useEventsStore;
