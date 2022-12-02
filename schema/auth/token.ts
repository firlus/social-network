import { z } from 'zod';

export const tokenDataParser = z.object({
  userIdentificator: z.string(),
  password: z.string(),
});

export type TokenData = z.infer<typeof tokenDataParser>;
