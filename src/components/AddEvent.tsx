import { useForm } from "react-hook-form";
import { addEachEvent as addEventToDb } from "../services/eventsService";
import useEventsStore from "../store";
import { Link } from "@tanstack/react-router";
import toast from "react-hot-toast";

type FormData = {
  event_name: string;
  event_description: string;
  event_date: string;
  location: string;
};

const AddEvents = () => {
  const { addEvent } = useEventsStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    addEventToDb(data)
      .then((newEventData) => {
        addEvent(newEventData[0]);
        toast.success("Event Created Successfully!");
        reset();
      })
      .catch((error) => {
        console.error("Error adding event:", error);
        toast.error("Failed to create event");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-pink-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors mb-8"
        >
          ← Back to Home
        </Link>

        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Create a New Event
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-xl shadow-lg p-8 space-y-6"
        >
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Event Name
            </label>
            <input
              {...register("event_name", {
                required: "Event name is required",
                minLength: {
                  value: 3,
                  message: "Event name must be at least 3 characters",
                },
              })}
              type="text"
              placeholder="Enter event name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
            />
            {errors.event_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.event_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">
              Description
            </label>
            <textarea
              {...register("event_description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
              placeholder="Enter event description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all h-32"
            />
            {errors.event_description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.event_description.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Date</label>
            <input
              {...register("event_date", {
                required: "Date is required",
              })}
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
            />
            {errors.event_date && (
              <p className="text-red-500 text-sm mt-1">
                {errors.event_date.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Location</label>
            <input
              {...register("location", {
                required: "Location is required",
                minLength: {
                  value: 3,
                  message: "Location must be at least 3 characters",
                },
              })}
              type="text"
              placeholder="Enter event location"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all"
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-sky-300 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvents;
