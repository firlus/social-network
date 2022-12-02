import { z } from 'zod';

export const postCreateDataParser = z.object({
  token: z.string(),
  text: z.string(),
});

export type UserCreateData = z.infer<typeof postCreateDataParser>;
