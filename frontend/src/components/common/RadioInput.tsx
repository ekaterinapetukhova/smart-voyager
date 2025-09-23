import * as React from "react";

interface RadioInputProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: { label: string; value: string }[];
}

export function RadioInput(props: RadioInputProps) {
  const INPUT_ID = `input-${props.label}`;

  return (
    <div className="flex gap-x-4">
      {props.options.map((option) => (
        <label key={option.label} className="flex items-center gap-x-2 text-lg cursor-pointer has-checked:text-accent">
          <input
            type="radio"
            name={props.label}
            value={option.value}
            checked={props.value === option.value}
            onChange={props.onChange}
            className="hidden"
            id={INPUT_ID}
          />
          {option.label[0].toUpperCase() + option.label.slice(1)}
        </label>
      ))}
    </div>
  );
}
