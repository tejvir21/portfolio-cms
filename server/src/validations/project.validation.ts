import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1),

  slug: z.string().min(1),

  shortDescription: z.string().min(10),

  fullDescription: z.string().min(20),

  technologies: z.array(z.string()),

  imageUrl: z.string().optional(),

  githubUrl: z.string().optional(),

  liveUrl: z.string().optional(),

  featured: z.boolean().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
