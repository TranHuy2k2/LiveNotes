import { Card, CardBody, Flex, Text, Image } from "@chakra-ui/react";
import dayjs from "dayjs";
import { formatDateShow } from "../services/helpers";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function Message({ message }) {
  const { content, created_at, countryCode, username } = message;
  const { username: currentUsername } = useContext(AppContext);
  const isSelf = username === currentUsername;
  return (
    <Card
      bgColor={isSelf ? "white" : "lightblue"}
      style={{
        position: "relative",
        width: "fit-content",
      }}
    >
      <CardBody>
        <Flex>
          <Flex flexDirection="column">
            <Flex>
              <Text fontSize="sm" fontWeight="bold">
                {username}
              </Text>
              <Text marginLeft={2} fontSize="sm" color="gray.500">
                {formatDateShow(created_at)}
              </Text>
            </Flex>
            <Text fontSize="sm">{content}</Text>
          </Flex>
          <Image
            marginLeft={2}
            src={`/flags/${countryCode.toLowerCase()}.png`}
            alt={countryCode.toLowerCase()}
            boxSize="20px"
          />
        </Flex>
      </CardBody>
    </Card>
  );
}
