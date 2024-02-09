import supabase from "../services/supabase";
import { Button } from "@chakra-ui/react";
import OnlineUsers from "../components/OnlineUsers";

export default function HomePage() {
  const channelA = supabase.channel("room-1");

  function messageReceived(payload) {}
  function sendMessage() {
    // channelA.send({
    //   type: "broadcast",
    //   event: "test",
    //   payload: { message: "hello, world" },
    // });
  }

  // Subscribe to the Channel
  channelA
    .on("broadcast", { event: "test" }, (payload) => messageReceived(payload))
    .subscribe();

  return (
    <div>
      <OnlineUsers />
      <Button onClick={sendMessage}>Send Message</Button>
    </div>
  );
}
