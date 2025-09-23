import { z } from "zod";

export const tripPointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string().optional(),
});

export type TripPoint = z.output<typeof tripPointSchema>;
