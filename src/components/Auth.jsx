import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../services/supabase";

import image from "../assets/TranHuy2k2.jpg";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Badge,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
const AuthComponent = () => {
  const { auth, setAuth } = useContext(AppContext);
  return (
    <Card maxWidth="100%" width={500}>
      <CardHeader>
        <Flex justifyContent="space-between">
          <h2>Become a new user!</h2>
          <Badge variant="solid" colorScheme="green">
            Success
          </Badge>
        </Flex>
      </CardHeader>
      <CardBody>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["google", "github"]}
          onlyThirdPartyProviders
        />
      </CardBody>
      <CardFooter>
        <Flex justifyContent="center" width="100%">
          <Avatar src={image} />
          <Box ml="3">
            <Text fontWeight="bold">
              Tran Gia Huy
              <Badge ml="1" colorScheme="green">
                Author
              </Badge>
            </Text>
            <Text fontSize="sm">Backend / AI Engineer</Text>
          </Box>
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default AuthComponent;
