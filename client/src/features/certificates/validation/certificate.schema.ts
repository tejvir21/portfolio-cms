import { z } from "zod";

export const certificateSchema = z.object({
  title: z.string().trim().min(2, "Title is required"),
  issuer: z.string().trim().min(2, "Issuer is required"),
  company: z.string().trim().min(1, "Company is required"),
  issueDate: z.string().min(1, "Issue date is required"),

  credentialId: z.string().optional(),
  credentialUrl: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/.+/i.test(value),
      "Enter a valid URL",
    ),

  imageUrl: z.string().optional(),

  // make it required, not optional
  featured: z.boolean(),
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;
