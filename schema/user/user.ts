import { z } from 'zod';

export const userCreateDataParser = z.object({
  username: z.string(),
  password: z.string(),
  displayName: z.string().optional(),
  email: z.string().email(),
});

export type UserCreateData = z.infer<typeof userCreateDataParser>;
