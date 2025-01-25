import { FC, useState } from "react";
import { CalendarIcon } from "../assets/CalendarIcon";
import { LocationIcon } from "../assets/LocationIcon";
import { Event } from "../types/event";
import { deleteEvent } from "../services/eventsService";
import Modal from "./Modal";

interface EventsItemProps {
  events: Event[];
}

const EventsItem: FC<EventsItemProps> = ({ events }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleDelete = (event_id: string) => {
    const isConfirmed = confirm("Are you sure you want to delete this event?");
    if (isConfirmed) {
      deleteEvent(event_id);
    }
  };

  const openModal = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 bg-sky-200">
        {events?.map((el) => (
          <div
            key={el.id}
            className="bg-white border bg-lime-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl "
          >
            <div className="p-6">
              <h3 className="flex justify-between text-xl font-bold text-gray-800 mb-3">
                {el.event_name}
                <button onClick={() => handleDelete(el.id)}>🗑️</button>
              </h3>

              <p className="text-gray-600 mb-4 line-clamp-3">
                {el.event_description}
              </p>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center text-gray-600">
                  <CalendarIcon />
                  {new Date(el.event_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>

                <div className="flex items-center text-gray-600">
                  <LocationIcon />
                  {el.location}
                </div>
              </div>
              <button
                className="mt-4 text-blue-600 hover:underline"
                onClick={() => openModal(el)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedEvent && (
          <div>
            <h2 className="text-xl font-bold">{selectedEvent.event_name}</h2>
            <p className="text-gray-600 mt-2">
              {selectedEvent.event_description}
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-gray-600">
                <CalendarIcon />
                {new Date(selectedEvent.event_date).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </div>
              <div className="flex items-center text-gray-600">
                <LocationIcon />
                {selectedEvent.location}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default EventsItem;
