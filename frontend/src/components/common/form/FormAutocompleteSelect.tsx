import { AutocompleteSelectInput, AutocompleteSelectInputProps } from "../AutocompleteSelectInput.tsx";
import { FormValues, UseFormOutput } from "./useForm.tsx";

interface FormAutocompleteSelectProps<T extends FormValues> {
  form: UseFormOutput<T>;
  fieldKey: keyof T;
}

export function FormAutocompleteSelect<T extends FormValues>(
  props: Omit<AutocompleteSelectInputProps, "onChange" | "value"> & FormAutocompleteSelectProps<T>
) {
  const errors = props.form.fieldErrors
    .filter((x) => x.field === props.fieldKey)
    .map((x) => x.error)
    .join(", ");

  return (
    <div className="flex flex-col gap-y-2">
      <AutocompleteSelectInput
        options={props.options}
        label={props.label}
        initialOptionLabel={props.initialOptionLabel}
        onChange={(e) => {
          props.form.update({ [props.fieldKey]: e } as Partial<T>);
        }}
        value={props.form.data[props.fieldKey] as string}
        searchThreshold={props.searchThreshold}
      />
      {errors && <span className="text-error text-[10px] mt-1.5">{errors}</span>}
    </div>
  );
}
