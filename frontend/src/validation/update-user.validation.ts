import { z } from "zod";
import { Gender } from "../store/user-store.ts";

export const validUserUpdateSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    surname: z.string().min(1, { message: "Surname is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    birthDate: z.string().datetime(),
    password: z
      .string()
      .min(8, { message: "Must be 8 or more characters long" })
      .max(20, { message: "Must be 20 or fewer characters long" }),
    country: z.string().min(1),
    city: z.string().min(1),
    languages: z.string().min(1),
    description: z.string().min(1),
    avatar: z.string().base64(),
    gender: z.nativeEnum(Gender),
  })
  .partial();

export type ValidUpdateUser = z.output<typeof validUserUpdateSchema>;
