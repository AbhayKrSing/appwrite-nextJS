"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

const Logout = ({ children }: any) => {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error("Loginout failed");
      console.log(error.message);
    }
  };
  return (
    <div className="text-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        Logout
      </button>
      {children}
      <Toaster></Toaster>
    </div>
  );
};

export default Logout;
