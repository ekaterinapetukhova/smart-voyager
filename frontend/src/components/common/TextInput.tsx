import * as React from "react";

interface TextInputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassNames?: string;
}

export function TextInput(props: TextInputProps) {
  return (
    <div className="flex flex-col gap-y-2 overflow-hidden max-w-96 w-full">
      {props.label && <label className="text-xl font-bold text-text">{props.label}</label>}
      <input
        className={[
          "h-10 text-sm border-b-2 text-text field-sizing-content w-max min-w-16 px-1",
          props.inputClassNames,
        ].join(" ")}
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
