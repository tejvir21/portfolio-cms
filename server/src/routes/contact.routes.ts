import { Router } from "express";

import {
  createContact,
  getContacts,
  deleteContact,
} from "../controllers/contact.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

/**
 * Public
 */
router.post("/", createContact);

/**
 * Admin
 */
router.get("/", protect, getContacts);

router.delete("/:id", protect, deleteContact);

export default router;
