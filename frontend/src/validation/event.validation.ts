import { z } from "zod";

export const validEventDataSchema = z
  .object({
    from: z
      .date()
      .min(new Date(new Date(Date.now()).toISOString().split("T")[0]), { message: "Trip must start today or later" }),
    to: z
      .date()
      .min(new Date(new Date(Date.now()).toISOString().split("T")[0]), { message: "Trip must end today or later" }),
  })
  .check((ctx) => {
    if (ctx.value.from.getTime() > ctx.value.to.getTime()) {
      ctx.issues.push({
        code: "custom",
        message: "Date of trip start cannot be later than trip end",
        input: ctx.value,
      });
    }
  });
