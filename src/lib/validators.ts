import { z } from "zod";

export const createUserValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type CreateUserValidator = z.infer<typeof createUserValidator>;
