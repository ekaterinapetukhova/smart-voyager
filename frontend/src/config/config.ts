import { z } from "zod";

const configSchema = z
  .object({
    VITE_BACKEND_URL: z.string().url(),
    VITE_NOMINATIM_URL: z.string().url(),
    VITE_OVERPASS_URL: z.string().url(),
    VITE_GEOAPIFY_API: z.string().url(),
    VITE_GEOAPIFY_API_KEY: z.string(),
  })
  .transform((data) => {
    return {
      backendUrl: data.VITE_BACKEND_URL,
      nominatimUrl: data.VITE_NOMINATIM_URL,
      overPassUrl: data.VITE_OVERPASS_URL,
      geoapifyApi: data.VITE_GEOAPIFY_API,
      geoapifyKey: data.VITE_GEOAPIFY_API_KEY,
    };
  });

export const config = configSchema.parse(import.meta.env);
