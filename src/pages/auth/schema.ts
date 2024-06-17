import { z } from 'zod';

export const signinFormSchema = z.object({
  email: z.string({ message: 'Enter an email' }).email(),
  password: z
    .string({ message: 'Enter a password' })
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export type SigninFormSchema = z.infer<typeof signinFormSchema>;
