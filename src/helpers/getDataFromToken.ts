import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export async function getDataFromToken(req:NextRequest) {
    try {
        const token=  req.cookies.get('token')?.value|| ""
        //Verify token
      const Userdata=  jwt.verify(token,process.env.TOKEN_SECRET!)
      return Userdata
    } catch (error:any) {
        console.log(error.message)
    }
}