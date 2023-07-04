import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Components/UserPage/LoginPage.tsx";
import RegisterPage from "./Components/UserPage/RegisterPage.tsx";
import NavBar from "./Components/NavBar.tsx";
import ChatroomPage from "./Components/Chatroom/ChatroomPage.tsx";
import IndexPage from "./Components/UserPage/indexPage.tsx";
import Homepage from "./Components/Homepage.tsx";
import DirectMessage from "./Components/Chatroom/DirectMessage.tsx";
import { showError, showToast } from "./Components/Toaster.js";

function App() {
  const [socket, setSocket] = useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("C_Token");
    if (token && !socket) {
      const newSocket = io("http://localhost:3002", {
        query: {
          token: token,
        },
      });
      newSocket.disconnect(() => {
        setSocket(null);
        setTimeout(setupSocket, 3000);
        showToast("error", "You have been disconnected");
      });

      newSocket.connect(() => {
        showError("success", "You have connected successfully");
      });

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
          <Route path="/" Component={<IndexPage />} />
          <Route
            path="/login"
            Component={() => <LoginPage setupSocket={setupSocket} />}
          />
          <Route path="/register" Component={<RegisterPage />} />
          <Route
            path="/chat"
            Component={() => <ChatroomPage socket={socket} />}
          />
          <Route path="/home" Component={<Homepage />} />
          <Route
            path="/groupchats/:id"
            Component={() => <DirectMessage socket={socket} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
