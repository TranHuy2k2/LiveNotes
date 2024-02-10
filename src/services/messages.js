import supabase from "./supabase";

export const sendMessage = async (message) => {
  const { data, error } = await supabase.from("messages").insert([message]);
  if (error) console.error("error sending message:", error.message);
  return data;
};

export const fetchMessages = async (setMessages) => {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("inserted_at", { ascending: true });
  if (error) console.error("error fetching messages:", error.message);
  setMessages(messages);
};
