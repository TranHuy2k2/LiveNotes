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
  useEffect(() => {
    const channel = supabase.channel(CHANNEL_NAME);
    async function joinChannel() {
      const countryCode = await getLocation(setCountryCode);
      let user;
      try {
        user = await supabase.auth.getUser();
      } catch (e) {
        console.log(e);
      }
      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          let username = randomUsername();
          if (user?.data?.user) {
            username = user.data.user?.user_metadata?.name;
          }
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

    joinChannel();

    return () => {
      channel.unsubscribe();
    };
  }, []);
  return (
    <AppContext.Provider
      value={{
        users,
        setUsers,
        countryCode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
