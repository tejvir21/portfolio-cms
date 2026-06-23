import { Request, Response } from "express";

import Profile from "../models/Profile";

import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

// Get Profile
export const getProfile = asyncHandler(async (_req: Request, res: Response) => {
  const profile = await Profile.findOne();

  res.status(200).json(new ApiResponse(true, "Profile fetched", profile));
});

// Update Profile
export const updateProfile = asyncHandler(
  async (req: Request, res: Response) => {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      Object.assign(profile, req.body);

      await profile.save();
    }

    res.status(200).json(new ApiResponse(true, "Profile updated", profile));
  },
);
