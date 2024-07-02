import { z } from "zod";

export const UpdateCompanySchema = z.object({
  // id: z.string(),
  name: z.string().min(3).max(20),
  context: z.string().min(50).max(500),
  website: z.string().url(),
  phone: z.string().min(5).max(20),
  email: z.string().email(),
  address: z.string().min(5),
});

export type UpdateCompanyType = z.infer<typeof UpdateCompanySchema>;
