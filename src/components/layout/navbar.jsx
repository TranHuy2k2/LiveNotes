import React from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../assets/TranHuy2k2.jpg";
const MenuToggle = ({ toggle, isOpen }) => {
  return (
    <Box display={{ base: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <CloseIcon /> : <HamburgerIcon />}
    </Box>
  );
};

const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      color={["black", "black", "primary.700", "primary.700"]}
      bg={["lightGrey", "lightGrey"]}
      {...props}
    >
      {children}
    </Flex>
  );
};

const MenuItem = ({ children, isLast, to = "/", ...rest }) => {
  return (
    <Link to={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};

const MenuLinks = ({ isOpen }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/auth">Login</MenuItem>
      </Stack>
    </Box>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-header">
            <button className="navbar-toggler" data-toggle="open-navbar1">
              <div>
                <Link to="/">Trang chủ</Link>
              </div>
              <div>
                <Link to="/auth">Luật</Link>
              </div>
            </button>
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
              <li>
                <Link to="/auth">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
