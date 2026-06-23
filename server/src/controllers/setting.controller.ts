import { Request, Response } from "express";

import Setting from "../models/Setting";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getSettings = asyncHandler(async (_req: Request, res: Response) => {
  const settings = await Setting.findOne();

  res.status(200).json(new ApiResponse(true, "Settings fetched", settings));
});

export const updateSettings = asyncHandler(
  async (req: Request, res: Response) => {
    let settings = await Setting.findOne();

    if (!settings) {
      settings = await Setting.create(req.body);
    } else {
      Object.assign(settings, req.body);
      await settings.save();
    }

    res.status(200).json(new ApiResponse(true, "Settings updated", settings));
  },
);
