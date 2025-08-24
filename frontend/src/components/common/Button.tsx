interface ButtonProps {
  label: string;
  type?: "submit";
  icon?: string;
  onClick?: () => void;
  classNames?: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <div>
      <button
        type={props.type ?? "button"}
        className={["cursor-pointer border px-2", props.classNames ?? ""].join(" ")}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
};
