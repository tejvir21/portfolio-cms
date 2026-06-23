import { Router } from "express";

import {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getProjects);

router.get("/:slug", getProjectBySlug);

router.post("/", protect, createProject);

router.put("/:id", protect, updateProject);

router.delete("/:id", protect, deleteProject);

export default router;
