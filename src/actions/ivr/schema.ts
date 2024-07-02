import { z } from "zod";

export const UpdateIVRSchema = z.object({
  enabled: z.boolean(),
  greeting: z.string().min(3).max(400),
});

export type UpdateIVRSchemaType = z.infer<typeof UpdateIVRSchema>;
