import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import projectRoutes from "./routes/project.routes";
import skillRoutes from "./routes/skill.routes";
import experienceRoutes from "./routes/experience.routes";
import achievementRoutes from "./routes/achievement.routes";
import certificateRoutes from "./routes/certificate.routes";
import contactRoutes from "./routes/contact.routes";
import profileRoutes from "./routes/profile.routes";
import uploadRoutes from "./routes/upload.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import settingRoutes from "./routes/setting.routes";

import certificateCompanyRoutes from "./routes/certificateCompany.routes";

import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

const clients = process.env.CLIENTS?.replace(" ", "")?.split(",") || [];

app.use(
  cors({
    origin: ["http://localhost:5173", ...clients],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "API Running",
  });
});

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

app.use("/api/certificate-companies", certificateCompanyRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/upload", uploadRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/settings", settingRoutes);

app.use(errorMiddleware);

export default app;
