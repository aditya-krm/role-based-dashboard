import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function DashBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!location.state || !location.state.role) {
          navigate("/auth");
          return;
        }

        const userRole = location.state.role;
        const response = await axios.get(`api/dashboard/${userRole}`, {
          withCredentials: true,
        });
        setRole(response.data);
      } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong");
        navigate("/auth");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate, location.state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-3xl">
        Loading...
      </div>
    ); // TODO: Add a spinner
  }

  if (!role) {
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Welcome to {role} Dashboard</h1>
      <p className="text-2xl">Role: {role}</p>
    </div>
  );
}

export default DashBoard;
