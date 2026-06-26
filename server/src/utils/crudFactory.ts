import { Request, Response } from "express";
import { Model } from "mongoose";

import { ApiResponse } from "./ApiResponse";
import { ApiError } from "./ApiError";
import { asyncHandler } from "./asyncHandler";

import EmailService from "../services/email.service";

export const createOne = (Model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const document = await Model.create(req.body);

    if (Model.name === "Contact") {
      await EmailService.sendContactEmails(req.body);
    }

    res
      .status(201)
      .json(new ApiResponse(true, "Created successfully", document));
  });

export const getAll = (Model: Model<any>) =>
  asyncHandler(async (_req: Request, res: Response) => {
    const documents = await Model.find().sort({
      createdAt: -1,
    });

    res
      .status(200)
      .json(new ApiResponse(true, "Fetched successfully", documents));
  });

export const getOne = (Model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const document = await Model.findById(req.params.id);

    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    res
      .status(200)
      .json(new ApiResponse(true, "Fetched successfully", document));
  });

export const updateOne = (Model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      // new: true,
      returnDocument: "after",
      runValidators: true,
    });

    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    res
      .status(200)
      .json(new ApiResponse(true, "Updated successfully", document));
  });

export const deleteOne = (Model: Model<any>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      throw new ApiError(404, "Document not found");
    }

    res.status(200).json(new ApiResponse(true, "Deleted successfully"));
  });
