import { Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch.jsx";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("C_Token");

  const handleLogout = () => {
    localStorage.removeItem("C_Token");
    navigate("/home");
  };

  return (
    <div>
      <HStack justifyContent="space-between" padding="10px">
        <Text>FinestFind</Text>
        <Text>
          <Link to="/chat">Public chat</Link>
        </Text>
        <Text>
          <Link to="/restaurants">Restaurants</Link>
        </Text>
        <Text>
          <Link to="/inbox">Inbox</Link>
        </Text>
        <Flex alignItems="center" padding="10px">
          <ColorModeSwitch />
          {isLoggedIn ? (
            <>
              <span style={{ margin: "0 10px" }}></span>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <span style={{ margin: "0 10px" }}></span>
              <Link to="/login">Login</Link>
            </>
          )}
        </Flex>
      </HStack>
    </div>
  );
};

export default NavBar;
