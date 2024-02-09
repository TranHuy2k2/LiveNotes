import { useEffect, useState } from "react";
import supabase from "../services/supabase";
import AppContext from "../context/AppContext";
import AuthContext from "../context/AuthContext";

export default function AuthProvider({ children }) {
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
    const user = supabase.auth.getUser().then((user) => {
      setAuth(user.data);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ auth, setAuth }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
