import { config } from "../config/config.ts";

interface PlaceData {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road: string;
    neighbourhood: string;
    suburb: string;
    city: string;
    state_district: string;
    state: string;
    "ISO3166-2-lvl4": string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
}

export const getPlaceName = async (lat: number, lng: number): Promise<string | undefined> => {
  try {
    const response = await fetch(
      `${config.nominatimUrl}/reverse?lat=${lat.toString()}&lon=${lng.toString()}&format=json`
    );
    const data = (await response.json()) as PlaceData;

    return data.display_name;
  } catch (error) {
    console.error("Geocoding failed:", error);
  }
};
