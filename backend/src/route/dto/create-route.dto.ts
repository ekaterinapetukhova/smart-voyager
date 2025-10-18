import z from "zod/v4";
import { RouteMode, RouteType } from "@prisma/client";
import { createTripPointDtoSchema } from "../../trip-point/dto/create-trip-point.dto";

export const createRouteDtoSchema = z.object({
  name: z.string().min(1),
  waypoints: z.array(createTripPointDtoSchema.omit({ tripId: true })),
  mode: z.enum(RouteMode),
  type: z.enum(RouteType),
  isProposal: z.boolean(),
  description: z.string(),
});

export type CreateRouteDto = z.output<typeof createRouteDtoSchema>;
