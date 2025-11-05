import { z } from "zod";
import { Currency, Gender } from "../types/user.types.ts";

export const validUserUpdateSchema = z
  .object({
    name: z.string(),
    email: z.email({ message: "Invalid email address" }),
    birthDate: z.date(),
    password: z.string(),
    country: z.string(),
    city: z.string(),
    languages: z.string(),
    description: z.string(),
    avatar: z.base64(),
    gender: z.enum(Gender),
    currency: z.enum(Currency),
    shouldBeVisible: z.boolean(),
  })
  .partial();
