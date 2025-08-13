interface ButtonProps {
  label: string;
  icon?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export const Button = (props: ButtonProps) => {
  return (
    <button className="cursor-pointer border px-2" onClick={props.onClick}>
      {props.label}
    </button>
  );
};
