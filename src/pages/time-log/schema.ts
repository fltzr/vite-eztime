import { z } from "zod";

/*
    created_at: string;
    date: string;
    end_time: string;
    family: string;
    id: number;
    notes: string | null;
    start_time: string;
    user_id: string;
*/

export const timeLogSchema = z.object({
  id: z.number(),
  date: z.string(),
  family: z.string(),
  hourlyRate: z.coerce.number().default(0),
  startTime: z.string(),
  endTime: z.string(),
  amountEarned: z.number().optional(),
  notes: z.string(),
  user_id: z.string(),
});

export const createTimeLogSchema = timeLogSchema
  .omit({ id: true, user_id: true })
  .partial({ notes: true });

export const updateTimeLogSchema = timeLogSchema.partial().extend({
  id: z.number(),
});

export type TimeLog = z.infer<typeof timeLogSchema>;
export type CreateTimeLog = z.infer<typeof createTimeLogSchema>;
export type UpdateTimeLog = z.infer<typeof updateTimeLogSchema>;

export const familySchema = z.object({
  id: z.string(),
  surname: z.string(),
});
