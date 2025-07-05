import * as process from "node:process";
import { z } from "zod";

const configSchema = z
  .object({
    DATABASE_URL: z.string().url(),
    GLOBAL_PREFIX: z.string().default("api/v1"),
    GEOAPIFY_API: z.string().url(),
    GEOAPIFY_API_KEY: z.string(),
    SECRET_KEY: z.string(),
  })
  .transform((data) => {
    return {
      databaseUrl: data.DATABASE_URL,
      globalPrefix: data.GLOBAL_PREFIX,
      geoapifyUrl: data.GEOAPIFY_API,
      geoapifyKey: data.GEOAPIFY_API_KEY,
      secretKey: data.SECRET_KEY,
    };
  });

export const config = configSchema.parse(process.env);
