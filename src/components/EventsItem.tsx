import { CalendarIcon } from "../assets/CalendarIcon";
import { LocationIcon } from "../assets/LocationIcon";

const EventsItem = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {events?.map((el) => (
        <div
          key={el.id}
          className="bg-white border bg-lime-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl "
        >
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              {el.event_name}
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventsItem;
