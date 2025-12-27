import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your verification code",
    text: `Your verification code is: ${otp}. It is valid for 5 minutes.`,
    html: `<p>Your verification code is: <b>${otp}</b></p><p>This code is valid for 5 minutes.</p>`,
  };

  return transporter.sendMail(mailOptions);
}
