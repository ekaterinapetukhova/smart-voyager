import z from "zod/v4";

export const tripEventDtoSchema = z.object({
  from: z.coerce.date(),
  to: z.coerce.date(),
  tripId: z.uuid(),
});

export type TripEventDto = z.output<typeof tripEventDtoSchema>;
