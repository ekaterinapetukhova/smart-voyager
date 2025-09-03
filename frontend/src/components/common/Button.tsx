interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  icon?: string;
  onClick?: () => void;
  classNames?: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type ?? "button"}
      className={["cursor-pointer border px-2", props.classNames ?? ""].join(" ")}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
