import * as React from "react";

interface FormField {
  label: string;
  id: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: string;
}

export function FormField(props: FormField) {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="h-8 px-2 text-sm border-b border-black bg-transparent"
      />
      {props.errors && <span className="text-red">{props.errors}</span>}
    </div>
  );
}
