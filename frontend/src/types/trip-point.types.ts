import { z } from "zod";

export const tripPointSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  fullAddress: z.string(),
  city: z.string(),
  country: z.string(),
});

export type TripPoint = z.output<typeof tripPointSchema>;

export const swapTripPointsSchema = z.object({
  firstTripPointId: z.uuid(),
  secondTripPointId: z.uuid(),
});

export type SwapTripPoints = z.output<typeof swapTripPointsSchema>;

export const updateTripPointSchema = z.object({
  id: z.uuid(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  name: z.string().optional(),
  fullAddress: z.string().optional(),
  city: z.string(),
  country: z.string(),
});

export type UpdateTripPoint = z.output<typeof updateTripPointSchema>;

export const createTripPointSchema = tripPointSchema.extend({
  tripId: z.uuid(),
});

export type CreateTripPoint = z.output<typeof createTripPointSchema>;

export const existingTripPointSchema = z.object({
  id: z.uuid(),
  latitude: z.number(),
  longitude: z.number(),
  name: z.string(),
  fullAddress: z.string(),
  city: z.string(),
  country: z.string(),
});

export type ExistingTripPoint = z.output<typeof existingTripPointSchema>;
