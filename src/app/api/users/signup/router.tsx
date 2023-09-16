import connectdb from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
connectdb();

export async function POST(req: NextRequest) {
  //You can also use DELETE,GET,PUT
  try {
    const reqbody = await req.json();
    const { username, email, password } = reqbody;
    console.log(reqbody);
    //Check if User already exists
    const user = await User.findone({ email });
    if (user) {
      return NextResponse.json({
        error: "User already exist",
        statue: 400,
      });
    }
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    //creating new User
    let newUser = new User({
      username,
      email,
      password,
    });
    newUser = await newUser.save();
    console.log(newUser);
    NextResponse.json({
      message: "User Saved Successfully",
      newUser,
      success: true,
    });
  } catch (error: any) {
    //Not a best way to handle error
    return NextResponse.json({ error: error.message });
  }
}
