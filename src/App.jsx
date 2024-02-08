import { useEffect, useState } from "react";
import AppContext from "./context/AppContext";
import supabase from "./services/supabase";

function App({ children }) {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session) {
          setAuth({
            ...session,
            user: session.user,
          });
        } else {
          setAuth(null);
        }
      }
    );

    // Clean up the listener when the component is unmounted
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  return (
    <AppContext.Provider value={{ auth, setAuth }}>
      {children}
    </AppContext.Provider>
  );
}

export default App;
