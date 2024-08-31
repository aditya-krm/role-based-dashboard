import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
function Login({ switchToSignup }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      console.log(form);
      const response = await axios.post("/api/auth/login", form, {
        withCredentials: true,
      });

      navigate("/dashboard/", { state: { role: response.data.role } });
      // Handle success (e.g., redirect to dashboard)
      // Optionally, you can switch to login after successful signup
      // switchToLogin();
    } catch (err) {
      console.log(err.response?.data?.message || "Something went wrong");
      toast("Invalid credentials", "error");
    }
  };
  return (
    <Card>
      <Toaster position="top-right" />
      <CardHeader>
        <CardDescription className="text-center">
          Login with existing account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <Input
          type="text"
          placeholder="Enter username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <div>
          <h1 className="text-xs opacity-60 mt-4">
            Don't have an account?
            <span
              onClick={switchToSignup}
              className="ml-1 hover:text-blue-400 cursor-pointer"
            >
              Sign Up
            </span>
          </h1>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="mx-auto" variant="secondary" onClick={handleLogin}>
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Login;
