import { Card, CardBody } from "@chakra-ui/react";
import { useContext } from "react";
import AppContext from "../context/AppContext";

export default function OnlineUsers() {
  const { users, setUsers } = useContext(AppContext);
  return (
    <div>
      <Card>
        <CardBody>
          <h4>Online Users</h4>
          <ul>
            {users.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
