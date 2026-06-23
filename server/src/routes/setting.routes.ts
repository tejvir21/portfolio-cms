import { Router } from "express";

import { getSettings, updateSettings } from "../controllers/setting.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getSettings);

router.put("/", protect, updateSettings);

export default router;
