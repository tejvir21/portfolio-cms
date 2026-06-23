import { Router } from "express";

import {
  getDashboardStats,
} from "../controllers/dashboard.controller";

import {
  protect,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/stats",
  protect,
  getDashboardStats
);

export default router;
