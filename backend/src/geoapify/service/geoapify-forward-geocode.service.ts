import { Injectable } from "@nestjs/common";
import { ServerError } from "../../error/server.error";
import { GeoapifyApiClient } from "./geoapify-api-client";

export interface LatLng {
  lat: number;
  lng: number;
}

interface GeoapifyResponse {
  results: Result[];
}

interface Result {
  lon: number;
  lat: number;
}

@Injectable()
export class GeoapifyForwardGeocodeService {
  public constructor(private readonly geopifyApiClient: GeoapifyApiClient) {}

  public async execute(fullAddress: string): Promise<LatLng> {
    const input = {
      text: fullAddress,
      format: "json",
    };

    const response = await this.geopifyApiClient.sendRequest<typeof input, GeoapifyResponse>(
      "v1/geocode/search",
      input
    );

    if (response.results.length === 0) {
      throw new ServerError("Location not found.");
    }

    return {
      lat: response.results[0].lat,
      lng: response.results[0].lon,
    };
  }
}
