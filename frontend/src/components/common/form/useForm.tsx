import { ZodObject } from "zod";
import * as React from "react";
import { ReactElement, useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, ButtonProps } from "../Button.tsx";
import { FormField } from "./FormField.tsx";

export type FormValues = Record<string, string | boolean | number | Date | File[]>;

export interface UseFormInput<T extends FormValues, O = unknown> {
  initialData: T;
  validation: ZodObject;
  submit?: {
    fn: (data: T) => Promise<O>;
    onSuccess: (data: O) => void | Promise<void>;
    onError?: () => void;
  };
}

interface FieldProps<T extends FormValues> {
  label?: string;
  id?: string;
  type: "text" | "password" | "date" | "file" | "textarea" | "radio" | "checkbox";
  options?: string[];
  form: UseFormOutput<T>;
  fieldKey: keyof T;
}

export interface UseFormOutput<T extends FormValues> {
  data: T;
  update: (data: Partial<T>) => void;
  formErrors: string[];
  fieldErrors: { field: keyof T; error: string }[];
  isValid: boolean;
  SubmitButton: (props: Omit<ButtonProps, "isLoading" | "onClick">) => ReactElement;
  SubmitError: () => ReactElement;
}

export const Input = <T extends FormValues>(props: FieldProps<T>): ReactElement => {
  const castNewValue = (e: React.ChangeEvent<HTMLInputElement>): FormValues[string] => {
    switch (props.type) {
      case "text":
      case "textarea":
      case "password":
      case "radio":
        return e.target.value;
      case "date": {
        const date = new Date(e.target.value);

        console.log(date);

        if (!isNaN(date.getTime())) {
          return date;
        } else {
          return props.form.data[props.fieldKey];
        }
      }
      case "file": {
        const files: File[] = [];
        if (e.target.files) {
          for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files.item(i);
            if (file) {
              files.push(file);
            }
          }
        }
        return files;
      }
      case "checkbox":
        return e.target.checked;
    }
  };

  const castExistingValue = (value: FormValues[string]): { checked?: boolean; value?: string; files?: FileList } => {
    switch (props.type) {
      case "text":
      case "textarea":
      case "password":
      case "radio":
        return { value: (value as string | number).toString() };
      case "date":
        return { value: (value as Date).toISOString() };
      case "file": {
        const list = new DataTransfer();
        for (const file of value as File[]) {
          list.items.add(file);
        }

        return { files: list.files };
      }
      case "checkbox":
        return { checked: value as boolean };
    }
  };
  return (
    <FormField
      label={props.label}
      id={props.id}
      type={props.type}
      name={props.fieldKey as string}
      options={props.options}
      {...castExistingValue(props.form.data[props.fieldKey])}
      onChange={(e) => {
        props.form.update({ [props.fieldKey]: castNewValue(e as React.ChangeEvent<HTMLInputElement>) } as Partial<T>);
      }}
      errors={props.form.fieldErrors
        .filter((x) => x.field === props.fieldKey)
        .map((x) => x.error)
        .join(", ")}
    />
  );
};

export function useForm<T extends FormValues, O = unknown>(input: UseFormInput<T, O>): UseFormOutput<T> {
  const [data, setData] = useState(input.initialData);
  const [fieldErrors, setFieldErrors] = useState<{ field: keyof T; error: string }[]>([]);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const update = useCallback(
    (newData: Partial<T>) => {
      const merged = {
        ...data,
        ...newData,
      };

      setData(merged);

      const validate = input.validation.safeParse(merged);

      if (!validate.success) {
        const newFieldErrors: { field: keyof T; error: string }[] = [];
        const newFormErrors: string[] = [];

        for (const error of validate.error.issues) {
          if (error.path.length >= 1) {
            newFieldErrors.push({ field: error.path[0] as keyof T, error: error.message });
          } else {
            newFormErrors.push(error.message);
          }
        }

        setFieldErrors(newFieldErrors);
        setFormErrors(newFormErrors);
      } else {
        setFieldErrors([]);
        setFormErrors([]);
      }
    },
    [data, input.validation]
  );

  const mutation = useMutation({
    mutationFn: input.submit?.fn,
    onSuccess: input.submit?.onSuccess,
    onError: input.submit?.onError,
  });

  const isValid = formErrors.length === 0 && fieldErrors.length === 0;

  const SubmitButton = (props: Omit<ButtonProps, "isLoading" | "onClick">) =>
    input.submit ? (
      <Button
        {...props}
        disabled={!isValid}
        isLoading={mutation.isPending}
        onClick={() => {
          if (isValid) {
            mutation.mutate(data);
          }
        }}
      />
    ) : (
      <></>
    );

  const SubmitError = () => (mutation.error ? <div className="text-error">{mutation.error.message}</div> : <></>);

  return {
    data,
    update,
    fieldErrors,
    formErrors,
    isValid,
    SubmitButton,
    SubmitError,
  };
}
