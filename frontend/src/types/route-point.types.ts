import { z } from "zod";

export const routePointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string().optional(),
});

export type RoutePoint = z.output<typeof routePointSchema>;
