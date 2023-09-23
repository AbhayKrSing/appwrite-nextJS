import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
export const POST = async (req: NextRequest) => {
  const reqbody = await req.json();
  const { token, password } = reqbody;
  const user = await User.findOne({
    forgotPasswordToken: token,
    forgotPasswordTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 500 });
  }
  console.log(user, "for changing password");
  const hashpassword = bcryptjs.hashSync(password, 10);
  user.password = hashpassword;
  user.isVerified = true;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordTokenExpiry = undefined;
  await user.save();
  return NextResponse.json({
    message: "Password Changed successfully and User verified",
    success: true,
  });
};
