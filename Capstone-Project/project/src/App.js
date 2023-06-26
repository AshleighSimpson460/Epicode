import React from "react";
import Users from "./Components/Fetch/users.tsx";
import LoginPage from "./Components/UserPage/LoginPage.tsx";
import RegisterPage from "./Components/UserPage/RegisterPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar.tsx";

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
