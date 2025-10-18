import { z } from "zod/v4";

export const updateTripPointDtoSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  fullAddress: z.string(),
});

export type UpdateTripPointDto = z.output<typeof updateTripPointDtoSchema>;
