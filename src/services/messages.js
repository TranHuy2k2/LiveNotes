import supabase from "./supabase";

export const sendMessage = async (message) => {
  const { data, error } = await supabase.from("messages").insert([message]);
  if (error) console.error("error sending message:", error.message);
  return data;
};

export const fetchMessages = async (setMessages, page = 0, pageSize = 10) => {
  const { data: messages, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: true })
    .range(page * pageSize, (page + 1) * pageSize - 1);
  if (error) {
    console.error("error fetching messages:", error.message);
    return;
  }

  setMessages(messages);
  return messages;
};
