import { z } from "zod/v4";

export const swapTripPointsDtoSchema = z.object({
  firstTripPointId: z.uuid(),
  secondTripPointId: z.uuid(),
});

export type SwapTripPointsDto = z.output<typeof swapTripPointsDtoSchema>;
