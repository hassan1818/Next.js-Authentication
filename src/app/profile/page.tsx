"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const [data, setData] = useState("nothing");
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      // Redirect to login page after logout
      router.push("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>This is a protected profile page.</p>
      <hr />
      <h2 className="p-3 rounded bg-gray-600">
        {data === "nothing" ? (
          "Nothing here"
        ) : (
          <Link href={`/profile/${data}`} >
            User ID: {data}
            </Link>
        )}
      </h2>

      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-3 px-4 rounded "
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 my-3 px-4 rounded "  
      >
        Get User Details
      </button>
    </div>
  );
}
