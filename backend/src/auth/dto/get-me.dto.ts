import { z } from "zod/v4";
import { Currency, Gender, TripGoals, TripInterest } from "@prisma/client";

export const getMeDtoSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  gender: z.enum(Gender),
  email: z.email(),
  birthDate: z.coerce.date(),
  country: z.string().nullish(),
  city: z.string().nullish(),
  languages: z.string().nullish(),
  description: z.string().nullish(),
  avatar: z.base64(),
  tripInterest: z.array(z.enum(TripInterest)),
  tripGoals: z.array(z.enum(TripGoals)),
  currency: z.enum(Currency),
  shouldBeVisible: z.boolean(),
});

export type GetMeDto = z.output<typeof getMeDtoSchema>;
