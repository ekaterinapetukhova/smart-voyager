import { Injectable } from "@nestjs/common";
import { ServerError } from "../../error/server.error";
import { GeoapifyApiClient } from "./geoapify-api-client";

export interface GeoapifyAutocompleteServiceResult {
  lat: number;
  lng: number;
  fullAddress: string;
  country: string;
  city: string;
  name: string;
}

interface GeoapifyResponse {
  results: Result[];
}

interface Result {
  lon: number;
  lat: number;
  address_line1: string;
  address_line2: string;
  country: string;
  city: string;
  name: string;
  result_type:
    | "unknown"
    | "amenity"
    | "building"
    | "street"
    | "suburb"
    | "district"
    | "postcode"
    | "city"
    | "county"
    | "state"
    | "country";
}

@Injectable()
export class GeoapifyAutocompleteService {
  public constructor(private readonly geopifyApiClient: GeoapifyApiClient) {}

  public async execute(fullAddress: string): Promise<GeoapifyAutocompleteServiceResult> {
    console.log(fullAddress);

    const input = {
      text: fullAddress,
      format: "json",
    };

    const response = await this.geopifyApiClient.sendRequest<typeof input, GeoapifyResponse>(
      "v1/geocode/autocomplete",
      input
    );

    if (response.results.length === 0) {
      throw new ServerError("Location not found.");
    }

    const placeResult =
      response.results.find((place) => place.result_type === "amenity") ??
      response.results.find((place) => place.result_type === "building") ??
      response.results[0];

    return {
      lat: placeResult.lat,
      lng: placeResult.lon,
      fullAddress: placeResult.address_line2,
      country: placeResult.country,
      city: placeResult.city,
      name: placeResult.name,
    };
  }
}
