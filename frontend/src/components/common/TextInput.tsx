import * as React from "react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextInput(props: TextInputProps) {
  const inputId = `input-${props.label ?? props.placeholder}`;

  return (
    <div className="flex flex-col gap-y-2 overflow-hidden max-w-96">
      {props.label && <label htmlFor={inputId}>{props.label}</label>}
      <input
        id={inputId}
        className="h-10 text-sm border-b-2 pb-1 text-text w-fit field-sizing-content min-w-lg"
        type="text"
        onChange={props.onChange}
        value={props.value}
        {...(props.placeholder
          ? {
              placeholder: props.placeholder,
            }
          : {})}
      />
    </div>
  );
}
