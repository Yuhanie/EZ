import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import WelcomeTemplate from "../WelcomeTemplate";
import { render } from "@react-email/render";
import { getApp, getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from '../../settings/firebaseConfig';

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
  //firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  try {
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "profile"));
    querySnapshot.forEach(async (doc) => {
      const temp = (doc.data().email);
      console.log(`${doc.id} => ${doc.data().email}`);

      const email = temp || "victoria2013chang@gmail.com";
      const subject = req.body.subject || "有新的許願ㄛ！";
      const html = req.body.html || "測試";
      const message = req.body.message || "測試";
      const transporter = nodemailer.createTransport(smtpOptions);
      console.log("user:", process.env.SMTP_USER);
      await new Promise((resolve, reject) => {
        transporter.sendMail({
        from: process.env.SMTP_USER || "ezgroup329@gmail.com",
        to: email,
        subject: subject,
        html: render(WelcomeTemplate(subject, html, message)),
      });
      console.log("email:", email)
    });
  });
    return res.status(200).json({ message: "Email成功送出" });
  } catch (error:any) {
    console.error(error);
    return res.status(400).json({ message: "Email無法送出" });
    
  }


};

export default handler;
