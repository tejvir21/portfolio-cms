import { Router } from "express";
import {
  createCertificateCompany,
  deleteCertificateCompany,
  getCertificateCompanies,
  updateCertificateCompany,
} from "../controllers/certificateCompany.controller";

const router = Router();

router.get("/", getCertificateCompanies);
router.post("/", createCertificateCompany);
router.put("/:id", updateCertificateCompany);
router.delete("/:id", deleteCertificateCompany);

export default router;
