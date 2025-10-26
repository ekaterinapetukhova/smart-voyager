import { z } from "zod";

export const createTripSchema = z.object({
  name: z.string().min(1, { message: "Please give a name for your trip" }),
  description: z.string().min(1, { message: "Please describe your trip" }),
});
