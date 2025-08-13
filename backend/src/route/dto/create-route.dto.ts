import z from "zod";
import { RouteMode, RouteType } from "@prisma/client";
import { createRouteWaypointDtoSchema } from "./create-route-waypoint.dto";

export const createRouteDtoSchema = z.object({
  name: z.string().min(1),
  waypoints: z.array(createRouteWaypointDtoSchema),
  mode: z.nativeEnum(RouteMode),
  type: z.nativeEnum(RouteType),
});

export type CreateRouteDto = z.output<typeof createRouteDtoSchema>;
