"use client";
import axios from "axios";
import Link from "next/link";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const Forgotpassword = () => {
  const emailref = useRef<HTMLInputElement>(null);
  const submitform = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/users/login/forgotpassword", {
        email: emailref?.current?.value,
      });
      toast.success(data.message);
    } catch (error: any) {
      console.log(error.message);
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
            htmlFor="Name"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-4 focus:ring-blue-500"
            id="email"
            type="email"
            placeholder="email"
            name="email"
            ref={emailref}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-500"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <p className="text-center text-gray-400 text-xs">
        <Link href={"/"}>Home</Link>
      </p>
      <Toaster />
    </div>
  );
};

export default Forgotpassword;
