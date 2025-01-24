import { Link } from "@tanstack/react-router";

import { User } from "@supabase/supabase-js";
import { useState } from "react";

interface HomePageProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
}

const HomePage: React.FC<HomePageProps> = ({ user, handleSignOut }) => {
  const [isDropDownOpen, setIsDropdownOpen] = useState(false);
  console.log(user);
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-sky-100 to-pink-100">
        <div className="absolute top-4 right-4">
          <div>
            <div className="flex justify-end">
              <button onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <img
                  src={user?.user_metadata?.avatar_url}
                  alt="avatar"
                  className="w-10 h-10 rounded-3xl"
                />
              </button>
            </div>
            {isDropDownOpen && (
              <button
                className="block w-full text-right px-4 py-2 bg-gray-200 hover:bg-gray-300 mt-3 text-md text-gray-700 hover:bg-gray-100 rounded-lg"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            )}
          </div>
        </div>
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center pt-24 mb-16 text-gray-800">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-pink-500">
              Invito!
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 py-16">
            <Link
              to="/add-event"
              className="transform hover:scale-105 transition-all duration-300 bg-white px-8 py-4 rounded-lg shadow-lg border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white font-semibold text-lg"
            >
              ✨ Create New Event
            </Link>

            <Link
              to="/view-events"
              className="transform hover:scale-105 transition-all duration-300 bg-white px-8 py-4 rounded-lg shadow-lg border-2 border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white font-semibold text-lg"
            >
              📅 View Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
