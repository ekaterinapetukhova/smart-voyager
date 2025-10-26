import z from "zod";
import { Gender } from "../types/user.types.ts";

export const validRegistrationSchema = z.object({
  name: z.string().min(1, { message: "Please, enter your name" }),
  email: z.email({
    pattern: z.regexes.email,
    message: "Invalid email format, try again",
  }),
  birthDate: z.date({ message: "Enter your birth date, bro" }).refine(
    (v) => {
      const currentDate = new Date();
      const userDate = new Date(v);

      let age = currentDate.getFullYear() - userDate.getFullYear();

      const monthDiff = currentDate.getMonth() - userDate.getMonth();
      const dayDiff = currentDate.getDate() - userDate.getDate();

      if (monthDiff < 0 || (monthDiff > 0 && dayDiff < 0)) {
        age -= 1;
      }

      return age >= 18;
    },
    { message: "Sorry, bro, but you must be older than 18" }
  ),
  gender: z.enum(Gender),
  password: z
    .string()
    .min(8, { message: "Must be 8 or more characters long" })
    .max(20, { message: "Must be 20 or fewer characters long" }),
  avatar: z.array(z.instanceof(File)).min(1, { message: "Add your photo, please" }),
});

export type ValidRegistration = Omit<z.output<typeof validRegistrationSchema>, "avatar" | "birthDate"> & {
  avatar: string;
  birthDate: string;
};

export const validLoginSchema = z.object({
  email: z.email({ pattern: z.regexes.email, message: "Invalid email format, try again" }),
  password: z.string().min(1, { message: "Please, enter your password" }),
});

export type ValidLogin = z.output<typeof validLoginSchema>;
