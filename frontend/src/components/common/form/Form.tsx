import { PropsWithChildren } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../Button.tsx";
import { FormValues, UseFormOutput } from "./useForm.tsx";

export interface FormProps<T extends FormValues, O> {
  form: UseFormOutput<T>;
  submitButtonLabel: string;
  submitFn: (data: T) => Promise<O>;
  onSuccess: (data: O) => void | Promise<void>;
}

export function Form<T extends FormValues, O>(props: PropsWithChildren<FormProps<T, O>>) {
  const mutation = useMutation({
    mutationFn: props.submitFn,
    onSuccess: props.onSuccess,
  });

  return (
    <div>
      {props.children}
      {mutation.error && <p className="text-red-800 font-bold animate-pulse">{mutation.error.message}</p>}
      <Button
        label={props.submitButtonLabel}
        size="large"
        isLoading={mutation.isPending}
        onClick={() => {
          if (props.form.isValid) {
            mutation.mutate(props.form.data);
          }
        }}
      />
    </div>
  );
}
