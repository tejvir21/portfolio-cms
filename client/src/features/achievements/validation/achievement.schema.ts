import { z } from "zod";

export const achievementSchema =
  z.object({
    title: z.string().min(2),

    organization:
      z.string().min(2),

    description:
      z.string().min(10),

    date:
      z.string(),

    credentialUrl:
      z.string().optional(),

    imageUrl:
      z.string().optional(),

    displayOrder:
      z.number().min(0),
  });

export type AchievementFormValues =
  z.infer<
    typeof achievementSchema
  >;
