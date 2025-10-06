"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { axios } from "axios";

export default function SignupPage() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {};
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Signup</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 border border-gray-300 rounded mb-4 focus:outline-none  focus:border-gray-600"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Enter your username"
      />

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
        onClick={onSignup}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Signup
      </button>

      <Link href="/login" className="mt-4 ">
        Already have an account?{" "}
        <span className="text-blue-500 hover:underline">Login</span>
      </Link>
    </div>
  );
}
