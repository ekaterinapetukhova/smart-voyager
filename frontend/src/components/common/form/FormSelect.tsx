import { SelectInput, SelectInputProps } from "../SelectInput.tsx";
import { FormValues, UseFormOutput } from "./useForm.tsx";

interface FormSelectProps<T extends FormValues> {
  form: UseFormOutput<T>;
  fieldKey: keyof T;
}

export function FormSelect<T extends FormValues>(
  props: Omit<SelectInputProps, "onChange" | "value"> & FormSelectProps<T>
) {
  const errors = props.form.fieldErrors
    .filter((x) => x.field === props.fieldKey)
    .map((x) => x.error)
    .join(", ");

  return (
    <div className="flex flex-col gap-y-2">
      <SelectInput
        options={props.options}
        label={props.label}
        initialOptionLabel={props.initialOptionLabel}
        onChange={(e) => {
          props.form.update({ [props.fieldKey]: e } as Partial<T>);
        }}
        value={props.form.data[props.fieldKey] as string}
      />
      {errors && <span className="text-error text-[10px] mt-1.5">{errors}</span>}
    </div>
  );
}
