import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import DashBoard from "./pages/DashBoard";
import Signup from "./components/customs/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
