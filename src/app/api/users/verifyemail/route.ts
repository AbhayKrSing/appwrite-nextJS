import connectdb from "@/dbConfig/dbConfig";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connectdb();
export async function POST(req: NextRequest) {
  const reqbody = await req.json();
  const { token } = reqbody;
  console.log(token);
  const user = await User.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() },
  });
  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 500 });
  }
  console.log(user);
  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;
  await user.save();
  return NextResponse.json({
    message: "Email verified successfully",
    success: true,
  });
}
