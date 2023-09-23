import { sendEmail } from "@/helpers/mailer";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        message: "User not exists",
        status: 401,
      });
    }
    const mailresponse = await sendEmail({
      email,
      emailType: "reset",
      userId: user._id.toString(),
    });
    console.log(mailresponse);
    return NextResponse.json({
      message: "Check Your email for further process",
      success: true,
    });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({
      error: error.message,
    });
  }
}
