import React from "react";
import LoginPage from "./Components/UserPage/LoginPage.tsx";
import RegisterPage from "./Components/UserPage/RegisterPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar.tsx";
import ChatroomPage from "./Components/Chatroom/ChatroomPage.tsx";
import IndexPage from "./Components/UserPage/indexPage.tsx";
import Homepage from "./Components/Homepage.tsx";
import DirectMessage from "./Components/Chatroom/DirectMessage.tsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatroomPage />} />
          <Route path="/home" element={<Homepage />} />
          <Route path="/groupchats/:id" element={<DirectMessage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
