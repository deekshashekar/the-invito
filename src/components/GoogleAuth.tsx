import { useEffect } from "react";
import { supabase } from "../api/supabaseClient";
import { useAuthStore } from "../stores/authStore";
import HomePage from "./HomePage";

const GoogleAuth = () => {
  const { user, setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkSession();

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => data.subscription.unsubscribe();
  }, [setUser]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      clearUser();
    }
  };

  return (
    <div>
      {user ? (
        <HomePage user={user} handleSignOut={handleSignOut} />
      ) : (
        <>
          <div className="min-h-screen bg-gradient-to-br from-sky-100 to-pink-100 flex flex-col items-center justify-center px-4">
            <div className="text-center mb-12 bg-sky-300 p-8 rounded-2xl shadow-xl ">
              <h1 className="text-5xl font-bold mb-4">
                Welcome to{" "}
                {/* <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-pink-500"> */}
                Invito
                {/* </span> */}
              </h1>
              <p className="text-gray-600 text-xl max-w-md mx-auto">
                Your personal event management platform. Create, organize, and
                manage your events with ease.
              </p>
              <button
                className="bg-green-400 mt-5 p-3 rounded-xl"
                onClick={signInWithGoogle}
              >
                Sign in
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default GoogleAuth;
