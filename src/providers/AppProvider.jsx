import { useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";

import AppContext from "../context/AppContext";
import AuthContext from "../context/AuthContext";

export default function AppProvider({ children }) {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const channel = supabase.channel("room-1");

    channel.on("presence", { event: "sync" }, () => {
      /** Get the presence state from the channel, keyed by realtime identifier */
      const presenceState = channel.presenceState();

      /** transform the presence */
      const users = Object.keys(presenceState)
        .map((presenceId) => {
          const presences = presenceState[presenceId];
          return presences.map((presence) => presence.username);
        })
        .flat();
      /** sort and set the users */
      setUsers(users.sort());
    });
    channel.subscribe((status) => {
      if (status === "SUBSCRIBED") {
        channel.track({ username: "tran huy" });
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, []);
  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
