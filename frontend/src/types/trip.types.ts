import { z } from "zod";
import { existingTripPointSchema } from "./trip-point.types.ts";

export enum TripMode {
  Drive = "drive",
  Bus = "bus",
  Motorcycle = "motorcycle",
  Bicycle = "bicycle",
  Walk = "walk",
}

export enum TripType {
  Balanced = "balanced",
  Short = "short",
}

export enum TripPointCategories {
  Accommodation = "accommodation",
  Activity = "activity",
  Commercial = "commercial",
  Catering = "catering",
  Entertainment = "entertainment",
  Healthcare = "healthcare",
  Highway = "highway",
  Natural = "natural",
  Parking = "parking",
  Pet = "pet",
  Camping = "camping",
  Beach = "beach",
  Sport = "sport",
}

export interface NrGeoapifyTripsApiClientOutput {
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
  id: z.uuid(),
  name: z.string(),
  createdAt: z.date(),
  waypoints: z.array(existingTripPointSchema),
  mode: z.enum(TripMode),
  type: z.enum(TripType),
  geojson: z.string(),
  description: z.string(),
});

export type Trip = z.output<typeof routeSchema>;

export type CreatedTrip = Omit<Trip, "id" | "createdAt" | "geojson">;
