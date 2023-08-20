import React, { useEffect, useState, useCallback } from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { showError, showToast } from "./Components/Toaster.js";

import LoginPage from "./Components/UserPage/LoginPage.tsx";
import RegisterPage from "./Components/UserPage/RegisterPage.tsx";
import NavBar from "./Components/NavBar.tsx";
import ChatroomPage from "./Components/Chatroom/ChatroomPage.tsx";
import IndexPage from "./Components/UserPage/indexPage.tsx";
import Homepage from "./Components/Homepage.tsx";
import GroupMessage from "./Components/Chatroom/GroupMessage.tsx";
import PrivateMessages from "./Components/PrivateMessage/PrivateMessage.tsx";
import Restaurant from "./Components/RestaurantPage/Restaurant.tsx";
import InboxPage from "./Components/InboxPage/InboxPage.tsx";
import MyBooking from "./Components/BookedPage/MyBooking.tsx";

function App() {
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("C_Token");
        if (token) {
          const payload = jwt_decode(token);
          setCurrentUser(payload);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const setupSocket = useCallback(() => {
    const token = localStorage.getItem("C_Token");
    // console.log("token:", token);
    if (token && !socket) {
      const newSocket = io("http://localhost:3002", {
        auth: {
          token: token,
        },
        reconnection: false,
      });

      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 6000);
        showError("error", "It looks like you have been disconnected");
      });

      newSocket.on("connect", () => {
        showToast("success", "You have connected successfully");
      });

      setSocket(newSocket);
    }
  }, [socket]);

  useEffect(() => {
    setupSocket();
  }, [setupSocket]);

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
              <GroupMessage
                socket={socket}
                setupSocket={setupSocket}
                currentUser={currentUser}
                exact
              />
            }
          />
          <Route
            path="/inbox/:userId"
            element={
              <PrivateMessages
                socket={socket}
                setupSocket={setupSocket}
                currentUser={currentUser}
              />
            }
          />
          <Route
            path="/restaurants"
            element=<Restaurant currentUser={currentUser} />
          />
          <Route
            path="/inbox"
            element={<InboxPage currentUser={currentUser} />}
          />
          <Route path="/my-reservations" element={<MyBooking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
