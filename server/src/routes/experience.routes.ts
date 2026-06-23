import { Router } from "express";

import {
  createExperience,
  getExperiences,
  getExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experience.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getExperiences);

router.get("/:id", getExperience);

router.post("/", protect, createExperience);

router.put("/:id", protect, updateExperience);

router.delete("/:id", protect, deleteExperience);

export default router;
