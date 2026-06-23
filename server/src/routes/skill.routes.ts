import { Router } from "express";

import {
  createSkill,
  getSkills,
  getSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skill.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getSkills);

router.get("/:id", getSkill);

router.post("/", protect, createSkill);

router.put("/:id", protect, updateSkill);

router.delete("/:id", protect, deleteSkill);

export default router;
