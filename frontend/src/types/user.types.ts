import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
}

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  birthDate: z.string().datetime(),
  gender: z.nativeEnum(Gender),
  avatar: z.string().base64().nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  languages: z.string().nullable(),
  description: z.string().nullable(),
});

export type User = z.output<typeof userSchema>;
