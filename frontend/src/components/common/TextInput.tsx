import * as React from "react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  const inputId = `input-${props.label ?? props.placeholder}`;

  return (
    <div className="flex flex-col gap-y-2">
      {props.label && <label htmlFor={inputId}>{props.label}</label>}
      <input
        id={inputId}
        className="h-10 text-lg border-b-2 pb-1"
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
};
