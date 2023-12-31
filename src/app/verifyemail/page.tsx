"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const [query, setquery] = useState({ token: "", type: "" });
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

  const callverifyemail = async () => {
    const { data } = await axios.post("/api/users/verifyemail", query);
    if (data.success) {
      router.push("/login");
      toast(data.message);
    }
  };
  // const callresetpassword = async () => {
  //   // console.log(query.)
  // };
  useEffect(() => {
    //type se distinguish karna hai
    if (query.type === "Verify") {
      callverifyemail();
    } else if (query.type === "reset") {
      router.push(`/login/changepassword?token=${query.token}`);
    }
  }, [query]);
  useEffect(() => {
    const query = parseQueryString();
    setquery(query);
  }, []);
  return (
    <>
      <h1 className="text-white">Verifying </h1>
      <Toaster></Toaster>
    </>
  );
};

export default VerifyEmail;
