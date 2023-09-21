"use client";

import Logout from "@/Components/Logout";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Profilepage() {
  const [data, setdata] = useState("");
  useEffect(() => {
    const fn = async () => {
      const { data } = await axios.get("/api/users/me");
      console.log(data._id);
      setdata(data?.id);
    };
    fn();
  }, []);

  return (
    <>
      <h1 className="text-white text-center">Profile page</h1>
      <Logout>
        <Link href={"/profile/" + data} className="text-red-400">
          {data}
        </Link>
      </Logout>
    </>
  );
}
