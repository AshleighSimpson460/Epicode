import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import ColorModeSwitch from "./ColorModeSwitch.tsx";

const NavBar = () => {
  return (
    <div>
      <HStack>
        <Text>FinestFind</Text>
        <ColorModeSwitch />
      </HStack>
    </div>
  );
};

export default NavBar;
