"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const [query, setquery] = useState({ token: "" });
  const router = useRouter();
  const parseQueryString = (): any => {
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
  useEffect(() => {
    if (query.token) {
      const fn = async () => {
        const { data } = await axios.post("/api/users/verifyemail", query);
        if (data.success) {
          router.push("/login");
          toast(data.message);
        }
      };
      fn();
    }
  }, [query]);
  useEffect(() => {
    const query = parseQueryString();
    setquery(query);
  }, []);
  return (
    <>
      <button>Verify </button>
      <Toaster></Toaster>
    </>
  );
};

export default VerifyEmail;
