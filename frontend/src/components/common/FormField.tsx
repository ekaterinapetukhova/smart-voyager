import * as React from "react";
import { useState } from "react";

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
  const [focused, setFocused] = useState(false);

  let field: React.ReactNode;

  if (props.type === "radio" && props.options) {
    field = (
      <div className="flex gap-x-5 mt-2">
        {props.options.map((option) => (
          <label key={option} className="flex items-center gap-x-2 text-lg cursor-pointer has-checked:text-accent">
            <input
              type="radio"
              name={props.name}
              value={option}
              checked={props.value === option}
              onChange={props.onChange}
              className="hidden"
            />
            {option[0].toUpperCase() + option.slice(1)}
          </label>
        ))}
      </div>
    );
  } else {
    field = (
      <div className="relative group">
        <input
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          id={props.id}
          name={props.name}
          type={props.type}
          {...(props.type !== "file"
            ? {
                value: props.type === "date" && props.value ? props.value.split("T")[0] : props.value,
              }
            : {})}
          onChange={props.onChange}
          className={[
            "h-10 w-full text-lg border-b-2 pb-1",
            props.errors ? "border-error" : "border-text",
            props.type == "file" ? "cursor-pointer" : "",
          ].join(" ")}
        />
        <span
          className={[
            "absolute bottom-0 left-0 h-0.5 transition-all ease-out duration-300 bg-accent",
            focused ? "w-full" : "w-0",
          ].join(" ")}
        ></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-text">
      {props.label && (
        <label className="text-xl font-bold mb-1" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      {field}
      {props.errors && <span className="text-error text-[10px] mt-1.5">{props.errors}</span>}
    </div>
  );
}
