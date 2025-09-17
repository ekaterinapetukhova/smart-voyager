import { z } from "zod";

const configSchema = z
  .object({
    VITE_BACKEND_URL: z.url(),
    VITE_GEOAPIFY_URL: z.url(),
    VITE_GEOAPIFY_API_KEY: z.string(),
    VITE_GEOAPIFY_PLACES_URL: z.url(),
    VITE_GEOAPIFY_GEOCODE_URL: z.url(),
  })
  .transform((data) => {
    return {
      backendUrl: data.VITE_BACKEND_URL,
      geoapifyApiUrl: data.VITE_GEOAPIFY_URL,
      geoapifyKey: data.VITE_GEOAPIFY_API_KEY,
      geoapifyPlacesApiUrl: data.VITE_GEOAPIFY_PLACES_URL,
      geoapifyGeocodeApiUrl: data.VITE_GEOAPIFY_GEOCODE_URL,
    };
  });

export const config = configSchema.parse(import.meta.env);
