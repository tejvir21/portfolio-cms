import { Router } from "express";

import { deleteFile, uploadFile } from "../controllers/upload.controller";
import { upload } from "../middleware/upload.middleware";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, upload.single("file"), uploadFile);

router.delete("/", deleteFile);

export default router;
