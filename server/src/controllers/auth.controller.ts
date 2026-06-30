import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import Admin from "../models/Admin";
import OTP from "../models/OTP";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { generateToken } from "../utils/jwt";
import { sendOtp } from "../utils/sendOTP";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, otp } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    res
      .status(400)
      .json(new ApiResponse(false, "Email and password are required"));
    return;
  }

  // Check if OTP is provided
  const otpVerification = await OTP.findOne({
    email: email.toLowerCase(),
    ip: req.ip,
  });

  // Send OTP if not already sent
  if (!otpVerification) {
    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      res.status(401).json(new ApiResponse(false, "Invalid email"));
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      res.status(401).json(new ApiResponse(false, "Invalid password"));
      return;
    }

    const verifyAdmin = await sendOtp(email);

    if (verifyAdmin.success) {
      await OTP.create({
        email: email.toLowerCase(),
        user_id: admin._id.toString(),
        otp: verifyAdmin.otp,
        ip: req.ip,
      });

      res
        .status(200)
        .json(new ApiResponse(true, "OTP sent successfully", null));
      return;
    } else {
      res.status(500).json(new ApiResponse(false, "Failed to send OTP"));
      return;
    }
  }

  // Check if OTP is expired or not yet sent after 5 minutes
  else if (otpVerification.updatedAt.getTime() + 5 * 60 * 1000 < Date.now()) {
    const verifyAdmin = await sendOtp(email);

    if (verifyAdmin.success && verifyAdmin.otp) {
      otpVerification.otp = verifyAdmin.otp;
      await otpVerification.save();
    } else {
      res.status(500).json(new ApiResponse(false, "Failed to refresh OTP"));
      return;
    }
    res.status(401).json(new ApiResponse(true, "OTP Refreshed"));
    return;
  }
  // Check if OTP is valid
  else {
    const isOtpValid = otp === otpVerification.otp;

    if (!isOtpValid) {
      res.status(401).json(new ApiResponse(false, "Invalid OTP"));
      return;
    }

    // Delete OTP
    await OTP.findByIdAndDelete(otpVerification._id);

    const token = generateToken({
      adminId: otpVerification.user_id.toString(),
    });

    res.status(200).json(
      new ApiResponse(true, "Login successful", {
        token,
        admin: {
          id: otpVerification.user_id,
          email: otpVerification.email,
        },
      }),
    );

    // Delete all OTPs for the user
    await OTP.deleteMany({ email: email.toLowerCase() });
  }
});

export const getCurrentAdmin = asyncHandler(
  async (req: Request, res: Response) => {
    const adminId = req.user?.adminId;

    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      throw new ApiError(404, "Admin not found");
    }

    res.status(200).json(new ApiResponse(true, "Admin fetched", admin));
  },
);
