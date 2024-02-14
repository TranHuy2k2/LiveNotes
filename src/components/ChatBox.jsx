import { ArrowRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import OnlineUsers from "./OnlineUsers";
import { useContext, useState } from "react";
import { sendMessage } from "../services/messages";
import AppContext from "../context/AppContext";
import Message from "./Message";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const { username, countryCode, messages } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    await sendMessage({ content: message, username, countryCode });
  };
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        paddingLeft: "1rem",
        paddingTop: "1rem",
        width: 400,
      }}
    >
      <OnlineUsers />
      <Card height={400} overflowY="auto">
        <CardHeader>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            ChatBox
          </h2>
        </CardHeader>
        <CardBody>
          <Box py="10px" pt="15px">
            {messages.map((message, index) => (
              <div style={{ marginBottom: 8 }} key={index}>
                <Message message={message} />
              </div>
            ))}
          </Box>
          <Box py="10px" pt="15px">
            <Container maxW="600px">
              <form onSubmit={handleSubmit} autoComplete="off">
                <Stack direction="row">
                  <Input
                    name="message"
                    placeholder="Enter a message"
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    bg="white"
                    autoFocus
                    maxLength="500"
                  />
                  <IconButton
                    // variant="outline"
                    colorScheme="teal"
                    aria-label="Send"
                    fontSize="20px"
                    icon={<ArrowRightIcon />}
                    type="submit"
                  />
                </Stack>
              </form>
              <Box fontSize="10px" mt="1">
                Warning: this is a public chat, do not share sensitive
                information.
              </Box>
            </Container>
          </Box>
        </CardBody>
      </Card>
    </div>
  );
}
