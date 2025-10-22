import { z } from "zod";

export enum Gender {
  Male = "male",
  Female = "female",
}

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  surname: z.string(),
  email: z.email(),
  birthDate: z.iso.datetime(),
  gender: z.enum(Gender),
  avatar: z.base64(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  languages: z.string().nullable(),
  description: z.string().nullable(),
  tripInterest: z.array(z.string()),
  tripGoals: z.array(z.string()),
});

export type User = z.output<typeof userSchema>;
