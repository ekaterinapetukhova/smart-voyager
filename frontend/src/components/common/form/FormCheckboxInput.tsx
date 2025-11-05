import { CheckboxInput, CheckboxInputProps } from "../CheckboxInput.tsx";
import { FormValues, UseFormOutput } from "./useForm.tsx";

interface FormCheckboxInputProps<T extends FormValues> {
  form: UseFormOutput<T>;
  fieldKey: keyof T;
}

export function FormCheckboxInput<T extends FormValues>(
  props: Omit<CheckboxInputProps, "onChange"> & FormCheckboxInputProps<T>
) {
  const errors = props.form.fieldErrors
    .filter((x) => x.field === props.fieldKey)
    .map((x) => x.error)
    .join(", ");

  return (
    <div className="flex flex-col gap-y-2">
      <CheckboxInput
        options={props.options}
        label={props.label}
        onChange={(e) => {
          props.form.update({ [props.fieldKey]: e.target.value } as Partial<T>);
        }}
      />
      {errors && <span className="text-error text-[10px] mt-1.5">{errors}</span>}
    </div>
  );
}
