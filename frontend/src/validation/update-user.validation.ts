import { z } from "zod";
import { Gender } from "../types/user.types.ts";

export const validUserUpdateSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Invalid email address" }),
    birthDate: z.iso.datetime(),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" }),
    country: z.string().min(1),
    city: z.string().min(1),
    languages: z.string().min(1),
    description: z.string().min(1),
    avatar: z.base64(),
    gender: z.enum(Gender),
  })
  .partial();

export type ValidUpdateUser = z.output<typeof validUserUpdateSchema>;
