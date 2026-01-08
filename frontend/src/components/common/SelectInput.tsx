import { MaybePromise } from "../../utils/maybe-promise.ts";

export interface SelectInputProps {
  label: string;
  options: {
    name: string;
    value: string;
  }[];
  onChange: (e: string) => MaybePromise<void>;
  initialOptionLabel: string;
  value?: string;
}

export function SelectInput(props: SelectInputProps) {
  const optionClassName = "cursor-pointer text-background";

  const options = props.options.map((option) => {
    return (
      <option
        key={option.value}
        className={optionClassName}
        value={option.value}
        defaultValue={props.value === option.value ? props.value : props.initialOptionLabel}
      >
        {option.name}
      </option>
    );
  });

  return (
    <div className="flex flex-col text-text gap-y-2">
      <label className="text-xl font-bold">{props.label}</label>
      <select
        className="border-1 border-text p-1 cursor-pointer focus:border-accent"
        onChange={(e) => void props.onChange(e.target.value)}
        defaultValue={props.value ?? props.initialOptionLabel}
      >
        <option className={optionClassName} value="">
          {props.initialOptionLabel}
        </option>
        {options}
      </select>
    </div>
  );
}
