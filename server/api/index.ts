// This file is for vercel

import express from "express";
import cors from "cors";

import authRoutes from "../src/routes/auth.routes";
import projectRoutes from "../src/routes/project.routes";
import skillRoutes from "../src/routes/skill.routes";
import experienceRoutes from "../src/routes/experience.routes";
import achievementRoutes from "../src/routes/achievement.routes";
import certificateRoutes from "../src/routes/certificate.routes";
import contactRoutes from "../src/routes/contact.routes";
import profileRoutes from "../src/routes/profile.routes";
import uploadRoutes from "../src/routes/upload.routes";
import dashboardRoutes from "../src/routes/dashboard.routes";
import settingRoutes from "../src/routes/setting.routes";

import { connectDB } from "../src/config/db";

import { errorMiddleware } from "../src/middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

app.use("/api/projects", projectRoutes);

app.use("/api/skills", skillRoutes);

app.use("/api/experience", experienceRoutes);

app.use("/api/achievements", achievementRoutes);

app.use("/api/certificates", certificateRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/settings", settingRoutes);

app.use(errorMiddleware);

let isConnected = false;

export default async (req: any, res: any) => {
  try {
    if (!isConnected) {
      await connectDB();
      isConnected = true;
      console.log("MongoDB connected");
    }

    return app(req, res);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

// export default app;
