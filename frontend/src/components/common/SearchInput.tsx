import * as React from "react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
  label?: string;
}

export function SearchInput(props: SearchInputProps) {
  return (
    <div className={["w-full gap-y-2 flex flex-col", props.classNames].join(" ")}>
      {props.label && <label className="text-xl font-bold text-text">{props.label}</label>}
      <input
        className="h-full text-lg border-b-2 border-accent text-text w-full px-2 py-2 placeholder:text-accent/25"
        type="search"
        onInput={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
}
