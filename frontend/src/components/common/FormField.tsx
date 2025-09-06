import * as React from "react";

interface FormFieldProps {
  label?: string;
  id: string;
  type: "text" | "password" | "date" | "file" | "textarea" | "radio";
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors?: string;
  options?: string[];
}

export function FormField(props: FormFieldProps) {
  let field: React.ReactNode;

  if (props.type === "radio" && props.options) {
    field = (
      <div className="flex gap-x-4">
        {props.options.map((option) => (
          <label key={option} className="flex items-center gap-x-2">
            <input
              type="radio"
              name={props.name}
              value={option}
              checked={props.value === option}
              onChange={props.onChange}
            />
            {option}
          </label>
        ))}
      </div>
    );
  } else {
    field = (
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        {...(props.type !== "file"
          ? {
              value:
                props.type === "date" && props.value ? new Date(props.value).toISOString().split("T")[0] : props.value,
            }
          : {})}
        onChange={props.onChange}
        className="h-8 px-2 text-sm border-b border-black bg-transparent w-full"
      />
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      {field}
      {props.errors && <span className="text-red">{props.errors}</span>}
    </div>
  );
}
