import z from "zod/v4";

export const createEventDtoSchema = z.object({
  userId: z.uuid(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  tripId: z.uuid(),
});

export type CreateTripEventDto = z.output<typeof createEventDtoSchema>;
