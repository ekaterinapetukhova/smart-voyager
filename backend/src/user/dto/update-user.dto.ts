import z from "zod/v4";
import { Gender } from "@prisma/client";

export const updateUserDtoSchema = z
  .object({
    name: z.string().trim(),
    email: z.string().trim(),
    birthDate: z.coerce.date(),
    password: z.string().trim(),
    gender: z.nativeEnum(Gender),
    country: z.string().trim(),
    city: z.string().trim(),
    languages: z.string().trim(),
    description: z.string().trim(),
    avatar: z.string().base64(),
  })
  .partial();

export type UpdateUserDto = z.output<typeof updateUserDtoSchema>;
