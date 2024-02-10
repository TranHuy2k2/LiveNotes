import {
  Card,
  CardBody,
  CardHeader,
  Flex,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function OnlineUsers() {
  const { users } = useContext(AppContext);
  return (
    <div style={{ margin: "1rem 0" }}>
      <Card>
        <CardHeader padding={4} paddingTop={2}>
          <h2
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            Online Users
          </h2>
        </CardHeader>
        <CardBody paddingX={8}>
          <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            {users.map((user, index) => (
              <GridItem key={index} w="100%" h="10">
                <Flex alignItems="center" justifyContent="space-between">
                  {user.username}
                  <Image
                    src={`/flags/${user.countryCode.toLowerCase()}.png`}
                    alt={user.countryCode.toLowerCase()}
                    boxSize="20px"
                  />
                </Flex>
              </GridItem>
            ))}
          </Grid>
        </CardBody>
      </Card>
    </div>
  );
}
