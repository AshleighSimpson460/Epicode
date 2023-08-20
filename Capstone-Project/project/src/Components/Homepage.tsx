import React from "react";
import { Box, Center, Heading, Text } from "@chakra-ui/react";

const Homepage = () => {
  return (
    <Box p={10}>
      <Box
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        textAlign="center"
      >
        <Heading as="h1" size="xl" mb={4}>
          Welcome to FinestFind!
        </Heading>
        <Heading as="h2" size="md">
          Discover the Finest Dining Experiences
        </Heading>
      </Box>
      <footer>
        <Text textAlign={"center"}>
          Everything has been designed and created by Ashleigh Simpson 2023
        </Text>
      </footer>
    </Box>
  );
};

export default Homepage;
