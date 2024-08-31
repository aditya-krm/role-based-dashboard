import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
function Signup({ switchToLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", form);
      console.log(response.data); // Handle success (e.g., redirect to dashboard)
      // Optionally, you can switch to login after successful signup
      switchToLogin();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardDescription className="text-center">
          Create a new account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {error && <div className="text-red-500">{error}</div>}
        <Input
          type="text"
          name="username"
          required
          value={form.username}
          onChange={handleInputChange}
          placeholder="Username"
        />
        <Input
          type="password"
          name="password"
          required
          value={form.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <Input
          type="password"
          name="confirmPassword"
          required
          value={form.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
        />
        <div className="flex gap-4 mt-4 mx-auto">
          <label className="flex items-center px-4 py-2 border-2 rounded-xl cursor-pointer">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={form.role === "admin"}
              onChange={handleInputChange}
              className="mr-2 opacity-80"
            />
            Admin
          </label>
          <label className="flex items-center px-4 py-2 border-2 rounded-xl cursor-pointer">
            <input
              type="radio"
              name="role"
              value="manager"
              checked={form.role === "manager"}
              onChange={handleInputChange}
              className="mr-2 opacity-80"
            />
            Manager
          </label>
          <label className="flex items-center px-4 py-2 border-2 rounded-xl cursor-pointer">
            <input
              type="radio"
              name="role"
              value="user"
              checked={form.role === "user"}
              onChange={handleInputChange}
              className="mr-2 opacity-80"
            />
            User
          </label>
        </div>
        <div>
          <h1 className="text-xs opacity-60 mt-4">
            Already have an account?
            <span
              onClick={switchToLogin}
              className="ml-1 hover:text-blue-400 cursor-pointer"
            >
              Login
            </span>
          </h1>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="secondary"
          className="w-[40%] mx-auto"
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Signup;
