import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getDataFromToken(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value || "";
    console.log(token); //will remove after vercel debugged happens
    //Verify token
    const Userdata = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log(Userdata);
    return Userdata;
  } catch (error: any) {
    console.log(error.message);
  }
}
