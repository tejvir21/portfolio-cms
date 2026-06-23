import { Router } from "express";

import {
  createCertificate,
  getCertificates,
  getCertificate,
  updateCertificate,
  deleteCertificate,
} from "../controllers/certificate.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getCertificates);

router.get("/:id", getCertificate);

router.post("/", protect, createCertificate);

router.put("/:id", protect, updateCertificate);

router.delete("/:id", protect, deleteCertificate);

export default router;
