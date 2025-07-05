import z from "zod";

export enum RouteMode {
  Drive = "drive",
  Bus = "bus",
  Motorcycle = "motorcycle",
  Bicycle = "bicycle",
  Walk = "walk",
}

export enum RouteType {
  Balanced = "balanced",
  Short = "short",
}

export const routeQueryParamsSchema = z.object({
  waypoints: z.string(),
  mode: z.nativeEnum(RouteMode),
  type: z.nativeEnum(RouteType),
  units: z.string().optional(),
  traffic: z.string().optional(),
});

export type RouteQueryParams = z.output<typeof routeQueryParamsSchema>;
