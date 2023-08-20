import React, { useState } from "react";
import {
  Button,
  Flex,
  Box,
  Heading,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { showToast, showError } from "../Toaster";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name: name,
      email: email,
      password: password,
    };

    fetch("http://localhost:3002/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      mode: "cors",
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .then(() => {
        showToast("success", "Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        if (error && error.message) {
          showError("error", error.message);
        } else {
          showError("error", "An error occurred");
        }
      });
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Box
        w="400px"
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="md"
        textAlign="center"
        color="black"
      >
        <Heading mb={6}>Sign Up</Heading>
        <form onSubmit={handleFormSubmit}>
          <FormControl mb={4}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="John Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="abc@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              _placeholder={{ color: "gray.500" }}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Insert your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                _placeholder={{ color: "gray.500" }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4} w="100%">
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default RegisterUser;
