import z from "zod/v4";
import { RouteMode, RouteType } from "@prisma/client";
import { createRouteWaypointDtoSchema } from "./create-route-waypoint.dto";

export const createRouteDtoSchema = z.object({
  name: z.string().min(1),
  waypoints: z.array(createRouteWaypointDtoSchema),
  mode: z.enum(RouteMode),
  type: z.enum(RouteType),
  isProposal: z.boolean(),
  description: z.string(),
});

export type CreateRouteDto = z.output<typeof createRouteDtoSchema>;
