import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, subject, text, html } = body;

    // Konfigurasi transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // atau pakai "smtp"
      auth: {
        user: process.env.EMAIL_USER, // email kamu
        pass: process.env.EMAIL_PASS, // app password (bukan password biasa)
      },
    });

    // Kirim email
    await transporter.sendMail({
      from: `"DISKOMINFOSANDI BARUT" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html
    });

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
