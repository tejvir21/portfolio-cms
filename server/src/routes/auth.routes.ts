import { Router } from "express";

import { login, getCurrentAdmin } from "../controllers/auth.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/login", login);

router.get("/me", protect, getCurrentAdmin);

export default router;
