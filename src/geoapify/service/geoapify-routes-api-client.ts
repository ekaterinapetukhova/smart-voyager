import { Injectable } from "@nestjs/common";
import { GeoapifyApiClient } from "./geoapify-api-client";

export interface GeoapifyRoutesApiClientInput {
  waypoints: string;
  mode: "drive" | "transit" | "bicycle" | "walk";
  type: "balanced" | "short";
}

export interface GeoapifyRoutesApiClientOutput {
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

@Injectable()
export class GeoapifyRoutesApiClient {
  private path = "v1/routing";

  public constructor(private readonly geoapifyApiClient: GeoapifyApiClient) {}

  public async getRoute(input: GeoapifyRoutesApiClientInput): Promise<GeoapifyRoutesApiClientOutput> {
    return this.geoapifyApiClient.sendRequest(this.path, { ...input, lang: "pl" });
  }
}
