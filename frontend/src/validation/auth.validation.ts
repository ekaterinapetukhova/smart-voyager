import z from "zod";
import { Gender } from "../types/user.types.ts";

export const validRegistrationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  surname: z.string().min(1, { message: "Surname is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  birthDate: z.coerce.date(),
  gender: z.nativeEnum(Gender),
  password: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" })
    .max(20, { message: "Must be 20 or fewer characters long" }),
});

export type ValidRegistration = z.output<typeof validRegistrationSchema>;

export const validLoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type ValidLogin = z.output<typeof validLoginSchema>;
