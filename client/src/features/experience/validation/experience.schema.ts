import { z } from "zod";

export const experienceSchema = z
  .object({
    company: z.string().min(2, "Company is required"),
    position: z.string().min(2, "Position is required"),
    employmentType: z.string().min(2, "Employment type is required"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    currentlyWorking: z.boolean(),
    location: z.string().optional(),
    description: z.string().min(10, "Description is required"),
    technologies: z.string().optional(),
    companyLogo: z.string().optional(),
    displayOrder: z.number().min(0, "Display order must be 0 or more"),
  })
  .refine((data) => data.currentlyWorking || Boolean(data.endDate), {
    message: "End date is required unless this is your current role",
    path: ["endDate"],
  });

export type ExperienceFormValues = z.infer<typeof experienceSchema>;
