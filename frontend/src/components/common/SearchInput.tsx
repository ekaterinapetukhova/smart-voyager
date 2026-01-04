import * as React from "react";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNames?: string;
}

export function SearchInput(props: SearchInputProps) {
  return (
    <div className="w-full md:w-2/3">
      <input
        className="h-full text-lg border-b-2 border-accent text-accent w-full px-2 placeholder:text-accent/25"
        type="search"
        onInput={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
      />
    </div>
  );
}
