import * as React from "react";
import { FormEvent, useState } from "react";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import { FormField } from "./FormField";
import { Button } from "./Button.tsx";

export interface InputProp {
  value?: string;
  options?: string[];
  type: "text" | "date" | "password" | "file" | "radio";
}

export type FormValues<T extends Record<string, InputProp>> = {
  [K in keyof T]: T[K]["value"];
};

export interface FormProps<T extends Record<string, InputProp>> {
  fields: T;
  checkValidation: (data: FormValues<T>) => void;
  sendRequest: (data: FormValues<T>) => Promise<unknown>;
  buttonText: string;
  formClassNames?: string;
  onSuccess?: () => void;
  hideLabel?: boolean;
}

export function Form<T extends Record<string, InputProp>>(props: FormProps<T>) {
  const [formData, setFormData] = useState<FormValues<T>>(
    Object.fromEntries(Object.entries(props.fields).map(([k, v]) => [k, v.value])) as FormValues<T>
  );
  const [formErrors, setFormErrors] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleInputFileChange = async (fileList: FileList) => {
    const buffer = await fileList[0].arrayBuffer();

    setFormData((prevFormData) => ({ ...prevFormData, avatar: buffer }));
  };

  function validateForm() {
    setErrors({});
    setFormErrors("");

    try {
      props.checkValidation(formData);

      return true;
    } catch (err) {
      if (err instanceof ZodError) {
        err.errors.forEach((zodError) => {
          setErrors((prevError) => ({
            ...prevError,
            [zodError.path[0]]: zodError.message,
          }));
        });
      }

      return false;
    }
  }

  const { mutate } = useMutation({
    mutationFn: (data: typeof formData) => props.sendRequest(data),
    onSuccess: () => {
      if (props.onSuccess) {
        props.onSuccess();
      }
    },
    onError: (err) => {
      if (err instanceof ZodError) {
        setErrors((prev) => ({ ...prev, password: err.message }) as Partial<Record<keyof T, string>>);
      } else if (err instanceof Error) {
        setFormErrors(err.message);
      }
    },
  });

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (validateForm()) {
      mutate(formData);
    }
  }

  const formFields = Object.entries(props.fields).map(([key, value]) => {
    return (
      <FormField
        key={key}
        {...(props.hideLabel ? {} : { label: key[0].toUpperCase() + key.slice(1) })}
        id={key}
        type={value.type}
        name={key}
        value={formData[key]}
        options={value.options}
        onChange={(e) => {
          if (value.type === "file" && e.target.files) {
            void handleInputFileChange(e.target.files);
          } else {
            handleChange(e);
          }
        }}
        errors={errors[key]}
      ></FormField>
    );
  });

  return (
    <form className={["flex flex-col gap-y-6 w-xl", props.formClassNames ?? ""].join(" ")} onSubmit={submit}>
      <div className={["grid gap-y-4 w-full", formFields.length > 5 ? "grid-cols-2 gap-x-10" : ""].join(" ")}>
        {formFields}
      </div>
      {formErrors && <span className="text-red">{formErrors}</span>}
      <Button type="submit" label={props.buttonText} />
    </form>
  );
}
