import { z } from "zod";

export const createRouteWaypointDtoSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
});

export type CreateRouteWaypointDto = z.output<typeof createRouteWaypointDtoSchema>;
