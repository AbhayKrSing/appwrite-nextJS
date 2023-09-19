"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
const Signup = () => {
  const router = useRouter();
  const [credentials, setcredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setcredentials({ ...credentials, [name]: value });
  };
  const submitform = async (e: any) => {
    e.preventDefault();
    if (!credentials) {
      return console.log("Credientials not exists");
    }
    try {
      const res = await axios.post("/api/users/signup", credentials);
      console.log("SignUp Success", res.data);
      if (!res.data.error) {
        router.push("/login");
      }
      toast.success("SignUp Success");
    } catch (error: any) {
      toast.error("SignUp failed", error.message);
    }
  };
  return (
    <div className="w-full max-w-xs mx-auto">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <form
        className="bg-gray-700 shadow-lg rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={submitform}
      >
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-4 focus:ring-blue-500"
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            onChange={handlechange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-4 focus:ring-blue-500"
            id="email"
            type="text"
            placeholder="email"
            name="email"
            onChange={handlechange}
          />
        </div>
        <div className="mb-4   ">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:ring-4 focus:ring-red-500"
            id="password"
            type="password"
            placeholder="password"
            name="password"
            onChange={handlechange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-bold mb-2"
            htmlFor="confirmpassword"
          >
            confirm Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-white mb-3 leading-tight focus:outline-none focus:ring-4 focus:ring-red-500"
            id="confirmpassword"
            type="password"
            placeholder="confirm password"
            name="confirmpassword"
            onChange={handlechange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-500"
            type="submit"
          >
            Sign Up
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-500"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-400 text-xs">
        <Link href={"/"}>Home</Link>
      </p>
      <Toaster />
    </div>
  );
};

export default Signup;
