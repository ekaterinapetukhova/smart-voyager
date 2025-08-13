import z from "zod";
import { RouteMode, RouteType } from "@prisma/client";

export const routeQueryParamsSchema = z.object({
  waypoints: z.string(),
  mode: z.nativeEnum(RouteMode),
  type: z.nativeEnum(RouteType),
  units: z.string().optional(),
  traffic: z.string().optional(),
});

export type RouteQueryParams = z.output<typeof routeQueryParamsSchema>;
