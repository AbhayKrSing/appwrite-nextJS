"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Loginpage = () => {
  const router = useRouter();
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const submitform = async (e: any) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/users/login", credentials);
      if (response.data.success) {
        console.log("Login sucess", response.data);
        toast.success("Login success");
        router.push("/profile");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error("Login failed");
    }
  };
  const handlechange = (e: any) => {
    const { name, value } = e.target;
    setcredentials({ ...credentials, [name]: value });
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
            htmlFor="Name"
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
            autoComplete="on"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-500"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-300 hover:text-blue-500"
            href="/login/forgotpassword"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className="text-center text-gray-400 text-xs">
        <Link href={"/"}>Home</Link>
        <Link href={"/signup"}>Signup</Link>
      </p>
      <Toaster />
    </div>
  );
};

export default Loginpage;
