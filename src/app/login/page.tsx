"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function LoginPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {};
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Login</h1>
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
        Signup
      </button>

      <Link href="/signup" className="mt-4 ">
        {"Doesn't have an account?"}{" "}
        <span className="text-blue-500 hover:underline">Signup</span>
      </Link>
    </div>
  );
}
