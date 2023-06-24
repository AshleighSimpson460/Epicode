import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import ColorModeSwitch from "./ColorModeSwitch.jsx";

const NavBar = () => {
  return (
    <div>
      <HStack justifyContent="space-between" padding="10px">
        <Text>FinestFind</Text>
        <ColorModeSwitch />
      </HStack>
    </div>
  );
};

export default NavBar;
