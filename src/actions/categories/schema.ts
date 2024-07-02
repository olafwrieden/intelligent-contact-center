import { z } from "zod";

export const AddCategorySchema = z.object({
  name: z.string().min(3).max(20),
  context: z.string().min(20).max(500),
  typicalResolutionFlow: z.string().min(20).max(500),
  defaultPriority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type AddCategoryType = z.infer<typeof AddCategorySchema>;

export const UpdateCategorySchema = z.object({
  categoryId: z.string().uuid(),
  name: z.string().min(3).max(20),
  context: z.string().min(20).max(500),
  typicalResolutionFlow: z.string().min(20).max(500),
  defaultPriority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type UpdateCategoryType = z.infer<typeof UpdateCategorySchema>;

export const DeleteCategorySchema = z.object({
  categoryId: z.string().uuid(),
});

export type DeleteCategoryType = z.infer<typeof DeleteCategorySchema>;
