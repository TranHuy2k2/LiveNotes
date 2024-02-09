import React, { useContext } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../assets/TranHuy2k2.jpg";
import supabase from "../../services/supabase";
import AuthContext from "../../context/AuthContext";

const NavBar = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const logOut = async () => {
    await supabase.auth.signOut();
    setAuth(null);
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-header">
            <a href="#">
              <Flex alignItems="center">
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={logo}
                />
                <h4 style={{ marginLeft: 8 }}>
                  Suba<span>Feats</span>
                </h4>
              </Flex>
            </a>
          </div>

          <div className="navbar-menu" id="open-navbar1">
            <ul className="navbar-nav" style={{ alignItems: "center" }}>
              <li>
                <Link to="/">Home</Link>
              </li>
              {auth?.user ? (
                <li>
                  <Menu>
                    <MenuButton style={{ padding: 8 }}>
                      <Flex
                        style={{ padding: 8 }}
                        justifyContent="center"
                        width="100%"
                      >
                        <Avatar src={auth.user?.user_metadata?.avatar_url} />
                        <Box ml="3">
                          <Text fontWeight="bold">
                            {auth.user?.user_metadata?.name}
                          </Text>
                          <Text fontSize="sm">
                            {auth.user?.user_metadata?.email}
                          </Text>
                        </Box>
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      <Button width="100%">
                        <Flex
                          onClick={logOut}
                          justifyContent="center"
                          alignItems="center"
                        >
                          Logout
                          <ArrowRightIcon style={{ margin: "0 1rem" }} />
                        </Flex>
                      </Button>
                    </MenuList>
                  </Menu>
                </li>
              ) : (
                <li>
                  <Link to="/auth">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
