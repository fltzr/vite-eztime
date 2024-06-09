import { z } from "zod";

export const timeLogSchema = z.object({
  id: z.number(),
  date: z.string(),
  duration: z.coerce.number(),
  notes: z.string(),
  user_id: z.string(),
});

export type TimeLog = z.infer<typeof timeLogSchema>;
