import { supabase } from "../api/supabaseClient";
import { Event } from "../types/event";

export const addEachEvent = async (data: Event | Event[]) => {
  const { data: eventsData, error } = await supabase
    .from("events")
    .insert(data)
    .select();
  if (error) throw new Error(error.message);
  return eventsData;
};

export const fetchAllEvents = async () => {
  const { data: allEvents, error } = await supabase.from("events").select("*");
  if (error) throw new Error(error.message);
  return allEvents;
};
