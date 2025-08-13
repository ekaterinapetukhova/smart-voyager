import * as React from "react";

interface TextInputProps {
  label: string;
  type: "text" | "password" | "email" | "number";
  value: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = (props: TextInputProps) => {
  const INPUT_ID = `input-${props.label}`;

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={INPUT_ID}>{props.label}</label>
      <input
        id={INPUT_ID}
        className="border"
        type={props.type}
        placeholder={props.placeholder ?? ""}
        onChange={props.onChange}
        value={props.value}
      />
    </div>
  );
};
