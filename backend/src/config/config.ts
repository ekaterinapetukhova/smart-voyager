import * as process from "node:process";
import { z } from "zod";

const configSchema = z
  .object({
    DATABASE_URL: z.string().url(),
    GLOBAL_PREFIX: z.string().default("api/v1"),
    GEOAPIFY_API: z.string().url(),
    GEOAPIFY_API_KEY: z.string(),
    SECRET_KEY: z.string(),
    EMAIL: z.string().email(),
    EMAIL_PASSWORD: z.string(),
    EMAIL_SERVER: z.string(),
    EMAIL_SERVER_PORT: z.string().transform((v) => Number(v)),
    FRONTEND_URL: z.string().url(),
  })
  .transform((data) => {
    return {
      databaseUrl: data.DATABASE_URL,
      globalPrefix: data.GLOBAL_PREFIX,

      geoapifyUrl: data.GEOAPIFY_API,
      geoapifyKey: data.GEOAPIFY_API_KEY,

      secretKey: data.SECRET_KEY,

      email: data.EMAIL,
      emailPassword: data.EMAIL_PASSWORD,
      emailServer: data.EMAIL_SERVER,
      emailServerPort: data.EMAIL_SERVER_PORT,

      frontendUrl: data.FRONTEND_URL,
    };
  });

export const config = configSchema.parse(process.env);
