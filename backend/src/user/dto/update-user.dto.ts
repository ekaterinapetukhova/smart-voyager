import z from "zod/v4";
import { Currency, Gender, TripGoals, TripInterest } from "@prisma/client";

export const updateUserDtoSchema = z
  .object({
    name: z.string().trim(),
    email: z.string().trim(),
    birthDate: z.coerce.date(),
    password: z.string().trim(),
    gender: z.enum(Gender),
    country: z.string().trim(),
    city: z.string().trim(),
    languages: z.string().trim(),
    description: z.string().trim(),
    avatar: z.base64(),
    tripInterest: z.array(z.enum(TripInterest)),
    tripGoals: z.array(z.enum(TripGoals)),
    currency: z.enum(Currency),
    shouldBeVisible: z.boolean(),
  })
  .partial();

export type UpdateUserDto = z.output<typeof updateUserDtoSchema>;
