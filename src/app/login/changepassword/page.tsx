"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const passwordref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const parseQueryString = (): any => {
    //get query string from window
    const str = window.location.search;
    const objURL: Record<string, string> = {};

    str.replace(
      new RegExp("([^?=&]+)(=([^&]*))?", "g"),
      ($0: string, $1: string, $2: string, $3: string) => {
        objURL[$1] = $3;
        return "";
      }
    );
    return objURL;
  };

  const submitform = async (e: any) => {
    const { token } = parseQueryString();
    e.preventDefault();
    const { data } = await axios.post("/api/users/login/changepassword", {
      password: passwordref?.current?.value,
      token: token,
    });
    toast.success(data.message);
    router.push("/login");
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
            ChangePassword
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-4 focus:ring-blue-500"
            id="password"
            type="password"
            placeholder="change password"
            name="password"
            ref={passwordref}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-4 focus:ring-blue-500"
            type="submit"
          >
            Change
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

export default page;
