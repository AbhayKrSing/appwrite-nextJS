import User from "@/models/User";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashtoken = bcryptjs.hashSync(userId, 10);
    if (emailType === "Verify") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashtoken,
        verifyTokenExpiry: Date.now() + 360000,
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashtoken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: "kabhay849@gmail.com",
      to: email,
      subject:
        emailType === "Verify" ? "Verify the Email" : "Reset your Password",
      html: `<h1>Hi there!</h1>
    <p>Click <a href="${
      process.env.DOMAIN
    }/verifyemail?token=${hashtoken}">here</a> to ${
        emailType === "Verify" ? "verify your email" : "reset your password"
      }
    </p>`,
    };
    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    console.log(error.message);
  }
};
