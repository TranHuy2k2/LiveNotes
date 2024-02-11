import { useContext, useEffect, useState } from "react";
import supabase from "../services/supabase";

import AppContext from "../context/AppContext";
import AuthContext from "../context/AuthContext";
import { getLocation, randomUsername } from "../services/helpers";
import { CHANNEL_NAME } from "../constant";

export default function AppProvider({ children }) {
  const { auth } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [countryCode, setCountryCode] = useState(
    localStorage.getItem("countryCode")
  );
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState();
  useEffect(() => {
    const channel = supabase.channel(CHANNEL_NAME);
    const dbChannel = supabase.channel("schema-db-changes");
    async function joinChannel() {
      const countryCode = await getLocation(setCountryCode);
      let user;
      try {
        user = await supabase.auth.getUser();
      } catch (e) {}
      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          let username = randomUsername();
          if (user?.data?.user) {
            username = user.data.user?.user_metadata?.name;
          }
          setUsername(username);
          console.log({ username, countryCode });
          channel.track({ username, countryCode });
        }
      });
    }

    channel.on("presence", { event: "sync" }, () => {
      const presenceState = channel.presenceState();
      const users = Object.keys(presenceState)
        .map((presenceId) => {
          const presences = presenceState[presenceId];
          return presences.map((presence) => ({
            username: presence.username,
            countryCode: presence.countryCode,
          }));
        })
        .flat();
      setUsers(users.sort());
    });

    dbChannel
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    joinChannel();

    return () => {
      channel.unsubscribe();
      dbChannel.unsubscribe();
    };
  }, []);
  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        countryCode,
        username,
        messages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
