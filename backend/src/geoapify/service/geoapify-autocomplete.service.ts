import { Injectable } from "@nestjs/common";
import { ServerError } from "../../error/server.error";
import { GeoapifyApiClient } from "./geoapify-api-client";

export interface GeoapifyAutocompleteServiceResult {
  lat: number;
  lng: number;
  fullAddress: string;
}

interface GeoapifyResponse {
  results: Result[];
}

interface Result {
  lon: number;
  lat: number;
  address_line1: string;
  address_line2: string;
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

    return {
      lat: response.results[0].lat,
      lng: response.results[0].lon,
      fullAddress: `${response.results[0].address_line2}`,
    };
  }
}
