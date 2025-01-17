import { supabase } from "../api/supabaseClient";

interface Event {
  event_name: string;
  event_description: string;
  event_date: string;
  location: string;
}

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
