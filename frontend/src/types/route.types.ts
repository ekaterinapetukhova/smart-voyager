import { z } from "zod";
import { routePointSchema } from "./route-point.types.ts";

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

export interface NrGeoapifyRoutesApiClientOutput {
  type: string;
  features: Feature[];
}

export interface Feature {
  properties: FeatureProperties;
  geometry: Geometry;
}

export interface FeatureProperties {
  mode: string;
  waypoints: Waypoint[];
  distance: number;
  time: number;
  legs: Leg[];
}

export interface Waypoint {
  location: number[];
  original_index: number;
}

export interface Leg {
  distance: number;
  time: number;
  steps: Step[];
}

export interface Step {
  from_index: number;
  to_index: number;
  distance: number;
  time: number;
  instruction: Instruction;
}

export interface Instruction {
  text: string;
}

export interface Geometry {
  coordinates: number[][][];
}

export const routeSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string().date(),
  waypoints: z.array(routePointSchema),
  mode: z.nativeEnum(RouteMode),
  type: z.nativeEnum(RouteType),
  geojson: z.object({
    type: z.string(),
    features: z.array(
      z.object({
        type: z.string(),
        properties: z.object({
          mode: z.string(),
          waypoints: z.array(
            z.object({
              location: z.tuple([z.number(), z.number()]),
              original_index: z.number().int().min(0),
            })
          ),
          units: z.string(),
          distance: z.number().min(0),
          distance_units: z.string(),
          time: z.number().min(0),
          legs: z.array(
            z.object({
              distance: z.number().min(0),
              time: z.number().min(0),
              steps: z.array(
                z.object({
                  from_index: z.number().int().min(0),
                  to_index: z.number().int().min(0),
                  distance: z.number().min(0),
                  time: z.number().min(0),
                  instruction: z.object({
                    text: z.string().min(1),
                  }),
                })
              ),
            })
          ),
        }),
        geometry: z.object({
          type: z.string(),
          coordinates: z.array(z.array(z.tuple([z.number(), z.number()])).min(2)).min(1),
        }),
      })
    ),
  }),
});

export type Route = z.output<typeof routeSchema>;
