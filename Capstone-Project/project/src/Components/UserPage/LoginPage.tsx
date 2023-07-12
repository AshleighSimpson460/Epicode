import React, { useState } from "react";
import { Card, CardHeader, CardBody, Flex, Button } from "@chakra-ui/react";
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
    <div>
      <Flex h="70vh" alignItems="center" justifyContent="center">
        <Flex flexDirection="column" p={12} borderRadius={10}>
          <Card>
            <CardHeader pb={0}>Log In</CardHeader>
            <CardBody>
              <form onSubmit={handleFormSubmit}>
                <Flex justifyContent="center" flexDirection="column" pb={6}>
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="abc@mail.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="insert your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </Flex>
                <Flex justifyContent="space-between">
                  <Button type="submit">Login</Button>
                  <Button
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Sign Up
                  </Button>
                </Flex>
              </form>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </div>
  );
};

export default LoginUser;
