// import { useEffect, useState } from "react";
// import { fetchAllEvents } from "../services/eventsService";
// import useEventsStore from "../store";

// // interface User {
// //   firstName: string;
// //   lastName: string;
// //   email: string;
// //   // Add other properties based on the API response if needed
// // }

// const ViewEvents = () => {
//   const { events, addEvent, setEvents } = useEventsStore();
//   // const [dummyUsers, setDummyUsers] = useState<User[]>([]);

//   const getEvents = async () => {
//     try {
//       const eventsAllData = await fetchAllEvents();
//       setEvents(eventsAllData); // Update Zustand store with fetched events
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // const fetchUsers = async () => {
//   //   try {
//   //     const data = await fetch("https://dummyjson.com/users");
//   //     const response = await data.json();
//   //     setDummyUsers(response.users);
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//   useEffect(() => {
//     getEvents();
//     // fetchUsers();
//   }, []);
//   return (
//     <div>
//       All events are here
//       {events?.map((el) => (
//         <div key={el.eventDate}>
//           <h3>{el.event_name}</h3>
//           <p>{el.event_description}</p>
//           <div>{el.event_date}</div>
//           <i>{el.location}</i>
//         </div>
//       ))}
//       {/* {dummyUsers.map((el) => (
//         <div key={el.id}>
//           <img src={el.image} alt="image" />
//           <p>{el.firstName}</p>
//           <p>{el.lastName}</p>
//           <p>{el.age}</p>
//           <p>{el.gender}</p>
//           <p>{el.email}</p>
//           <p>{el.username}</p>
//           <p>{el.birthdate}</p>
//           <p>{el.bloodGroup}</p>
//           <p>{el.eyeColor}</p>
//         </div>
//       ))} */}
//     </div>
//   );
// };

// export default ViewEvents;

import React, { useEffect, useRef, useState } from "react";
import { fetchAllEvents } from "../services/eventsService";
import useEventsStore from "../store";
import EventsItem from "./EventsItem";
import { Link } from "@tanstack/react-router";

const ViewEvents = () => {
  // const { events, addEvent, setEvents } = useEventsStore();
  const { events, addEvent, setEvents } = useEventsStore();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Pagination state
  const observer = useRef(null); // Create a reference for the intersection observer
  const lastEventElementRef = useRef(null); // Reference for the last event element

  const getEvents = async () => {
    try {
      const eventsAllData = await fetchAllEvents();
      setEvents(eventsAllData); // Update Zustand store with fetched events
    } catch (error) {
      console.log(error);
    }
  };

  // const getEvents = async (pageNum) => {
  //   try {
  //     setLoading(true);
  //     const eventsAllData = await fetchAllEvents(pageNum);
  //     setEvents((prevEvents) => [...prevEvents, ...eventsAllData]); // Append new events
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching events:", error);
  //     setLoading(false);
  //   }
  // };

  // const observerCallback = (entries) => {
  //   const [entry] = entries;
  //   if (entry.isIntersecting && !loading) {
  //     // When the last element comes into view, fetch the next set of events
  //     setPage((prevPage) => {
  //       const nextPage = prevPage + 1;
  //       getEvents(nextPage);
  //       return nextPage;
  //     });
  //   }
  // };

  // useEffect(() => {
  //   // Set up IntersectionObserver
  //   const observerInstance = new IntersectionObserver(observerCallback, {
  //     rootMargin: "100px", // Trigger observer a little before the element is in view
  //   });

  //   if (lastEventElementRef.current) {
  //     observerInstance.observe(lastEventElementRef.current);
  //   }

  //   return () => {
  //     // Clean up the observer when the component unmounts or updates
  //     if (lastEventElementRef.current) {
  //       observerInstance.unobserve(lastEventElementRef.current);
  //     }
  //   };
  // }, [loading]);
  // useEffect(() => {
  //   getEvents(page);
  // }, [page]);

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
