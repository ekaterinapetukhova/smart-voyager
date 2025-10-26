import z from "zod/v4";
import { createTripDtoSchema } from "./create-trip.dto";

export const updateTripDtoSchema = createTripDtoSchema.pick({ name: true, description: true }).partial();

export type UpdateTripDto = z.output<typeof updateTripDtoSchema>;
