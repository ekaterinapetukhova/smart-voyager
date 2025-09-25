import z from "zod/v4";
import { RouteMode, RouteType } from "@prisma/client";
import { createRouteWaypointDtoSchema } from "./create-route-waypoint.dto";

export const createRouteDtoSchema = z.object({
  name: z.string().min(1),
  waypoints: z.array(createRouteWaypointDtoSchema),
  mode: z.enum(RouteMode),
  type: z.enum(RouteType),
  from: z.iso.datetime(),
  to: z.iso.datetime(),
});

export type CreateRouteDto = z.output<typeof createRouteDtoSchema>;
