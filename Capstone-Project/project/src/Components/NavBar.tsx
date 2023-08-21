import React from "react";
import { Flex, HStack, Text, Button, Spacer } from "@chakra-ui/react";
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
    <Flex
      as="nav"
      justifyContent="space-between"
      p={4}
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <HStack spacing={4} alignItems="center" marginTop={"10px"}>
        <Link to="/home" style={{ display: "flex", alignItems: "center" }}>
          <Text fontSize="xl" fontWeight="bold" _hover={{ color: "gray" }}>
            FinestFind
          </Text>
        </Link>
        <Spacer />
        <Link to="/restaurants">
          <Button
            variant="link"
            onClick={handleUnauthorizedClick}
            isDisabled={!isLoggedIn}
            _hover={{ textDecoration: "underline" }}
          >
            Restaurants
          </Button>
        </Link>
        {isLoggedIn && (
          <Link to="/my-reservations">
            <Button variant="link" _hover={{ textDecoration: "underline" }}>
              My Reservations
            </Button>
          </Link>
        )}
        <Link to="/chat">
          <Button
            variant="link"
            onClick={handleUnauthorizedClick}
            isDisabled={!isLoggedIn}
            _hover={{ textDecoration: "underline" }}
          >
            Public Chat
          </Button>
        </Link>
        {isLoggedIn && (
          <Link to="/inbox">
            <Button variant="link" _hover={{ textDecoration: "underline" }}>
              Inbox
            </Button>
          </Link>
        )}
      </HStack>
      <HStack spacing={4}>
        <ColorModeSwitch />
        {isLoggedIn ? (
          <Button
            colorScheme="blue"
            onClick={handleLogout}
            _hover={{ bg: "blue.600" }}
          >
            Logout
          </Button>
        ) : (
          <HStack spacing={4}>
            <Link to="/login">
              <Button colorScheme="blue" _hover={{ bg: "blue.600" }}>
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="green" _hover={{ bg: "green.600" }}>
                Sign Up
              </Button>
            </Link>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
};

export default NavBar;
