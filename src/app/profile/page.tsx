"use client";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>This is a protected profile page.</p>
      <hr />

      <button
        onClick={logout}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-3 px-4 rounded "
      >
        Logout
      </button>
    </div>
  );
}
