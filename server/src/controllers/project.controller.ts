import { Request, Response } from "express";

import Project from "../models/Project";

import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

// Create Project
export const createProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.create(req.body);

    res.status(201).json(new ApiResponse(true, "Project created", project));
  },
);

// Get Projects
export const getProjects = asyncHandler(
  async (_req: Request, res: Response) => {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json(new ApiResponse(true, "Projects fetched", projects));
  },
);

// Get Project By Slug
export const getProjectBySlug = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findOne({
      slug: req.params.slug,
    });

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.status(200).json(new ApiResponse(true, "Project fetched", project));
  },
);

//   Update Project
export const updateProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.status(200).json(new ApiResponse(true, "Project updated", project));
  },
);

// Delete Project
export const deleteProject = asyncHandler(
  async (req: Request, res: Response) => {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      throw new ApiError(404, "Project not found");
    }

    res.status(200).json(new ApiResponse(true, "Project deleted"));
  },
);
