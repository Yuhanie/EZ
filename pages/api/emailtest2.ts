import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const smtpOptions = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
      user: process.env.SMTP_USER || "user",
      pass: process.env.SMTP_PASSWORD || "password",
    },
  };
  try {
    const transporter = nodemailer.createTransport(smtpOptions);
    console.log("user:", process.env.SMTP_USER);
    await transporter.sendMail({
      from: process.env.SMTP_USER || "ezgroup329@gmail.com",
      to: "053792@mail.fju.edu.tw",
      subject: "測試",
      html: "測試 gmail",
    });
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
  }
};

export default handler;
