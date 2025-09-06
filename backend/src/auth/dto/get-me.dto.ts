import { z } from "zod";
import { Gender } from "@prisma/client";

export const getMeDtoSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim(),
  surname: z.string().trim(),
  gender: z.nativeEnum(Gender),
  email: z.string().trim().email(),
  birthDate: z.coerce.date(),
  country: z.string().trim().nullish(),
  city: z.string().trim().nullish(),
  languages: z.string().trim().nullish(),
  description: z.string().trim().nullish(),
  avatar: z.string().base64(),
});

export type GetMeDto = z.output<typeof getMeDtoSchema>;
