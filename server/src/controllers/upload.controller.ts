import { Request, Response } from "express";

// Setup Cloudinary

// import { UploadApiResponse } from "cloudinary";

// import cloudinary from "../config/cloudinary";

// import { asyncHandler } from "../utils/asyncHandler";
// import { ApiResponse } from "../utils/ApiResponse";
// import { ApiError } from "../utils/ApiError";

// export const uploadFile = asyncHandler(async (req: Request, res: Response) => {
//   if (!req.file) {
//     throw new ApiError(400, "No file uploaded");
//   }

//   const base64 = req.file.buffer.toString("base64");

//   const dataUri = `data:${req.file.mimetype};base64,${base64}`;

//   const result: UploadApiResponse = await cloudinary.uploader.upload(dataUri, {
//     folder: "portfolio-cms",
//     resource_type: "auto",
//   });

//   res.status(200).json(
//     new ApiResponse(true, "File uploaded", {
//       url: result.secure_url,
//       publicId: result.public_id,
//     }),
//   );
// });

// Setup R2

// import { r2 } from "../config/r2";
// import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

// // import { v4 as uuid } from "uuid";
// import { randomUUID } from "crypto";

// export const uploadFile = async (req: Request, res: Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "File required",
//       });
//     }

//     const extension = req.file.originalname.split(".").pop();

//     // const fileName = `${uuid()}.${extension}`;
//     const fileName = `${randomUUID()}.${extension}`;

//     const folder = req.query.folder || "misc";

//     const key = `${folder}/${fileName}`;

//     await r2.send(
//       new PutObjectCommand({
//         Bucket: process.env.R2_BUCKET_NAME,

//         Key: key,

//         Body: req.file.buffer,

//         ContentType: req.file.mimetype,
//       }),
//     );

//     const url = `${process.env.R2_PUBLIC_URL}/${key}`;

//     return res.status(200).json({
//       success: true,

//       message: "File uploaded",

//       data: {
//         url,
//         key,
//       },
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Upload failed",
//     });
//   }
// };

// export const deleteFile = async (req: Request, res: Response) => {
//   try {
//     const { key } = req.body;

//     await r2.send(
//       new DeleteObjectCommand({
//         Bucket: process.env.R2_BUCKET_NAME,

//         Key: key,
//       }),
//     );

//     return res.json({
//       success: true,
//     });
//   } catch {
//     return res.status(500).json({
//       success: false,
//     });
//   }
// };

// Setup Supabase

import { randomUUID } from "crypto";

import { supabase } from "../config/supabase";

const BUCKET = process.env.SUPABASE_BUCKET_NAME!;

const ALLOWED_FOLDERS = [
  "profile",
  "resume",
  "projects",
  "gallery",
  "certificates",
  "certificate-companies",
  "achievements",
  "misc",
];

export const uploadFile = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const requestedFolder = String(req.query.folder || "misc");

    const folder = ALLOWED_FOLDERS.includes(requestedFolder)
      ? requestedFolder
      : "misc";

    const extension = req.file.originalname.split(".").pop();

    const key = `${folder}/${randomUUID()}.${extension}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(key, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message: "Failed to upload file",
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(key);

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: {
        url: publicUrlData.publicUrl,
        key,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Upload failed",
    });
  }
};

/**
 * Reusable helper for deleting a file from Supabase storage
 * Can be used inside other controllers/services.
 */
export const removeFileFromStorage = async (key?: string) => {
  if (!key) return;

  const { error } = await supabase.storage.from(BUCKET).remove([key]);

  if (error) {
    throw error;
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({
        success: false,
        message: "File key is required",
      });
    }

    await removeFileFromStorage(key);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};

// import { randomUUID } from "crypto";

// import { supabase } from "../config/supabase";

// const BUCKET = process.env.SUPABASE_BUCKET_NAME!;

// const ALLOWED_FOLDERS = [
//   "profile",
//   "resume",
//   "projects",
//   "certificates",
//   "achievements",
//   "misc",
// ];

// export const uploadFile = async (req: Request, res: Response) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "No file uploaded",
//       });
//     }

//     const requestedFolder = String(req.query.folder || "misc");

//     const folder = ALLOWED_FOLDERS.includes(requestedFolder)
//       ? requestedFolder
//       : "misc";

//     const extension = req.file.originalname.split(".").pop();

//     const key = `${folder}/${randomUUID()}.${extension}`;

//     const { error } = await supabase.storage
//       .from(BUCKET)
//       .upload(key, req.file.buffer, {
//         contentType: req.file.mimetype,

//         upsert: false,
//       });

//     if (error) {
//       console.error(error);

//       return res.status(500).json({
//         success: false,
//         message: "Failed to upload file",
//       });
//     }

//     const { data: publicUrlData } = supabase.storage
//       .from(BUCKET)
//       .getPublicUrl(key);

//     return res.status(200).json({
//       success: true,

//       message: "File uploaded successfully",

//       data: {
//         url: publicUrlData.publicUrl,

//         key,
//       },
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,

//       message: "Upload failed",
//     });
//   }
// };

// export const deleteFile = async (req: Request, res: Response) => {
//   try {
//     const { key } = req.body;

//     if (!key) {
//       return res.status(400).json({
//         success: false,
//         message: "File key is required",
//       });
//     }

//     const { error } = await supabase.storage.from(BUCKET).remove([key]);

//     if (error) {
//       console.error(error);

//       return res.status(500).json({
//         success: false,
//         message: "Failed to delete file",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "File deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);

//     return res.status(500).json({
//       success: false,
//       message: "Delete failed",
//     });
//   }
// };
