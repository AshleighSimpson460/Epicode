import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";

import LoginPage from "./Components/UserPage/LoginPage.tsx";
import RegisterPage from "./Components/UserPage/RegisterPage.tsx";
import NavBar from "./Components/NavBar.tsx";
import ChatroomPage from "./Components/Chatroom/ChatroomPage.tsx";
import IndexPage from "./Components/UserPage/indexPage.tsx";
import Homepage from "./Components/Homepage.tsx";
import GroupMessage from "./Components/Chatroom/GroupMessage.tsx";
import { showError, showToast } from "./Components/Toaster.js";
import PrivateMessages from "./Components/PrivateMessage/PrivateMessage.tsx";

function App() {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
  });

  const fetchCurrentUser = async () => {
    try {
      const fetchUser = await fetch("http://localhost:3002/user");
      const currentUserData = await fetchUser.json();

      const id = currentUserData._id;
      const name = currentUserData.name || "Unknown";

      setCurrentUser({
        id: id,
        name: name,
      });
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const setupSocket = () => {
    const token = localStorage.getItem("C_Token");
    console.log("token:" + token);
    if (token && !socket) {
      const newSocket = io("http://localhost:3002", {
        auth: {
          token: token,
        },
        reconnection: false,
      });

      const decodedToken = jwt_decode(token, { ignoreExpiration: true });
      const user = { id: decodedToken.id, name: decodedToken.name };
      console.log("Decoded User:", user);

      setCurrentUser(user);

      console.log(newSocket);
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 6000);
        showError("error", "It looks like you have been disconnected");
      });

      newSocket.on("connect", () => {
        showToast("success", "You have connected successfully");
      });
      console.log(newSocket);
      setSocket(newSocket);
    }
  };

  useEffect(() => {
    setupSocket();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<IndexPage />} exact />
          <Route
            path="/login"
            element={<LoginPage setupSocket={setupSocket} exact />}
          />
          <Route path="/register" element={<RegisterPage />} exact />
          <Route
            path="/chat"
            element={
              <ChatroomPage socket={socket} setupSocket={setupSocket} exact />
            }
          />
          <Route path="/home" element={<Homepage />} exact />
          <Route
            path="/groupchats/:chatId"
            element={
              <GroupMessage socket={socket} setupSocket={setupSocket} exact />
            }
          />
          <Route
            path="/inbox"
            element={
              <PrivateMessages
                socket={socket}
                setupSocket={setupSocket}
                currentUser={currentUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
