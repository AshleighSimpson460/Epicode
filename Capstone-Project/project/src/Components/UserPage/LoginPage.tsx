import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Flex,
  Button,
  Input,
  FormControl,
  FormLabel,
  Text,
  Heading,
} from "@chakra-ui/react";
import { showError, showToast } from "../Toaster";
import { useNavigate } from "react-router-dom";

const LoginUser = (props: { setupSocket: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password,
    };

    fetch("http://localhost:3002/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      mode: "cors",
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message);
        } else {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res.token);
        showToast("success", "Successfully logged In");
        localStorage.setItem("C_Token", res.token);
        navigate("/chat");
        props.setupSocket();
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
      <Card w="400px" p={8} boxShadow="lg" borderRadius="md" textAlign="center">
        <Heading mb={6}>Log In</Heading>
        <form onSubmit={handleFormSubmit}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="abc@mail.com"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Insert your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4} w="100%">
            Login
          </Button>
        </form>
        <Text mt={4}>
          Don't have an account?{" "}
          <Button
            colorScheme="teal"
            size="sm"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </Text>
      </Card>
    </Flex>
  );
};

export default LoginUser;
