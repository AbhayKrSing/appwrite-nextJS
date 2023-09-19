import connectdb from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connectdb();

export async function POST(req: NextRequest) {
  try {
    const reqbody = await req.json();
    const { email, password } = reqbody;
    //check if User exist
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return NextResponse.json({
        message: "User Not Exists",
        status: 401,
      });
    }
    //compare password
    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return NextResponse.json({
        message: "Write valid credentials",
        status: 401,
      });
    }
    //create token data
    const tokendata = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });
    //sending cookies
    const response = NextResponse.json({
      message: "Login successfully",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      success: false,
    });
  }
}
