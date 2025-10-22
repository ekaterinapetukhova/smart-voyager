import z from "zod/v4";
import { createTripPointDtoSchema } from "../../trip-point/dto/create-trip-point.dto";

export const createTripDtoSchema = z.object({
  name: z.string().min(1),
  tripPoints: z.array(createTripPointDtoSchema.omit({ tripId: true })),
  isProposal: z.boolean(),
  description: z.string(),
});

export type CreateTripDto = z.output<typeof createTripDtoSchema>;
