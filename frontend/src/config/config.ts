import { z } from "zod";

const configSchema = z
  .object({
    VITE_BACKEND_URL: z.string().url(),
    VITE_NOMINATIM_URL: z.string().url(),
    VITE_OVERPASS_URL: z.string().url(),
    VITE_GEOAPIFY_API: z.string().url(),
    VITE_GEOAPIFY_API_KEY: z.string(),
    VITE_GEOAPIFY_PLACES_API: z.string().url(),
  })
  .transform((data) => {
    return {
      backendUrl: data.VITE_BACKEND_URL,
      nominatimUrl: data.VITE_NOMINATIM_URL,
      overPassUrl: data.VITE_OVERPASS_URL,
      geoapifyApiUrl: data.VITE_GEOAPIFY_API,
      geoapifyKey: data.VITE_GEOAPIFY_API_KEY,
      geoapifyPlacesApiUrl: data.VITE_GEOAPIFY_PLACES_API,
    };
  });

export const config = configSchema.parse(import.meta.env);
