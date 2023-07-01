import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Flex } from "@chakra-ui/react";
import { showToast, showError } from "../Toaster";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar.tsx";

const RegisterUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // const [confirmPassword, setConfirmPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  // const handleConfirmPasswordChange = (event) => {
  //   setConfirmPassword(event.target.value);
  // };

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
    <div>
      <NavBar />
      <Flex h="70vh" alignItems="center" justifyContent="center">
        <Flex
          flexDirection="column"
          bg="#dd4b6a"
          p={12}
          borderRadius={10}
          boxShadow="lg"
        >
          <Card>
            <CardHeader pb={0}>Sign Up</CardHeader>
            <CardBody>
              <form onSubmit={handleFormSubmit}>
                <Flex justifyContent="center" flexDirection="column" pb={6}>
                  <label htmlFor="Email">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="John Smith"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="abc@mail.com"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {/* <label htmlFor="Birthday">Date Of Birth</label>
                <input type="date" name="date" id="date" /> */}
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="insert your password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {/* <label htmlFor="Password">Confirm Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="insert your password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                /> */}
                </Flex>
                <Flex>
                  <Button type="submit">Sign Up</Button>
                </Flex>
              </form>
            </CardBody>
          </Card>
        </Flex>
      </Flex>
    </div>
  );
};

export default RegisterUser;
