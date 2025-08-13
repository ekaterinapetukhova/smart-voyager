import { FormEvent, useState } from "react";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { FormField } from "./FormField";
import { Button } from "./Button.tsx";

interface Form<T> {
  fields: T;
  checkValidation: (data: T) => void;
  sendRequest: (data: T) => Promise<unknown>;
  buttonText: string;
}

export function Form<T extends object>({ fields, checkValidation, sendRequest, buttonText }: Form<T>) {
  const [formData, setFormData] = useState(fields);

  const [formErrors, setFormErrors] = useState("");

  const [errors, setErrors] = useState(fields);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  function validateForm() {
    setErrors(fields);
    setFormErrors("");

    try {
      checkValidation(formData);

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
    }
  }

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data: typeof formData) => sendRequest(data),
    onSuccess: async () => {
      await navigate("/");
    },
    onError: (err) => {
      if (err instanceof ZodError) {
        setErrors((prevErrorData) => ({ ...prevErrorData, password: err.message }));
      } else if (err instanceof Error) {
        setFormErrors(err.message);
      }
    },
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (validateForm()) {
      mutate(formData);
    }
  }

  const formFields = Object.keys(fields).map((item) => {
    const fieldKey = item as keyof T;

    return (
      <FormField
        key={fieldKey.toString()}
        label={item[0].toUpperCase() + item.slice(1)}
        id={item}
        type={item === "password" ? "password" : "text"}
        name={item}
        value={formData[fieldKey] as string}
        onChange={handleChange}
        errors={errors[fieldKey] as string}
      ></FormField>
    );
  });

  return (
    <form className="flex flex-col gap-y-6 w-80" onSubmit={submit}>
      {formFields}
      {formErrors && <span className="text-red">{formErrors}</span>}
      <Button type="submit" label={buttonText} />
    </form>
  );
}
