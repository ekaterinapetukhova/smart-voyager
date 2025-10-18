import { z } from "zod/v4";

export const createTripPointDtoSchema = z.object({
  tripId: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  fullAddress: z.string(),
});

export type CreateTripPointDto = z.output<typeof createTripPointDtoSchema>;
