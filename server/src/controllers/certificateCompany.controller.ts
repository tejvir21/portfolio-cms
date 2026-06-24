import { Request, Response } from "express";
import CertificateCompany from "../models/CertificateCompany";
import { removeFileFromStorage } from "./upload.controller";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getCertificateCompanies = async (_req: Request, res: Response) => {
  try {
    const companies = await CertificateCompany.find({ active: true }).sort({
      sortOrder: 1,
      name: 1,
    });

    return res.status(200).json({
      success: true,
      data: companies,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch certificate companies",
      error,
    });
  }
};

export const createCertificateCompany = async (req: Request, res: Response) => {
  try {
    const {
      name,
      logoUrl,
      logoKey = "",
      active = true,
      sortOrder = 0,
    } = req.body;

    if (!name || !logoUrl) {
      return res.status(400).json({
        success: false,
        message: "name and logoUrl are required",
      });
    }

    const slug = slugify(name);

    const existing = await CertificateCompany.findOne({
      $or: [{ slug }, { name }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Certificate company already exists",
      });
    }

    const company = await CertificateCompany.create({
      name,
      slug,
      logoUrl,
      logoKey,
      active,
      sortOrder,
    });

    return res.status(201).json({
      success: true,
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create certificate company",
      error,
    });
  }
};

export const updateCertificateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, logoUrl, logoKey, active, sortOrder } = req.body;

    const company = await CertificateCompany.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Certificate company not found",
      });
    }

    const oldLogoKey = company.logoKey || "";
    const nextSlug = name ? slugify(name) : company.slug;

    // prevent duplicate name/slug when renaming
    if (name && nextSlug !== company.slug) {
      const existing = await CertificateCompany.findOne({
        _id: { $ne: id },
        $or: [{ slug: nextSlug }, { name }],
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: "Another certificate company with this name already exists",
        });
      }
    }

    if (name) {
      company.name = name;
      company.slug = nextSlug;
    }

    if (typeof logoUrl === "string") {
      company.logoUrl = logoUrl;
    }

    if (typeof logoKey === "string") {
      company.logoKey = logoKey;
    }

    if (typeof active === "boolean") {
      company.active = active;
    }

    if (typeof sortOrder === "number") {
      company.sortOrder = sortOrder;
    }

    await company.save();

    /**
     * If a new logo was uploaded and the key changed,
     * remove the previous file from Supabase storage.
     */
    const hasNewLogo =
      typeof logoKey === "string" &&
      logoKey.trim() !== "" &&
      logoKey !== oldLogoKey;

    if (hasNewLogo && oldLogoKey) {
      try {
        await removeFileFromStorage(oldLogoKey);
      } catch (storageError) {
        console.error(
          "Failed to delete previous certificate company logo:",
          storageError,
        );
      }
    }

    return res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update certificate company",
      error,
    });
  }
};

export const deleteCertificateCompany = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const company = await CertificateCompany.findById(id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Certificate company not found",
      });
    }

    const logoKey = company.logoKey || "";

    await company.deleteOne();

    if (logoKey) {
      try {
        await removeFileFromStorage(logoKey);
      } catch (storageError) {
        console.error(
          "Failed to delete certificate company logo:",
          storageError,
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Certificate company deleted",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete certificate company",
      error,
    });
  }
};
