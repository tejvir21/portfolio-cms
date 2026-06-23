import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import Admin from "../models/Admin";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { generateToken } from "../utils/jwt";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({
    email: email.toLowerCase(),
  });

  if (!admin) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = generateToken({
    adminId: admin._id.toString(),
  });

  res.status(200).json(
    new ApiResponse(true, "Login successful", {
      token,
      admin: {
        id: admin._id,
        email: admin.email,
      },
    }),
  );
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
