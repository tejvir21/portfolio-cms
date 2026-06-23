import { z } from "zod";

export const certificateSchema = z.object({
  title: z.string().min(2, "Title is required"),
  issuer: z.string().min(2, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  credentialId: z.string().optional(),
  credentialUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  featured: z.boolean(),
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;
