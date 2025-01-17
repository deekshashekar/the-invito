import { useEffect, } from "react";
import { fetchAllEvents } from "../services/eventsService";
import useEventsStore from "../store";
import EventsItem from "./EventsItem";
import { Link } from "@tanstack/react-router";

const ViewEvents = () => {
  const { events, setEvents } = useEventsStore();

  const getEvents = async () => {
    try {
      const eventsAllData = await fetchAllEvents();
      setEvents(eventsAllData); 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEvents();
  }, [setEvents]);
  return (
    <div>
      <Link to="/" className="flex w-14 border-2 bg-sky-300 p-2 rounded-md">
        Back
      </Link>
      <p className=" flex justify-center font-bold text-3xl mt-6">
        All events are here
      </p>
      <EventsItem events={events} />
    </div>
  );
};

export default ViewEvents;
