import * as React from "react";
import { MaybePromise } from "../../utils/maybe-promise.ts";

export interface CheckboxInputProps {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => MaybePromise<void>;
  options: { name: string; value: string }[];
}

export function CheckboxInput(props: CheckboxInputProps) {
  return (
    <div className="text-text flex flex-col gap-y-2">
      <div className="text-xl font-bold">{props.label}</div>
      <div className="flex flex-wrap gap-2">
        {props.options.map((option) => {
          return (
            <label
              key={option.value}
              className="px-2 w-fit flex text-center justify-center h-10 font-bold text-sm border-1 border-accent items-center cursor-pointer has-checked:bg-accent has-checked:text-background"
            >
              <input
                type="checkbox"
                value={option.value}
                onChange={(e) => void props.onChange(e)}
                className="hidden"
                multiple={true}
              />
              {option.name}
            </label>
          );
        })}
      </div>
    </div>
  );
}
