import * as React from "react";

interface RadioInputProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
}

export function RadioInput(props: RadioInputProps) {
  const INPUT_ID = `input-${props.label}`;

  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={INPUT_ID}>{props.label}</label>
      <input
        id={INPUT_ID}
        className="h-10 text-lg border-b-2 pb-1"
        type="radio"
        onChange={props.onChange}
        value={props.value}
        checked={props.value === props.selectedValue}
      />
    </div>
  );
}
