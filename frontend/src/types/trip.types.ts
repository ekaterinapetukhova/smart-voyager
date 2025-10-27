import { ExistingTripPoint } from "./trip-point.types.ts";
import { TripEvent } from "./trip-event.types.ts";

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

export interface Trip {
  id: string;
  name: string;
  createdAt: string;
  tripPoints: ExistingTripPoint[];
  description: string;
  event: TripEvent | null;
}

export type CreatedTrip = Omit<Trip, "id" | "createdAt" | "tripPoints" | "event">;

export type UpdateTripDto = Partial<CreatedTrip> & Pick<Trip, "id">;
