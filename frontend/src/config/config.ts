import { z } from "zod";

const configSchema = z
  .object({
    VITE_BACKEND_URL: z.url(),
    VITE_GEOAPIFY_URL: z.url(),
    VITE_GEOAPIFY_API_KEY: z.string(),
    VITE_GEOAPIFY_PLACES_URL: z.url(),
    VITE_GEOAPIFY_REVERSE_GEOCODING_URL: z.url(),
    VITE_GEOAPIFY_FORWARD_GEOCODING_URL: z.url(),
    VITE_GOOGLE_MAPS_NAVIGATION_API: z.url(),
  })
  .transform((data) => {
    return {
      backendUrl: data.VITE_BACKEND_URL,
      geoapifyApiUrl: data.VITE_GEOAPIFY_URL,
      geoapifyKey: data.VITE_GEOAPIFY_API_KEY,
      geoapifyPlacesApiUrl: data.VITE_GEOAPIFY_PLACES_URL,
      geoapifyReverseGeocodingApiUrl: data.VITE_GEOAPIFY_REVERSE_GEOCODING_URL,
      geoapifyForwardGeocodingApiUrl: data.VITE_GEOAPIFY_FORWARD_GEOCODING_URL,
      googleMapsNavigationApiUrl: data.VITE_GOOGLE_MAPS_NAVIGATION_API,
    };
  });

export const config = configSchema.parse(import.meta.env);
