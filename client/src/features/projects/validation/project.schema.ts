import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(2, "Title is required"),

  slug: z.string().min(2, "Slug is required"),

  category: z.string().min(2, "Category is required"),

  status: z.enum(["completed", "in-progress"]),

  role: z.string().min(2, "Role is required"),

  displayOrder: z.number().min(0, "Display order must be 0 or more"),

  shortDescription: z.string().min(10, "Short description is required"),

  fullDescription: z.string().min(20, "Full description is required"),

  technologies: z.string().min(2, "Technologies are required"),

  githubUrl: z.string().optional(),

  liveUrl: z.string().optional(),

  problemStatement: z.string().min(10, "Problem statement required"),

  architecture: z.string().min(10, "Architecture required"),

  challenges: z.string().min(10, "Challenges required"),

  learnings: z.string().min(10, "Learnings required"),

  featured: z.boolean(),

  imageUrl: z.string().optional(),

  imageKey: z.string().optional(),

  // gallery: z.string().optional(),

  gallery: z
    .array(
      z.object({
        url: z.string(),

        key: z.string(),
      }),
    )
    .optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
