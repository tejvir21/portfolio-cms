const nodemailer = require("nodemailer");
import generatePassword from "../helpers/generateOTP";

export const sendOtp = async (email: string) => {
  const otp = generatePassword(10);

  // Configure transporter (use environment variables for security)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app password
    },
  });

  const mailOptions = {
    from: `${process.env.NAME} <${process.env.EMAIL_USER}>`,
    to: [process.env.EMAIL_RECEIVER],
    subject: `${process.env.NAME} Portfolio - OTP Verification`,
    text: `Hello,

Thank you for signing in with ${process.env.NAME} Portfolio!

Your One-Time Password (OTP) for verification is: ${otp}

Please enter this OTP in the app to complete your login.

If you did not request this, please ignore this email.

Best regards,
${process.env.NAME} Portfolio Team
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { otp, success: true, message: "OTP sent successfully" };
  } catch (error) {
    // console.error("Error sending OTP email:", error);

    // throw new Error("Failed to send OTP email");

    return { success: false, message: "Failed to send OTP email", error };
  }
};
