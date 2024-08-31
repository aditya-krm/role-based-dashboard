import React, { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
function DashBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const role = location.state.role;
        const response = await axios.get(`/api/dashboard/${role}`, {
          withCredentials: true,
        });
        // console.log(response.data);
        setRole(response.data);
      } catch (error) {
        // console.log(error.response?.data?.message || "Something went wrong");
      }
    };
    fetchUser();
  }, [navigate, location.state.role]);
  if (role) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-bold">Welcome to {role} Dashboard</h1>
        <p className="text-2xl">Role: {role}</p>
      </div>
    );
  }
  return <div>pls login first</div>;
}

export default DashBoard;
