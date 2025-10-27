import { config } from "../config/config.ts";
import { ServerError } from "../errors/server-error.ts";

interface GetPlaceDataResponse {
  results: GetPlaceDataResult[];
  query: {
    lat: number;
    lon: number;
    plus_code: string;
  };
}

interface GetPlaceDataResult {
  datasource: {
    sourcename: string;
    attribution: string;
    license: string;
    url: string;
  };
  name?: string;
  ref?: string;
  country: string;
  country_code: string;
  city?: string;
  postcode?: string;
  district?: string;
  suburb?: string;
  street?: string;
  iso3166_2?: string;
  lon: number;
  lat: number;
  distance?: number;
  result_type?: string;
  state?: string;
  state_code?: string;
  formatted?: string;
  address_line1?: string;
  address_line2?: string;
  timezone?: {
    name: string;
    offset_STD: string;
    offset_STD_seconds: number;
    offset_DST: string;
    offset_DST_seconds: number;
    abbreviation_STD: string;
    abbreviation_DST: string;
  };
  plus_code?: string;
  plus_code_short?: string;
  rank?: {
    importance: number;
    popularity: number;
  };
  place_id: string;
  bbox?: {
    lon1: number;
    lat1: number;
    lon2: number;
    lat2: number;
  };
}

export const getPlaceData = async (
  lat: number,
  lng: number
): Promise<{
  name: string;
  fullAddress: string;
  city: string;
  country: string;
} | null> => {
  try {
    const response = await fetch(
      `${config.geoapifyReverseGeocodingApiUrl}?lat=${lat.toString()}&lon=${lng.toString()}&format=json&apiKey=${config.geoapifyKey}`
    );

    const data: GetPlaceDataResponse = await response.json();

    console.log(data.results);

    if (data.results.length) {
      const place = data.results[0];

      if (!place.formatted) {
        return null;
      }

      return {
        name: place.name ?? place.formatted,
        fullAddress: place.formatted,
        city: place.city ?? "",
        country: place.country,
      };
    }

    return null;
  } catch (error) {
    throw new ServerError(`Failed to fetch place name because of ${error}`);
  }
};
