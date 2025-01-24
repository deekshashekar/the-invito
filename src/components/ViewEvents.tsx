import { useEffect } from "react";
import { fetchAllEvents } from "../services/eventsService";
import useEventsStore from "../store";
import EventsItem from "./EventsItem";
import { Link } from "@tanstack/react-router";

const ViewEvents = () => {
  const { events, setEvents } = useEventsStore();

  const getEvents = async () => {
    try {
      const eventsAllData = await fetchAllEvents();
      const sortedEvents = eventsAllData.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setEvents(sortedEvents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, [events, setEvents]);
  return (
    <div className="bg-sky-200">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-sky-700 transition-colors mt-8 ml-6"
      >
        ← Back to Home
      </Link>
      <p className=" flex justify-center font-bold text-3xl mb-9">
        All events are here
      </p>
      <EventsItem events={events} />
    </div>
  );
};

export default ViewEvents;
