import { Router } from "express";

import {
  createAchievement,
  getAchievements,
  getAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievement.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAchievements);

router.get("/:id", getAchievement);

router.post("/", protect, createAchievement);

router.put("/:id", protect, updateAchievement);

router.delete("/:id", protect, deleteAchievement);

export default router;
