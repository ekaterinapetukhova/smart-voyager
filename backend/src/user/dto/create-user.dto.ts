import z from "zod";

export const createUserDtoSchema = z.object({
  name: z.string().trim(),
  surname: z.string().trim(),
  email: z.string().trim().email(),
  birthDate: z.coerce.date(),
  password: z.string().trim().min(8).max(20), // TODO: ADD REGEXP
});

export type CreateUserDto = z.output<typeof createUserDtoSchema>;
