import * as React from "react";
import { useEffect, useRef, useState } from "react";

interface FormFieldProps {
  label?: string;
  id?: string;
  type: "text" | "password" | "date" | "file" | "textarea" | "radio" | "checkbox";
  name: string;
  value?: string;
  checked?: boolean;
  files?: FileList;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errors?: string;
  options?: string[];
}

export function FormField(props: FormFieldProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.type === "file" && inputRef.current && props.files) {
      inputRef.current.files = props.files;
    }
  }, [props.type, props.files]);

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
  } else if (props.type === "checkbox") {
    field = (
      <label className="p-1 flex text-center justify-center h-10 text-xs border-1 border-accent items-center cursor-pointer has-checked:bg-accent has-checked:text-background">
        <input type="checkbox" name={props.name} checked={props.checked} onChange={props.onChange} className="hidden" />
        {props.label}
      </label>
    );
  } else if (props.type === "textarea") {
    field = (
      <div className="relative z-10 group">
        <textarea
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          id={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className={[
            "size-full min-h-32 max-h-40 text-lg resize-none outline-none border bg-transparent p-3 relative z-20",
            focused ? "border-accent" : "border-text",
            props.errors ? "border-error" : "border-text",
          ].join(" ")}
        />
        <span
          className={[
            "absolute inset-0 transition-all ease-out duration-300 -z-10",
            focused ? "size-full" : "size-0",
            props.errors ? "border-error" : "border-accent",
          ].join(" ")}
        ></span>
      </div>
    );
  } else {
    field = (
      <div className="relative group">
        <input
          autoFocus={true}
          ref={inputRef}
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
            "absolute bottom-0 left-0 h-0.5 transition-all ease-out duration-300",
            focused ? "w-full" : "w-0",
            props.errors ? "bg-error" : "bg-accent",
          ].join(" ")}
        ></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-text">
      {props.label && props.type !== "checkbox" && (
        <label className="text-xl font-bold mb-1" htmlFor={props.id}>
          {props.label}
        </label>
      )}
      {field}
      {props.errors && <span className="text-error text-[10px] mt-1.5">{props.errors}</span>}
    </div>
  );
}
