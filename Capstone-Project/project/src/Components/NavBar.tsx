import React from "react";
import { Flex, HStack, Text, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import ColorModeSwitch from "./ColorModeSwitch.jsx";

const NavBar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("C_Token");

  const handleLogout = () => {
    localStorage.removeItem("C_Token");
    navigate("/home");
  };

  const handleUnauthorizedClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  return (
    <HStack justifyContent="space-between" padding={4} alignItems="center">
      <Text fontSize="xl" fontWeight="bold">
        <Link to="/home">FinestFind</Link>
      </Text>
      <HStack spacing={4}>
        <Link to="/chat">
          <Button
            variant={"link"}
            onClick={handleUnauthorizedClick}
            isDisabled={!isLoggedIn}
          >
            Public Chat
          </Button>
        </Link>
        <Link to="/restaurants">
          <Button
            variant="link"
            onClick={handleUnauthorizedClick}
            isDisabled={!isLoggedIn}
          >
            Restaurants
          </Button>
        </Link>
        {isLoggedIn && (
          <Link to="/inbox">
            <Button variant={"link"}>Inbox</Button>
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/my-reservations">
            <Button variant={"link"}>My Reservation</Button>
          </Link>
        )}
      </HStack>
      <Flex alignItems="center">
        <ColorModeSwitch />
        {isLoggedIn ? (
          <Button colorScheme="blue" ml={4} onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <HStack spacing={4}>
            <Link to="/login">
              <Button colorScheme="blue">Login</Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="green">Sign Up</Button>
            </Link>
          </HStack>
        )}
      </Flex>
    </HStack>
  );
};

export default NavBar;
