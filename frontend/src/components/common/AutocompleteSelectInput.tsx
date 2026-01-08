import { useState } from "react";
import { MaybePromise } from "../../utils/maybe-promise.ts";

export interface AutocompleteSelectInputProps {
  label: string;
  options: {
    name: string;
    value: string;
  }[];
  onChange: (e: string) => MaybePromise<void>;
  initialOptionLabel: string;
  value?: string;
  searchThreshold: number;
}

export function AutocompleteSelectInput(props: AutocompleteSelectInputProps) {
  const foundOption = props.options.find((x) => x.value === props.value);
  const [search, setSearch] = useState(foundOption?.name ?? "");
  const [showOptions, setShowOptions] = useState(false);

  const filteredOptions =
    search.length < props.searchThreshold
      ? []
      : props.options.filter((x) => x.name.toLowerCase().startsWith(search.toLowerCase()));

  const optionsDivs = filteredOptions.map((option) => {
    return (
      <div
        key={option.value}
        className="hover:bg-pink-400 py-1 px-2 text-black bg-text cursor-pointer w-full h-full"
        onClick={() => {
          setShowOptions(false);
          setSearch(option.name);
          void props.onChange(option.value);
        }}
      >
        {option.name}
      </div>
    );
  });

  return (
    <div className="flex flex-col text-text gap-y-2">
      <label className="text-xl font-bold">{props.label}</label>
      <div className="relative overflow-visible">
        <input
          autoComplete="one-time-code" // https://stackoverflow.com/questions/15738259/disabling-chrome-autofill
          className="h-10 w-full text-lg border-b-2 pb-1"
          type="text"
          placeholder={props.initialOptionLabel}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowOptions(true);
          }}
          onFocus={() => {
            setShowOptions(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setShowOptions(false);
            }, 100);
          }}
        />
        {search.length >= props.searchThreshold && showOptions && (
          <div className="absolute z-50 left-0 top-10 w-96 flex flex-col max-h-96 overflow-y-auto divide-amber-900 bg-white">
            {optionsDivs}
          </div>
        )}
      </div>
    </div>
  );
}
