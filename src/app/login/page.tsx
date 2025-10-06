"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import  axios  from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [Loading, setLoading] = useState(false);


  const onLogin = async () => {
    try{
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login response:", response.data);
      toast.success("Login successful!");
      router.push("/profile");
    }
    catch(error: unknown){
      if (error instanceof Error) {
        console.log("Login error:", error.message);
        toast.error(error.message);
      }
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);


  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-4xl">{Loading? "Processing":"Login"}</h1>
      <hr />

      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded mb-4 focus:outline-none  focus:border-gray-600"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Enter your email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded mb-4 focus:outline-none  focus:border-gray-600"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter your password"
      />

      <button
        onClick={onLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {buttonDisabled ? "Fill all the fields" : Loading ? "Logging in..." : "Login"}
      </button>

      <Link href="/signup" className="mt-4 ">
        {"Doesn't have an account?"}{" "}
        <span className="text-blue-500 hover:underline">Signup</span>
      </Link>
    </div>
  );
}
