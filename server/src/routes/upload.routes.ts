import { Router } from "express";

import { deleteFile, uploadFile } from "../controllers/upload.controller";
import { upload } from "../middleware/upload.middleware";
import { protect } from "../middleware/auth.middleware";
import { supabase } from "../config/supabase";

const router = Router();

const testSupabase = async (req: any, res: any) => {
  try {
    const { data, error } = await supabase.storage.listBuckets();

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error,
    });
  }
};

router.get("/test", testSupabase);

router.post("/", protect, upload.single("file"), uploadFile);

router.delete("/", protect, deleteFile);

export default router;
