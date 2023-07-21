import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const smtpOptions = {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    //secure: true,
    auth: {
      user: process.env.SMTP_USER || "user",
      pass: process.env.SMTP_PASSWORD || "password",
    },
  };
  try {
    const email = req.body.email || "victoria2013chang@gmail.com";
    const subject = req.body.subject || "測試";
    const transporter = nodemailer.createTransport(smtpOptions);
    console.log("user:", process.env.SMTP_USER);
    await transporter.sendMail({
      from: process.env.SMTP_USER || "ezgroup329@gmail.com",
      to: email,
      subject: subject,
      html: "測試 gmail",
    });
    return res.status(200).json({ message: "Email成功送出" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Email無法送出" });
    
  }
};

export default handler;
