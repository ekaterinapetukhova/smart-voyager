import { useState } from "react";
import * as React from "react";

interface SelectInputProps {
  label: string;
}

export function SelectInput(props: SelectInputProps) {
  const [value, setValue] = useState("");

  return (
    <div>
      <label>{props.label}</label>
      <input
        type="select"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
}
