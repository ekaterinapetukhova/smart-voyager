import { z } from "zod";
import { Container } from "../../../components/common/Container.tsx";
import { Input, useForm } from "../../../components/common/form/useForm.tsx";

export function NewTripByUserView() {
  const form = useForm({
    initialData: {
      test: "",
      other: "abc",
      date: new Date(),
      yes: false,
      wonder: "hmm",
    },
    validation: () =>
      z
        .object({
          test: z.string().min(2),
          wonder: z.literal("hmmm"),
        })
        .check((ctx) => {
          if (ctx.value.test !== "bla") {
            ctx.issues.push({
              code: "custom",
              message: "No you cant, it must be bla",
              path: [],
              input: ctx.value.test,
            });
          }
        }),
  });

  console.log("rerender");

  return (
    <Container childrenContainerClassNames="flex-col items-start">
      <Input form={form} type="text" label="Test" fieldKey="test" />
      <Input form={form} type="text" label="Other" fieldKey="other" />
      <Input form={form} type="date" label="Date" fieldKey="date" />
      <Input form={form} type="checkbox" label="Yes" fieldKey="yes" />
      <Input form={form} type="radio" options={["hmmm", "hm"]} fieldKey="wonder" />
      <span className="text-red-500">{form.formErrors.join(", ")}</span>
    </Container>
  );
}
