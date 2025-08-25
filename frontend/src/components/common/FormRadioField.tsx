interface RadioFieldProps<T extends string> {
  label: string;
  options: T[];
  value: T;
  onChange: (value: T) => void;
}

export function FormRadioField<T extends string>(props: RadioFieldProps<T>) {
  return (
    <div>
      <span>{props.label}</span>
      <div>
        {props.options.map((option) => {
          return (
            <div key={option}>
              <label>{option}</label>
              <input
                type="radio"
                name={props.label.toLowerCase()}
                value={option}
                onChange={() => {
                  props.onChange(option);
                }}
                checked={props.value === option}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
