import connectdb from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
connectdb();

export async function POST(req: NextRequest) {
  //You can also use DELETE,GET,PUT
  try {
    const reqbody = await req.json();
    const { username, email, password } = reqbody;
    //Check if User already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        error: "User already exist",
        status: 400,
      });
    }
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    //creating new User
    let newUser = new User({
      username,
      email,
      password: hash,
    });
    newUser = await newUser.save();
    //send Email verification
    await sendEmail({
      email,
      emailType: "Verify",
      userId: newUser._id.toString(),
    });
    return NextResponse.json({
      //return must be there
      message: "User Saved Successfully",
      newUser,
      success: true,
    });
  } catch (error: any) {
    //Not a best way to handle error
    return NextResponse.json({ error: error.message });
  }
}
