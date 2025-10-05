import { z } from "zod/v4";

export const createRouteWaypointDtoSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  fullAddress: z.string(),
});

export type CreateRouteWaypointDto = z.output<typeof createRouteWaypointDtoSchema>;
