import { Injectable } from "@nestjs/common";
import { GeoapifyApiClient } from "./geoapify-api-client";

export interface GeoapifyPlacesApiClientInput {
  limit: number;
  categories: string; // comma-separated
  filter?: string;
  bias?: string;
  conditions?: string;
  offset?: number;
  name?: string;
}

export interface GeoapifyPlacesApiClientOutput {
  features: Feature[];
}

export interface Feature {
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  name: string;
  country: string;
  country_code: string;
  state: string;
  city: string;
  postcode: string;
  district: string;
  neighbourhood: string;
  street: string;
  housenumber: string;
  lon: number;
  lat: number;
  state_code: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  categories: string[];
  details: string[];
  website?: string;
  opening_hours: string;
  contact?: Contact;
  facilities: Facilities;
  payment_options?: PaymentOptions;
  place_id: string;
  brand?: string;
}

export interface Contact {
  phone: string;
  email?: string;
}

export interface Facilities {
  wheelchair?: boolean;
  outdoor_seating?: boolean;
  takeaway?: boolean;
  delivery?: boolean;
  internet_access?: boolean;
  smoking?: boolean;
  air_conditioning?: boolean;
  toilets?: boolean;
}

export interface PaymentOptions {
  cash?: boolean;
  credit_cards?: boolean;
  visa?: boolean;
  mastercard?: boolean;
  debit_cards?: boolean;
  discover_card?: boolean;
  american_express?: boolean;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

@Injectable()
export class GeoapifyPlacesApiClient {
  private path = "v2/places";

  public constructor(private readonly geoapifyApiClient: GeoapifyApiClient) {}

  public async searchPlaces(input: GeoapifyPlacesApiClientInput): Promise<GeoapifyPlacesApiClientOutput> {
    return this.geoapifyApiClient.sendRequest(this.path, input);
  }
}
