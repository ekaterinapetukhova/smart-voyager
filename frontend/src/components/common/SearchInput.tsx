import * as React from "react";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
}

export function SearchInput(props: SearchInputProps) {
  const inputId = `input-${props.placeholder}`;

  return (
    <div className={["w-full md:w-2/3", props.classNames ?? ""].join(" ")}>
      <input
        id={inputId}
        className="h-full text-lg border-b-2 border-accent text-accent w-full"
        type="search"
        onInput={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
}
