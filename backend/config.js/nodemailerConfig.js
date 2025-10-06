import nodemailer from "nodemailer";
import AppError from "../utils/ErrorHandler.js";


// nodemailer cofigration

const transport = nodemailer.createTransport({
    service:"gmail",
//   host: process.env.MAIL_HOST |"smtp.gmail.com",
  port: process.env.MAIL_PORT || 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER ,
    pass: process.env.MAIL_PASS 
  },
});

export async function sendMail(mailOption) {
  try {
    let info = await transport.sendMail(mailOption);
    console.log("mail send successfully");
  } catch (err) {
      console.log("failed to send mail", err);
      throw new AppError("Failed to send mail", 500);
  }
}
