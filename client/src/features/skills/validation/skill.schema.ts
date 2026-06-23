import { z } from "zod";

export const skillSchema =
  z.object({
    name: z.string().min(2),

    category:
      z.string().min(2),

    proficiency:
      z.number()
        .min(1)
        .max(100),

    displayOrder:
      z.number().min(0),
  });

export type SkillFormValues =
  z.infer<
    typeof skillSchema
  >;
