import { z } from "zod";

export const createRoutePointDtoSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
});

export type CreateRoutePointDto = z.output<typeof createRoutePointDtoSchema>;
