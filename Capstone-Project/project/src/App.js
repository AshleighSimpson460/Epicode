import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Components/UserPage/LoginPage.tsx";
import RegisterPage from "./Components/UserPage/RegisterPage.tsx";
import NavBar from "./Components/NavBar.tsx";
import ChatroomPage from "./Components/Chatroom/ChatroomPage.tsx";
import IndexPage from "./Components/UserPage/indexPage.tsx";
import Homepage from "./Components/Homepage.tsx";
import DirectMessage from "./Components/Chatroom/DirectMessage.tsx";
import { showToast } from "./Components/Toaster.js";

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("C_Token");
    console.log("token:" + token);
    if (token && !socket) {
      const newSocket = io("http://localhost:3002", {
        auth: {
          token: token,
        },
      });

      console.log(newSocket);
      newSocket.on("disconnect", () => {
        setSocket(null);
        setTimeout(setupSocket, 6000);
        showToast("success", "You have been disconnected");
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

  if (!socket) {
    return <div>Loading...</div>;
  }

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
              <DirectMessage socket={socket} setupSocket={setupSocket} exact />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
