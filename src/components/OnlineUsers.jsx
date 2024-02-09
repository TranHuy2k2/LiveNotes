import { Card, CardBody, CardHeader, Flex, Image } from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function OnlineUsers() {
  const { users, setUsers } = useContext(AppContext);
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        paddingRight: "1rem",
        paddingTop: "1rem",
      }}
    >
      <Card>
        <CardHeader padding={0} paddingTop={2}>
          <h2
            style={{
              fontSize: "1.2rem",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Online Users
          </h2>
        </CardHeader>
        <CardBody paddingX={8}>
          <ul>
            {users.map((user, index) => (
              <li key={index}>
                <Flex alignItems="center" justifyContent="space-between">
                  {user.username}
                  <Image
                    marginLeft={2}
                    src={`/flags/${user.countryCode.toLowerCase()}.png`}
                    alt={user.countryCode.toLowerCase()}
                    boxSize="20px"
                  />
                </Flex>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
